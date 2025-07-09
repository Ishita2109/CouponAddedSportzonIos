import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SESSION_KEY = 'userSession';
const SESSION_EXPIRY_DAYS = 30;
const SESSION_REFRESH_THRESHOLD_DAYS = 5;

class SessionManager {
  // Create new session
  static async createSession(userData) {
    try {
      // Clear any existing session first
      await this.clearSession();
      if (!userData._id) throw new Error('Missing user _id during session creation');

      const currentTime = new Date().getTime();
      const sessionData = {
        isLoggedIn: true,
        timestamp: currentTime,
        expiryDate: currentTime + (SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
        lastActivity: currentTime,
        
        userData: {
          
          _id: userData._id,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          mobile: userData.mobile || ''
        }
      };

      console.log('Creating new session with data:', sessionData);
      
      // Store session data
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      // Also store a backup copy
      await AsyncStorage.setItem(`${SESSION_KEY}_backup`, JSON.stringify(sessionData));

      // Verify the session was stored correctly
      const storedSession = await AsyncStorage.getItem(SESSION_KEY);
      if (!storedSession) {
        throw new Error('Failed to store session');
      }

      return true;
    } catch (error) {
      console.error('Session creation error:', error);
      return false;
    }
  }

  // Check if session exists and is valid
  static async checkSession() {
    try {
      // First try to get the main session
      let sessionData = await AsyncStorage.getItem(SESSION_KEY);
      
      // If main session is not found, try backup
      if (!sessionData) {
        console.log('Main session not found, trying backup...');
        sessionData = await AsyncStorage.getItem(`${SESSION_KEY}_backup`);
        if (sessionData) {
          console.log('Found backup session, restoring...');
          // Restore from backup
          await AsyncStorage.setItem(SESSION_KEY, sessionData);
        }
      }

      if (!sessionData) {
        console.log('No session found in both main and backup');
        return false;
      }

      const session = JSON.parse(sessionData);
      const currentTime = new Date().getTime();

      // Check if session is expired
      if (currentTime > session.expiryDate) {
        console.log('Session expired, attempting refresh...');
        // Try to refresh before clearing
        const refreshed = await this.refreshSession();
        if (!refreshed) {
          console.log('Session refresh failed, clearing session');
        await this.clearSession();
        return false;
        }
        return true;
      }

      // Verify session with backend
      try {
        console.log('Verifying session with backend...');
        const response = await axios.get('https://sportzon.in/api/auth/verify-session', {
          headers: {
            'Authorization': `Bearer ${session.timestamp}`,
            'X-Session-Expiry': session.expiryDate,
            'X-Last-Activity': session.lastActivity
          }
        });
        
        if (response?.data?.code === 'unauthorised') {
          console.warn('Backend session expired. Attempting refresh...');
          const refreshed = await this.refreshSession();
          if (!refreshed) {
            console.warn('Session refresh failed. Clearing session.');
          await this.clearSession();
          return false;
          }
          return true;
        }

        // Update last activity
        session.lastActivity = currentTime;
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
        await AsyncStorage.setItem(`${SESSION_KEY}_backup`, JSON.stringify(session));

        // Refresh if close to expiry
        if (currentTime > (session.expiryDate - (SESSION_REFRESH_THRESHOLD_DAYS * 24 * 60 * 60 * 1000))) {
          console.log('Session close to expiry, refreshing...');
          await this.refreshSession();
        }

        return true;
      } catch (error) {
        console.error('Backend session verification error:', error);
        // If backend verification fails, try to refresh the session
        const refreshed = await this.refreshSession();
        if (!refreshed) {
          // If refresh fails, still allow the session if it's not expired
        return currentTime <= session.expiryDate;
        }
        return true;
      }
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  }

  // Clear session
  static async clearSession() {
    try {
      // Get all keys first
      const allKeys = await AsyncStorage.getAllKeys();
      
      // Clear all session-related data
      await AsyncStorage.multiRemove([
        SESSION_KEY,
        `${SESSION_KEY}_backup`,
        'userName',
        'userName_backup',
        'offlineData',
        'bookings',
        'transactions',
        'cart',
        'sessionVersion',
        'userSession',
        'userData',
        'authToken',
        'isLoggedIn',
        'last_booking_id',
        'last_payment_id'
      ]);
      
      // Force a small delay to ensure all storage operations complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Get remaining keys
      const remainingKeys = await AsyncStorage.getAllKeys();
      
      // Find any keys that might contain user or session data
      const sessionKeys = remainingKeys.filter(key => 
        key.includes('session') || 
        key.includes('user') || 
        key.includes('auth') ||
        key.includes('booking') ||
        key.includes('payment') ||
        key.includes('transaction')
      );
      
      if (sessionKeys.length > 0) {
        console.warn('Clearing additional session data:', sessionKeys);
        await AsyncStorage.multiRemove(sessionKeys);
      }
      
      // Clear any cached API responses
      try {
        await axios.get('https://sportzon.in/api/auth/clear-cache');
      } catch (error) {
        console.warn('Failed to clear API cache:', error);
      }
      
      return true;
    } catch (error) {
      console.error('Session clear error:', error);
      return false;
    }
  }

  // Refresh session
  static async refreshSession() {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_KEY);
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      const currentTime = new Date().getTime();

      // Verify with backend first
      try {
        const response = await axios.get('https://sportzon.in/api/auth/verify-session', {
          headers: {
            'Authorization': `Bearer ${session.timestamp}`,
            'X-Session-Expiry': session.expiryDate,
            'X-Last-Activity': session.lastActivity
          }
        });

        if (response?.data?.code === 'unauthorised') {
          console.warn('Backend session verification failed during refresh');
          await this.clearSession();
          return false;
        }

      // Extend session expiry
      session.expiryDate = currentTime + (SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      session.lastActivity = currentTime;

        // Update both main and backup storage
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
        await AsyncStorage.setItem(`${SESSION_KEY}_backup`, JSON.stringify(session));

        console.log('Session refreshed successfully');
        return true;
      } catch (error) {
        console.error('Backend verification failed during refresh:', error);
        // If backend verification fails, still try to refresh locally
        session.expiryDate = currentTime + (SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        session.lastActivity = currentTime;
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
      await AsyncStorage.setItem(`${SESSION_KEY}_backup`, JSON.stringify(session));
      return true;
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      return false;
    }
  }

  // Store user name separately
  static async storeUserName(firstName, lastName) {
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await AsyncStorage.setItem('userName', fullName);
      await AsyncStorage.setItem('userName_backup', fullName);
      return true;
    } catch (error) {
      console.error('Store user name error:', error);
      return false;
    }
  }

  // Get current session data
  static async getSessionData() {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Get session data error:', error);
      return null;
    }
  }

  // Update session activity
  static async updateActivity() {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_KEY);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        session.lastActivity = new Date().getTime();
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
    } catch (error) {
      console.error('Update activity error:', error);
    }
  }

  // Check if session is expired
  static async isSessionExpired() {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_KEY);
      if (!sessionData) return true;

      const session = JSON.parse(sessionData);
      return new Date().getTime() > session.expiryDate;
    } catch (error) {
      console.error('Session expiry check error:', error);
      return true;
    }
  }

  // Store offline data
  static async storeOfflineData(data) {
    try {
      await AsyncStorage.setItem('offlineData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Offline data storage error:', error);
      return false;
    }
  }

  // Get offline data
  static async getOfflineData() {
    try {
      const data = await AsyncStorage.getItem('offlineData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Get offline data error:', error);
      return null;
    }
  }

  // Create guest session
  static async createGuestSession() {
    try {
      await this.clearSession();
      const currentTime = new Date().getTime();
      const sessionData = {
        isLoggedIn: false,
        isGuest: true,
        timestamp: currentTime,
        expiryDate: currentTime + (SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
        lastActivity: currentTime,
        userData: {
          _id: `guest_${currentTime}`,
          firstName: 'Guest',
          lastName: 'User',
          email: '',
          mobile: ''
        }
      };

      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      await AsyncStorage.setItem(`${SESSION_KEY}_backup`, JSON.stringify(sessionData));
      return true;
    } catch (error) {
      console.error('Guest session creation error:', error);
      return false;
    }
  }

  // Check if current session is guest mode
  static async isGuestMode() {
    try {
      const sessionData = await this.getSessionData();
      return sessionData?.isGuest === true;
    } catch (error) {
      console.error('Guest mode check error:', error);
      return false;
    }
  }

  // Convert guest session to registered user session
  static async convertGuestToUser(userData) {
    try {
      const currentSession = await this.getSessionData();
      if (!currentSession?.isGuest) {
        throw new Error('Current session is not a guest session');
      }

      // Preserve any guest data that needs to be transferred
      const guestData = await this.getOfflineData();
      
      // Create new registered user session
      const success = await this.createSession(userData);
      if (!success) {
        throw new Error('Failed to create user session');
      }

      // Restore guest data if needed
      if (guestData) {
        await this.storeOfflineData(guestData);
      }

      return true;
    } catch (error) {
      console.error('Guest to user conversion error:', error);
      return false;
    }
  }

  // Check if action requires authentication
  static async requiresAuth(action) {
    const authRequiredActions = [
      'book_venue',
      'book_class',
      'purchase_membership',
      'make_payment',
      'save_preferences'
    ];
    return authRequiredActions.includes(action);
  }
}

export default SessionManager; 