import React, { useLayoutEffect, useState, useEffect} from 'react';
import {Image,StyleSheet,Text,View,ScrollView,Linking,Pressable,Dimensions,
  useWindowDimensions, ImageBackground,TouchableOpacity,FlatList, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { ClassesData } from './Classes/ClassesData';
import { venuedata } from './Venue/VenueData';
import { sportsData, allSportsData } from '../data/sportsData';
import LocationButton from '../components/LocationButton';
import LocationSelector from '../components/LocationSelector';
import LocationService from '../utils/LocationService';
import { filterVenuesByLocation, debugFilterResults } from '../utils/VenueFilter';
import VenueCard from '../components/VenueCard';
import SessionManager from '../utils/sessionManager';

const { width: screenWidth } = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

// Calculate card width for 2.5 cards visible (peeking effect)
const CARD_GAP = 10;
const CARD_HORIZONTAL_PADDING = 34; // FlatList paddingHorizontal * 2
const CARD_WIDTH = (screenWidth - CARD_HORIZONTAL_PADDING - CARD_GAP * 2) / 2.5;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const { width, height } = useWindowDimensions();
  const [userName, setUserName] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [selectedSport, setSelectedSport] = useState('All');
  const [showAllSports, setShowAllSports] = useState(false); 
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState([]);
  
  // Predefined location options with coordinates
  const locationOptions = [
    { 
      id: '1', 
      name: 'Select Location', 
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
  ];
  
  // Function to handle location selection
  const handleLocationSelect = (location) => {
    console.log('🏠 [HomeScreen] Location selected:', location);
    setSelectedLocation(location.name);
    setUserCoordinates(location.coordinates);
    
    // Save selected location
    console.log('🏠 [HomeScreen] Saving selected location');
    LocationService.saveLocation({
      name: location.name,
      address: location.address,
      coordinates: location.coordinates
    });
    
    // Update distances for venues and events
    console.log('🏠 [HomeScreen] Updating distances with new coordinates');
    updateDistances(location.coordinates);
    
    // Modal will now be closed manually by the user via the Apply button
  };
  
  // Function to toggle location modal
  const toggleLocationModal = () => {
    console.log('🏠 [HomeScreen] Toggling location modal, current state:', locationModalVisible);
    setLocationModalVisible(!locationModalVisible);
  };
  
  // Function to update distances for venues and events
  const updateDistances = (coordinates) => {
    if (!coordinates) {
      console.log('🏠 [HomeScreen] No coordinates provided for updateDistances');
      return;
    }
    
    console.log('🏠 [HomeScreen] Saving coordinates for use in BookScreen:', coordinates);
    
    // Instead of filtering here, we'll just store the coordinates for use in BookScreen
    // The BookScreen will use these coordinates to filter venues and events
    
    // We'll save the coordinates to AsyncStorage so BookScreen can access them
    AsyncStorage.setItem('userCoordinates', JSON.stringify(coordinates))
      .then(() => {
        console.log('🏠 [HomeScreen] Coordinates saved to AsyncStorage');
      })
      .catch(error => {
        console.error('🏠 [HomeScreen] Error saving coordinates:', error);
      });
  };
  
  // Load saved location on component mount
  useEffect(() => {
    const loadSavedLocation = async () => {
      console.log('🏠 [HomeScreen] Loading saved location');
      try {
        const savedLocation = await LocationService.getSavedLocation();
        
        if (savedLocation) {
          console.log('🏠 [HomeScreen] Found saved location:', savedLocation);
          setSelectedLocation(savedLocation.name);
          setUserCoordinates(savedLocation.coordinates);
          // Save coordinates for BookScreen to use
          updateDistances(savedLocation.coordinates);
        } else {
          console.log('🏠 [HomeScreen] No saved location found, using default');
          // Use first location as default if none saved
          setSelectedLocation(locationOptions[0].name);
          setUserCoordinates(locationOptions[0].coordinates);
          // Save coordinates for BookScreen to use
          updateDistances(locationOptions[0].coordinates);
        }
      } catch (error) {
        console.error('🏠 [HomeScreen] Error loading saved location:', error);
      }
    };
    
    loadSavedLocation();
  }, []);
  
  const sportFilteredVenues = selectedSport === 'All' ? venues : venuedata.filter(v =>
    v.sportimages?.some(s => s.label?.toLowerCase() === selectedSport.toLowerCase())
  );

  const filteredClasses = selectedSport === 'All' ? ClassesData : ClassesData.filter(c =>
    c.activities?.some(a => a.label?.toLowerCase() === selectedSport.toLowerCase())
  );

  // Handler for sport selection
  const handleSportSelect = (sport) => {
    setSelectedSport(sport.name);
    // You can add additional logic here for filtering
  };

  const toggleShowAllSports = () => {
    setShowAllSports(!showAllSports);
  };

  useFocusEffect(
    React.useCallback(() => {
      const getUserName = async () => {
        try {
          const storedName = await AsyncStorage.getItem('userName');
          console.log('🟢 Retrieved User Name:', storedName);
          // Get only the first name
          const firstName = storedName && storedName !== 'undefined' ? storedName.split(' ')[0] : 'Guest';
          setUserName(firstName);
        } catch (error) {
          console.log('Error fetching user name:', error);
        }
      };
      getUserName();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const checkGuestMode = async () => {
        try {
          const guestMode = await SessionManager.isGuestMode();
          setIsGuest(guestMode);
        } catch (error) {
          console.log('Error checking guest mode:', error);
        }
      };
      checkGuestMode();
    }, [])
  );
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#004C9E',
          width: '100%',
          height: height * 0.1,
          paddingHorizontal: 6,
        }}>
          {/* Left: Logo and Hi Ishita */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sportzonlogoo.png' }}
              style={{
                width: 40,
                height: 40,
                marginRight: 8,
                resizeMode: 'contain',
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                fontSize: 23,
                color: 'white',
                fontWeight: '500',
              }}>
                Hi {userName ? userName : 'Guest'}
              </Text>
            </View>
          </View>
  
          {/* Right: Location selector */}
          <Pressable onPress={() => setLocationModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="location-outline" size={18} color="#ff6600" />
            <Text style={{
              fontSize: 15,
              color: 'white',
              marginHorizontal: 5,
              fontWeight: '500',
            }}>
              {selectedLocation || 'Select Location'}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#ff6600" />
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#004C9E',
        height: height * 0.1,
        elevation: 0,
        shadowOpacity: 1,
        
      },
      headerLeft: () => null,
      headerRight: () => null,
    });
  }, [navigation, userName, selectedLocation, isGuest]);
  
        
    const [currentIndex, setCurrentIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;
        
    useEffect(() => {
      const interval = setInterval(() => {
       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // Change every 4 seconds
      return () => clearInterval(interval);
      }, []);

     const images = [
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/banner_1.png",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/banner_6.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/banner_2.png",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/banner_4.png",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/banner_7.jpg",
      ];


     const renderCardvenue = ({ item }) => (
      <TouchableOpacity
         style={[
              styles.cardvenue,
              item.title === "See All Venues" && styles.seeAllCard
            ]}
            onPress={() => {
              navigation.navigate('BookScreen', { tab: 'venues' });
            }}
          >
       <Image
         source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={styles.cardImage}
          resizeMode="cover"
       />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
    );

    const renderCardevents = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.eventCardContainer,
        item.title === "See All Events" && styles.seeAllEventCard
      ]}
      onPress={() => navigation.navigate('BookScreen', { tab: 'events' })}
    >
      <Image 
        source={typeof item.image === "string" ? { uri: item.image } : item.image} 
        style={[
          styles.eventCardImage,
          item.title === "See All Events" && styles.seeAllEventImage
        ]} 
      />
         
      {item.title !== "See All Events" && (
        <View style={styles.eventCardOverlay}>
          <Text style={styles.eventCardTitle}>{item.title}</Text>
               
          <View style={styles.eventCardLocationContainer}>
            <Ionicons name="location-outline" size={12} color="#666" />
            <Text style={styles.eventCardLocationText}>{item.location}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

        
   const openURL = (url) => {
     Linking.openURL(url);
    };

     const venues = [
          {
            id: "1",
            title: "Sportzon Wave City",
            location: "Ghaziabad",
            image:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1720675247193-1696401518363-aboutTop.jpeg", 
          },
          {
            id: "2",
            title: "K12 School",
            location: "Jaipur, Rajasthan",
            image:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729581267895-k12school.png",           
          },
          {
            id: "3",
            title: "JBM Global School",
            location: "Noida, UP",
            image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729511334398-jbm-school.jpg", 
          },
          {
            id: "4",
            title: "Rishikul Vidyapeeth",
            location: "Sonipat, Haryana",
            image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1744014599399-b65be19a-332d-4ef5-a7a9-5b734ce50222.jpg"
    
          }
        ];

        const seeAllCard = {
          id: "5",
          title: "See All Venues",
          location: "More options",
          image: require('../assets/images/seeallimageclass.png'), 
        };

        const events = [
          {
            id: "1",
            title: "Champions of NCR",
            location: "Ghaziabad",
            image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/event_champions.png", 
          },
          {
            id: "2",
            title: "K12 Cricket Camp",
            location: "Jaipur",
            image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/k12cricketcamp.jpeg", 
          },
          {
            id: "3",
            title: "Skating Event",
            location: "Ghaziabad",
            image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/eventbanner3.jpg", 
          },
          
          {
            id: "4",
            title: "See All Events",
            location: "More options",
            image: require('../assets/images/seeallimage.png'), 
          },
        ];
        

  // Venue and event data arrays - use the original data, no filtering by location
  const venueData = venues;
  const eventData = events;

  // Default venues to show when no location is selected
  const defaultVenues = [
    {
      id: "1",
      title: "Sportzon Wave City",
      location: "Ghaziabad, Delhi",
      image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1720675247193-1696401518363-aboutTop.jpeg",
    },
    {
      id: "2",
      title: "K12 Schools",
      location: "Jaipur, Rajasthan",
      image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729581267895-k12school.png",
    },
    {
      id: "3",
      title: "JBM Global School",
      location: "Noida, UP",
      image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729511334398-jbm-school.jpg",
    }
  ];

  useEffect(() => {
    // If no location is selected, show default venues
    if (!selectedLocation) {
      setFilteredVenues([...defaultVenues, seeAllCard]);
      return;
    }

    // Parse the selected location - handle both formats: "City, State" and "City"
    let city, state;
    if (selectedLocation.includes(',')) {
      [city, state] = selectedLocation.split(', ').map(item => item.trim());
    } else {
      city = selectedLocation.trim();
      state = ''; // If no state is provided, we'll search by city only
    }
    
    // Get all venues from the venue data
    const allVenues = venuedata.map(venue => ({
      id: venue._id,
      title: venue.title,
      location: `${venue.city}, ${venue.state}`,
      image: venue.image
    }));

    // Case 1: Filter venues by city
    let cityVenues = allVenues.filter(venue => {
      const venueCity = venue.location.split(',')[0].trim().toLowerCase();
      return venueCity.includes(city.toLowerCase());
    });

    // If city has ≥ 3 venues, take first 3
    if (cityVenues.length >= 3) {
      setFilteredVenues([...cityVenues.slice(0, 3), seeAllCard]);
      return;
    }

    // Case 2: If city has < 3 venues and we have a state, add venues from same state
    let stateVenues = [];
    if (state) {
      stateVenues = allVenues.filter(venue => {
        const venueState = venue.location.split(',')[1]?.trim().toLowerCase() || '';
        return venueState.includes(state.toLowerCase()) &&
          !cityVenues.some(cv => cv.id === venue.id);
      });
    }

    // Combine city venues with state venues up to 3 total
    let combinedVenues = [...cityVenues];
    if (combinedVenues.length < 3) {
      const remainingSlots = 3 - combinedVenues.length;
      combinedVenues = [...combinedVenues, ...stateVenues.slice(0, remainingSlots)];
    }

    // Case 3: If still less than 3 venues, fill with default venues
    if (combinedVenues.length < 3) {
      const remainingSlots = 3 - combinedVenues.length;
      const defaultVenuesToAdd = defaultVenues
        .filter(dv => !combinedVenues.some(cv => cv.id === dv.id))
        .slice(0, remainingSlots);
      combinedVenues = [...combinedVenues, ...defaultVenuesToAdd];
    }

    setFilteredVenues([...combinedVenues, seeAllCard]);
  }, [selectedLocation]);

  const styles = StyleSheet.create({
    seeAllCard: {
      backgroundColor: '#f8f9fa',
      borderWidth: 1,
      borderColor: '#e0e0e0', 
      borderStyle: 'dashed',
    },
    cardvenue: {
      width: CARD_WIDTH,
      height: width * 0.52, // Make height responsive
      backgroundColor: '#fff',
      borderRadius: 16,
      marginRight: CARD_GAP,
      overflow: 'hidden',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    cardImage: {
      width: '100%',
      height: width * 0.29, // Make image height responsive
    },
    cardContent: {
      padding: width * 0.03, // Responsive padding
    },
    cardTitle: {
      fontSize: width * 0.035, // Responsive font size
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginBottom: 8,
    },
    cardLocation: {
      fontSize: width * 0.032, // Responsive font size
      color: '#666',
      textAlign: 'center',
    },
    locationContainer: {marginRight: 12,},
    locationLabel: {
      fontSize: 11,color: '#666',marginBottom: 4,fontFamily: 'System',
      fontWeight: '500',letterSpacing: 0.5,textAlign:'center',
    },
    locationButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 15,color: '#333',fontFamily: 'System',fontWeight: '500',textAlign:'center',marginLeft: 4,
    },
    eventCardContainer: {
      backgroundColor: "#fff", 
      borderRadius: 100, 
      elevation: 4,
      marginRight: 7, 
      overflow: "hidden", 
      width: 160,
      height: 160,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#E8E8E8", 
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },
    seeAllEventCard: {
      // Add any specific styles for "See All Events" card if needed
    },
    eventCardImage: {
      width: 140, 
      height: 140,
      borderRadius: 60,
      borderWidth: 1.5,
      borderColor: '#fff',
    },
    seeAllEventImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    eventCardOverlay: {
      position: 'absolute', 
      bottom: 0, 
      width: '100%', 
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 100,
      borderTopWidth: 0.5,
      borderTopColor: 'rgba(232, 232, 232, 0.5)',
    },
    eventCardTitle: {
      fontSize: 11, 
      fontWeight: "600", 
      color: "#2C2C2C",
      textAlign: 'center',
      marginBottom: 3,
      letterSpacing: 0.2,
    },
    eventCardLocationContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    eventCardLocationText: {
      fontSize: 10, 
      color: "#666", 
      marginLeft: 3,
      fontWeight: '500',
      letterSpacing: 0.1,
    },
    classesGearsContainer: {
      flexDirection: 'row',justifyContent: 'space-between',
      marginHorizontal: 20,marginTop: 20,
    },
    classGearCard: {
      flex: 1,marginHorizontal: 5,borderRadius: 16, overflow: 'hidden',
      elevation: 3,shadowColor: '#000',shadowOpacity: 0.1,shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      
    },
    classGearImage: {
      height: 180,width: '100%',borderRadius: 16,
    },
    classGearButton: {
      backgroundColor: '#fff',paddingVertical: 8,paddingHorizontal: 12,
      borderRadius: 20,flexDirection: 'row',alignItems: 'center',
      justifyContent: 'center',marginTop: 10,marginBottom: 15,marginLeft: 15,
      width: 'auto',shadowColor: '#000',shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,
       shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    classGearButtonText: {
      color: '#333',fontWeight: '600',fontSize: 13,marginRight: 4,
    },
  });

  return (
    <>
      
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
        {/* Location Selector Modal */}
        <LocationSelector 
          visible={locationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          onSelectLocation={handleLocationSelect}
          selectedLocation={selectedLocation}
          locationOptions={locationOptions}
          height={height}
          width={width}
        />
        
        <ScrollView style={{flex: 1}}>

 {/* <View style={{ width: width, height: width * 0.65 }}>
  <Image
    source={require('../assets/images/SSD.png')}
    style={{
      width: '100%',
      height: '100%',
      borderBottomRightRadius: 30,
    }}
    resizeMode='stretch'
  />
</View> */}

<View style={{ width: '100%', height: width * 0.58, borderBottomRightRadius: 30, overflow: 'hidden' }}>
  <ImageBackground
    source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/SDT.png"}} 
    style={{width: '100%',height: '100%',borderBottomRightRadius: 40,}}
    resizeMode='contain'
   >
  {/*  <View style={{ position: 'absolute', left: 40, top: '10%' }}>
      <Text style={{ fontSize: width * 0.08,   letterSpacing: 1.5,   
    lineHeight: width * 0.1,fontWeight: '800', color: 'white' }}>
            What's Your <Text style={{ color: '#ff6600',fontWeight: '900', }}>{"\n"}Game</Text> ?
       </Text>
       <Text style={{ fontSize: width * 0.04,  letterSpacing: 1.5, 
    lineHeight: width * 0.05, color: 'white', marginTop: 21,fontWeight: '500' }}>
            Click to find the{"\n"}perfect sport for {"\n"}you!
       </Text>
   </View> */}
  </ImageBackground>
 </View>


   {/* SLIDING BANNER */}
      {/*< View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ width: screenWidth }}
        contentOffset={{ x: currentIndex * screenWidth, y: 0 }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri:image}}
            style={{ width: screenWidth-10, height: 180, resizeMode: 'cover', marginBottom:5, 
              marginTop:15, marginRight:5, marginLeft:5, borderRadius:15}}
          />
        ))}
      </ScrollView>

      <View  //dot dot for slides
        style={{ position: 'absolute',bottom: -10, left: 0,right: 0, flexDirection: 'row', 
          justifyContent: 'center', }} >
        
        {images.map((_, index) => (  
          <View
            key={index}
            style={{ height: 8, width: 8, marginHorizontal: 5,
              borderRadius: 4, backgroundColor: currentIndex === index ? '#000' : '#ccc', }}
          />
        ))}
      </View>
    </View>
 */}

 {/* Find Your Sport*/} 

    <View style={{ alignItems: 'center', marginTop: 35 }}>
      {/* Row with Images and Text */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

        {/* Text Block */}
        <Text style={{ fontSize: 24, fontWeight: '400', color: '#1a1a1a' }}>
          Pick your <Text style={{ color: '#ff6600', fontWeight: '600' }}>sporty<Text style={{ fontSize: 24, color: '#ff6600', fontWeight: '300', marginTop: -5 }}> interests!</Text></Text>
        </Text>
      </View>
    </View>

    {/* Pick a Sport Section */}
    <View style={{ marginTop: 10, paddingVertical: 10 }}> 
       
       {!showAllSports ? (
        // Single row of 5 sports
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 10 }}>
          {sportsData.map((sport) => (
            <TouchableOpacity 
              key={sport.id} 
              style={{ alignItems: 'center', width: width / 5 - 12 }}
              onPress={() => navigation.navigate('SportDetailsScreen', { sport: sport.name })}
            >
          <View style={[
           { 
             width: width * 0.16, // Responsive width
             height: width * 0.16, // Responsive height
             justifyContent: 'center',
             alignItems: 'center',
           },
              selectedSport === sport.name && {
                borderColor: '#ff6600',
                borderWidth: 1.5,
           }
         ]}>
            <Image 
              source={{ uri: sport.icon }}
              onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
              style={{ 
                width: width * 0.11, // Responsive width
                height: width * 0.11, // Responsive height
                backgroundColor: 'transparent' 
              }} 
              resizeMode="contain"
            />
              </View>
              <Text style={{ 
                fontSize: width * 0.028, // Responsive font size
                color: '#333',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {sport.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Grid layout for all sports
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between' }}>
          {allSportsData.map((sport) => (
            <TouchableOpacity 
              key={sport.id} 
              style={{ alignItems: 'center', width: width / 5 - 12 }}
              onPress={() => navigation.navigate('SportDetailsScreen', { sport: sport.name })}
            >
          <View style={[
                { 
                  width: width * 0.16, // Responsive width
                  height: width * 0.16, // Responsive height
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 4,
                },
                selectedSport === sport.name && {
                  borderColor: '#ff6600',borderWidth: 1.5,
                }
              ]}>
                <Image 
                  source={{ uri: sport.icon }}
                 
                  onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
                  style={{ 
                    width: width * 0.11, // Responsive width
                    height: width * 0.11, // Responsive height
                    backgroundColor: 'transparent' 
                  }} 
                  resizeMode="contain"
                />
              </View>
              <Text style={{ 
                fontSize: width * 0.028, // Responsive font size
                color: '#333',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {sport.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginTop: 5 }}
        onPress={toggleShowAllSports}
      >
        <Text style={{ fontSize: 14, color: '#ff6600', fontWeight: '600' }}>
          {showAllSports ? 'See Less' : 'See All'}
        </Text>
        <Ionicons 
          name={showAllSports ? "chevron-up" : "chevron-down"} 
          size={16} 
          color="#ff6600" 
          style={{ marginLeft: 4 }}
        />
      </TouchableOpacity>
    </View> 

  

  {/* VENUE*/} 
  <View>
    <Text style={{marginLeft:20, marginBottom:5, fontSize: 21, fontWeight: '500', 
      color: '#ff6600', marginTop:40}}>Book Perfect Venue Near You</Text>
  </View>
 
  <View style={{ marginVertical: 13}}>
      <FlatList
        data={filteredVenues}
        renderItem={renderCardvenue}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 17, paddingBottom: 28 }}/>
  </View>


    {/* EVENTS */} 
  <View>
    <Text style={{marginLeft:20,  fontSize: 21, fontWeight: '500', color: '#ff6600', marginTop:20,marginBottom:10,}}>Events and Activities</Text>
  </View>
   
  <View style={{marginVertical: 15}}>
      <FlatList
        data={eventData} // Use the data with distance information
        renderItem={renderCardevents}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 28 }}/>
  </View>


{/* Classes & Gears */}
<View>
    <Text style={{marginLeft:20,  fontSize: 21, fontWeight: '500', color: '#ff6600', marginTop:20,marginBottom:10,}}>Train Like a Pro and Pay Less</Text>
  </View>
<View style={{ 
      flexDirection: 'row',justifyContent: 'space-between',marginHorizontal: width * 0.025, 
      marginTop: height * 0.02}}>
   
      {/* Classes */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Classes')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <ImageBackground 
        source={{uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/ClassesBanner3.jpg"}}
       // source={{uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sports.jpg"}} 
        style={{ height: height * 0.35, width: width * 0.44, justifyContent: 'space-between', 
            borderRadius: 15, overflow: 'hidden'}}>

        {/* <Text style={{ fontSize: width * 0.04, marginLeft: width * 0.05, marginTop: height * 0.27, 
            fontWeight: '900', color: 'white'}}> Train like a pro!</Text> */}

        <TouchableOpacity 
           style={{ backgroundColor: '#DAF7A6', paddingVertical: height * 0.006, width: width * 0.29,
           paddingHorizontal: width * 0.04,borderRadius: 25, marginLeft: width * 0.07, 
           marginBottom: height * 0.015,marginTop: height * 0.3, height: height * 0.033,  }}>

           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontWeight: '700', fontSize: width * 0.03 }}>Find Classes</Text>
            <Ionicons name="arrow-forward" size={width * 0.03} color="black"  style={{ marginLeft: 5 }}  />
          </View>
        </TouchableOpacity>

    </ImageBackground>
   </TouchableOpacity>
      
      {/* Gears */}
      <TouchableOpacity
        onPress={() => navigation.navigate('GearUp')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <ImageBackground 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sports.jpg"}} 
       style={{height: height * 0.35,width: width * 0.44, justifyContent: 'space-between', 
       borderRadius: 15, overflow: 'hidden'}}>

      {/* <Text style={{ fontSize: width * 0.039, marginLeft: width * 0.014, marginTop: height * 0.27, 
            fontWeight: '900',color: 'white' }}>   Play Better. Pay Less! </Text> */}

      <TouchableOpacity 
           style={{ backgroundColor: '#DAF7A6', paddingVertical: height * 0.006, width: width * 0.29,
           paddingHorizontal: width * 0.04,borderRadius: 25, marginLeft: width * 0.07, 
           marginBottom: height * 0.015, marginTop: height * 0.3, height: height * 0.033,}}>
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontWeight: '700', fontSize: width * 0.03 }}>Buy Gears</Text>
            <Ionicons name="arrow-forward" size={width * 0.03} color="black"  style={{ marginLeft: 5 }}  />
          </View>
        </TouchableOpacity>

     </ImageBackground>
   </TouchableOpacity>
 </View>

    {/* Membership Ad */}
   <View style={{backgroundColor:"#FFFFF0", marginVertical:10}}>
    <View >
      
     <Text style={{ 
       fontSize: width * 0.06, // Responsive font size
       fontWeight: '400',
       color: '#1a1a1a',
       marginHorizontal: width * 0.12,
       marginTop: height * 0.08,
       textAlign: 'center'
     }}>
       Buy a membership to
       <Text style={{
         color: '#ff6600',
         fontWeight: '350',
         fontSize: width * 0.06,
       }}> maximize</Text>
       <Text style={{
         fontSize: width * 0.06,
         fontWeight: '400',
         color: '#1a1a1a',
         marginHorizontal: width * 0.02,
         marginBottom: height * 0.04
       }}> your</Text>
       <Text style={{
         color: '#ff6600',
         fontWeight: '350',
         marginBottom: height * 0.04,
         fontSize: width * 0.06,
       }}> benefits</Text>
     </Text>
     </View>
      <View style={{ marginHorizontal: 10, marginTop: 45,backgroundColor:"#FFFFF0"}}>
   <Pressable onPress={() => navigation.navigate('Membership')}>
   <Image
  style={{
    width: width * 0.88, height: width * 0.83, marginTop: height * 0.02, 
    marginHorizontal: width * 0.04, borderRadius:25,elevation:1,
  }}
  source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Membership/Membership.png"}}/>
  </Pressable>
  <View style={{backgroundColor:"#FFFFF0"}}>
     <Text></Text> 
     <Text></Text>
     <Text></Text>
     <Text></Text>
     </View>
   </View>
 </View> 

  

 {/* Our Partners Section */}
 <View style={{ marginTop: 60, paddingBottom: 20,}}>
   {/* Modern Title Design */}
   <View style={{
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 45,
   }}>
     <View style={{
       width: width * 0.06,
       height: 2,
       backgroundColor: '#ff6600',
       opacity: 0.5,
       marginRight: width * 0.03,
       alignSelf: 'center',
     }} />
     <Text style={{ 
       fontSize: width * 0.065,
       fontWeight: '600',
       color: '#ff6600',
       letterSpacing: 0.3,
       textAlignVertical: 'center',
     }}>
       Participating Groups
     </Text>
     <View style={{
       width: width * 0.06,
       height: 2,
       backgroundColor: '#ff6600',
       opacity: 0.5,
       marginLeft: width * 0.03,
       alignSelf: 'center',
     }} />
   </View>

    {/* First Row */}
   <View style={{ 
     flexDirection: 'row', 
     justifyContent: 'space-around', 
     marginBottom: 20,
     paddingHorizontal: 25
   }}>
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner1.png"}}
       style={{ width: width * 0.25, height: width * 0.25, resizeMode: 'contain' }}
     />
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner2.png"}}
       style={{ width: width * 0.25, height: width * 0.21, resizeMode: 'contain' }}
     />
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner3.png"}}
       style={{ width: width * 0.25, height: width * 0.25, resizeMode: 'contain' }}
     />
   </View>

      {/* Second Row */}
   <View style={{ 
     flexDirection: 'row', 
     justifyContent: 'space-around',
     paddingHorizontal: 18
   }}>
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner4.png"}}
       style={{ width: width * 0.25, height: width * 0.25, resizeMode: 'contain' }}
     />
     <Image 
        source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner5.png"}}
       style={{ width: width * 0.25, height: width * 0.21, resizeMode: 'contain',marginTop:10, }}
     />
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner6.png"}}
       style={{ width: width * 0.25, height: width * 0.25, resizeMode: 'contain' }}
     />
   </View>
 </View>


   {/* First Row */}
   {/* <View style={{ 
     flexDirection: 'row', 
     justifyContent: 'center', 
     marginBottom: 35,
     gap: 40,
   }}>
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner1.png"}}
       style={{ width: width * 0.25, height: width * 0.25, resizeMode: 'contain' }}
     />
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner5.png"}}
       style={{ width: width * 0.25, height: width * 0.25, resizeMode: 'contain' }}
     />
   </View> */}
 
   {/* Second Row */}
   {/* <View style={{ 
     flexDirection: 'row', 
     justifyContent: 'center',
     marginBottom: 35,
     gap: 30,
   }}>
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner4.png"}}
       style={{ width: width * 0.31, height: width * 0.25, resizeMode: 'contain' }}
     />
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner3.png"}}
       style={{ width: width * 0.35, height: width * 0.3, resizeMode: 'contain' }}
     />
   </View> 
 */}
   {/* Third Row */}
    {/* <View style={{ 
     flexDirection: 'row', 
     justifyContent: 'center',
     marginBottom: 40,
     gap: 40,
   }}>
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner2.png"}}
       style={{ width: width * 0.25, height: width * 0.2, resizeMode: 'contain' }}
     />
     <Image 
       source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/ourpartner6.png"}}
       style={{ width: width * 0.25, height: width * 0.25, resizeMode: 'contain' }}
     />
   </View>  */}
   

   {/* And Many More Text */}
   <TouchableOpacity 
     onPress={() => navigation.navigate('TrustedPartners')}
     style={{ alignItems: 'center',}}>
    
     <View style={{flexDirection: 'row',alignItems: 'center',}}>
       <Text style={{fontSize: 17, fontWeight: '500',letterSpacing: 0.3,
         color: '#ff6600', opacity: 0.85}}>... and</Text>
       <Text style={{fontSize: 17,fontWeight: '600',letterSpacing: 0.3,
         color: '#ff6600', marginLeft: 4,}}> many</Text>
       <Text style={{fontSize: 17,fontWeight: '500',letterSpacing: 0.3,
         color: '#ff6600', opacity: 0.85,marginLeft: 4,}}>more</Text>
     </View>
   </TouchableOpacity>
 

 {/* Follow Us Section - Modern Design */}
 <View style={{backgroundColor: '#fff',marginTop: 150,paddingVertical: 20,}}>
    <View style={{ alignItems: 'center' }}>
       <Text style={{fontSize: 16,fontWeight: '600',color: '#333',marginBottom: 15,letterSpacing: 0.5
       }}>Connect With Us</Text>
       
       <View style={{flexDirection: 'row',justifyContent: 'center',gap: 15, marginBottom: 20}}>
         <TouchableOpacity 
           onPress={() => openURL('https://www.instagram.com/sportzonindia/')}
           style={{
             backgroundColor: '#fff',padding: 10,borderRadius: 10,shadowColor: '#000',
             shadowOffset: {width: 0,height: 1,},
             shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,
           }}
         >
           <Ionicons name="logo-instagram" size={22} color="#E1306C" />
         </TouchableOpacity>

         <TouchableOpacity 
           onPress={() => openURL('https://www.youtube.com/@sportzongameon')}
           style={{
             backgroundColor: '#fff',padding: 10,borderRadius: 10,shadowColor: '#000',
             shadowOffset: {width: 0,height: 1,},
             shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,
           }}
         >
           <Ionicons name="logo-youtube" size={22} color="#FF0000" />
         </TouchableOpacity>

         <TouchableOpacity 
           onPress={() => openURL('https://wa.me/9654696000')}
           style={{
             backgroundColor: '#fff',padding: 10,borderRadius: 10,shadowColor: '#000',
             shadowOffset: {width: 0,height: 1,},
             shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,
           }}
         >
           <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
         </TouchableOpacity>

     <TouchableOpacity 
       onPress={() => openURL('https://www.linkedin.com/company/sportzon-india/')}
       style={{backgroundColor: '#fff',padding: 10,borderRadius: 10,shadowColor: '#000',
             shadowOffset: { width: 0,height: 1,},
             shadowOpacity: 0.1, shadowRadius: 2,elevation: 2,}}>
       <Ionicons name="logo-linkedin" size={22} color="#0077B5" />
     </TouchableOpacity>

     <TouchableOpacity 
       onPress={() => openURL('https://www.facebook.com/sportzonindia/')}
       style={{ backgroundColor: '#fff',padding: 10,borderRadius: 10,shadowColor: '#000',
       shadowOffset: { width: 0, height: 1, },
             shadowOpacity: 0.1, shadowRadius: 2,elevation: 2,}} >
        <Ionicons name="logo-facebook" size={22} color="#4267B2" />
    </TouchableOpacity>
    </View>

       {/* Footer */}
   <View style={{ alignItems: 'center', marginTop: 40 }}>
    <Image style={{width: 100, height: 60, resizeMode: 'contain', marginBottom: 8 }}
           source={{uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/sportzon_logo.png"}}
         />
    <Text style={{ color: '#666', textAlign: 'center',fontSize: 11, fontWeight: '500',
           letterSpacing: 0.5}}>Your Game, Your Venue, Your Time</Text>
         
    <Text style={{color: '#999',textAlign: 'center',fontSize: 10,marginTop: 8, marginBottom: 15
                    }}>© 2024 Sportzon. All rights reserved.</Text>
   </View>
  </View>
 </View>

 </ScrollView>
</SafeAreaView>
    </>
  );
};

export default HomeScreen;