import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, ActivityIndicator, Text, TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCourtDetails, getVenueDetails } from '../../hooks/useApi';
import DatePicker from '../../screens/Venue/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SessionManager from '../../utils/sessionManager';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const scale = size => Math.min(width / guidelineBaseWidth * size, size);

const CricketBookingForm = ({ route }) => {
    const navigation = useNavigation();
    const { arenaId, venueName } = route?.params;
    const [activityOptions, setActivityOptions] = useState([]);
    const [courtOptions, setCourtOptions] = useState([]);
    const [activity, setActivity] = useState('Cricket');
    const [court, setCourt] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allSlots, setAllSlots] = useState([]);
    const [slots, setSlots] = useState([]);
    const [payPrice, setPayPrice] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    
    // New state variables for discount
    const [originalPrice, setOriginalPrice] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(null);
    const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);

    // Function to calculate weekday discount for Sportzon Wave City
    const calculateWeekdayDiscount = (price, date, venueSlug) => {
        // Check if it's Sportzon Wave City
        if (venueSlug !== 'sportzon-wave-city') {
            return { discountAmount: 0, finalPrice: price, isApplicable: false };
        }
        
        // Check if it's a weekday (Monday = 1, Sunday = 0)
        const dayOfWeek = moment(date).day();
        const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
        
        if (isWeekday && price) {
            const discount = price * 0.10; // 10% discount
            const final = price - discount;
            return { 
                discountAmount: discount, 
                finalPrice: final, 
                isApplicable: true 
            };
        }
        
        return { discountAmount: 0, finalPrice: price, isApplicable: false };
    };

    // Function to update prices when slot is selected
    const updatePrices = (price, date) => {
        setOriginalPrice(price);
        const discountInfo = calculateWeekdayDiscount(price, date, venueName);
        setDiscountAmount(discountInfo.discountAmount);
        setFinalPrice(discountInfo.finalPrice);
        setIsDiscountApplicable(discountInfo.isApplicable);
        setPayPrice(discountInfo.finalPrice); // Use discounted price for payment
    };

    useEffect(() => { fetchData(); }, [arenaId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const venueData = await getVenueDetails(venueName);
            setActivityOptions(venueData.data.activities);
        } catch (error) {
            Alert.alert('Error', 'Failed to load venue and court data.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCourts = async () => {
        const courtData = await getCourtDetails(arenaId);
        let courts = courtData?.data ?? [];
        if (activity) {
            courts = courts.filter(slot => slot.activity === activity);
        }
        setCourtOptions(courts);
        setAllSlots(courtData?.data);
    };

    useEffect(() => { fetchCourts(); }, [activity]);

     // ✅ NEW: Get already booked slots from backend
     const fetchBookedSlots = async (arenaId, date, courtSlug) => {
        try {
            const response = await api.post('/landing/venues/get-slots', { arena: arenaId });
            const bookings = response?.data?.data || [];

            const selectedDate = moment(date).format('YYYY-MM-DD');
            const bookedSlots = bookings
                .filter(booking => booking?.court === courtSlug)
                .flatMap(booking =>
                    booking?.slots
                        ?.filter(s => s?.date === selectedDate)
                        ?.map(s => s?.slot?.value)
                );

            return bookedSlots;
        } catch (err) {
            console.error('Error fetching booked slots:', err);
            return [];
        }
    };

    const handleSelectDate = async (date) => {
        setSelectedDate(date);
        if (!date) {
            setSlots([]);
            return;
        }
        const dayName = moment(date).format('dddd').toLowerCase();
        if (!allSlots.length) return;
        const courtSlots = allSlots.find(slotItem => slotItem.slug === court);
        let renderSlots = courtSlots?.slots?.[dayName] || [];
        if (moment(date).isSame(moment(), 'day')) {
            const currentTime = moment().format('HH:mm');
            renderSlots = renderSlots.filter(slot =>
                moment(slot.startTime, 'HH:mm').isAfter(moment(currentTime, 'HH:mm'))
            );
        }
        // ✅ fetch booked slots
        const bookedSlotValues = await fetchBookedSlots(arenaId, date, court);
        const filteredSlots = renderSlots.filter(slot =>
            !bookedSlotValues.includes(`${slot.startTime} to ${slot.endTime}`)
        );
        setSlots(filteredSlots.map(slot => ({
            ...slot,
            time: `${slot.startTime} to ${slot.endTime}`
        })));
    };
    

    const initiatePayment = async () => {
      //  const payPrice=1;
        try {
            if (!selectedSlot || !payPrice) {
                Alert.alert('Error', 'Please select a valid slot to proceed.');
                return;
            }

            const sessionData = await SessionManager.getSessionData();
            console.log(sessionData, "====>  session user data fetched before  ==")
            if (!sessionData?.userData) {
                Alert.alert('Error', 'Please login to continue');
                return;
            }

            const orderData = {
                amount: payPrice * 100,
                bookingType: "arena"
            };
            const orderResponse = await api.post('/landing/payments/orders', orderData);

            if (!orderResponse.data || orderResponse.data.code !== "ordered") {
                throw new Error('Order creation failed');
            }

            const orderId = orderResponse.data.data.id;
            console.log(sessionData.userData, "====>  session user data fetched ==")

            const options = {
                description: `Booking for ${venueName} - ${court} on ${moment(selectedDate).format('DD/MM/YYYY')} at ${selectedSlot}`,
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_live_gk7iMvPaNzkvr2',
               
                amount: payPrice * 100,
                order_id: orderId,
                prefill: {
                    email: sessionData.userData.email || 'void@razorpay.com',
                    contact: sessionData.userData.mobile || '9191919191',
                    name: `${sessionData.userData.firstName || ''} ${sessionData.userData.lastName || ''}`.trim()
                },
                theme: { color: '#F37254' },
                retry: { enabled: true, maxCount: 4 }
            };

            const data = await RazorpayCheckout.open(options);

            const bookingData = {
                response: {
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: orderId,
                    razorpay_signature: data.razorpay_signature
                },
                data: {
                    bookingType: "arena",
                    arena: arenaId,
                    court: [{
                        activity: activity,
                        court: court,
                        date: moment(selectedDate).format('YYYY-MM-DD'),
                        slots: [{
                            label: selectedSlot,
                            value: selectedSlot,
                            price: originalPrice || payPrice
                        }],
                        pricing: payPrice,
                        status: "completed",
                        amount: payPrice,
                        gst: Math.round(payPrice * 0.18),
                        discountApplied: isDiscountApplicable ? {
                            type: 'weekday',
                            percentage: 10,
                            originalAmount: originalPrice,
                            discountAmount: discountAmount,
                            finalAmount: finalPrice,
                            venue: 'sportzon-wave-city'
                        } : null
                    }],
                    user: sessionData.userData._id,
                    fullName: `${sessionData.userData.firstName} ${sessionData.userData.lastName}`,
                    email: sessionData.userData.email,
                    mobile: sessionData.userData.mobile,
                    members: [],
                    address: sessionData.userData.address || "unavailable",
                    city: sessionData.userData.city || "unavailable",
                    state: sessionData.userData.state || "unavailable",
                    pincode: sessionData.userData.pincode || 0,
                    noOfTickets: 1,
                    eventStatus: "Completed",
                    club: "64a7c238ce825993da286481"
                }
            };
            console.log("=========================> ", bookingData, "====>  booking data ==")

            const bookingResponse = await api.post('/landing/bookings/process', bookingData);
            // dont comment next console

            console.log("=========================> ", bookingResponse, "====>  booking response ==", "<=========================")

            if (!bookingResponse.data || bookingResponse.data.code !== "booked") {
                throw new Error('Booking creation failed');
            }

            const bookingId = bookingResponse?.data?.data?._id;

            console.log(bookingId, "====>  booking id fetched ==")

            // Record the transaction     this api is causing the problem
            // const transactionData = {
            //     payment_id: data.razorpay_payment_id,
            //     amount: payPrice * 100,
            //     currency: 'INR',
            //     description: `Booking for ${venueName} - ${court} on ${moment(selectedDate).format('DD/MM/YYYY')} at ${selectedSlot}`,
            //     venue: venueName,
            //     court: court,
            //     date: moment(selectedDate).format('YYYY-MM-DD'),
            //     slot: selectedSlot,
            //     email: sessionData.userData.email,
            //     contact: sessionData.userData.mobile,
            //     status: "completed",
            //     booking_id: bookingId,
            //     user_id: sessionData.userData._id
            // };

            // console.log('Recording transaction with data:', JSON.stringify(transactionData, null, 2));
            // await api.post('/landing/payments/transactions', transactionData);

            await AsyncStorage.setItem('last_booking_id', bookingId);
            await AsyncStorage.setItem('last_payment_id', data.razorpay_payment_id);

            // Navigate to PlayScreen (Venues tab) after successful payment
            navigation.reset({
              index: 0,
              routes: [
                { name: 'Main', params: { screen: 'PLAY', params: { tab: 'venues' } } }
              ],
            });

        } catch (error) {
            console.error('Error during Razorpay flow:', error);
            Alert.alert('Payment Failed', error.message || 'Something went wrong, please try again.');
        }
    };

    const handleSubmit = async () => {
        if (!selectedSlot) {
            Alert.alert('Error', 'Please select a slot.');
            return;
        }

        const isGuest = await SessionManager.isGuestMode();
        if (isGuest) {
            Alert.alert(
                'Authentication Required',
                'Please sign in or create an account to complete your booking.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Sign In',
                        onPress: () => navigation.navigate('LoginModal')
                    },
                    {
                        text: 'Register',
                        onPress: () => navigation.navigate('BasicInfo')
                    }
                ]
            );
            return;
        }

        initiatePayment();
    };

    return (
     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
       <ScrollView style={{ flex: 1, backgroundColor: "#F8F9FD", padding: scale(15), borderRadius: scale(20) }}>
         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: scale(15) }}>
          <TouchableOpacity 
           onPress={() => navigation.goBack()}
           style={{ padding: scale(12), marginLeft: scale(1), marginTop: scale(20) }}
          >
         <Ionicons name="arrow-back" size={scale(25)} color="#063970" />
         </TouchableOpacity>
          <Text style={{ 
            fontSize: scale(24), 
            fontWeight: "bold", 
            color: "#063970", 
            alignSelf: 'center', 
            marginBottom: scale(15), 
            marginTop: scale(30)
          }}>
            Book a Slot That Suits You!
          </Text>
         </View>

                <View style={{ 
                    padding: scale(20), 
                    marginBottom: scale(15), 
                    backgroundColor: '#fff',
                    borderRadius: scale(15),
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: scale(2),
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: scale(4),
                    elevation: 3
                }}>
                    <Text style={{ 
                        fontSize: scale(18), 
                        fontWeight: "bold", 
                        marginBottom: scale(6), 
                        color: "#063970",
                        borderBottomWidth: 0,
                        borderBottomColor: '#063970',
                        paddingBottom: scale(10)
                    }}>Select Activity & Court</Text>
                    
                    <View style={{ marginBottom: scale(20) }}>
                        <Text style={{ 
                            fontSize: scale(16), 
                            color: '#666',
                            marginBottom: scale(8)
                        }}>Activity*</Text>
                <Dropdown
                    data={activityOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Activity"
                    value={activity}
                    onChange={item => setActivity(item.value)}
                    style={{
                                height: scale(55),
                                backgroundColor: '#F8F9FD',
                                borderRadius: scale(10),
                                paddingHorizontal: scale(15),
                                borderWidth: 1,
                                borderColor: '#E0E0E0'
                            }}
                            placeholderStyle={{
                                fontSize: scale(16),
                                color: '#666'
                            }}
                            selectedTextStyle={{
                                fontSize: scale(16),
                                color: '#333',
                                fontWeight: '500'
                            }}
                            itemTextStyle={{
                                fontSize: scale(16),
                                color: '#333'
                            }}
                            itemContainerStyle={{
                                backgroundColor: '#fff',
                                borderRadius: scale(10),
                                marginVertical: scale(2)
                            }}
                            containerStyle={{
                                borderRadius: scale(10),
                                borderWidth: 1,
                                borderColor: '#E0E0E0'
                            }}
                        />
                    </View>

                    <View>
                        <Text style={{ 
                            fontSize: scale(16), 
                            color: '#666',
                            marginBottom: scale(8)
                        }}>Court*</Text>
                <Dropdown
                    data={courtOptions}
                    labelField="title"
                    valueField="slug"
                    placeholder="Select Court"
                    value={court}
                    onChange={item => setCourt(item.slug)}
                    style={{
                                height: scale(55),
                                backgroundColor: '#F8F9FD',
                                borderRadius: scale(10),
                                paddingHorizontal: scale(15),
                                borderWidth: 1,
                                borderColor: '#E0E0E0'
                            }}
                            placeholderStyle={{
                                fontSize: scale(16),
                                color: '#666'
                            }}
                            selectedTextStyle={{
                                fontSize: scale(16),
                                color: '#333',
                                fontWeight: '500'
                            }}
                            itemTextStyle={{
                                fontSize: scale(16),
                                color: '#333'
                            }}
                            itemContainerStyle={{
                                backgroundColor: '#fff',
                                borderRadius: scale(10),
                                marginVertical: scale(2)
                            }}
                            containerStyle={{
                                borderRadius: scale(10),
                                borderWidth: 1,
                                borderColor: '#E0E0E0'
                            }}
                        />
                    </View>
                </View>

                <View style={{ 
                    padding: scale(20), 
                    marginBottom: scale(15), 
                    backgroundColor: '#fff',
                    borderRadius: scale(15),
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: scale(2),
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: scale(4),
                    elevation: 3
                }}>
                    <Text style={{ 
                        fontSize: scale(18), 
                        fontWeight: "bold", 
                        marginBottom: scale(6), 
                        color: "#063970",
                        borderBottomWidth: 0,
                        borderBottomColor: '#063970',
                        paddingBottom: scale(10)
                    }}>Select Date</Text>
                    <DatePicker
                        setDatePickerVisibility={setDatePickerVisibility}
                        isDatePickerVisible={isDatePickerVisible}
                        selectedDate={selectedDate}
                        setSelectedDate={handleSelectDate}
                    />
                </View>

                <View style={{ 
                    padding: scale(20), 
                    marginVertical: scale(15), 
                    backgroundColor: '#fff',
                    borderRadius: scale(15),
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: scale(2),
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: scale(4),
                    elevation: 3
                }}>
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginBottom: scale(15),
                        borderBottomWidth: 0,
                        borderBottomColor: '#063970',
                        paddingBottom: scale(10)
                    }}>
                        <Text style={{ 
                            fontSize: scale(20), 
                            fontWeight: 'bold', 
                            color: "#063970",
                            flex: 1
                        }}>Select Your Slot</Text>
                        <Text style={{ 
                            fontSize: scale(14), 
                            color: '#666',
                            fontWeight: '500'
                        }}>Per Hour</Text>
                    </View>
                    {selectedDate && slots.length ? (
                        <View style={{ gap: scale(10) }}>
                            {slots.map(slot => (
                                <TouchableOpacity
                                    key={slot._id}
                                    onPress={() => {
                                        updatePrices(slot.price, selectedDate);
                                        setSelectedSlot(slot.time);
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: scale(15),
                                        backgroundColor: selectedSlot === slot.time ? '#E8F0FE' : '#F8F9FD',
                                        borderRadius: scale(10),
                                        borderWidth: 2,
                                        borderColor: selectedSlot === slot.time ? '#063970' : '#E0E0E0'
                                    }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ 
                                            fontSize: scale(16), 
                                            fontWeight: '600',
                                            color: '#333',
                                            marginBottom: scale(4)
                                        }}>{slot.time}</Text>
                                        <Text style={{ 
                                            fontSize: scale(14), 
                                            color: '#666'
                                        }}>Duration: 1 hour</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        {isDiscountApplicable && selectedSlot === slot.time && (
                                            <View style={{
                                                backgroundColor: '#FF6B35',
                                                paddingHorizontal: scale(8),
                                                paddingVertical: scale(4),
                                                borderRadius: scale(12),
                                                marginBottom: scale(4)
                                            }}>
                                                <Text style={{ 
                                                    fontSize: scale(10), 
                                                    fontWeight: 'bold',
                                                    color: '#fff'
                                                }}>10% OFF</Text>
                                            </View>
                                        )}
                                        <View style={{
                                            backgroundColor: selectedSlot === slot.time ? '#063970' : '#E0E0E0',
                                            paddingHorizontal: scale(15),
                                            paddingVertical: scale(8),
                                            borderRadius: scale(20)
                                        }}>
                                            {isDiscountApplicable && selectedSlot === slot.time ? (
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ 
                                                        fontSize: scale(12), 
                                                        color: selectedSlot === slot.time ? '#fff' : '#666',
                                                        textDecorationLine: 'line-through'
                                                    }}>₹{originalPrice}</Text>
                                                    <Text style={{ 
                                                        fontSize: scale(16), 
                                                        fontWeight: 'bold',
                                                        color: selectedSlot === slot.time ? '#fff' : '#666'
                                                    }}>₹{finalPrice}</Text>
                                                </View>
                                            ) : (
                                                <Text style={{ 
                                                    fontSize: scale(16), 
                                                    fontWeight: 'bold',
                                                    color: selectedSlot === slot.time ? '#fff' : '#666'
                                                }}>₹{slot.price}</Text>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (!selectedDate ? (
                        <View style={{
                            padding: scale(20),
                            backgroundColor: '#F8F9FD',
                            borderRadius: scale(10),
                            alignItems: 'center'
                        }}>
                            <Text style={{ 
                                fontSize: scale(16), 
                                color: '#666',
                                textAlign: 'center'
                            }}>Please select a date to view available slots.</Text>
                        </View>
                    ) : (
                        <View style={{
                            padding: scale(20),
                            backgroundColor: '#F8F9FD',
                            borderRadius: scale(10),
                            alignItems: 'center'
                        }}>
                            <Text style={{ 
                                fontSize: scale(16), 
                                color: '#666',
                                textAlign: 'center'
                            }}>No slots available for the selected date.</Text>
                        </View>
                    ))}
                </View>

                {/* Discount Information Section */}
                {isDiscountApplicable && selectedSlot && (
                    <View style={{ 
                        padding: scale(20), 
                        marginVertical: scale(15), 
                        backgroundColor: '#E8F5E8',
                        borderRadius: scale(15),
                        borderWidth: 1,
                        borderColor: '#4CAF50',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: scale(2),
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: scale(4),
                        elevation: 3
                    }}>
                        <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            marginBottom: scale(10)
                        }}>
                            <Ionicons name="pricetag" size={scale(20)} color="#4CAF50" />
                            <Text style={{ 
                                fontSize: scale(18), 
                                fontWeight: 'bold', 
                                color: "#4CAF50",
                                marginLeft: scale(8)
                            }}>Weekday Discount Applied!</Text>
                        </View>
                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            marginBottom: scale(5)
                        }}>
                            <Text style={{ fontSize: scale(14), color: '#666' }}>Original Price:</Text>
                            <Text style={{ fontSize: scale(14), color: '#666', textDecorationLine: 'line-through' }}>
                                ₹{originalPrice}
                            </Text>
                        </View>
                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            marginBottom: scale(5)
                        }}>
                            <Text style={{ fontSize: scale(14), color: '#4CAF50', fontWeight: '600' }}>Discount (10%):</Text>
                            <Text style={{ fontSize: scale(14), color: '#4CAF50', fontWeight: '600' }}>
                                -₹{discountAmount}
                            </Text>
                        </View>
                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            marginTop: scale(8),
                            paddingTop: scale(8),
                            borderTopWidth: 1,
                            borderTopColor: '#4CAF50'
                        }}>
                            <Text style={{ fontSize: scale(16), fontWeight: 'bold', color: '#333' }}>Final Price:</Text>
                            <Text style={{ fontSize: scale(16), fontWeight: 'bold', color: '#4CAF50' }}>
                                ₹{finalPrice}
                            </Text>
                        </View>
                    </View>
                )}

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                        padding: scale(15),
                        backgroundColor: '#063970', 
                        alignItems: 'center', 
                        marginTop: scale(40),
                        marginBottom: scale(50),
                        borderRadius: scale(10)
                    }}
                >
                    <Text style={{ 
                        color: 'white', 
                        fontWeight: 'bold',
                        fontSize: scale(14)
                    }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CricketBookingForm;