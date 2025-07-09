import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const BasicDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState(item?.timings?.split('and')[0]?.trim() || "Select Timing");
  const { width, height } = Dimensions.get("window");

  const [selectedGender, setSelectedGender] = useState("female"); // Default value

  // If no item is passed, show error or redirect
  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 16, color: '#FF6600' }}>No class details available</Text>
      </View>
    );
  }

  const initiatePayment = async () => {
    const options = {
      description: `Payment for ${item.name}`,
      image: item.image,
      currency: 'INR',
      key: 'rzp_test_1KAe5ngzKfHbdN',
      amount: parseInt(item.price.replace('₹', '').replace(',', '')) * 100,
      name: 'Sportzon Class Booking',
      prefill: {
        email: '',
        contact: '',
        name: '',
      },
      theme: {color: '#FF6600'},
      order_id: '',
    };

    try {
      const data = await RazorpayCheckout.open(options);
      console.log('Payment successful:', data);
      // Navigate to My Bookings page after successful payment
      navigation.reset({
        index: 0,
        routes: [
          { name: 'Main', params: { screen: 'PROFILE', params: { screen: 'MyBookings' } } }
        ],
      });
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert(
        'Payment Failed',
        `Error: ${error.code} | ${error.description}`
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F9FD', padding: 16 }}>
      {/* Class Details Section */}
      <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <Image 
          source={{ uri: item.image }} 
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{item.name}</Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{item.address1}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF6600', marginTop: 8 }}>{item.price}/month</Text>
        </View>
      </View>

     
      {/* Basic Details Card */}
      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 16,  }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Basic Details</Text>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: "#E5E7EB" , marginTop:10,marginBottom:10}} />
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#555', marginTop: 10 }}>Full Name *</Text>
        <TextInput style={{ backgroundColor: 'white', borderRadius: 25, 
        padding: 6, marginTop: 5,borderWidth:0.5,borderColor:'#A9A9A9' }} 
        defaultValue="" />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#555' }}> Date of Birth *</Text>
            <TextInput style={{ backgroundColor: 'white', borderRadius: 25,  marginTop: 5,padding: 6,borderWidth:0.5,borderColor:'#A9A9A9' }} placeholder="  DD/MM/YYYY" />
          </View>
          <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "#555", marginBottom: 5 }}>
        Gender *
      </Text>
      <View
        style={{
          backgroundColor: "white",borderRadius: 20,borderWidth: 0.5,
          borderColor: "#A9A9A9", paddingHorizontal: 10, justifyContent: "center",
        }}
      >
       <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue) => setSelectedGender(itemValue)}
          mode="dropdown" // Ensures better UI for Android
          style={{
            height: 40,
            fontSize: 14,       
            textAlign: "center", // Works for iOS but not for Android
          }}
        >
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Others" value="others" />
        </Picker>
      </View>
    </View>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#555' }}>Weight</Text>
            <TextInput style={{ backgroundColor: 'white', borderRadius: 25, padding: 10, marginTop: 5,padding: 6,borderWidth:0.5,borderColor:'#A9A9A9'  }} defaultValue="" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#555' }}>Height</Text>
           
            <TextInput style={{ backgroundColor: 'white', borderRadius: 25, padding: 10, marginTop: 5,padding: 6,borderWidth:0.5,borderColor:'#A9A9A9'  }} defaultValue="" /> 
            
          </View>
        </View>
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#555', marginTop: 10 }}>Email-ID</Text>
        <TextInput style={{ backgroundColor: 'white', borderRadius: 25, padding: 10, marginTop: 5,padding: 6,borderWidth:0.5,borderColor:'#A9A9A9'  }} defaultValue="" />
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#555', marginTop: 10 }}>Phone No. *</Text>
        <TextInput style={{ backgroundColor: 'white', borderRadius: 25, padding: 10, marginTop: 5,padding: 6,borderWidth:0.5,borderColor:'#A9A9A9'  }} defaultValue="" />
        </View>
       
      
        {/* Class Information */}
      <View style={{backgroundColor: 'white',padding: 20, borderRadius: 10,marginBottom: 20, marginTop:20}}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Class Details</Text>
      {/* Divider */}
        <View style={{ height: 1, backgroundColor: "#E5E7EB" , marginTop:10,marginBottom:10}} />
        <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>Class Timings <Text style={{ color: "red" }}>*</Text></Text>
        <TouchableOpacity
            style={{
              backgroundColor: "#fff",borderRadius:25,borderWidth: 1,borderColor: "#D1D5DB",padding:9,
              flexDirection: "row", justifyContent: "space-between", alignItems: "center",borderWidth:0.5,borderColor:'#A9A9A9' }}
              onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={{ fontSize: 14, color: "#444" }}>{selectedTiming}</Text>
            <Icon name="chevron-down-outline" size={18} color="#666" />
          </TouchableOpacity>
          {isExpanded && (
            <View style={{ marginTop: 10 }}>
              {item.timings.split('and').map((timing, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor: selectedTiming === timing.trim() ? '#FF6600' : '#fff',
                    borderRadius: 10,
                    marginBottom: 5,
                  }}
                  onPress={() => {
                    setSelectedTiming(timing.trim());
                    setIsExpanded(false);
                  }}
                >
                  <Text style={{ color: selectedTiming === timing.trim() ? '#fff' : '#333' }}>
                    {timing.trim()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
      </View>

          
      {/* Address Details*/}
      <View style={{backgroundColor: 'white',padding: 20,borderRadius: 10, marginBottom: 20,}}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Address</Text>
      {/* Divider */}
        <View style={{ height: 1, backgroundColor: "#E5E7EB" , marginTop:10,marginBottom:10}} />

        <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>Address *</Text>
        
        <TextInput style={{borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 25,backgroundColor: '#F8F9FD', 
          marginBottom: 15, padding: 6,borderWidth:0.5,borderColor:'#A9A9A9'}} value="" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%' }}>
            <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>State *</Text>
            <TextInput style={{borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 25,
    padding:5,backgroundColor: '#F8F9FD', marginBottom: 15,borderWidth:0.5,borderColor:'#A9A9A9'}} value="" />
          </View>
          <View style={{ width: '48%' }}>
            <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>City *</Text>
            <TextInput style={{borderWidth: 1,borderColor: '#E0E0E0',borderRadius:25, backgroundColor: '#F8F9FD', marginBottom: 15,padding: 6,borderWidth:0.5,borderColor:'#A9A9A9'}} value="" />
          </View>
        </View>
        <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>Pincode *</Text>
        <TextInput style={{borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 25,backgroundColor: '#F8F9FD', 
          marginBottom: 15,padding: 6,borderWidth:0.5,borderColor:'#A9A9A9'}} value="" />
      </View>

      {/* Guardian Information */}
      <View style={{backgroundColor: 'white',padding: 20, borderRadius: 10,marginBottom: 20, }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Guardian Information</Text>

      {/* Divider */}
        <View style={{ height: 1, backgroundColor: "#E5E7EB" , marginTop:10,marginBottom:10}} />
        <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>Guardian's Name *</Text>
        <TextInput style={{borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 25,
    padding: 6,backgroundColor: '#F8F9FD', marginBottom: 15,borderWidth:0.5,borderColor:'#A9A9A9'}} value="" />
        <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>Guardian's Phone No. *</Text>
        <TextInput style={{borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 25,
    padding: 6,backgroundColor: '#F8F9FD', marginBottom: 15,borderWidth:0.5,borderColor:'#A9A9A9'}} value="" />
        <Text style={{fontSize: 14,color: '#333', marginBottom: 5,fontWeight: '600',}}>Email-ID</Text>
        <TextInput style={{borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 25,
    padding: 6,backgroundColor: '#F8F9FD', marginBottom: 15,borderWidth:0.5,borderColor:'#A9A9A9'}} value="" />
      </View>


<View style={{ padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, 
  shadowColor: '#000', marginBottom:50,shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, height:height*0.3 }}>
      
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF6600', marginBottom: 10 }}>Total Amount</Text>
      {/* Divider */}
      <View style={{ height: 1, backgroundColor: "#E5E7EB" , marginTop:1,marginBottom:15}} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <Text style={{ fontSize: 14, color: '#333' }}>Subtotal</Text>
        <Text style={{ fontSize: 14, color: '#333' }}>₹{Math.round(parseInt(item.price.replace('₹', '').replace(',', '')) / 1.18)}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <Text style={{ fontSize: 14, color: '#333' }}>GST (18%)</Text>
        <Text style={{ fontSize: 14, color: '#333' }}>₹{Math.round(parseInt(item.price.replace('₹', '').replace(',', '')) - (parseInt(item.price.replace('₹', '').replace(',', '')) / 1.18))}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF6600' }}>Total</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF6600' }}>
          ₹{parseInt(item.price.replace('₹', '').replace(',', ''))}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={{ backgroundColor: '#FF6600', paddingVertical: 12, borderRadius: 25, alignItems: 'center' }}
        onPress={initiatePayment}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Proceed to pay</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default BasicDetails;