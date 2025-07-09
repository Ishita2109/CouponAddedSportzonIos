import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useWindowDimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const categories = [
  { name: 'Cricket', icon: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png" },
  { name: 'Football', icon: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png"},
  { name: 'Basketball', icon: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png" },
  { name: 'Table Tennis', icon: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png"},
  { name: 'Tennis', icon: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/tennis.png"},
  { name: 'Badminton', icon: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/badminton.png" },
  { name: 'Speed Skating', icon: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/skating.png"},
];

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

const GearScreen = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Responsive sizes
  const headerFont = clamp(width * 0.08, 26, 38);
  const subHeaderFont = clamp(width * 0.045, 15, 22);
  const searchHeight = clamp(height * 0.06, 38, 54);
  const cardWidth = clamp(width * 0.19, 60, 90);
  const cardHeight = cardWidth * 1.13;
  const iconSize = cardWidth * 0.52;
  const cardFont = clamp(cardWidth * 0.19, 11, 14);
  const sectionTitleFont = clamp(width * 0.05, 16, 22);
  const soonTitleFont = clamp(width * 0.06, 18, 28);
  const soonSubFont = clamp(width * 0.045, 13, 18);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{
          backgroundColor: '#ff5722',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          alignItems: 'center',
          paddingBottom: 18,
          paddingVertical: height * 0.035,
          paddingHorizontal: width * 0.05,
          position: 'relative',
        }}>
          {/* Back Button inside header */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: insets.top + 8,
              left: 8,
              zIndex: 10,
              padding: 8,
            }}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 2, fontSize: headerFont }}>Gears</Text>
          <Text style={{ color: 'white', textAlign: 'center', marginBottom: 12, marginTop: 2, fontSize: subHeaderFont }}>
            Find the <Text style={{ fontWeight: 'bold' }}>best</Text> quality <Text style={{ fontWeight: 'bold' }}>Gear</Text> for your sporty hobby!
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: '#ff6600',
            borderWidth: 1,
            paddingHorizontal: 14,
            width: '100%',
            maxWidth: 500,
            alignSelf: 'center',
            marginTop: 6,
            borderRadius: width * 0.08,
            height: searchHeight,
          }}>
            <TextInput
              style={{ flex: 1, color: '#222', fontSize: clamp(width * 0.04, 13, 18) }}
              placeholder="Search for 'helmet' or 'football shoes'..."
              placeholderTextColor="#888"
            />
            <Icon name="search" size={clamp(width * 0.05, 18, 24)} color="#FF5722" />
          </View>
        </View>

        <Text style={{
          fontWeight: 'bold',
          color: '#000',
          paddingHorizontal: 18,
          marginBottom: 8,
          fontSize: sectionTitleFont,
          marginTop: height * 0.02,
        }}>
          Top Categories
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: width * 0.03, paddingBottom: 8 }}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: 'white',
                borderColor: '#FF5722',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                marginVertical: 4,
                width: cardWidth,
                height: cardHeight,
                borderRadius: cardWidth * 0.22,
                marginHorizontal: width * 0.012,
                shadowRadius: 4,
              }}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: category.icon }}
                style={{ width: iconSize, height: iconSize, marginBottom: 8, alignSelf: 'center' }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: cardFont, fontWeight: '600', color: '#FF5722', textAlign: 'center' }}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ alignItems: 'center', marginTop: 72 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4, color: '#222', textAlign: 'center', fontSize: soonTitleFont }}>Get Ready to Gear Up</Text>
          <Text style={{ color: '#444', marginBottom: 8, textAlign: 'center', fontSize: soonSubFont }}>Launching Soon!</Text>
          <Image
            style={{ width: width * 0.8, height: height * 0.28, resizeMode: 'contain', marginTop: 10 }}
            source={require('../assets/images/image.jpeg')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GearScreen;
