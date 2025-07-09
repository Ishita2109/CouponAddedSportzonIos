import { StyleSheet, Text, FlatList, setRoutes, View, SafeAreaView, Image, TextInput, Pressable, Dimensions, ScrollView, ActivityIndicator, Modal, Animated } from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native'; 
import { venuedata } from './Venue/VenueData';
import { eventdata } from './Events/EventData';
import debounce from 'lodash/debounce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationSelector from '../components/LocationSelector';
import LocationService from '../utils/LocationService';
import { useFocusEffect } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';

// Discount Popup Component
const DiscountPopup = ({ visible, onClose, onClaim }) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // <-- Add this line

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 120,
          friction: 10,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClaim = () => {
    setShowSuccess(true);
    setShowConfetti(true); // <-- Show confetti
    setTimeout(() => {
      setShowSuccess(false);
      setShowConfetti(false); // <-- Hide confetti after 2s
      onClaim();
    }, 2000); // 2s for confetti and animation, then close
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.popupOverlay, { opacity: fadeAnim }]}> 
        <Pressable style={styles.popupBackdrop} onPress={onClose} />
        <Animated.View style={[styles.popupContainerModern, { transform: [{ scale: scaleAnim }] }]}> 
          {/* Close Button */}
          <Pressable style={styles.closeButtonModern} onPress={onClose}>
            <Ionicons name="close" size={22} color="#B0B0B0" />
          </Pressable>

          {/* Main Content */}
          <View style={styles.popupContentModern}>
            {/* Icon */}
            <View style={styles.iconCircleModern}>
              <Ionicons name="pricetag" size={28} color="#FF6B35" />
            </View>
            {/* Label */}
            <Text style={styles.labelModern}>Special Offer</Text>
            {/* Hero Discount */}
            <Text style={styles.heroDiscountModern}>10% OFF</Text>
            {/* Subtitle */}
            <Text style={styles.subtitleModern}>on weekday bookings</Text>

            {/* Divider */}
            <View style={styles.dividerModern} />

            {/* Claim Button */}
            {!showSuccess ? (
              <Pressable
                style={styles.claimButtonModern}
                onPress={handleClaim}
                disabled={showSuccess}
              >
                <Text style={styles.claimButtonTextModern}>Claim Now</Text>
              </Pressable>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 32 }}>
                <LottieView
                  source={require('../assets/lottie/success.json')}
                  autoPlay
                  loop={false}
                  style={{ width: 90, height: 90 }}
                />
                <Text style={{ fontSize: 20, color: '#FF6B35', fontWeight: 'bold', marginTop: 16 }}>
                  Claimed!
                </Text>
              </View>
            )}

            {/* Terms */}
            <Text style={styles.termsTextModern}>
              *Valid on weekdays only. Cannot be combined with other offers.
            </Text>
          </View>
          {showConfetti && (
           <ConfettiCannon
           count={200} // ✅ Double the confetti for fullness
           origin={{ x: Dimensions.get('window').width / 2, y: 0 }} // Centered at top
           explosionSpeed={200} // ✅ Slower burst = longer animation
           fallSpeed={3000} // ✅ Much slower fall = stays longer on screen
           fadeOut={true} // ✅ Optional fade out
           autoStart={true} // Optional: start immediately
         />
         
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// VenueCard Component to display venue information
const VenueCard = ({ item }) => {
  const navigation = useNavigation();
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);

  const handleVenuePress = () => {
    if (item.slug === 'sportzon-wave-city') {
      setShowDiscountPopup(true);
    } else {
      navigation.navigate('VenueDetails', { item });
    }
  };

  const handleClaimOffer = () => {
    setShowDiscountPopup(false);
    navigation.navigate('VenueDetails', { item });
  };

  return (
    <>
      <Pressable 
        onPress={handleVenuePress} 
        style={({ pressed }) => [
          {
            marginBottom: 16,
            backgroundColor: "#fff",
            borderRadius: 16,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          }
        ]}
      >
        <View style={{ position: 'relative' }}>
          <Image 
            source={{ uri: item.image }} 
            style={{ 
              width: '100%', 
              height: 200, 
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }} 
          />
          {/* Discount Badge for Sportzon Wave City */}
          {item.slug === 'sportzon-wave-city' && (
            <View style={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: '#FF6B35',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff'
              }}>10% OFF Weekdays</Text>
            </View>
          )}
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '700', 
            color: '#333',
            marginBottom: 8,
            fontFamily: 'System',
          }}>
            {item.title}
          </Text>
          <Text style={{ 
            color: '#666',
            fontSize: 14,
            marginBottom: 4,
            fontFamily: 'System',
          }}>
            {item.address1}
          </Text>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginTop: 8,
          }}>
            <Ionicons name="star" size={16} color="#ffc107" />
            <Text style={{ 
              fontSize: 14, 
              color: '#ff6600', 
              marginLeft: 4,
              fontWeight: '600',
              fontFamily: 'System',
            }}>
              {item.rating}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              marginLeft: 16,
              color: '#666',
              fontFamily: 'System',
            }}>
              {item.timings}
            </Text>
          </View>
        </View>
      </Pressable>

      {/* Discount Popup */}
      <DiscountPopup
        visible={showDiscountPopup}
        onClose={() => setShowDiscountPopup(false)}
        onClaim={handleClaimOffer}
      />
    </>
  );
};

const Venues = ({ searchQuery, selectedLocation }) => {
  const [filteredVenues, setFilteredVenues] = useState(venuedata);
  const [isLoading, setIsLoading] = useState(true);

  const filterVenues = useCallback(
    debounce((query) => {
      console.log('🔍 [BookScreen] Starting venue filtering');
      console.log('🔍 [BookScreen] Search query:', query);
      console.log('🔍 [BookScreen] Total venues before filtering:', venuedata.length);
      
      setIsLoading(true);
      
      let filtered = venuedata;
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        console.log('🔍 [BookScreen] Applying search filter with term:', searchTerm);
        
        filtered = venuedata.filter(venue => {
          const title = venue.title || '';
          const address = venue.address1 || '';
          const description = venue.description || '';
          
          const matches = title.toLowerCase().includes(searchTerm) ||
                 address.toLowerCase().includes(searchTerm) ||
                 description.toLowerCase().includes(searchTerm);
          
          if (matches) {
            console.log('✅ [BookScreen] Match found:', {
              title: venue.title,
              address: venue.address1
            });
          }
          
          return matches;
        });
      }
      
      console.log('🔍 [BookScreen] Filtering complete');
      console.log('🔍 [BookScreen] Venues after filtering:', filtered.length);
      setFilteredVenues(filtered);
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    console.log('🔄 [BookScreen] Search query changed:', searchQuery);
    filterVenues(searchQuery);
  }, [searchQuery, filterVenues]);

  // Group venues by city and state
  const groupVenues = () => {
    console.log('🏙️ [BookScreen] Starting venue grouping');
    console.log('🏙️ [BookScreen] Selected location:', selectedLocation);
    
    if (!selectedLocation || !selectedLocation.name) {
      console.log('🏙️ [BookScreen] No valid location selected, showing all venues');
      return {
        cityVenues: [],
        stateVenues: [],
        otherVenues: filteredVenues
      };
    }

    // Extract city and state from the address
    const [city, state] = selectedLocation.address.split(', ').map(item => item.trim());
    console.log('🏙️ [BookScreen] Grouping by:', { city, state });
    
    const cityVenues = filteredVenues.filter(venue => {
      const matches = venue.city.toLowerCase() === city.toLowerCase();
      if (matches) {
        console.log('📍 [BookScreen] City venue found:', venue.title);
      }
      return matches;
    });

    const stateVenues = filteredVenues.filter(venue => {
      const matches = venue.state.toLowerCase() === state.toLowerCase() &&
        venue.city.toLowerCase() !== city.toLowerCase();
      if (matches) {
        console.log('🏛️ [BookScreen] State venue found:', venue.title);
      }
      return matches;
    });

    const otherVenues = filteredVenues.filter(venue => {
      const matches = venue.state.toLowerCase() !== state.toLowerCase();
      if (matches) {
        console.log('🌍 [BookScreen] Other venue found:', venue.title);
      }
      return matches;
    });

    console.log('🏙️ [BookScreen] Grouping results:', {
      cityVenues: cityVenues.length,
      stateVenues: stateVenues.length,
      otherVenues: otherVenues.length
    });

    return { cityVenues, stateVenues, otherVenues, state };
  };

  const { cityVenues, stateVenues, otherVenues, state } = groupVenues();

  if (isLoading) {
    console.log('⏳ [BookScreen] Loading state active');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  const renderSection = (title, data) => {
    console.log(`📱 [BookScreen] Rendering section: ${title}`);
    console.log(`📱 [BookScreen] Items in section: ${data.length}`);
    
    if (data.length === 0) {
      console.log(`📱 [BookScreen] Skipping empty section: ${title}`);
      return null;
    }
    
    console.log(`📱 [BookScreen] Section items:`, data.map(item => item.title));
    
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.venueList}>
          {data.map((item) => (
            <VenueCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    );
  };

  console.log('📱 [BookScreen] Rendering main view');
  console.log('📱 [BookScreen] Selected location:', selectedLocation);
  console.log('📱 [BookScreen] Total venues to display:', filteredVenues.length);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {selectedLocation ? (
          <>
            {/* City venues section - no heading */}
            <View style={styles.venueList}>
              {cityVenues.map((item) => (
                <VenueCard key={item.id} item={item} />
              ))}
            </View>

            {/* State venues section */}
            {stateVenues.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  More venues in {state}
                </Text>
                <View style={styles.venueList}>
                  {stateVenues.map((item) => (
                    <VenueCard key={item.id} item={item} />
                  ))}
                </View>
              </View>
            )}

            {/* Other venues section */}
            {otherVenues.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Other Top Venues</Text>
                <View style={styles.venueList}>
                  {otherVenues.map((item) => (
                    <VenueCard key={item.id} item={item} />
                  ))}
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.venueList}>
            {filteredVenues.map((item) => (
              <VenueCard key={item.id} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const EventsCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable 
      onPress={() => navigation.navigate('EventDetails', { item })} 
      style={{ margin: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 5 }}
    >
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color:'black' }}>{item.name}</Text>
        <Text style={{ color: '#777' }}>{item.address1}</Text>
        <Text style={{ fontSize: 14, marginTop: 5 }}>{item.date}</Text>
      </View>
    </Pressable>
  );
};

const Events = ({ searchQuery }) => {
  const [filteredEvents, setFilteredEvents] = useState(eventdata);
  const [isLoading, setIsLoading] = useState(true);

  const filterEvents = useCallback(
    debounce((query) => {
      setIsLoading(true);
      
      let filtered = eventdata;
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        filtered = eventdata.filter(event => {
          const name = event.name || '';
          const address = event.address1 || '';
          const description = event.description || '';
          
          return name.toLowerCase().includes(searchTerm) ||
                 address.toLowerCase().includes(searchTerm) ||
                 description.toLowerCase().includes(searchTerm);
        });
      }
      
      setFilteredEvents(filtered);
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    filterEvents(searchQuery);
  }, [searchQuery, filterEvents]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.venueList}>
        {filteredEvents.map((item) => (
          <EventsCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const BookScreen = ({ route }) => {
  const navigation = useNavigation();
  const { tab } = route.params || {};
  const [index, setIndex] = useState(tab === 'events' ? 1 : 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [routes] = useState([
    { key: 'venues', title: 'Venues' },
    { key: 'events', title: 'Events' },
  ]);

  // Load selected location whenever screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const loadSavedLocation = async () => {
        try {
          console.log('📱 [BookScreen] Loading saved location');
          const savedLocation = await LocationService.getSavedLocation();
          
          if (savedLocation) {
            console.log('📱 [BookScreen] Found saved location:', savedLocation);
            setSelectedLocation(savedLocation);
          } else {
            console.log('📱 [BookScreen] No saved location found');
            setSelectedLocation(null);
          }
        } catch (error) {
          console.error('❌ [BookScreen] Error loading location:', error);
          setSelectedLocation(null);
        }
      };
      
      loadSavedLocation();
    }, [])
  );

  const handleLocationSelect = async (location) => {
    console.log('📱 [BookScreen] Location selected:', location);
    try {
      // Save location using LocationService
      await LocationService.saveLocation({
        name: location.name,
        address: location.address,
        coordinates: location.coordinates
      });
      
      setSelectedLocation(location);
      setLocationModalVisible(false);
    } catch (error) {
      console.error('❌ [BookScreen] Error saving location:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim()) {
      setRecentSearches(prev => {
        const newSearches = [text, ...prev.filter(s => s !== text)].slice(0, 5);
        return newSearches;
      });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderScene = SceneMap({
    venues: () => <Venues searchQuery={searchQuery} selectedLocation={selectedLocation} />,
    events: () => <Events searchQuery={searchQuery} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#ff6600' }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: '#666' }}
      activeColor="#ff6600"
      inactiveColor="#666"
      renderLabel={({ route, focused }) => {
        if (route.key === 'venues') {
          return (
            <Text style={{ color: focused ? '#ff6600' : '#666' }}>
              {`Venues (${venuedata.length})`}
            </Text>
          );
        }
        return (
          <Text style={{ color: focused ? '#ff6600' : '#666' }}>
            {`Events (${eventdata.length})`}
          </Text>
        );
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        {/* Back Button + Search Bar Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginRight: 1,  paddingVertical: 7 }}
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
          >
            <Ionicons name="chevron-back" size={30} color="#888" />
          </Pressable>
          <View style={[styles.searchBarContainer, { flex: 1 }]}> {/* Wide search bar */}
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search venues or events..."
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor="#666"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={clearSearch} style={styles.clearButton}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        {/* Location Selector remains as is */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>LOCATION</Text>
          <Pressable 
            onPress={() => setLocationModalVisible(true)}
            style={styles.locationButton}
          >
            <Ionicons name="location-outline" size={20} color="#ff6600" />
            <Text style={styles.locationText} numberOfLines={1}>
              {selectedLocation ? selectedLocation.name : 'Select Location'}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#666" />
          </Pressable>
        </View>
      </View>

      <LocationSelector
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onSelectLocation={handleLocationSelect}
        selectedLocation={selectedLocation?.name}
        locationOptions={[
          { 
            id: '1', 
            name: 'Block 13', 
            address: 'Dwarka, Delhi',
            coordinates: { latitude: 28.5921, longitude: 77.0460 }
          },
          { 
            id: '2', 
            name: 'Sector 56', 
            address: 'Gurgaon, Haryana',
            coordinates: { latitude: 28.4089, longitude: 77.0926 }
          },
          { 
            id: '3', 
            name: 'Noida Sector 62', 
            address: 'Noida, UP',
            coordinates: { latitude: 28.6280, longitude: 77.3649 }
          },
          { 
            id: '4', 
            name: 'Wave City', 
            address: 'Ghaziabad, UP',
            coordinates: { latitude: 28.6692, longitude: 77.4538 }
          },
          { 
            id: '5', 
            name: 'Greater Noida', 
            address: 'West, UP',
            coordinates: { latitude: 28.4744, longitude: 77.5040 }
          },
        ]}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontFamily: 'System',
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
  },
  locationContainer: {
    alignItems: 'flex-end',
    minWidth: 120,
    marginRight: 2,
  },
  locationLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'System',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginRight: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  locationText: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'System',
    fontWeight: '500',
    marginLeft: 4,
    marginRight: 4,
  },
  scrollView: {
    flex: 1,
  },
  venueList: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 16,
    marginBottom: 16,
    fontFamily: 'System',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'System',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'System',
    marginTop: 15,
  },
  // Popup specific styles
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popupContainer: {
    width: '85%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 4,
  },
  popupContent: {
    padding: 32,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  popupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  discountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
    fontFamily: 'System',
  },
  highlightText: {
    color: '#FF6B35',
  },
  popupSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    fontFamily: 'System',
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 28,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  detailText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 12,
    fontFamily: 'System',
    fontWeight: '500',
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'System',
  },
  popupContainerModern: {
    width: '90%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 12,
    alignSelf: 'center',
  },
  closeButtonModern: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: 'rgba(245,245,245,0.9)',
    borderRadius: 16,
    padding: 2,
  },
  popupContentModern: {
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconCircleModern: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF3EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#FF6B35',
  },
  labelModern: {
    fontSize: 15,
    color: '#FF6B35',
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  heroDiscountModern: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  subtitleModern: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
    fontWeight: '500',
  },
  detailsRowModern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    gap: 0,
  },
  detailItemModern: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  detailTextModern: {
    fontSize: 13,
    color: '#444',
    marginLeft: 5,
    fontWeight: '500',
  },
  dotDivider: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  dividerModern: {
    width: '100%',
    height: 1,
    backgroundColor: '#F2F2F2',
    marginBottom: 18,
  },
  claimButtonModern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 32,
    width: '100%',
    marginBottom: 10,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  claimButtonTextModern: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  termsTextModern: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'System',
    marginTop: 6,
    marginBottom: 2,
  },
});

export default BookScreen;
