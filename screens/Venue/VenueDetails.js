import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, FlatList, ScrollView, Dimensions, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SessionManager from '../../utils/sessionManager';

const VenueDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offerModalVisible, setOfferModalVisible] = useState(false);

  const venueData = route.params?.venue || route.params?.item;
  
  console.log('Venue Details Screen - Received Data:', venueData);

  if (!venueData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No venue data available</Text>
      </SafeAreaView>
    );
  }

  const gallery = Array.isArray(venueData.gallery) ? venueData.gallery : [];

  const handleBookNow = async () => {
    const isGuest = await SessionManager.isGuestMode();
    if (isGuest) {
      Alert.alert(
        'Authentication Required',
        'Please sign in or create an account to book this venue.',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Sign In',
            onPress: () => navigation.navigate('LoginModal')
          },
          {
            text: 'Register',
            onPress: () => navigation.navigate('BasicInfo')
          }
        ]
      );
      return;
    }

    if (venueData._id) {
      navigation.navigate('bookings', {
        arenaId: venueData._id,
        venueName: venueData.slug || venueData.title,
      });
    } else {
      Alert.alert('Error', 'Cannot book this venue at the moment');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        {gallery.length > 0 ? (
          <>
            <FlatList
              data={gallery}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.floor(event.nativeEvent.contentOffset.x / width);
                setCurrentIndex(index);
              }}
              renderItem={({ item: image }) => (
                <Image 
                  source={{ uri: image }} 
                  style={styles.carouselImage} 
                  resizeMode="cover" 
                />
              )}
              keyExtractor={(image, index) => index.toString()}
            />
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            {/* Image Indicator */}
            <View style={styles.imageIndicator}>
              <Text style={styles.imageIndicatorText}>
                {currentIndex + 1} / {gallery.length}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={40} color="#ccc" />
            <Text style={styles.noImageText}>No images available</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Venue Name and Basic Details */}
        <View style={styles.headerContainer}>
          <Text style={styles.venueTitle}>
            {venueData.title || 'Venue Name'}
          </Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>
              {venueData.address2 || 'Address not available'}
            </Text>
          </View>
          <View style={styles.timingContainer}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.timingText}>
              {venueData.timings || 'Not specified'}
            </Text>
          </View>
        </View>

        {/* --- OFFERS SECTION for Sportzon Wave City --- */}
        {venueData.slug === 'sportzon-wave-city' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Offers</Text>
            <Pressable
              style={styles.offerCard}
              onPress={() => setOfferModalVisible(true)}
            >
              <View style={styles.offerIconCircleOrange}>
                <Ionicons name="pricetag" size={22} color="#FF6B35" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.offerTitleOrange}>10% OFF Weekdays</Text>
                <Text style={styles.offerSubtitle}>Get 10% off on all bookings Mon-Fri</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FF6B35" />
            </Pressable>
          </View>
        )}

        {/* --- OFFER DETAILS MODAL --- */}
        <Modal
          visible={offerModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setOfferModalVisible(false)}
        >
          <Pressable style={styles.modalBackdrop} onPress={() => setOfferModalVisible(false)} />
          <View style={styles.offerModalSheet}>
            <View style={styles.modalHandle} />
            <View style={{ alignItems: 'center', marginBottom: 18 }}>
              <View style={styles.offerIconCircleLargeOrange}>
                <Ionicons name="pricetag" size={32} color="#FF6B35" />
              </View>
              <Text style={styles.modalOfferTitleOrange}>10% OFF Weekdays</Text>
              <Text style={styles.modalOfferSubtitle}>Get 10% off on all bookings from Monday to Friday at Sportzon Wave City.</Text>
            </View>
            <View style={styles.modalDivider} />
            <View style={{ marginBottom: 18 }}>
              <Text style={styles.modalOfferDetail}>• Valid on weekdays only (Mon-Fri)</Text>
              <Text style={styles.modalOfferDetail}>• All sports and activities included</Text>
              <Text style={styles.modalOfferDetail}>• Discount auto-applied at checkout</Text>
              <Text style={styles.modalOfferDetail}>• Cannot be combined with other offers</Text>
            </View>
            {/* Book Now button removed */}
          </View>
        </Modal>

        {/* Available Sports Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Available Sports</Text>
          <View style={styles.sportsContainer}>
            {(venueData.sportimages || []).map((activity, index) => (
              <View
                key={index}
                style={styles.sportItem}
              >
                <View style={styles.sportIconContainer}>
                  <Image
                    source={{ uri: activity.icon }}
                    style={styles.sportIcon}
                  />
                </View>
                <Text style={styles.sportName}>
                  {activity.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Amenities Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {(venueData.amenities || []).map((amenity, index) => (
              <View
                key={index}
                style={styles.amenityItem}
              >
                <Text style={styles.amenityText}>
                  {amenity.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* About Venue Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About Venue</Text>
          <Text style={styles.descriptionText}>
            {venueData.description || 'No description available'}
          </Text>
        </View>

        {/* Discount Information for Sportzon Wave City (can be removed if redundant) */}
        {venueData.slug === 'sportzon-wave-city' && (
          <View style={styles.sectionContainer}>
            <View style={styles.discountContainer}>
              <View style={styles.discountHeader}>
                <Ionicons name="pricetag" size={24} color="#FF6B35" />
                <Text style={styles.discountTitle}>Weekday Special Offer</Text>
              </View>
              <View style={styles.discountContent}>
                <Text style={styles.discountText}>
                  🎉 Get <Text style={styles.discountHighlight}>10% OFF</Text> on all sports bookings from Monday to Friday!
                </Text>
                <Text style={styles.discountDetails}>
                  • Valid on weekdays only (Monday - Friday){'\n'}
                  • Applicable to all sports and activities{'\n'}
                  • Discount automatically applied at checkout{'\n'}
                  • Cannot be combined with other offers
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Book Now Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookNow}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: 250,
    position: 'relative',
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  imageIndicatorText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  noImageContainer: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  venueTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  timingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sportIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  sportIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  sportName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    backgroundColor: '#e9f5ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 20,
  },
  amenityText: {
    fontSize: 14,
    color: '#063970',
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
  bookButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    borderColor: '#063970',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookButtonText: {
    color: '#063970',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  discountContainer: {
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  discountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  discountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginLeft: 8,
  },
  discountContent: {
    marginLeft: 32,
  },
  discountText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 8,
  },
  discountHighlight: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  discountDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3EC', // lighter orange
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  offerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3EC', // lighter orange
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1BAF5D',
    marginBottom: 2,
  },
  offerSubtitle: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  offerModalSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 12,
  },
  modalHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 18,
  },
  offerIconCircleLarge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#CFF3E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalOfferTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1BAF5D',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalOfferSubtitle: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F2F2F2',
    marginBottom: 18,
  },
  modalOfferDetail: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
    fontWeight: '400',
  },
  modalBookButton: {
    backgroundColor: '#1BAF5D',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
    shadowColor: '#1BAF5D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  modalBookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  offerIconCircleOrange: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3EC', // lighter orange
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  offerTitleOrange: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 2,
  },
  offerIconCircleLargeOrange: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFF3EC', // lighter orange
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalOfferTitleOrange: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
    textAlign: 'center',
  },
});

export default VenueDetailScreen;