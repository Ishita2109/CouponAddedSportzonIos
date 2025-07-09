import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// Dummy content for each tab
const Venues = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }}>
    <Text style={{fontWeight:700, fontSize:20,color:'black'}}>No Order History</Text>
    <Text style={{fontWeight:500, fontSize:15,}}>No history of bookings made yet!</Text>
  </View>
);

const Events = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }}>
    <Text style={{fontWeight:700, fontSize:20,color:'black'}}>No Order History</Text>
    <Text style={{fontWeight:500, fontSize:15,}}>No history of bookings made yet!</Text>
  </View>
);

const Classes = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }}>
    <Text style={{fontWeight:700, fontSize:20,color:'black'}}>No Order History</Text>
    <Text style={{fontWeight:500, fontSize:15,}}>No history of bookings made yet!</Text>
  </View>
);

const BookScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'venues', title: 'Venues (242)' },
    { key: 'events', title: 'Events (3)' },
    { key: 'classes', title: 'Classes (3)' },
  ]);

  const renderScene = SceneMap({
    venues: Venues,
    events: Events,
    classes:Classes,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

      {/* Header 
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text>Jaipur</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={require('../assets/images/Profile_icon.jpg')} />
        </View>
      </View>*/}

     

     
      {/* Sliding Tabs */}
      <TabView
        navigationState={{ index, routes }} //index: The currently active tab (e.g., 0 for the first tab).
        //   routes: An array of objects representing the tabs. Each object has:key: A unique identifier for the tab.title: The text displayed on the tab.
        renderScene={renderScene} //what content to show
        onIndexChange={setIndex} //updates to current index
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{  // Styles the underline
              backgroundColor: '#ff6600',
              height: 2,
            }}
            style={{  // Styles the tab bar background
              backgroundColor: '#fff',
              elevation: 0, // Removes shadow
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0',
            }}
            labelStyle={{ // Styles the tab text
              color: 'gray',
              fontWeight: 'bold',
            }}
            activeColor="#ff6600"               // Active tab text color (green)
            inactiveColor="gray"
          />
        )}
      />

    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0, // Removes shadow
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    color: 'gray',
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: 'green',
    height: 2,
  },
});
