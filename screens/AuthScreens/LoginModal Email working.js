import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleEmailLogin = async () => {
    console.log("Login initiated with:", email.trim(), password.trim());
  
    try {
      const response = await axios.post('https://sportzon.in/api/auth/landing/login', { 
        username: email.trim(),
        password: password.trim()
      });
  
      console.log("Login API Response:", response.data);
  
      if (response.data.code === 'authorised') {
        console.log("User authorized, verifying session...");
        verifySession();
      } else {
        console.log("Login failed:", response.data);
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      if (error.response) {
        console.log("Login API Error:", error.response.data);
        
        // 🔹 401 Unauthorized -> Navigate to BasicInfo Page
        if (error.response.status === 401) {
          console.log("New user detected, navigating to BasicInfo...");
          navigation.navigate("BasicInfo", { email }); 
          return;
        }
  
        Alert.alert("Error", error.response.data.message || "Something went wrong.");
      } else {
        console.log("Login API Network/Error:", error.message);
        Alert.alert("Error", "Network error. Try again.");
      }
    }
  };
  
  const verifySession = async () => {
    console.log("Verifying session...");
    try {
      const response = await axios.get('https://sportzon.in/api/auth/verify-session');
      console.log("Session API Response:", response.data);
  
      if (response.data.code === 'authorised') {
        console.log("User is verified, navigating to Main screen.");
        navigation.navigate('Main');
      } else {
        console.log("User not verified, navigating to BasicInfo.");
        navigation.navigate('BasicInfo');
      }
    } catch (error) {
      console.error("Session API Error:", error);
      Alert.alert('Error', 'Session verification failed. Try again.');
    }
  };
  

  return (
    <ScrollView>
      <Modal visible={visible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '65%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black', marginBottom: 30 }}>
              You're Almost There!
            </Text>
            {isEmailLogin ? (
              <>
                <Text style={{ marginTop: 10, fontSize: 17 }}> Email ID</Text>
                <TextInput 
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 7, marginBottom: 20, fontSize: 18 }} 
                  placeholder="Enter Email" 
                  value={email} 
                  onChangeText={setEmail} 
                />
                <Text style={{ marginTop: 10, fontSize: 17 }}> Password</Text>
                <TextInput 
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 5, marginBottom: 10, fontSize: 18 }} 
                  placeholder="Enter Password" 
                  secureTextEntry 
                  value={password} 
                  onChangeText={setPassword} 
                />
                <TouchableOpacity 
                  style={{ backgroundColor: '#063970', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 15 }} 
                  onPress={handleEmailLogin}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>CONTINUE</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ marginTop: 10, fontSize: 17 }}>Enter Mobile Number</Text>
                <TextInput 
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 5, fontSize: 18 }} 
                  placeholder="Enter Mobile Number" 
                  keyboardType="phone-pad" 
                  value={mobile} 
                  onChangeText={setMobile} 
                />
              </>
            )}
              
              
            <Text style={{textAlign:'center', marginTop:25}}>By signing up, you agree to the Terms and Conditions</Text>
                      <Text style={{textAlign:'center', marginTop:15}}>OR</Text>
                      
            <TouchableOpacity onPress={() => setIsEmailLogin(!isEmailLogin)}>
              <Text style={{ textAlign: 'center', marginTop: 20, color: 'black', fontSize: 14 }}>
                {isEmailLogin ? 'Login with Mobile Number' : 'Login with Email ID'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LoginModal;
