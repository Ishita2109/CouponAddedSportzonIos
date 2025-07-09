import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import SessionManager from '../../utils/sessionManager';

const { width, height } = Dimensions.get('window'); // Get device dimensions

const LogoScreen = ({ navigation }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isValidSession, setIsValidSession] = useState(null); // Changed to null to track loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session immediately when component mounts
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setIsLoading(true);
      const isValid = await SessionManager.checkSession();
      setIsValidSession(isValid);
    } catch (error) {
      console.error('Session check error:', error);
      setIsValidSession(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only navigate when both video has ended and session check is complete
    if (videoEnded && !isLoading) {
      if (isValidSession) {
        navigation.replace('Main');
      } else {
        navigation.replace('Onboarding');
      }
    }
  }, [videoEnded, isValidSession, isLoading]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sportzonlogo.mp4' }}
        style={styles.video}
        resizeMode="stretch"
        onEnd={handleVideoEnd}
        muted={false}
        repeat={false}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#063970" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default LogoScreen;