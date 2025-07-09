import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Alert,
  SafeAreaView,Image,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Icon from 'react-native-vector-icons/Ionicons';

const GoldMembershipScreen = ({route}) => {
  const {planDetails} = route.params;
  console.log('planDetails:', planDetails);

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const initiatePayment = async () => {
    console.log('Initiating payment');
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_live_gk7iMvPaNzkvr2',
      amount: planDetails?.price * 100,
      name: planDetails?.planName,
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#FA8231'},
      order_id: '',
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('razorpay', data);
        setModalVisible(false);
      })
      .catch(error => {
        alert(`Error: ${error.code} | ${error.description}`);
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={{ backgroundColor: '#CD853F', height:250, padding: 20,  position: 'relative' }}>
          <Text style={{ fontSize: 29, fontWeight: "bold", color: "white",marginTop: 20, marginLeft:7 }}>Gold</Text>
          <Text style={{ fontSize: 29,  color: "white", marginLeft:7}}>Membership </Text>
          <Text style={{ fontSize: 29,  color: "white" ,marginLeft:7}}>Plans</Text>
          <Text style={{ fontSize: 14, color: '#fff', marginTop: 20, marginLeft:7 }}> Enjoy unparalleled access and exclusive benefits,</Text>
          <Text style={{ fontSize: 14, color: '#fff', marginLeft:7  }}> with a Gold membership plan.</Text>
          <Image source={require('../../assets/images/member_gold.png')}
         style={{ position: 'absolute', right: -50, top: 60, width: 120, height: 120 }} />
      </View>

        {/* Content Section */}
        <View style={{padding: 20}}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 20,
          }}>Perks of Gold Membership</Text>
          
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            padding: 20,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
              <Icon name="location" size={24} color="#FA8231" style={{marginRight: 15}} />
              <Text style={{fontSize: 16, color: '#666', flex: 1}}>Access to all Sportzon venues</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
              <Icon name="calendar" size={24} color="#FA8231" style={{marginRight: 15}} />
              <Text style={{fontSize: 16, color: '#666', flex: 1}}>Get Free 30 days extension</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
              <Icon name="shirt" size={24} color="#FA8231" style={{marginRight: 15}} />
              <Text style={{fontSize: 16, color: '#666', flex: 1}}>Get 10% off on all Sportzon Merchandise</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
              <Icon name="wallet" size={24} color="#FA8231" style={{marginRight: 15}} />
              <Text style={{fontSize: 16, color: '#666', flex: 1}}>Recharge your Credit Wallet and enjoy 10% extra every time!</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
              <Icon name="gift" size={24} color="#FA8231" style={{marginRight: 15}} />
              <Text style={{fontSize: 16, color: '#666', flex: 1}}>Get premium goodies and gift vouchers that match the value of Gold Plan</Text>
            </View>
          </View>

          <Text style={{
            fontSize: 14,
            color: '#666',
            fontStyle: 'italic',
            marginTop: 20,
            textAlign: 'center',
          }}>
            * This is a one-time payment, and there will be no auto-renewal.
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: '#FA8231',
              padding: 18,
              borderRadius: 30,
              alignItems: 'center',
              marginTop: 30,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
            <Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: 'bold'}}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Modal */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
            <Animated.View
              style={[{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                padding: 25,
              }, {transform: [{translateY: slideAnim}]}]}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#333',
                }}>Price Details</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{padding: 5}}>
                  <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={{fontSize: 16, color: '#666'}}>Subtotal</Text>
                  <Text style={{fontSize: 16, color: '#424242', fontWeight: '500'}}>INR 1229.18</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={{fontSize: 16, color: '#666'}}>GST (18%)</Text>
                  <Text style={{fontSize: 16, color: '#424242', fontWeight: '500'}}>INR 269.82</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={{fontSize: 16, color: '#666'}}>Gross Amount</Text>
                  <Text style={{fontSize: 16, color: '#424242', fontWeight: '500'}}>INR 1499.00</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text style={{fontSize: 16, color: '#666'}}>Discount</Text>
                  <Text style={{fontSize: 16, color: '#424242', fontWeight: '500'}}>- INR 0</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  paddingTop: 15,
                  borderTopWidth: 1,
                  borderTopColor: '#E0E0E0',
                }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#333'}}>Total</Text>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#333'}}>INR 1499.00</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={initiatePayment}
                style={{
                  backgroundColor: '#FA8231',
                  padding: 18,
                  borderRadius: 15,
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: 'bold'}}>Pay Now</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoldMembershipScreen;
