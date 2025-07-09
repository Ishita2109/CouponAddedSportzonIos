import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { venuedata } from '../screens/Venue/VenueData';

// Logger for this component
const LOG_PREFIX = '📍 [LocationSelector]';
const log = (message, data) => {
  if (data) {
    console.log(`${LOG_PREFIX} ${message}`, data);
  } else {
    console.log(`${LOG_PREFIX} ${message}`);
  }
};

const LocationSelector = ({ 
  visible, 
  onClose, 
  onSelectLocation, 
  selectedLocation
}) => {
  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.6; // 60% of screen height

  // Extract unique city-state pairs from venue data
  const uniqueLocations = Array.from(new Set(
    venuedata.map(venue => JSON.stringify({ city: venue.city, state: venue.state }))
  ))
  .map(str => JSON.parse(str))
  .sort((a, b) => a.city.localeCompare(b.city));

  const handleLocationSelect = (location) => {
    onSelectLocation({
      name: location.city,
      address: `${location.city}, ${location.state}`,
      coordinates: { latitude: 0, longitude: 0 }
    });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={[styles.modalContent, { height: modalHeight }]}>
          {/* Handle bar */}
          <View style={styles.handleBarContainer}>
            <View style={styles.handleBar} />
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select Location</Text>
            <Text style={styles.subtitle}>Choose your preferred location</Text>
          </View>

          {/* Location List */}
          <ScrollView 
            style={styles.locationList}
            showsVerticalScrollIndicator={false}
          >
            {uniqueLocations.map((location, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.locationItem,
                  selectedLocation === location.city && styles.selectedLocation
                ]}
                onPress={() => handleLocationSelect(location)}
              >
                <View style={styles.locationIconContainer}>
                  <Ionicons 
                    name="location-outline" 
                    size={22} 
                    color={selectedLocation === location.city ? "#ff6600" : "#666"} 
                  />
                </View>
                <View style={styles.locationTextContainer}>
                  <Text style={[
                    styles.locationText,
                    selectedLocation === location.city && styles.selectedLocationText
                  ]}>
                    {location.city}
                  </Text>
                  <Text style={[
                    styles.locationSubtext,
                    selectedLocation === location.city && styles.selectedLocationSubtext
                  ]}>
                    {location.state}
                  </Text>
                </View>
                {selectedLocation === location.city && (
                  <View style={styles.checkmarkContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="#ff6600" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
            <View style={styles.listBottomPadding} />
          </ScrollView>

          {/* Powered by Google */}
          <View style={styles.googleContainer}>
            <Text style={styles.poweredByText}>powered by</Text>
            <Image 
              source={{ uri: 'https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_68x28dp.png' }} 
              style={styles.googleLogo} 
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  handleBarContainer: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 100,
  },
  titleContainer: {
    marginTop: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  locationList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedLocation: {
    backgroundColor: '#FFF5F0',
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  locationSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  selectedLocationText: {
    color: '#ff6600',
    fontWeight: '600',
  },
  selectedLocationSubtext: {
    color: '#ff8533',
  },
  checkmarkContainer: {
    marginLeft: 12,
  },
  listBottomPadding: {
    height: 20,
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  poweredByText: {
    fontSize: 12,
    color: '#666666',
    marginRight: 6,
  },
  googleLogo: {
    width: 60,
    height: 24,
    resizeMode: 'contain',
  }
});

export default LocationSelector; 