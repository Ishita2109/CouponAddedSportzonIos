import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LocationButton = ({ onPress, selectedLocation, width }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: width * 0.04,
        marginTop: 10,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
      }}
    >
      <Ionicons name="location-outline" size={width * 0.05} color="#ff6600" />
      <Text style={{ marginLeft: 5, fontSize: width * 0.035, color: '#333' }}>
        {selectedLocation}
      </Text>
      <Ionicons name="chevron-down" size={width * 0.04} color="#666" style={{ marginLeft: 4 }} />
    </TouchableOpacity>
  );
};

export default LocationButton; 