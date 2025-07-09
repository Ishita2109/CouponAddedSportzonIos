import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Key for Google Geocoding - Replace with your actual key
// You need to obtain a Google Maps API key from the Google Cloud Console
// with Geocoding API enabled for this feature to work
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'; // TODO: Replace with actual API key

// Helper for better logs
const LOG_PREFIX = '🌍 [LocationService]';
const log = (message, data) => {
  if (data) {
    console.log(`${LOG_PREFIX} ${message}`, data);
  } else {
    console.log(`${LOG_PREFIX} ${message}`);
  }
};

const logError = (message, error) => {
  console.error(`${LOG_PREFIX} ERROR: ${message}`, error);
};

// Log that the module is being loaded
console.log(`${LOG_PREFIX} LocationService module loading`);

class LocationService {
  // Add a method to check if location services are available
  static async isLocationAvailable() {
    log('Checking if location services are available...');
    
    // Check for platform-specific requirements
    if (Platform.OS === 'android') {
      try {
        // Check Android permissions
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        
        log(`Android location permission status: ${granted ? 'GRANTED' : 'NOT GRANTED'}`);
        return granted;
      } catch (error) {
        logError('Error checking Android permissions', error);
        return false;
      }
    } else if (Platform.OS === 'ios') {
      // For iOS, we can assume it's available and will prompt when needed
      // A more thorough check could be added here if needed
      log('iOS platform detected, assuming location services available (will prompt if needed)');
      return true;
    }
    
    // Default case for other platforms
    log('Unknown platform, cannot determine location availability');
    return false;
  }

  // Request location permission on Android
  static async requestAndroidPermission() {
    log('Requesting Android location permission...');
    try {
      // Log current permission status first
      const currentStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      log(`Current permission status before request: ${currentStatus ? 'GRANTED' : 'NOT GRANTED'}`);
      
      // If already granted, return true immediately
      if (currentStatus) {
        log('Permission already granted, skipping request');
        return true;
      }
      
      // Request permission with dialog
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Sportzon needs access to your location to show venues near you.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      // Check the result
      const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      log(`Permission request result: ${isGranted ? 'GRANTED' : 'DENIED'}`);
      
      if (!isGranted) {
        log('User denied permission request');
      }
      
      return isGranted;
    } catch (err) {
      logError('Failed to request permission', err);
      return false;
    }
  }

  // Get current position with proper error handling
  static getCurrentPosition() {
    log('Getting current position...');
    return new Promise(async (resolve, reject) => {
      // Check for Android permissions first
      if (Platform.OS === 'android') {
        log('Platform is Android, checking permissions first');
        const hasPermission = await this.requestAndroidPermission();
        if (!hasPermission) {
          logError('Location permission denied');
          reject(new Error('Location permission denied'));
          return;
        }
      } else {
        log('Platform is iOS, continuing with location request');
      }

      // Configure geolocation options
      log('Configuring geolocation options');
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
        locationProvider: 'auto'
      });

      log('Calling getCurrentPosition API...');
      Geolocation.getCurrentPosition(
        position => {
          log('Successfully got position', { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          resolve(position);
        },
        error => {
          // Error codes: 1 = Permission denied, 2 = Position unavailable, 3 = Timeout
          let errorMessage = 'Unknown error occurred';
          if (error.code === 1) {
            errorMessage = 'Permission denied';
          } else if (error.code === 2) {
            errorMessage = 'Position unavailable';
          } else if (error.code === 3) {
            errorMessage = 'Request timed out';
          }
          logError(`Failed to get position: ${errorMessage} (code ${error.code})`, error);
          reject(error);
        },
        { 
          enableHighAccuracy: true, 
          timeout: 15000, 
          maximumAge: 10000 
        }
      );
    });
  }

  // Reverse geocode coordinates to address
  static async reverseGeocode(latitude, longitude) {
    log(`Reverse geocoding coordinates: ${latitude}, ${longitude}`);
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
      log(`Making request to: ${url.replace(GOOGLE_API_KEY, 'API_KEY_HIDDEN')}`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      log(`Geocoding API response status: ${data.status}`);
      
      if (data.status !== 'OK') {
        logError(`Geocoding failed with status: ${data.status}`);
        throw new Error(`Geocoding failed: ${data.status}`);
      }

      // Parse address components to get structured location data
      const addressComponents = data.results[0]?.address_components || [];
      const formattedAddress = data.results[0]?.formatted_address || '';
      
      log(`Got formatted address: ${formattedAddress}`);
      log('Address components count:', addressComponents.length);
      
      // Extract neighborhood, locality, etc.
      let neighborhood = '';
      let locality = '';
      let administrativeArea = '';
      
      addressComponents.forEach(component => {
        log('Processing component:', { 
          types: component.types,
          long_name: component.long_name,
          short_name: component.short_name
        });
        
        if (component.types.includes('sublocality_level_1') || component.types.includes('neighborhood')) {
          neighborhood = component.long_name;
          log(`Found neighborhood: ${neighborhood}`);
        } else if (component.types.includes('locality')) {
          locality = component.long_name;
          log(`Found locality: ${locality}`);
        } else if (component.types.includes('administrative_area_level_1')) {
          administrativeArea = component.short_name;
          log(`Found administrative area: ${administrativeArea}`);
        }
      });

      // Create a location object with the data we need
      const locationData = {
        name: neighborhood || locality,
        address: formattedAddress,
        locality,
        administrativeArea,
        latitude,
        longitude,
      };

      log('Created location data object:', locationData);
      return locationData;
    } catch (error) {
      logError('Reverse geocoding error', error);
      throw error;
    }
  }

  // Get current location with address
  static async getCurrentLocationWithAddress() {
    log('Getting current location with address...');
    try {
      log('Requesting position from geolocation API');
      const position = await this.getCurrentPosition();
      
      const { latitude, longitude } = position.coords;
      log(`Position obtained, lat: ${latitude}, lng: ${longitude}`);
      
      log('Geocoding coordinates to address...');
      const locationData = await this.reverseGeocode(latitude, longitude);
      
      log('Successfully got location with address:', locationData);
      return locationData;
    } catch (error) {
      logError('Error getting current location with address', error);
      throw error;
    }
  }

  // Save location to AsyncStorage
  static async saveLocation(location) {
    log('Saving location to AsyncStorage:', location);
    try {
      const locationJson = JSON.stringify(location);
      log(`Stringified location (${locationJson.length} chars)`);
      
      await AsyncStorage.setItem('userLocation', locationJson);
      log('Successfully saved location to AsyncStorage');
    } catch (error) {
      logError('Error saving location', error);
      throw error;
    }
  }

  // Get saved location from AsyncStorage
  static async getSavedLocation() {
    log('Getting saved location from AsyncStorage');
    try {
      const locationJson = await AsyncStorage.getItem('userLocation');
      
      if (!locationJson) {
        log('No saved location found in AsyncStorage');
        return null;
      }
      
      log(`Found saved location (${locationJson.length} chars)`);
      const location = JSON.parse(locationJson);
      log('Parsed saved location:', location);
      
      return location;
    } catch (error) {
      logError('Error getting saved location', error);
      throw error;
    }
  }

  // Calculate distance between two coordinates using Haversine formula
  static calculateDistance(lat1, lon1, lat2, lon2) {
    log(`Calculating distance between (${lat1}, ${lon1}) and (${lat2}, ${lon2})`);
    
    // Earth's radius in kilometers
    const R = 6371;
    
    const deg2rad = (deg) => deg * (Math.PI / 180);
    
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    
    log(`Calculated distance: ${distance.toFixed(2)} km`);
    return distance;
  }

  // Format distance for display
  static formatDistance(distance) {
    log(`Formatting distance: ${distance}`);
    let formattedDistance;
    
    if (distance < 1) {
      // Convert to meters and round
      formattedDistance = `${Math.round(distance * 1000)} m`;
    } else if (distance < 10) {
      // Show with one decimal for short distances
      formattedDistance = `${distance.toFixed(1)} km`;
    } else {
      // Round to nearest integer for longer distances
      formattedDistance = `${Math.round(distance)} km`;
    }
    
    log(`Formatted distance: ${formattedDistance}`);
    return formattedDistance;
  }

  // Simplified method to just get coordinates (no geocoding, no API key required)
  static async getSimpleLocation() {
    log('Getting simple location (coordinates only)...');
    try {
      // Get position
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      log(`Got simple location: ${latitude}, ${longitude}`);
      
      // Return a simple location object
      return {
        name: 'Current Location',
        address: 'Current Position',
        latitude,
        longitude,
        coords: position.coords
      };
    } catch (error) {
      logError('Error getting simple location', error);
      throw error;
    }
  }
}

// Log available methods for debugging
console.log(`${LOG_PREFIX} Available methods:`, 
  Object.getOwnPropertyNames(LocationService).filter(name => 
    typeof LocationService[name] === 'function'
  )
);

// Create a singleton instance to ensure consistent access
const locationServiceInstance = LocationService;

// Export both the class and the instance to handle different import styles
module.exports = LocationService;
module.exports.default = LocationService; 