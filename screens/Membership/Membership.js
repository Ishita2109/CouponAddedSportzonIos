import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const MembershipScreen = () => {
  const navigation = useNavigation();
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get('https://sportzon.in/api/landing/subscription');
        const modifiedData = response.data.data.map(item => {
          let color = '';
          let screen = '';
          let title = '';
          let extention = '';
          let pricecut = '';
          let price = '';
          let tagBgColor = '';
          let tagTextColor = '';
          let benefits = [];

          switch (item.planName) {
            case 'Silver':
              color = '#002AC9';
              extention = '15';
              screen = 'MemSilverScreen';
              pricecut = '1200';
              price = '999';
              tagBgColor = '#E0E0E0';
              tagTextColor = '#808080';
              benefits = [
                'Get Free 15 days extension.',
                'Get 5% off on all Sportzon Merchandise',
                '2 more Offers'
              ];
              title = 'SILVER MEMBERSHIP';
              break;

            case 'Gold':
              color = '#002AC9';
              extention = '30';
              screen = 'MemGoldScreen';
              pricecut = '2000';
              price = '1499';
              tagBgColor = '#bf9b30';
              tagTextColor = 'white';
              benefits = [
                'Get Free 30 days extension.',
                'Get 10% off on all Sportzon Merchandise.',
                'Recharge your Credit Wallet and enjoy 10% extra every time!',
                '2 more Offers'
              ];
              title = 'GOLD MEMBERSHIP';
              break;

            case 'Platinum':
              color = '#002AC9';
              extention = '45';
              screen = 'MemPlatScreen';
              pricecut = '3500';
              price = '2500';
              tagBgColor = '#a0a09e';
              tagTextColor = 'white';
              benefits = [
                'Get Free 45 days extension.',
                'Get 15% off on all Sportzon Merchandise.',
                'Recharge your Credit Wallet and enjoy 10% extra every time!',
                '2 more Offers'
              ];
              title = 'PLATINUM MEMBERSHIP';
              break;

            case 'Corporate / Institutional':
              color = '#002AC9';
              extention = '45';
              screen = 'MemCorporateScreen';
              pricecut = '7000';
              price = '5000';
              tagBgColor = '#4B0082';
              tagTextColor = '#fff';
              benefits = [
                'Get Free 45 days extension.',
                'Get 15% off on all Sportzon Merchandise.',
                'Recharge your Credit Wallet and enjoy 10% extra every time!',
                '2 more Offers'
              ];
              title = 'CORPORATE MEMBERSHIP';
              break;

            default:
              color = '#FFFFFF';
              screen = 'DefaultScreen';
          }

          return { ...item, color, screen, benefits, extention, title, pricecut, price, tagBgColor, tagTextColor };
        });

        setMemberships(modifiedData);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    fetchMemberships();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 10,
            left: 15,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 20,
            padding: 8,
          }}
        >
          <Icon name="arrow-back" size={24} color="#002AC9" />
        </TouchableOpacity>

        {/* Membership Banner */}
        <View>
          <Image
            style={{ width: '100%', height: 310, borderBottomLeftRadius: 17, borderBottomRightRadius: 17 }}
            resizeMode="stretch"
            source={require('../../assets/images/membanner.png')}
          />
        </View>

        {/* Membership Plans */}
        <View style={{ padding: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 10 }}>  Select a Membership</Text>

          {memberships?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen, { planDetails: item })}
              style={{ marginTop: 10, borderRadius: 15, overflow: 'hidden', width: '100%', height:300,}}
            >
              <LinearGradient
                colors={['#1E3C72', '#2A5298', '#1E3C72']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: 20,
                  borderRadius: 15,
                  flexGrow: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                {/* Membership Tag */}
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 50,
                    backgroundColor: item.tagBgColor,
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <Text style={{ color: item.tagTextColor, fontSize: 12, fontWeight: 'bold' }}>
                    {item.title}
                  </Text>
                </View>

                {/* Extension and Price */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View>
                    <Text style={{ color: '#C0C0C0', fontSize: 35, fontWeight: 'bold' }}>+{item.extention}</Text>
                    <Text style={{ color: '#C0C0C0', fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
                      DAYS
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        textDecorationLine: 'line-through',
                        marginRight: 10,
                        marginLeft: 30,
                      }}
                    >
                      ₹ {item.pricecut}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 31, fontWeight: 'bold', marginLeft: 30 }}>
                      ₹ {item.price}
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        / yearly
                      </Text>
                    </Text>
                  </View>
                </View>

                <View style={{ height: 1, backgroundColor: '#aaa', marginVertical: 10 }} />

                {/* Benefits List */}
                <View style={{
                  width: '100%',
                  flexDirection: 'column',
                }}>
                  {item.benefits.map((line, idx) => (
                    <Text
                      key={idx}
                      style={{
                        color: 'white',
                        fontSize: 15,
                        marginBottom: 7,
                        width: '100%',
                        flexShrink: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      + {line}
                    </Text>
                  ))}
                </View>

              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MembershipScreen;
