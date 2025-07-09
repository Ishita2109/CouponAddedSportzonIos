import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, } from "react-native";
import { useNavigation } from '@react-navigation/native';
const MembershipScreen = () => {

  const navigation = useNavigation();

  const memberships = [
    {
      title: "Silver Membership",
      price: "Rs. 999/ Yearly",
      benefits: ["Access to all Sportzon venues.", "Get Free 15 days extension."],
      color: "#A0A0A0",
      image: require("../assets/images/member_silver.png"),
      screen: "MemSilverScreen",
    },
    {
      title: "Gold Membership",
      price: "Rs. 1499/ Yearly",
      benefits: ["Access to all Sportzon venues.", "Get Free 30 days extension."],
      color: "#CD853F",
      image: require("../assets/images/member_plat.png"),
      screen: "MemGoldScreen",
    },
    {
      title: "Platinum Membership",
      price: "Rs. 2500/ Yearly",
      benefits: ["Access to all Sportzon venues.", "Get Free 45 days extension."],
      color: "#6A5ACD",
      image: require("../assets/images/member_gold.png"),
      screen: "MemPlatScreen",
    },
    {
      title: "Corporate Membership",
      price: "Rs. 5000/ Yearly",
      benefits: ["Access to all Sportzon venues.", "Get Free 45 days extension."],
      color: "#C71585",
      image: require("../assets/images/member_corp.png"),
      screen: "MemCorporateScreen",
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
    
      <View style={{ backgroundColor: "#0033A0", padding: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <Text style={{ fontSize: 27, fontWeight: "bold", color: "white" }}>Exclusive</Text>
        <Text style={{ fontSize: 27,  color: "white" }}>Membership </Text>
        <Text style={{ fontSize: 27,  color: "white" }}>Plans</Text>
        <Text style={{ fontSize: 15, color: "white", marginTop: 10 }}>Enjoy unparalleled access, exclusive </Text>
        <Text style={{ fontSize: 15, color: "white",  }}>benefits and a top-tier sports experience</Text>
        <Text style={{ fontSize: 15, color: "white",  }}>tailored just for you.</Text>
        <Image  style={{ width: 120, height: 150, position: "absolute", right: 0, top: 25 }}
        resizeMode="contain"// Dynamic width
            source={require('../assets/images/membership2.png')}/>
      </View>
      
      <View style={{ padding: 20 }}>
      
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>Select a Membership</Text>
        
        {memberships.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={{ backgroundColor: item.color, borderRadius: 15, padding: 20, marginTop: 20 }}
            onPress={() => navigation.navigate(item.screen)}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom:15}}>
            <Image
                     source={item.image}
                     style={{ width: '10%', height:'130%' }}
                   />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", marginLeft:10, }}>{item.title}</Text>
            </View>
            {item.benefits.map((benefit, idx) => (
              <Text key={idx} style={{ color: "white", marginTop: 5 }}>• {benefit}</Text>
            ))}
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", marginTop: 10 }}>{item.price}</Text>
            <Text style={{ color: "white", fontSize: 12, marginTop: 5 }}>*One time payment, No auto-renewal</Text>
          </TouchableOpacity>
        ))}
      </View>
      
    </ScrollView>
  );
};

export default MembershipScreen;
