import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window'); // Get device dimensions

const LogoScreen = ({ navigation }) => {
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('userSession');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const currentTime = new Date().getTime();
        const sessionAge = currentTime - session.timestamp;
        
        // Check if session is less than 24 hours old
        if (session.isLoggedIn && sessionAge < 24 * 60 * 60 * 1000) {
          // Valid session exists, navigate to Main
          navigation.replace('Main');
          return;
        } else {
          // Session expired, clear it
          await AsyncStorage.removeItem('userSession');
        }
      }
      // No valid session, proceed with normal flow
      handleVideoEnd();
    } catch (error) {
      console.error('Session check error:', error);
      handleVideoEnd();
    }
  };

  const handleVideoEnd = () => {
    // Navigate to Onboarding after the video finishes
    navigation.replace('Onboarding');
  };

  return (
    <View style={styles.container}>
      <Video
      source={{ uri: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sportzonlogo.mp4' }}
       // source={require('../assets/images/sportzonlogo.mp4')} // Path to your video
        style={styles.video}
        resizeMode="contain" // Adjust as needed ('cover', 'stretch', 'contain')
        onEnd={handleVideoEnd} // Trigger navigation after video ends
        muted={false} // Play with sound
        repeat={false} // Do not repeat the video
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  video: {
    width: width, // Full screen width
    height: height, // Full screen height
  },
});

export default LogoScreen;
