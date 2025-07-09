import React, {useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SessionManager from '../../utils/sessionManager';

const statesWithCities = { /* Same state-city data */ };

const EventRegistrationForm = ({ route }) => {
    const [teamName, setTeamName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [tickets, setTickets] = useState(1);
    const [members, setMembers] = useState([{ name: '', age: '', contact: '' }]);

    const addMember = () => setMembers([...members, { name: '', age: '', contact: '' }]);
    const removeMember = (index) => setMembers(members.filter((_, i) => i !== index));

   // const {planDetails} = route.params;
     // console.log('planDetailsplanDetails', planDetails);
      const [modalVisible, setModalVisible] = useState(false);
      const slideAnim = useRef(new Animated.Value(300)).current;
    const navigation = useNavigation();
    
          const initiatePayment = async () => {
            const isGuest = await SessionManager.isGuestMode();
            if (isGuest) {
              Alert.alert(
                'Authentication Required',
                'Please sign in or create an account to register for this event.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign In', onPress: () => navigation.navigate('LoginModal') },
                  { text: 'Register', onPress: () => navigation.navigate('BasicInfo') }
                ]
              );
              return;
            }
            console.log('Initiating payment');
            const options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'INR',
              key: 'rzp_live_gk7iMvPaNzkvr2', // Your Razorpay API key
             // amount: planDetails?.price * 100, // Amount in paise (100 INR = 10000 paise)
             amount:100000*100,
             // name: planDetails?.planName,
              prefill: {
                email: 'void@razorpay.com',
                contact: '9191919191',
                name: 'Razorpay Software',
              },
              theme: {color: '#F37254'},
              order_id: '',
            };
    
            RazorpayCheckout.open(options)
          .then(data => {
            console.log('razorpay', data);
            // Payment successful
            setModalVisible(false);
            // Navigate to My Bookings page after successful payment
            navigation.reset({
              index: 0,
              routes: [
                { name: 'Main', params: { screen: 'PROFILE', params: { screen: 'MyBookings' } } }
              ],
            });
          })
          .catch(error => {
            // Payment failed
            alert('Error: ${error.code} | ${error.description}');
          });
      };
    
        
          useEffect(() => {
              if (modalVisible) {
                Animated.timing(slideAnim, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }
            }, [modalVisible]);

    return (
        <View style={{ flex: 1, backgroundColor: "#F8F9FD" }}>
          {/* Modern Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 10,
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderRadius: 16,
              padding: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 2,
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="arrow-back" size={20} color="#063970" />
          </TouchableOpacity>
          <ScrollView style={{ flex: 1, padding: 20, paddingTop: 30 }} contentContainerStyle={{ paddingBottom: 30 }}>
            {/* Event Details */}
            <View style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2D2D69" }}>Champions of NCR</Text>
              <Text style={{ color: "#666", marginTop: 5 }}><Text style={{ fontWeight: "bold" }}>Location:</Text> Delhi NCR</Text>
              <Text style={{ color: "#666" }}><Text style={{ fontWeight: "bold" }}>Date:</Text> 25th Mar '25 - 25th May '25</Text> 
            </View>
            
            {/* Basic Details */}
            <View style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Basic Details</Text>
              <Text style={{ color: "#666" }}>Full Name *</Text>
              <TextInput style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 10 }} 
                        value={fullName} 
                        onChangeText={(text) => setFullName(text)}  />
              <Text style={{ color: "#666" }}>Phone No. *</Text>
              <TextInput style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 10 }} 
              value={mobile} 
              onChangeText={(text) => setMobile(text)}  />
              <Text style={{ color: "#666" }}>Email-ID</Text>
              <TextInput style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 10 }} 
              value={email} 
              onChangeText={(text) => setEmail(text)}  />
            </View>

            {/* Address */}
            <View style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Address</Text>
              <Text style={{ color: "#666" }}>Address *</Text>
              <TextInput style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 10 }} 
              value={state} 
              onChangeText={(text) => setState(text)}  />
            </View>

            <View style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Ticket Detail</Text>
            <Text style={{ color: "#666" }}>No. of tickets *</Text>
            <TextInput style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 10 }} 
            value={tickets.toString()} 
            onChangeText={(text) => setTickets(Number(text))} 
            keyboardType="numeric"/>
            </View>
            {/* Counter */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}> 
             <TouchableOpacity onPress={() => setTickets(tickets > 1 ? tickets - 1 : 1)} style={counterButtonStyle}><Text>-</Text></TouchableOpacity>
             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{tickets}</Text>
             <TouchableOpacity onPress={() => setTickets(tickets + 1)} style={counterButtonStyle}><Text>+</Text></TouchableOpacity>
             </View>  */}
          

         {/* Member Details */}
        <View style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Member Details</Text>
          {members.map((member, index) => (
            <View key={index} style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10 }}>
              
              {/* Player Name */}
              <Text style={{ color: "#666", marginBottom: 5 }}>  Player's Name *</Text>
              <TextInput 
                placeholder="" 
                value={member.name} 
                onChangeText={(text) => {
                  let updatedMembers = [...members]; 
                  updatedMembers[index].name = text; 
                  setMembers(updatedMembers);
                }} 
                style={{ borderWidth: 1, borderColor: "#ccc", borderRadius:8, padding: 8, marginBottom: 15 }} 
              />

              {/* Age and Contact in One Line */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom:20 }}>
                
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={{ color: "#666", marginBottom: 5 }}>  Age *</Text>
                  <TextInput 
                    placeholder="" 
                    value={member.age} 
                    onChangeText={(text) => {
                      let updatedMembers = [...members]; 
                      updatedMembers[index].age = text; 
                      setMembers(updatedMembers);
                    }} 
                    style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8 }} 
                    keyboardType="numeric" 
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text style={{ color: "#666", marginBottom: 5 }}>  Contact Number *</Text>
                  <TextInput 
                    placeholder="" 
                    value={member.contact} 
                    onChangeText={(text) => {
                      let updatedMembers = [...members]; 
                      updatedMembers[index].contact = text; 
                      setMembers(updatedMembers);
                    }} 
                    style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8 }} 
                    keyboardType="phone-pad" 
                  />
                </View>
              </View>

              {/* Remove Button */}
              <TouchableOpacity 
                onPress={() => removeMember(index)} 
                style={{ backgroundColor: '#2D2D69', padding: 10, borderRadius: 10, alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
              </TouchableOpacity>

            </View>
          ))}

          {/* Add More Button */}
          <TouchableOpacity  
            onPress={addMember} 
            style={{ backgroundColor: "#E3E6F3", padding: 10, borderRadius: 8, alignItems: "center" }}>
            <Text style={{ color: "#2D2D69", fontWeight: "bold" }}>Add More +</Text>
          </TouchableOpacity>                 
        </View>

                   

               {/* Payment Details */}
            <View style={{ padding: 15, borderRadius: 10, marginBottom: 15, alignSelf:'center' }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Total Amount: <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2D2D69", marginTop: 10 }}>₹ 1,00,000</Text></Text>
              <TouchableOpacity onPress={() => initiatePayment()} style={{ backgroundColor: "#2D2D69", marginBottom:20,padding: 15, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Proceed to pay</Text>
            </TouchableOpacity>       
            </View>      
              
              

                
            </ScrollView>
        </View>
    );
};

const inputStyle = {
    backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 10, fontSize: 16, borderWidth: 1, borderColor: '#ddd', width: '100%'
};
const counterButtonStyle = { padding: 10, backgroundColor: 'white', marginHorizontal: 5 };

export default EventRegistrationForm;
