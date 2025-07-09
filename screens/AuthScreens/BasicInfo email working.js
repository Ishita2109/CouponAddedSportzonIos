import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BasicInfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!firstName || !mobile || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('https://sportzon.in/api/landing/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, mobile, email, password }),
      });

      const text = await response.text();
      console.log('🔹 Raw Response:', text);

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        Alert.alert('Error', 'Invalid response from server.');
        return;
      }

      console.log('🔹 Parsed Response:', data);

      if (data.code === 'duplicate') {
        Alert.alert('User Already Exists', 'This mobile number or email is already registered. Try logging in.');
        return;
      }

      if (data.code === 'created') {
        console.log('✅ Registration Success. Redirecting to Home Page...');
        Alert.alert('Success', 'Registration completed successfully!', [
          { text: 'OK', onPress: () => navigation.replace('Main') },
        ]);
      } else {
        console.error('❌ Registration Failed:', data);
        Alert.alert('Registration Failed', data.message || 'Unknown error. Please try again.');
      }
    } catch (error) {
      console.error('❌ API Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5, marginTop: 20, color: '#063970' }}>
        Complete your profile
      </Text>
      <Text style={{ fontSize: 16, color: '#777' }}>Tell us about yourself to unlock the game! 👋</Text>

      <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 5 }}>
          First Name <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput style={{ height: 45, borderWidth: 2, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10 }} value={firstName} onChangeText={setFirstName} />

        <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 15, marginBottom: 5 }}>Last Name</Text>
        <TextInput style={{ height: 45, borderWidth: 2, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10 }} value={lastName} onChangeText={setLastName} />

        <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 15, marginBottom: 5 }}>
          Mobile Number <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput style={{ height: 45, borderWidth: 2, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10 }} keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />

        <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 15, marginBottom: 5 }}>
          Email ID <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput style={{ height: 45, borderWidth: 2, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10 }} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

        <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 15, marginBottom: 5 }}>
          Password <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput style={{ height: 45, borderWidth: 2, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10 }} secureTextEntry value={password} onChangeText={setPassword} />
      </View>

      <TouchableOpacity style={{ marginTop: 30, backgroundColor: '#063970', padding: 15, borderRadius: 40, alignItems: 'center' }} onPress={handleSubmit}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicInfoScreen;
