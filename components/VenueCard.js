import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VenueCard = ({ venue, style, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={() => onPress?.(venue)}
      activeOpacity={0.9}
    >
      {/* Venue Image */}
      <Image
        source={{ uri: venue.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Venue Details */}
      <View style={styles.details}>
        {/* Title and Rating */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {venue.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{venue.rating || '4.5'}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.location} numberOfLines={2}>
            {venue.city}, {venue.state}
          </Text>
        </View>

        {/* Sports Available */}
        <View style={styles.sportsContainer}>
          {venue.sports?.slice(0, 3).map((sport, index) => (
            <View key={index} style={styles.sportBadge}>
              <Text style={styles.sportText}>{sport}</Text>
            </View>
          ))}
          {venue.sports?.length > 3 && (
            <View style={styles.sportBadge}>
              <Text style={styles.sportText}>+{venue.sports.length - 3}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Exclusive Tag if applicable */}
      {venue.isExclusive && (
        <View style={styles.exclusiveTag}>
          <Text style={styles.exclusiveText}>Exclusive</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  details: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sportBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sportText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  exclusiveTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ff6600',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  exclusiveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default VenueCard; 