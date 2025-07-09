
import { View, Text, Image, SafeAreaView, FlatList, ScrollView, Linking,TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


const formatEventData = (event) => ({
  id: event._id,  // API se aane wala ID
  name: event.title,  // API me "title" hai, saved array me "name"
  address1: event.city + ", " + event.state,
  address2: event.address,
  image: event.banner,  // API me "banner" hai, saved array me "image"
  date: formatDate(event.eventDate, event.eventEndDate),
  timings: `${event.eventTime.from} - ${event.eventTime.to}`,
  entryFees: event.entryFees,
  memberType: event.memberType,
  memberLimit: event.memberLimit,
  totalSlots: event.totalSlots,
  ticketSystem: event.ticketSystem,
  emptySlots: event.emptySlots,
  description: event.description,
});





const EventDetail = () => {
  const route = useRoute();
  const { item } = route.params; // Event details passed via navigation.
  const { width } = useWindowDimensions();
  const [events, setEvents] = useState([]); 
  


  

const pdfPath = '../asset/pdf/Champions_of_NCR.pdf';

  // Dynamic PDF URL (Enable this when fetching from an API)
  // const pdfUrl = item.pdfUrl; 

  const openPDF = () => {
    Linking.openURL(pdfPath).catch(err => console.error("Couldn't open PDF", err));
  };

  return (
       




    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

       
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>About Venue</Text>
        <RenderHTML contentWidth={width} source={{ html: item.description }} />

        
         {/* PDF Section - Only for Event ID 2 */}
         {item.id === '2' && (
        <View style={{ marginTop: 10,  }}>
    
         {/* For More Details Text */}
         <Text style={{ fontSize: 13, color: 'black', marginBottom: 10, textAlign: 'justify' }}>Note: For all details regarding this event, please refer to the PDF below. Download it and carefully review all the rules and guidelines before applying.</Text>

         {/* PDF & Book Now in One Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop:60, marginBottom:1 }}>
      
          {/* PDF Button */}
          <TouchableOpacity 
           style={{
            flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
            paddingVertical: 11, paddingHorizontal: 10, borderRadius: 8, 
            borderWidth: 1,  borderColor: '#063970', justifyContent: 'center',marginRight:20, marginLeft:5,}} 
            onPress={openPDF} >
        
            <Ionicons name="download-outline" size={19} color="#063970" style={{ marginRight: 5 }} />
            <Text style={{ color: '#063970', fontSize: 14, fontWeight: 'bold' }}>Champions Of NCR</Text>
          </TouchableOpacity>

      {/* Book Now Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#063970',paddingVertical: 6, paddingHorizontal: 30, borderRadius: 8,
           justifyContent: 'center', marginLeft: 10,marginRight:10, }}
        onPress={() => console.log('Booking...')}
      >
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>+ Book Now</Text>
      </TouchableOpacity>

    </View>
  </View>
)}

{/* If Event is Not ID 2, Show Bookings Closed */}
{item.id !== '2' && (
  <View style={{
    marginTop: 30, padding: 15, borderRadius: 10, alignItems: 'center',
    backgroundColor: '#ffcccc', borderColor: '#ff4d4d', borderWidth: 1,
  }}>
    <Text style={{ color: '#ff4d4d', fontSize: 16, fontWeight: 'bold' }}>🚫 Bookings Closed</Text>
  </View>
)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetail;
