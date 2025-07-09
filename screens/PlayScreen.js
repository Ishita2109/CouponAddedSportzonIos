import { Text, View, SafeAreaView, Image, TextInput, Pressable, Dimensions, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import useBookings from '../hooks/useBookings';
import { useNavigation } from '@react-navigation/native';

const Venues = () => {
    const navigation = useNavigation();
    const { bookings, loading, error, refetch } = useBookings('venue');

    const renderBookingCard = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 15,
                marginHorizontal: 16,
                marginVertical: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
            }}
            onPress={() => navigation.navigate('MyBookingsDetails', { booking: item })}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>{item.venue_name}</Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>{item.date} • {item.time}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff6600' }}>₹{item.amount}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#063970" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>
                <TouchableOpacity 
                    style={{ 
                        backgroundColor: '#ff6600',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 5
                    }} 
                    onPress={refetch}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!bookings.length) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#666' }}>Oops!</Text>
                <Text style={{ fontSize: 16, color: '#666' }}>No Venues Booked Yet</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={bookings}
                renderItem={renderBookingCard}
                keyExtractor={item => item.id?.toString()}
                contentContainerStyle={{ paddingVertical: 16 }}
                onRefresh={refetch}
                refreshing={loading}
            />
        </View>
    );
};

const Events = () => {
    const navigation = useNavigation();
    const { bookings, loading, error, refetch } = useBookings('event');

    const renderBookingCard = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 15,
                marginHorizontal: 16,
                marginVertical: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
            }}
            onPress={() => navigation.navigate('MyBookingsDetails', { booking: item })}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>{item.venue_name}</Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>{item.date} • {item.time}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff6600' }}>₹{item.amount}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#063970" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>
                <TouchableOpacity 
                    style={{ 
                        backgroundColor: '#ff6600',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 5
                    }} 
                    onPress={refetch}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!bookings.length) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ fontSize: 16, color: '#666' }}>Oops!</Text>
               <Text style={{ fontSize: 16, color: '#666' }}>No Events Booked Yet</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={bookings}
                renderItem={renderBookingCard}
                keyExtractor={item => item.id?.toString()}
                contentContainerStyle={{ paddingVertical: 16 }}
                onRefresh={refetch}
                refreshing={loading}
            />
        </View>
    );
};

const Classes = () => {
    const navigation = useNavigation();
    const { bookings, loading, error, refetch } = useBookings('class');

    const renderBookingCard = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 15,
                marginHorizontal: 16,
                marginVertical: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
            }}
            onPress={() => navigation.navigate('MyBookingsDetails', { booking: item })}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>{item.venue_name}</Text>
                <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>{item.date} • {item.time}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ff6600' }}>₹{item.amount}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#063970" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>
                <TouchableOpacity 
                    style={{ 
                        backgroundColor: '#ff6600',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 5
                    }} 
                    onPress={refetch}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!bookings.length) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ fontSize: 16, color: '#666' }}>Oops!</Text>
               <Text style={{ fontSize: 16, color: '#666' }}>No Classes Booked Yet</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={bookings}
                renderItem={renderBookingCard}
                keyExtractor={item => item.id?.toString()}
                contentContainerStyle={{ paddingVertical: 16 }}
                onRefresh={refetch}
                refreshing={loading}
            />
        </View>
    );
};

const BookScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'venues', title: 'Venues ' },
    { key: 'events', title: 'Events' },
    { key: 'classes', title: 'Classes' },
  ]);

  const renderScene = SceneMap({
    venues: Venues,
    events: Events,
    classes: Classes,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: 0 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: '#ff6600',
              height: 2,
            }}
            style={{
              backgroundColor: '#fff',
              elevation: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0',
              height: 60,
            }}
            labelStyle={{
              color: 'gray',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              paddingVertical: 50,
            }}
            tabStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeColor="#ff6600"
            inactiveColor="gray"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default BookScreen;
