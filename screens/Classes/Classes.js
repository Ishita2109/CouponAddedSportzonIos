import React from "react";
import { View, Text, Image, FlatList, Pressable, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ClassesData } from "./ClassesData";

const { width, height } = Dimensions.get("window");

const SportsApp = () => {
  const navigation = useNavigation();

  // Modern Back Button
  const BackButton = () => (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        top: height * 0.025,
        left: width * 0.045,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name="arrow-back" size={30} color="#063970" />
    </Pressable>
  );

  const renderCard = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('ClassesDetails', { item })}
      style={{
        width: width * 0.9,  backgroundColor: "white", borderRadius: 15,
        padding: width * 0.04,
        marginVertical: height * 0.01,
        alignSelf: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: '#063970',
        borderWidth: 0.5
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: width * 0.33, height: height * 0.14, borderRadius: 6, marginRight: width * 0.025 }}
        />
        <View style={{ flex: 1, justifyContent: "space-between", height: height * 0.14 }}>
          <Text style={{ fontSize: width * 0.04, fontWeight: "bold", color: "#063970", marginLeft: width * 0.015 }}>{item.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: height * 0.005 }}>
            <Ionicons name="location-outline" size={width * 0.035} color="#FF5F1F" />
            <Text style={{ fontSize: width * 0.035, color: "#555", marginLeft: width * 0.01 }}>{item.address1}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: height * 0.005, marginLeft: width * 0.015, marginBottom: height * 0.005 }}>
            <Text style={{ fontSize: width * 0.035, fontWeight: "bold", color: "#063970" }}>Fee: {item.price}</Text>
            <Text style={{ fontSize: width * 0.03, color: "#063970", marginLeft: width * 0.01 }}>Onwards</Text>
            <Image
              source={{ uri: item.icon }}
              style={{ width: width * 0.04, height: width * 0.04, marginLeft: width * 0.025 }}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: "#063970", borderRadius: 22, flexDirection: "row",
              alignItems: "center", justifyContent: "center", paddingVertical: height * 0.01,
              width: width * 0.3, marginTop: height * 0.01, alignSelf: 'flex-end',
              borderColor: "#063970",borderWidth: 1 }}>
                
            <Ionicons name="bookmark-outline" size={width * 0.035} color="white" style={{ marginRight: width * 0.015 }} />
            <Text style={{ color: "white", fontSize: width * 0.03, fontWeight: "bold" }}>JOIN NOW</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <BackButton />
      <Image
        source={require('../../assets/images/classbanner.png')}
        style={{ width: width * 0.7, height: height * 0.17, marginTop: height * 0.05, alignSelf: "center" }}
      />
      <View style={{ paddingTop: height * 0.03, marginHorizontal: width * 0.06, marginVertical: height * 0.005,  }}>
        <Text style={{ color: "#063970", fontSize: width * 0.05, fontWeight: 'bold' }}>Classes Available</Text>
      </View>
      <FlatList
        data={ClassesData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: height * 0.02 }}
      />
    </View>
  );
};

export default SportsApp;
