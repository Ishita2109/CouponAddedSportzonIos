import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionManager from '../utils/sessionManager';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

import React, { useLayoutEffect, useState, useCallback } from 'react';
import {Image,StyleSheet,Text,View,ScrollView,Linking,Pressable,Dimensions,useWindowDimensions, ImageBackground,TouchableOpacity, 
  FlatList, Alert} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const scale = size => width / guidelineBaseWidth * size;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const { width, height } = useWindowDimensions();
  const [userName, setUserName] = useState('');

  useFocusEffect(
    useCallback(() => {
      const getUserName = async () => {
        try {
          const storedName = await AsyncStorage.getItem('userName');
          console.log('🟢 Retrieved User Name:', storedName);
          setUserName(storedName && storedName !== 'undefined' ? storedName : 'Guest');
        } catch (error) {
          console.log('Error fetching user name:', error);
        }
      };
      getUserName();
    }, [])
  );

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-start',
            paddingLeft: 16, 
          }}>
            <Image
              source={{ uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sportzonlogoo.png" }}
              style={{
                width: width * 0.09,
                height: width * 0.09,
                marginRight: 9,
              }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: width * 0.06, fontWeight: '500', color: '#063970' }}>
              {userName ? userName : 'Guest'}
            </Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: 'white',
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: height * 0.11,
        },
       
      });
    }, [navigation, width, height, userName]);
    
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              // Clear session using SessionManager
              const sessionCleared = await SessionManager.clearSession();
              
              if (!sessionCleared) {
                throw new Error('Failed to clear session');
              }
              
              // Force a small delay to ensure all storage operations complete
              await new Promise(resolve => setTimeout(resolve, 100));
              
              // Verify cleanup
              const remainingKeys = await AsyncStorage.getAllKeys();
              const sessionKeys = remainingKeys.filter(key => 
                key.includes('session') || 
                key.includes('user') || 
                key.includes('auth')
              );
              
              if (sessionKeys.length > 0) {
                console.warn('Some session data remains after logout:', sessionKeys);
                // Try to clear remaining keys
                await AsyncStorage.multiRemove(sessionKeys);
              }
              
              // Reset navigation stack
              navigation.reset({
                index: 0,
                routes: [{ name: 'Onboarding' }],
              });
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <ScrollView  keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{padding: 12, marginTop:7}}>
          <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>          
            
             {/* My Bookings */}
           <Pressable onPress={()=> navigation.navigate('PlayScreen', { tab: 'venues' })}>
            <View style={{flexDirection:'row',alignItems:'center', gap:10}}>
              <View style={{width: 44,height: 44,borderRadius: 30,backgroundColor: '#E8E8E8',justifyContent: 'center', alignItems: 'center', }}>
              <Ionicons name="calendar-outline" size={24} color={'#001F3F'} />
              </View>
            <View style={{}}>
              <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> My Bookings </Text>
              <Text style={{fontSize: 13, marginTop: 7, color: 'gray'}}> View and manage your reservations</Text>
            </View>
           </View>
           </Pressable>

           {/* Divider */}
           <View style={{height: 1, borderColor: '#E0E0E0',borderWidth: 0.5, marginTop: 15, }} />   

           {/* Membership */}
            <Pressable onPress={() => { console.log("Membership clicked");
                          navigation.navigate("Membership");}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15,backgroundColor: 'white', flex: 1 }}>
              <View
                style={{width: 44, height: 44,borderRadius: 24,backgroundColor: '#E8E8E8',justifyContent: 'center', alignItems: 'center',}}>
                <Ionicons name="bookmarks-outline" size={24} color={'#001F3F'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> My Membership</Text>
                <Text style={{fontSize: 13, marginTop: 7, color: 'gray'}}> Track your membership details and benefits</Text>
              </View>
            </View>
            </Pressable>
            {/* Divider */}
            <View style={{height: 1,borderColor: '#E0E0E0',borderWidth: 0.5,marginTop: 15,}} />        

            {/* Transacion*/}
            
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15,}}>
              <View
                style={{width: 44, height: 44,borderRadius: 24,backgroundColor: '#E8E8E8',justifyContent: 'center', alignItems: 'center',}}>
                <Ionicons name="receipt-outline"  size={24} color={'#001F3F'} />
                
              </View>
              
              <View style={{}}>
              <Pressable onPress={() => navigation.navigate('TransactionHistory')}>
                <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> Transaction History</Text>
                <Text style={{fontSize: 13, marginTop: 7, color: 'gray'}}> Review your payment and transaction records</Text>
              </Pressable>
              </View>
            </View>
            
            {/* Divider */}
            <View style={{height: scale(1),borderColor: '#E0E0E0',borderWidth: 0.5,marginTop: scale(15),}} />

            {/* Support Care (inlined, like other sections) */}
            <Pressable onPress={() => navigation.navigate('SupportCareScreen')}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: scale(10), marginTop: scale(15)}}>
                <View style={{width: scale(44), height: scale(44), borderRadius: scale(24), backgroundColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name="chatbubble-ellipses-outline" size={scale(24)} color={'#001F3F'} />
                </View>
                <View>
                  <Text style={{fontSize: scale(16), fontWeight: '500', color:'#001F3F'}}>Help & Support </Text>
                  <Text style={{fontSize: scale(13), marginTop: scale(7), color: 'gray',marginBottom:10}}>Chat with our virtual assistant</Text>
                </View>
              </View>
            </Pressable>
              

          </View>
        </View>
        
         {/*SET 2 */}

        <View style={{padding: 12, marginTop:0}}>
          <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
          <Pressable onPress={() => navigation.navigate('TnC')}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{width: 44,height: 44,borderRadius: 24, backgroundColor: '#E8E8E8',justifyContent: 'center',alignItems: 'center',      }}>
                <Ionicons name="checkmark-done-outline" size={24} color={'#001F3F'} />
              </View>
              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> Terms and Conditions</Text>
              </View>
            </View>
            </Pressable>
            <View style={{ height: 1, borderColor: '#E0E0E0', borderWidth: 0.5,marginTop: 15,}} />

           
            <Pressable onPress={() => navigation.navigate('TrustedPartners')}>
            <View style={{flexDirection: 'row', alignItems: 'center',gap: 10,marginVertical: 15,}}>
              <View
                style={{
                  width: 44,height: 44, borderRadius: 24,backgroundColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center', }}>
                <Ionicons name="people-outline" size={24} color={'#001F3F'} />
              </View>
              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> Our Trusted Partners</Text>
              </View>
            </View>
            </Pressable>
            <View style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5}} />

            <Pressable onPress={() => navigation.navigate('RefundPolicy')}>
            <View
              style={{flexDirection: 'row', alignItems: 'center',gap: 10,marginVertical: 15,}}>
              <View
                style={{
                  width: 44,height: 44, borderRadius: 24,backgroundColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center', }}>
                <Ionicons name="refresh-circle-outline" size={24} color={'#001F3F'} />
              </View>
              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> Refund Policy</Text>
              </View>
            </View>
            </Pressable>
            <View style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5}} />

            <Pressable onPress={() => navigation.navigate('CancellationPolicy')}>
            <View style={{flexDirection: 'row', alignItems: 'center',gap: 10,marginVertical: 15,}}>
              <View style={{width: 44,height: 44, borderRadius: 24,backgroundColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center', }}>
                <Ionicons name="people-outline" size={24} color={'#001F3F'} />
              </View>
              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> Cancellation Policy</Text>
              </View>
            </View>
            </Pressable>
            <View style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5}} />

            <Pressable onPress={() => navigation.navigate('AboutUs')}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, }}>
              <View style={{width: 44, height: 44, borderRadius: 24, backgroundColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="book" size={24} color={'#001F3F'} />
              </View>
              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}> About Us </Text>
              </View>
              </View> 
  
              </Pressable>

               {/* Divider */}
            <View style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5, marginTop: 15, marginBottom: 10}} />

{/* Logout Section */}
<Pressable onPress={handleLogout}>
  <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15, marginBottom: 10}}>
    <View style={{width: 44, height: 44, borderRadius: 24, backgroundColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons name="log-out-outline" size={24} color={'#001F3F'} />
    </View>

    <View>
      <Text style={{fontSize: 16, fontWeight: '500', color:'#001F3F'}}>Logout</Text>
      <Text style={{fontSize: 13, marginTop: 7, color: 'gray'}}>Sign out of your account</Text>
    </View>
  </View>
</Pressable>           
{/* Divider */}
<View style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5, marginTop: 15, marginBottom: 10}} />

{/* Delete Account Section */}
<Pressable onPress={() => {
  Alert.alert(
    "Delete Account",
    "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            // Clear all user data
            const sessionCleared = await SessionManager.clearSession();
            
            if (!sessionCleared) {
              throw new Error('Failed to clear session');
            }
            
            // Show success message
            Alert.alert(
              "Account Deleted",
              "Your account has been successfully deleted.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    // Reset navigation stack and go to onboarding
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Onboarding' }],
                    });
                  }
                }
              ]
            );
          } catch (error) {
            console.error('Delete account error:', error);
            Alert.alert('Error', 'Failed to delete account. Please try again.');
          }
        }
      }
    ]
  );
}}>
  <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15, marginBottom: 10}}>
    <View style={{width: 44, height: 44, borderRadius: 24, backgroundColor: '#FFE5E5', justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons name="trash-outline" size={24} color={'#FF0000'} />
    </View>

    <View>
      <Text style={{fontSize: 16, fontWeight: '500', color:'#FF0000'}}>Delete Account</Text>
      <Text style={{fontSize: 13, marginTop: 7, color: 'gray'}}>Permanently delete your account and all data</Text>
    </View>
  </View>
</Pressable>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});