import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import BookScreen from '../screens/BookScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HelpSupport from '../screens/ProfileSection/HelpSupport';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../screens/AuthScreens/OnboardingScreen';
import LogoScreen from '../screens/AuthScreens/LogoScreen';
import { TouchableWithoutFeedback } from 'react-native';
import Classes from '../screens/Classes/Classes';
import GearUp from '../screens/GearUp'
import VenueDetails from '../screens/Venue/VenueDetails';
import EventDetails from '../screens/Events/EventDetails';
import ClassesDetails from '../screens/Classes/ClassesDetails';
import Membership from '../screens/Membership/Membership';

import TrustedPartners from '../screens/ProfileSection/TrustedPartners';
import TnC from '../screens/ProfileSection/TnC';
import RefundPolicy from '../screens/ProfileSection/RefundPolicy';
import CancellationPolicy from '../screens/ProfileSection/CancellationPolicy';
import AboutUs from '../screens/ProfileSection/AboutUs';
import MemCorporateScreen from '../screens/Membership/MemCorporateScreen';
import MemPlatScreen from '../screens/Membership/MemPlatScreen';
import MemGoldScreen from '../screens/Membership/MemGoldScreen';
import MemSilverScreen from '../screens/Membership/MemSilverScreen';
//import VenueBooking from '../components/VenueBooking';

import LoginModal from '../screens/AuthScreens/LoginModal';
import BasicInfo from '../screens/AuthScreens/BasicInfo';
import EventRegistrationForm from '../screens/Events/EventRegistrationForm';
import CricketBookingForm from '../screens/Venue/bookings';
import  ClassRegistration from '../screens/Classes/ClassBook';


import MyBookings from '../screens/MyBookings';
import MyBookingsDetails from '../screens/MyBookingsDetails';
import VenueBookings from '../screens/Venue/VenueBookings';
import SessionManager from '../utils/sessionManager';
import TransactionHistory from '../screens/TransactionHistory';
import SportDetailsScreen from '../screens/SportDetailsScreen';
import SupportCareScreen from '../screens/SupportCareScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    
    function BottomTabs(){
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: 60,
                        paddingBottom: 5,
                        paddingTop: 1,
                        backgroundColor: 'white',
                        borderTopWidth: 1,
                        borderTopColor: '#E0E0E0',
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginTop: 4,
                    },
                    tabBarIconStyle: {
                        marginTop: 4,
                    }
                }} 
                >
            
            <Tab.Screen 
            name="HOME" component={HomeScreen} options={{
            tabBarActiveTintColor: '#063970',
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#063970' : '#989898', fontSize: 12 }}>HOME</Text>
            ),
             tabBarIcon: ({focused}) =>
              focused ? (<Ionicons name="home-outline" size={24} color="#063970" />) : 
            (<Ionicons name="home-outline" size={24} color="#989898" />),
          }} />

          <Tab.Screen 
            name="PLAY" component={PlayScreen} options={{
            tabBarActiveTintColor: '#063970',
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#063970' : '#989898' }}>PLAY</Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="people-outline" size={24} color="#063970" />
              ) : (
                <Ionicons name="people-outline" size={24} color="#989898" />
              ),
          }} />

          <Tab.Screen 
            name="BOOK" component={BookScreen} options={{
            tabBarActiveTintColor: '#063970',
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#063970' : '#989898' }}>BOOK</Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="calendar-outline" size={24} color="#063970" />
              ) : (
                <Ionicons name="calendar-outline" size={24} color="#989898" />
              ),
          }} />

         <Tab.Screen 
            name="PROFILE" component={ProfileStack} options={{
            tabBarActiveTintColor: '#063970',
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#063970' : '#989898' }}>PROFILE</Text>
            ),
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person-outline" size={24} color="#063970" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#989898" />
              ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'PROFILE',
                    state: {
                      routes: [{ name: 'ProfileMain' }],
                    },
                  },
                ],
              });
            },
          })}
        />
 
           </Tab.Navigator>

        )
    }

    const AuthStack = () => {
        return (
          <Stack.Navigator>          
          </Stack.Navigator>
        )
    }

     function ProfileStack() {
      const Stack = createNativeStackNavigator();
      return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="ProfileMain" component={ProfileScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupport} options={{ headerShown: false }} />
          <Stack.Screen name="TnC" component={TnC} options={{ headerShown: false }}  />
          <Stack.Screen name="TrustedPartners" component={TrustedPartners} options={{ headerShown: false }} />
          <Stack.Screen name="RefundPolicy" component={RefundPolicy} options={{ headerShown: false }} />
          <Stack.Screen name="CancellationPolicy" component={CancellationPolicy} options={{ headerShown: false }}/>
          <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
          <Stack.Screen name="PlayScreen" component={PlayScreen} options={{headerShown: false}} />
          <Stack.Screen name="MyBookings" component={MyBookings} options={{headerShown:false}} />
          <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{headerShown:false}} />
          <Stack.Screen name="SupportCareScreen" component={SupportCareScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      );
    } 
    

    function MainStack() { //Adding screens in what manner they'll come
        return (
          <Stack.Navigator >
           
            <Stack.Screen name="Splash"  component={LogoScreen}  options={{ headerShown: false }}/> 
           <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown: false}}   /> 
           <Stack.Screen name="LoginModal" component={LoginModal} options={{headerShown:false}} /> 
            <Stack.Screen name="Main"  component={BottomTabs}  options={{headerShown: false}}   />
            <Stack.Screen  name="PlayScreen"  component={PlayScreen} options={{headerShown: false}}  />
            <Stack.Screen  name="BookScreen"  component={BookScreen} options={{headerShown: false}}  />
            <Stack.Screen name="VenueDetails" component={VenueDetails} options={{headerShown:false}} />
            <Stack.Screen name="Classes" component={Classes} options={{headerShown:false}} />
            <Stack.Screen name="GearUp" component={GearUp} options={{headerShown:false}} />
          
            <Stack.Screen name="EventDetails" component={EventDetails} options={{headerShown:false}} />
            <Stack.Screen name="EventRegistrationForm" component={EventRegistrationForm} options={{headerShown:false}} />
            <Stack.Screen name="ClassesDetails" component={ClassesDetails} options={{headerShown:false}} />  
            
            <Stack.Screen name="BasicInfo" component={BasicInfo} options={{headerShown:false}} /> 
            <Stack.Screen name="bookings" component={CricketBookingForm} options={{headerShown:false}} /> 
            <Stack.Screen name="ClassBook" component={ClassRegistration} options={{headerShown:false}} />
           
            <Stack.Screen name="MyBookingsDetails" component={MyBookingsDetails} options={{headerShown:false}} /> 
            <Stack.Screen name="VenueBookings" component={VenueBookings} options={{headerShown:false}} /> 
            <Stack.Screen name='SessionManager' component={SessionManager} options={{headerShown:false}} />
            <Stack.Screen name="Membership" component={Membership} options={{headerShown:false}} />
             <Stack.Screen name="MemCorporateScreen" component={MemCorporateScreen} options={{headerShown:false}} />
            <Stack.Screen name="MemGoldScreen" component={MemGoldScreen} options={{headerShown:false}} />
            <Stack.Screen name="MemPlatScreen" component={MemPlatScreen} options={{headerShown:false}} />
            <Stack.Screen name="MemSilverScreen" component={MemSilverScreen} options={{headerShown:false}} />
            <Stack.Screen name="SportDetailsScreen" component={SportDetailsScreen} options={{headerShown:false}} />
            <Stack.Screen name="TrustedPartners" component={TrustedPartners} options={{headerShown:false}} />
        </Stack.Navigator>
        )
    }

  return (
    <SafeAreaView style={{flex:1}}>

    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
    </SafeAreaView>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})