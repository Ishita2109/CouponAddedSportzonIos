import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Animated, Alert } from 'react-native';
//import RazorpayCheckout from 'react-native-razorpay';

const SilverMembershipScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
      const slideAnim = useRef(new Animated.Value(300)).current;
    
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
      <ScrollView style={{ flex: 1, backgroundColor: '#fff',  }}>
        {/* Header Section */}
        <View style={{ backgroundColor: '#A0A0A0', height:250, padding: 20,  position: 'relative' }}>
         <Text style={{ fontSize: 29, fontWeight: "bold", color: "white",marginTop: 20,marginLeft:7 }}>Silver</Text>
         <Text style={{ fontSize: 29,  color: "white", marginLeft:7 }}>Membership </Text>
         <Text style={{ fontSize: 29,  color: "white", marginLeft:7 }}>Plans</Text>
         <Text style={{ fontSize: 14, color: '#fff', marginTop: 20, marginLeft:7 }}> Enjoy unparalleled access and exclusive benefits,</Text>
         <Text style={{ fontSize: 14, color: '#fff',marginLeft:7  }}> with a Silver membership plan.</Text>
        <Image source={require('../../assets/images/member_silver.png')}
           style={{ position: 'absolute', right: -50, top: 60, width: 120, height: 120 }} />
        </View>
  
        {/* Content Section */}
              <View style={{ padding: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Perks of Silver Membership</Text>
                <Text style={{ fontSize: 15, color: '#666', marginTop: 15 }}>• Access to all Sportzon venues.</Text>
                <Text style={{ fontSize: 15, color: '#666', marginTop: 5 }}>• Get Free 15 days extension.</Text>
                <Text style={{ fontSize: 15, color: '#666', marginTop: 5 }}>• Get 5% off on all Sportzon Merchandise.</Text>
                <Text style={{ fontSize: 15, color: '#666', marginTop: 5 }}>• Recharge your Credit Wallet and enjoy 10% extra every time!</Text>
                <Text style={{ fontSize: 13, fontStyle: 'italic', color: '#666', marginTop: 20 }}>
                  * This is a one-time payment, and there will be no auto-renewal.
                </Text>
        
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#FA8231', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 100 }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Buy</Text>
                  </TouchableOpacity>
        </View>
  
        {/* Modal */}
              <Modal transparent visible={modalVisible} animationType="fade">
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <Animated.View style={{ backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, transform: [{ translateY: slideAnim }] }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Price Details</Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 16 }}>Subtotal:                                 INR 819.18</Text>
                      <Text style={{ fontSize: 16 }}>GST (18%):                             INR 179.82</Text>
                      <Text style={{ fontSize: 16 }}>Gross Amount:                      INR 999.00</Text>
                      <Text style={{ fontSize: 16 }}>Discount:                              - INR 0</Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Total:                               INR 999.00</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#FA8231', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 }}>
                      <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Pay Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10, alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, color: '#666' }}>Cancel</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </Modal>
      </ScrollView>
  );
};

export default SilverMembershipScreen;
