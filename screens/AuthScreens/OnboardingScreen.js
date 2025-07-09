import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/OB1.png',
    topText: 'Game On with Sportzon',
    bottomText: `Welcome to Sportzon!\nYour gateway to an active lifestyle.\nLet's connect, play, and thrive together!`,
  },
  {
    key: '2',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/OB2.png',
    topText: 'Find. Book. Play',
    bottomText: `Thrilling tournaments to casual matches book events tailored to your passion for sports.`,
  },
  {
    key: '3',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/O3.png',
    topText: 'Gear Up Skill Up',
    bottomText: `Expert-led classes to elevate your\nskills and top-quality sports equipment.`,
    isLast: true,
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScrollComplete, setAutoScrollComplete] = useState(false);
  const autoScrollIntervalRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (!autoScrollComplete) {
      autoScrollIntervalRef.current = setInterval(() => {
        flatListRef.current?.scrollToIndex({
          index: (currentIndex + 1) % slides.length,
          animated: true,
        });

        if (currentIndex === slides.length - 1) {
          clearInterval(autoScrollIntervalRef.current);
          setAutoScrollComplete(true);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, 2500);
    }

    return () => clearInterval(autoScrollIntervalRef.current);
  }, [currentIndex, autoScrollComplete]);

  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.image }}
            style={{ flex: 1, width, height }}
            resizeMode="cover"
          >
            {/* Top Text */}
            <Text style={{
              position: 'absolute',
              top: item.key === '3' ? height * 0.08 : height * 0.05,
              alignSelf: 'center',
              fontSize: item.key === '3' ? width * 0.08 : width * 0.07,
              fontWeight: item.key === '2' ? '900' : 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
              {item.topText}
            </Text>

            {/* Bottom Text */}
            <Text style={{
              position: 'absolute',
              bottom: (item.key === '1' || item.key === '2') ? height * 0.22 : undefined,
              top: item.key === '3' ? height * 0.16 : undefined,
              alignSelf: 'center',
              width: item.key === '1' ? '91%' : item.key === '2' ? '80%' : '89%',
              fontSize: item.key === '1' ? width * 0.052 : item.key === '2' ? width * 0.055 : width * 0.046,
              textAlign: 'center',
              color: 'white',
              fontWeight: item.key === '1' ? '500' : item.key === '2' ? '500' : '400',
              lineHeight: item.key === '1' ? width * 0.075 : item.key === '2' ? width * 0.075 : width * 0.065,
              letterSpacing: 0.99,
            }}>
              {item.bottomText}
            </Text>

            {/* Final Button */}
            {item.isLast && (
              <View style={{
                position: 'absolute',
                bottom: height * 0.13,
                width: '80%',
                alignSelf: 'center',
              }}>
                <Pressable
                  onPress={() => navigation.navigate('LoginModal')}
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: height * 0.014,
                    width: width * 0.55,
                    borderRadius: width * 0.08,
                    elevation: 5,
                    alignSelf: 'center',
                    marginBottom: 50,
                  }}
                >
                  <Text style={{
                    color: '#001F3F',
                    fontSize: width * 0.049,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                    Let's Get Playing!
                  </Text>
                </Pressable>
              </View>
            )}
          </ImageBackground>
        )}
        keyExtractor={item => item.key}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
