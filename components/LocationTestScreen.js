import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationService from '../utils/LocationService';

// Logger for this component
const LOG_PREFIX = '🧪 [LocationTest]';
const log = (message, data) => {
  if (data) {
    console.log(`${LOG_PREFIX} ${message}`, data);
  } else {
    console.log(`${LOG_PREFIX} ${message}`);
  }
};

const LocationTestScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedLocation, setSavedLocation] = useState(null);

  useEffect(() => {
    log('Component mounted, loading saved location');
    // Load saved location when component mounts
    loadSavedLocation();
  }, []);

  const loadSavedLocation = async () => {
    log('Loading saved location from storage');
    try {
      const location = await LocationService.getSavedLocation();
      log('Retrieved saved location:', location);
      setSavedLocation(location);
    } catch (err) {
      console.error(`${LOG_PREFIX} Error loading saved location:`, err);
    }
  };

  const detectLocation = async () => {
    log('Starting location detection');
    setLoading(true);
    setError(null);
    
    try {
      log('Calling getCurrentLocationWithAddress');
      const locationData = await LocationService.getCurrentLocationWithAddress();
      log('Received location data:', locationData);
      
      setCurrentLocation(locationData);
      
      // Save location
      log('Formatting location for storage');
      const locationToSave = {
        name: locationData.name,
        address: locationData.address,
        coordinates: {
          latitude: locationData.latitude,
          longitude: locationData.longitude
        }
      };
      
      log('Saving location to storage:', locationToSave);
      await LocationService.saveLocation(locationToSave);
      
      // Reload saved location
      log('Reloading saved location to confirm storage');
      await loadSavedLocation();
      
      log('Location detection and saving complete');
    } catch (err) {
      console.error(`${LOG_PREFIX} Error detecting location:`, err);
      setError(err.message);
      
      log(`Detection failed with error: ${err.message}, code: ${err.code}`);
      if (err.code === 1) {
        log('Permission denied error');
      } else if (err.code === 2) {
        log('Position unavailable error');
      } else if (err.code === 3) {
        log('Timeout error');
      }
    } finally {
      log('Finished location detection process');
      setLoading(false);
    }
  };

  const calculateDistanceTest = () => {
    if (!currentLocation || !savedLocation || !savedLocation.coordinates) {
      log('Cannot calculate distance - missing locations');
      return null;
    }
    
    log('Calculating distance between current and saved locations');
    log('Current location:', {
      lat: currentLocation.latitude,
      lng: currentLocation.longitude
    });
    log('Saved location:', {
      lat: savedLocation.coordinates.latitude,
      lng: savedLocation.coordinates.longitude
    });
    
    const distance = LocationService.calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      savedLocation.coordinates.latitude,
      savedLocation.coordinates.longitude
    );
    
    const formattedDistance = LocationService.formatDistance(distance);
    log(`Distance calculated: ${distance.toFixed(4)} km (${formattedDistance})`);
    return formattedDistance;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Location Testing</Text>
      
      {/* Location Detection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Location</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            log('Detect location button pressed');
            detectLocation();
          }}
          disabled={loading}
        >
          <Ionicons name="locate-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {loading ? 'Detecting...' : 'Detect My Location'}
          </Text>
        </TouchableOpacity>
        
        {loading && (
          <ActivityIndicator size="large" color="#ff6600" style={styles.loader} />
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={20} color="#ff3b30" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        {currentLocation && (
          <View style={styles.locationData}>
            <Text style={styles.locationName}>{currentLocation.name}</Text>
            <Text style={styles.locationAddress}>{currentLocation.address}</Text>
            <Text style={styles.coordinates}>
              Latitude: {currentLocation.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordinates}>
              Longitude: {currentLocation.longitude.toFixed(6)}
            </Text>
          </View>
        )}
      </View>
      
      {/* Saved Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Location</Text>
        
        {savedLocation ? (
          <View style={styles.locationData}>
            <Text style={styles.locationName}>{savedLocation.name}</Text>
            <Text style={styles.locationAddress}>{savedLocation.address}</Text>
            {savedLocation.coordinates && (
              <>
                <Text style={styles.coordinates}>
                  Latitude: {savedLocation.coordinates.latitude.toFixed(6)}
                </Text>
                <Text style={styles.coordinates}>
                  Longitude: {savedLocation.coordinates.longitude.toFixed(6)}
                </Text>
              </>
            )}
          </View>
        ) : (
          <Text style={styles.noDataText}>No saved location found</Text>
        )}
      </View>
      
      {/* Distance Calculation Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distance Calculation</Text>
        
        {currentLocation && savedLocation && savedLocation.coordinates && (
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceTitle}>
              Distance from current to saved location:
            </Text>
            <Text style={styles.distance}>
              {calculateDistanceTest()}
            </Text>
          </View>
        )}
        
        {(!currentLocation || !savedLocation || !savedLocation.coordinates) && (
          <Text style={styles.noDataText}>
            Need both current and saved locations to calculate distance
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff6600',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  loader: {
    marginTop: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ffeeee',
    borderRadius: 8,
  },
  errorText: {
    color: '#ff3b30',
    marginLeft: 8,
    flex: 1,
  },
  locationData: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0e8ff',
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'monospace',
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  distanceContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fff0e6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffe0cc',
  },
  distanceTitle: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6600',
    marginTop: 8,
  },
});

export default LocationTestScreen; 