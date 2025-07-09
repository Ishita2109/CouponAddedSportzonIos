import { View, Text, Image, SafeAreaView, FlatList, ScrollView, Alert, Linking,TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SessionManager from '../../utils/sessionManager';


const EventDetail = () => {
  const route = useRoute();
  const { item } = route.params; // Event details passed via navigation.
  const { width } = useWindowDimensions();
  const [events, setEvents] = useState([]); 
  const navigation = useNavigation(); 
  
  /* const pdfPath = '../asset/pdf/championsofncr.pdf';

  const openPDF = () => {
    Linking.openURL(pdfPath).catch(err => console.error("Couldn't open PDF", err));
  };  */

  const pdfUrl = 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Event+Pdf/championsofncr.pdf'

    const openPDF = () => {
        Linking.openURL(pdfUrl).catch(err => console.error('Error opening PDF:', err));
    };
 
 


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Modern Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderRadius: 24,
          padding: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#063970" />
      </TouchableOpacity>
      {/* Image Carousel */}
      <View style={{ height: 250 }}>
        <FlatList
          data={[item.image]} // Add more image URLs here for the slider.
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: image }) => (
            <Image source={{ uri: image }} style={{ width: width, height: '100%' }} />
          )}
          keyExtractor={(image, index) => image + index.toString()}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Event Name and Basic Details */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>{item.name}</Text>
        <Text style={{ fontSize: 14, marginBottom: 10, color: 'black' }}>Timings: {item.timings}</Text>
        <Text style={{ fontSize: 14, color: '#777', marginBottom: 20 }}>{item.address2}</Text>

        {/* About Event Section */}
        <View style={{ 
          backgroundColor: '#fffff', 
          borderRadius: 12, 
          padding: 12, 
          marginTop: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '700', 
            color: '#063970',
            marginBottom: 12,
            letterSpacing: 0.5,
          }}>About Venue</Text>
          <RenderHTML 
            contentWidth={width} 
            source={{ html: item.description }}
            baseStyle={{
              textAlign: 'justify',
            }}
            tagsStyles={{
              p: { 
                fontSize: 15,
                lineHeight: 24,
                color: '#495057',
                marginBottom: 8,
                textAlign: 'justify',
              },
              strong: {
                fontWeight: '600',
                color: '#063970',
              },
              ul: {
                marginLeft: 16,
                marginBottom: 8,
              },
              li: {
                fontSize: 15,
                lineHeight: 24,
                color: '#495057',
                textAlign: 'justify',
              },
              div: {
                textAlign: 'justify',
              }
            }}
          />
        </View>

        
         {/* PDF Section - Only for Event ID 2 */}
         {item.id === '1' && (
        <View style={{ marginTop: 10,  }}>
    
         {/* For More Details Text */}
         <Text style={{ fontSize: 12, color: 'black', marginBottom: 10, textAlign: 'justify' }}>Note: For all details regarding this event, please refer to the PDF below. Download it and carefully review all the rules and guidelines before applying.</Text>
         
 {/* PDF + BOOK Button */}
   <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%',  marginTop: 40 }}>

   {/* PDF Button */}
  <TouchableOpacity 
    style={{
      width: '50%', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
      paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#063970',
      justifyContent: 'center', gap:8,paddingHorizontal:20,marginHorizontal:7,
    }} 
     onPress={openPDF} 
  >
    <Ionicons name="download-outline" size={18} color="#063970" />
    <Text style={{ color: '#063970', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Champions Of NCR</Text>
  </TouchableOpacity>

 {/* Book Now Button */}
<TouchableOpacity
    style={{
      width: '45%', backgroundColor: '#063970', paddingVertical: 10, borderRadius: 8,
      justifyContent: 'center', alignItems: 'center', marginHorizontal:7,
    }}
    onPress={async () => {
      const isGuest = await SessionManager.isGuestMode();
      if (isGuest) {
        Alert.alert(
          'Authentication Required',
          'Please sign in or create an account to register for this event.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign In', onPress: () => navigation.navigate('LoginModal') },
            { text: 'Register', onPress: () => navigation.navigate('BasicInfo') }
          ]
        );
        return;
      }
      navigation.navigate('EventRegistrationForm');
    }}
  >
    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>+ Book Now</Text>
  </TouchableOpacity>

</View>
</View>
)}

{/* If Event is Not ID 2, Show Bookings Closed */}
{item.id !== '1' && (
  <View style={{
    marginTop: 30, padding: 15, borderRadius: 10, alignItems: 'center',
    backgroundColor: '#ffcccc', borderColor: '#ff4d4d', borderWidth: 1,
  }}>
    <Text style={{ color: '#ff4d4d', fontSize: 16, fontWeight: 'bold' }}>🚫 Bookings Closed</Text>
  </View>
)}

{/* Book Now Button for ID 1 and 2 */}
{/* {(item.id === '1' || item.id === '2') && (
  <TouchableOpacity
    style={{
      marginTop: 30,
      width: '100%',
      backgroundColor: '#063970',
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={() => navigation.navigate('EventRegistrationForm')}
  >
    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>+ Book Now</Text>
  </TouchableOpacity>
)} */}

      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetail;