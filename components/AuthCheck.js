import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SessionManager from '../utils/sessionManager';

const AuthCheck = {
  async checkAuth(action) {
    try {
      const isGuest = await SessionManager.isGuestMode();
      const requiresAuth = await SessionManager.requiresAuth(action);

      if (isGuest && requiresAuth) {
        return new Promise((resolve) => {
          Alert.alert(
            'Authentication Required',
            'Please sign in or create an account to continue.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => resolve(false)
              },
              {
                text: 'Sign In',
                onPress: () => {
                  const navigation = useNavigation();
                  navigation.navigate('LoginModal');
                  resolve(false);
                }
              },
              {
                text: 'Register',
                onPress: () => {
                  const navigation = useNavigation();
                  navigation.navigate('BasicInfo');
                  resolve(false);
                }
              }
            ]
          );
        });
      }
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }
};

export default AuthCheck; 