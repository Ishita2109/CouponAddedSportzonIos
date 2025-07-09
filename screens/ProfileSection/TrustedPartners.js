import { FlatList, Image, View, Text, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const images = [
  { id: '1', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_1.png"}},
  { id: '2', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_15.jpeg"} },
  { id: '3', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_3.png"} },
  { id: '4', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_4.png"}},
  { id: '5', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_5.png"} },
  { id: '6', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_8.png"}},
  { id: '7', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_9.png"} },
  { id: '8', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_6.png"} },
  { id: '9', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_7.png"} },
  { id: '10', src: {uri:"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_10.png"} },
  { id: '11', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_11.png"}},
  { id: '12', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_12.png"} },
  { id: '13', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_13.png"}},
  { id: '14', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_14.jpeg"}},
  { id: '15', src: {uri: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Our+Partners/partner_2.png"}},
];

const imageStyles = {
  '1': { width: width / 3, height: 100 },
  '2': { width: width / 4, height: 85 },
  '3': { width: width / 4 + 20, height: 110 },
  '4': { width: width / 2, height: 109 },
  '5': { width: width / 2 - 70, height: 50 },
  '6': { width: width / 2 - 30, height: 110 },
  '7': { width: width / 4 + 30, height: 77 },
  '8': { width: width / 2 - 12, height: 75 },
  '9': { width: width / 2 - 10, height: 45 },
  '10': { width: width / 2 - 20, height: 100 },
  '11': { width: width / 3 - 5, height: 95 },
  '12': { width: width / 4, height: 105 },
  '13': { width: width / 3 + 5, height: 115 },
  '14': { width: width / 4, height: 95 },
  '15': { width: width / 2, height: 40 },
};

const ImageGrid = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>OUR TRUSTED</Text>
          <Text style={styles.subtitle}>PARTNERS</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.gridContainer}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={item.src}
                  style={[styles.image, imageStyles[item.id]]}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
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
  spacer: {
    width: 40, // Same width as the back button container
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
  },
  gridContainer: {
    flex: 1,
    padding: 10,
  },
  gridContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    padding: 8,
  },
  imageWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 150,
  },
  image: {
    resizeMode: 'contain',
  },
});

export default ImageGrid;
