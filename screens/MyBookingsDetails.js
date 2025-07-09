import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyBookingsDetails = ({ route }) => {
    const navigation = useNavigation();
    const { booking } = route.params;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        return timeString || 'N/A';
    };

    const renderClassDetails = () => {
        if (booking.booking_type !== 'class') return null;

        return (
            <View style={{
                backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, padding: 15,
                borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
            }}>
                <Text style={{
                    fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginBottom: 10,
                    borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                }}>Class Details</Text>

                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>
                    {booking.venue_name}
                </Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
                    {booking.address || 'Address not available'}
                </Text>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Activity:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.class_details?.activity || 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Duration:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.class_details?.duration ? `${booking.class_details.duration} minutes` : 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Fees Frequency:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.class_details?.feesFrequency || 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Coach:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.class_details?.coaches?.[0]?.label || 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Class Timing:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.time || 'N/A'}
                        </Text>
                    </View>
                </View>

                <Text style={{
                    fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginTop: 15, marginBottom: 10,
                    borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                }}>Student Details</Text>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Name:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.student_details?.name || 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Age:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.student_details?.age || 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Gender:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.student_details?.gender || 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Parent Name:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.student_details?.parentName || 'N/A'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Parent Mobile:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.student_details?.parentMobile || 'N/A'}
                        </Text>
                    </View>
                </View>

                <Text style={{
                    fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginTop: 15, marginBottom: 10,
                    borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                }}>Fee Details</Text>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Subtotal:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            ₹{booking.fee_details?.subtotal || 0}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>GST (18%):</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            ₹{booking.fee_details?.gst || 0}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Total:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            ₹{booking.fee_details?.total || 0}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Current Month Fee Status:</Text>
                        <Text style={{ 
                            fontSize: 14, 
                            fontWeight: '500', 
                            color: booking.is_fee_paid ? '#4CAF50' : '#F44336' 
                        }}>
                            {booking.is_fee_paid ? 'Paid' : 'Pending'}
                        </Text>
                    </View>
                </View>

                {booking.fee_details?.payment_history?.length > 0 && (
                    <View style={{ marginTop: 15 }}>
                        <Text style={{
                            fontSize: 16, fontWeight: 'bold', color: '#0047AB', marginBottom: 10,
                            borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                        }}>Payment History</Text>
                        {booking.fee_details.payment_history.map((payment, index) => (
                            <View key={index} style={{ 
                                backgroundColor: '#f5f5f5', 
                                padding: 10, 
                                borderRadius: 5, 
                                marginBottom: 8 
                            }}>
                                <Text style={{ fontSize: 14, color: '#666' }}>
                                    Date: {new Date(payment.feeDate).toLocaleDateString()}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#666' }}>
                                    Amount: ₹{payment.amount}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#666' }}>
                                    Status: {payment.isPaid ? 'Paid' : 'Pending'}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const renderStudentDetails = () => {
        if (booking.booking_type !== 'class') return null;

        return (
            <View style={{
                backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, padding: 15,
                borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
            }}>
                <Text style={{
                    fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginBottom: 10,
                    borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                }}>Student Details</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, color: '#666' }}>Student Name:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>{booking.student_details?.name || 'N/A'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, color: '#666' }}>Age:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>{booking.student_details?.age || 'N/A'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, color: '#666' }}>Parent Name:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>{booking.student_details?.parentName || 'N/A'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, color: '#666' }}>Parent Contact:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>{booking.student_details?.parentMobile || 'N/A'}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 15, left: 15, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 6 }}
            >
                <Ionicons name="arrow-back" size={24} color="#063970" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 30, paddingTop: 40 }}>
                {booking.booking_type === 'class' ? (
                    <>
                        {renderClassDetails()}
                        {renderStudentDetails()}
                    </>
                ) : (
                    <View style={{
                        backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, padding: 15,
                        borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
                    }}>
                        <Text style={{
                            fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginBottom: 10,
                            borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                        }}>Venue Details</Text>
                        
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 }}>
                            {booking.venue_name}
                        </Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
                            {booking.address || 'Address not available'}
                        </Text>
                    </View>
                )}

                {/* Date & Time */}
                <View style={{
                    backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, padding: 15,
                    borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginBottom: 10,
                        borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                    }}>Date & Time</Text>
                    
                    <Text style={{ fontSize: 14, color: '#333', marginBottom: 5 }}>Date: {formatDate(booking.date)}</Text>
                    
                    
                    {booking.slots && booking.slots.length > 0 && (
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 14, color: '#333', marginBottom: 5 }}>
                                Selected Slots: {booking.slots.join(', ')}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Payment Details */}
                <View style={{
                    backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, padding: 15,
                    borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginBottom: 10,
                        borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                    }}>Payment Details</Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Amount Paid:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>₹{booking.amount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Payment Method:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>{booking.payment_method || 'Online'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Transaction ID:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>{booking.transaction_id || 'N/A'}</Text>
                    </View>
                </View>

                {/* Booking Info */}
                <View style={{
                    backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, padding: 15,
                    borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginBottom: 10,
                        borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 5
                    }}>Booking Information</Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Booking Date:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#333' }}>
                            {booking.booked_on ? formatDate(booking.booked_on) : 'N/A'}
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>Booking Status:</Text>
                        <Text style={{
                            fontSize: 14, fontWeight: 'bold',
                            color: booking.status === 'upcoming' ? '#FF8C00' :
                                   booking.status === 'active' ? '#1976D2' : '#4CAF50'
                        }}>
                            {booking.status === 'upcoming' ? 'Upcoming' :
                             booking.status === 'active' ? 'Active' : 'Completed'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyBookingsDetails;
