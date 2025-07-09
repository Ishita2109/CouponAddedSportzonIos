import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Modal, Dimensions, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { validateEmail, validateMobileNumber, getErrorMessage } from '../../utils/validation';
import SessionManager from '../../utils/sessionManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginModal = ({  onClose }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [resetFormData, setResetFormData] = useState({
    mobile: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  const [resetErrors, setResetErrors] = useState({
    mobile: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [field]: '', general: '' }));
  };

  const validateEmailLogin = () => {
    console.log('✅ Validating email login...');
    return true;
  };
  
  const handleEmailLogin = async () => {
    if (!validateEmailLogin()) return;

    // Clear previous errors
    setErrors({
      email: '',
      password: '',
      general: ''
    });

    setIsLoading(true);
    try {
      const response = await axios.post('https://sportzon.in/api/auth/landing/login', {
        username: formData.email.trim(),
        password: formData.password.trim()
      });

      if (response.data.code === 'authorised') {
        // Verify session to get user data
        try {
          const sessionResponse = await axios.get('https://sportzon.in/api/auth/verify-session');
          console.log('✅ Session Verification Response:', sessionResponse.data);

          if (sessionResponse.data.code === 'authorised' && sessionResponse.data.data) {
            const userData = sessionResponse.data.data;
            console.log('✅ User Data from Session:', userData);
            
            // Clear any existing session before creating new one
            await SessionManager.clearSession();
            console.log('✅ Old session cleared');

            // Create new session using SessionManager only
            const success = await SessionManager.createSession({
              _id: userData._id,
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              email: formData.email.trim(),
              mobile: userData.mobile || ''
            });

            if (success) {
              console.log('✅ New session created successfully');
              
              // Store user name using SessionManager
              await SessionManager.storeUserName(userData.firstName || '', userData.lastName || '');
              console.log('✅ User name stored');

              // Reset navigation stack and go to Main
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            } else {
              console.log('❌ Failed to create session');
              setErrors(prev => ({ ...prev, general: 'Failed to create session. Please try again.' }));
            }
          } else {
            console.log('❌ Session verification failed');
            setErrors(prev => ({ ...prev, general: 'Failed to verify session. Please try again.' }));
          }
        } catch (sessionError) {
          console.error('❌ Session verification error:', sessionError);
          setErrors(prev => ({ ...prev, general: 'Failed to verify session. Please try again.' }));
        }
      } else {
        // Handle specific error cases
        if (response.data.message) {
          if (response.data.message.toLowerCase().includes('email') || 
              response.data.message.toLowerCase().includes('username')) {
            setErrors(prev => ({ ...prev, email: 'Email ID not found. Please check your email.' }));
          } else if (response.data.message.toLowerCase().includes('password')) {
            setErrors(prev => ({ ...prev, password: 'Incorrect password. Please try again.' }));
          } else {
            setErrors(prev => ({ ...prev, general: 'Invalid email or password. Please try again.' }));
          }
        } else {
          setErrors(prev => ({ ...prev, general: 'Login failed. Please try again.' }));
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        const errorMessage = error.response.data.message.toLowerCase();
        if (errorMessage.includes('email') || errorMessage.includes('username')) {
          setErrors(prev => ({ ...prev, email: 'Email ID not found. Please check your email.' }));
        } else if (errorMessage.includes('password')) {
          setErrors(prev => ({ ...prev, password: 'Incorrect password. Please try again.' }));
        } else {
          setErrors(prev => ({ ...prev, general: 'Invalid email or password. Please try again.' }));
        }
      } else {
        setErrors(prev => ({ ...prev, general: 'Something went wrong. Please try again.' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const success = await SessionManager.createGuestSession();
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        Alert.alert('Error', 'Failed to start guest session. Please try again.');
      }
    } catch (error) {
      console.error('Guest login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Debug: log modal visibility
  console.log('🔍 showResetModal:', showResetModal);

  const handleResetPassword = async () => {
    console.log('🔁 Reset Password button pressed');
    // Debug: log isResetLoading
    console.log('🔄 isResetLoading:', isResetLoading);
    // Debug: log API payload
    console.log('📦 Sending to API:', {
      mobile: parseInt(resetFormData.mobile),
      newPassword: resetFormData.newPassword
    });
    // Clear previous errors
    setResetErrors({
      mobile: '',
      newPassword: '',
      confirmPassword: '',
      general: ''
    });

    // Validate inputs
    if (!resetFormData.mobile) {
      setResetErrors(prev => ({ ...prev, mobile: 'Mobile number is required' }));
      return;
    }
    if (!resetFormData.newPassword) {
      setResetErrors(prev => ({ ...prev, newPassword: 'New password is required' }));
      return;
    }
    if (!resetFormData.confirmPassword) {
      setResetErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }));
      return;
    }
    if (resetFormData.newPassword !== resetFormData.confirmPassword) {
      setResetErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    setIsResetLoading(true);
    try {
      const response = await axios.post('https://sportzon.in/api/users/reset-password', {
        newPassword: resetFormData.newPassword,
        mobile: parseInt(resetFormData.mobile)
      });
      console.log('API response:', response.data);
      if (response.data.code === 'authorised') {
        Alert.alert('Success', 'Password has been reset successfully. Please login with your new password.');
        setShowResetModal(false);
        setResetFormData({ mobile: '', newPassword: '', confirmPassword: '' });
      } else {
        Alert.alert('Error', response.data.message || 'Failed to reset password');
        setResetErrors(prev => ({ ...prev, general: response.data.message || 'Failed to reset password' }));
      }
    } catch (error) {
      console.log('API error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
      setResetErrors(prev => ({ ...prev, general: 'Something went wrong.' }));
    } finally {
      console.log('✅ Reset complete');
      setIsResetLoading(false);
    }
  };

  const handleResetInputChange = (field, value) => {
    setResetFormData(prev => ({ ...prev, [field]: value }));
    setResetErrors(prev => ({ ...prev, [field]: '', general: '' }));
  };

  // Reset form and errors when opening reset modal
  const openResetModal = () => {
    setResetFormData({ mobile: '', newPassword: '', confirmPassword: '' });
    setResetErrors({ mobile: '', newPassword: '', confirmPassword: '', general: '' });
    setShowResetPassword(false);
    setShowResetConfirmPassword(false);
    setShowResetModal(true);
  };

  return (
    <>
      {/* Login Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={{ 
              backgroundColor: 'white', 
              padding: 25, 
              borderTopLeftRadius: 30, 
              borderTopRightRadius: 30, 
              height: '75%',
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {/* Logo and Welcome Text */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Image
                    source={{ uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sportzonlogoo.png" }}
                    style={{ width: 55, height: 55, resizeMode: 'contain', marginTop: 1 }}
                  />
                  <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#063970', marginTop: 9, textAlign: 'center' }}>
                    Welcome Back!
                  </Text>
                  <Text style={{ fontSize: 14, color: '#666', marginTop: 5, textAlign: 'center' }}>
                    Sign in to continue to your account
                  </Text>
                </View>

                {/* Form Fields */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 14, color: '#063970', marginBottom: 8, fontWeight: '500' }}>Email ID</Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      padding: 12,
                      borderRadius: 10,
                      fontSize: 16,
                      borderColor: errors.email ? 'red' : '#E0E0E0',
                      backgroundColor: '#F8F8F8'
                    }}
                    placeholder=""
                    placeholderTextColor="#999"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                  />
                  {errors.email ? <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errors.email}</Text> : null}
                </View>

                <View style={{ marginBottom: 25 }}>
                  <Text style={{ fontSize: 14, color: '#063970', marginBottom: 8, fontWeight: '500' }}>Password</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: errors.password ? 'red' : '#E0E0E0',
                    backgroundColor: '#F8F8F8'
                  }}>
                    <TextInput
                      style={{ flex: 1, padding: 12, fontSize: 16 }}
                      placeholder=""
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 12 }}>
                      <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#063970" />
                    </TouchableOpacity>
                  </View>
                  {errors.password ? <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errors.password}</Text> : null}
                  
                  {/* Forgot Password Link - temporarily hidden
                  <TouchableOpacity 
                    onPress={() => {
                      setVisible(false);
                      setTimeout(() => {
                        openResetModal();
                      }, 300);
                    }}
                    style={{ alignSelf: 'flex-end', marginTop: 8 }}
                  >
                    <Text style={{ color: '#063970', fontSize: 14, fontWeight: '500' }}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                  */}
                </View>

                {errors.general ? <Text style={{ color: 'red', fontSize: 13, marginBottom: 15, textAlign: 'center' }}>{errors.general}</Text> : null}

                <TouchableOpacity
                  style={{
                    backgroundColor: '#063970',
                    padding: 16,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginTop: 10,
                    shadowColor: "#063970",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                  }}
                  onPress={handleEmailLogin}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>CONTINUE</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 25 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5
                  }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }} />
                    <Text style={{ marginHorizontal: 10, color: '#666', fontSize: 12 }}>OR</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }} />
                  </View>

                  <TouchableOpacity onPress={() => {
                    setVisible(false);
                    navigation.navigate('BasicInfo');
                  }} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                    <Text style={{ color: '#063970', fontSize: 15, fontWeight: '600' }}>
                      New here? Let's get you started!
                    </Text>
                    <Ionicons name="football" size={20} color="#063970" style={{ marginLeft: 8, marginTop: 0, alignSelf: 'center' }} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleGuestLogin} style={{
                    marginTop: 10,
                    paddingVertical: 12,
                    alignItems: 'center'
                  }}>
                    <Text style={{ color: '#666', fontSize: 14, fontWeight: '500' }}>
                      Continue as Guest
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Reset Password Modal (Commented out temporarily)
      <Modal visible={showResetModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={{
            width: '85%',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 24,
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#063970', marginBottom: 10 }}>Reset Password</Text>
            <TextInput
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 10,
                padding: 12,
                marginBottom: 10
              }}
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              value={resetFormData.mobile}
              onChangeText={value => handleResetInputChange('mobile', value)}
              keyboardType="phone-pad"
            />
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, marginBottom: 10, backgroundColor: '#fff' }}>
              <TextInput
                style={{ flex: 1, padding: 12 }}
                placeholder="New Password"
                placeholderTextColor="#999"
                value={resetFormData.newPassword}
                onChangeText={value => handleResetInputChange('newPassword', value)}
                secureTextEntry={!showResetPassword}
              />
              <TouchableOpacity onPress={() => setShowResetPassword(v => !v)} style={{ padding: 12 }}>
                <Ionicons name={showResetPassword ? 'eye-off' : 'eye'} size={20} color="#063970" />
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, marginBottom: 10, backgroundColor: '#fff' }}>
              <TextInput
                style={{ flex: 1, padding: 12 }}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={resetFormData.confirmPassword}
                onChangeText={value => handleResetInputChange('confirmPassword', value)}
                secureTextEntry={!showResetConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowResetConfirmPassword(v => !v)} style={{ padding: 12 }}>
                <Ionicons name={showResetConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#063970" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#063970',
                padding: 14,
                borderRadius: 10,
                width: '100%',
                alignItems: 'center',
                marginBottom: 10
              }}
              onPress={handleResetPassword}
              disabled={isResetLoading}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>RESET PASSWORD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowResetModal(false);
                setTimeout(() => setVisible(true), 300);
              }}
              style={{ marginTop: 5 }}
            >
              <Text style={{ color: '#063970' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      */}
    </>
  );
};

export default LoginModal;