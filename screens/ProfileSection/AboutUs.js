import { StyleSheet, Text, View, Image, Dimensions, useWindowDimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useFonts } from '../../hooks/useFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const { width } = useWindowDimensions();
  const fontsLoaded = useFonts();
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#001F3F" />
      </View>
    );
  }

  return (
    <LinearGradient 
      colors={['white', 'white']}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>About Us</Text>
        </View>
        <View style={styles.spacer} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 23, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 100, marginBottom: 40, alignItems: 'center' }}>
          <Text style={{ 
            fontSize: 42, 
            textAlign: 'center', 
            color: '#001F3F', 
            letterSpacing: 1,
            lineHeight: 50,
            fontStyle: 'italic',
            //fontFamily: 'PlayfairDisplay-Italic',
            includeFontPadding: false,
            textAlignVertical: 'center',
          }}>
            Bringing Sports
          </Text>
          
          <Text style={{ 
            fontSize: 42, 
            textAlign: 'center', 
            color: '#001F3F', 
            letterSpacing: 1,
            lineHeight: 50,
            fontFamily: 'NotoSerif-Italic',
            marginTop: 5,
            includeFontPadding: false,
            textAlignVertical: 'center',
          }}>
            Closer
          </Text>
          
          <Text style={{ 
            fontSize: 42, 
            textAlign: 'center', 
            color: '#001F3F', 
            letterSpacing: 1,
            lineHeight: 50,
            fontFamily: 'NotoSerif-Italic',
            marginTop: 5,
            includeFontPadding: false,
            textAlignVertical: 'center',
          }}>
            Anytime Anywhere
          </Text>
        </View>

        <Text style={{ 
          fontSize: 14, 
          textAlign: 'justify', 
          color: '#001F3F',
          lineHeight: 24,
          letterSpacing: 0.5,
          marginBottom: 30,
          fontFamily: 'PlayfairDisplay-Regular',
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}>
          Sportzon, your all-encompassing sports companion, extends its reach through both a dynamic website and a user-friendly mobile app. Seamlessly integrating technology into the world of sports, we bring you a unified platform that caters to all your athletic needs, whether you're exploring on the web or on the go. Discover, engage, and elevate your sports experience with Sportzon - where innovation meets accessibility.
        </Text>

        <Image
          source={{ uri: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Profile+Screen/WhatsApp+Image+2025-04-10+at+4.19.15+PM.jpeg' }}
          style={{ width: width * 0.6, height: width * 0.7, alignSelf: 'center', marginTop: 30, marginBottom: 10 }}
        />
        <Text style={{
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 30,
          color: '#001F3F',
          letterSpacing: 0.5,
          fontFamily: 'PlayfairDisplay-Italic',
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}>
          Manoj Attri, Founder at Sportzon
        </Text>

        <Text style={{ 
          fontSize: 14, 
          textAlign: 'justify', 
          color: '#001F3F',
          lineHeight: 24,
          letterSpacing: 0.5,
          marginBottom: 30,
          fontFamily: 'PlayfairDisplay-Regular',
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}>
          Individuals can use the Sportzon app to find nearby sports complexes, book court time, and connect with coaches and personal trainers. Businesses can utilize the app to promote their sports complexes, events, and services. Sportzon is a prime example of how technology can enhance lives by making it easier for people to discover and engage in sports, ultimately leading to a healthier and happier lifestyle.
        </Text>

        {/* <Text style={{ fontSize: 13, marginBottom: 10, textAlign: 'justify', color: '#001F3F' }}>
          For any inquiries or assistance, feel free to contact us via email at info@sportzon.in or call our enquiry number at 9654696000. Our support team is available from 9 AM to 7 PM. We aim to respond to enquiries within 1 to 3 business days.
        </Text> */}
      </ScrollView>
    </LinearGradient>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001F3F',
  },
  spacer: {
    width: 40,
  },
});
