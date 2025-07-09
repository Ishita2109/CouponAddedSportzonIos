import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const HelpSupport = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#001F3F", paddingVertical: 40, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ 
            padding: 8,
            marginLeft: 15,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", marginLeft:1, fontSize: 40, fontWeight: "400", paddingHorizontal: 60 }}>Get In Touch</Text>
      </View>

      {/* Content */}
      <View style={{ padding: 30, marginTop:20, }}>
        {/* Write to us */}
        <View style={{ marginBottom: 30 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Icon name="mail-outline" size={20} color="#0033cc" />
            <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 10, color:"#001F3F"}}>Write to us</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "600",}}>Email-ID: info@sportzon.in</Text>
          <Text style={{ fontSize: 14, fontStyle: "italic", color: "gray" }}>
            (Expect response within 1-3 business days)
          </Text>
        </View>

        {/* Call at */}
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop:20, }}>
            <Icon name="call-outline" size={20} color="#0033cc" />
            <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 10, color:"#001F3F" }}>Call at</Text>
          </View>
          <Text style={{ fontSize: 16,fontWeight: "600", }}>Phone No.: 9654696000</Text>
          <Text style={{ fontSize: 16,fontWeight: "600", }}>Timings:</Text>
          <Text style={{ fontSize: 16 }}>Mon - Fri (9 AM - 7 PM)</Text>
          <Text style={{ fontSize: 16 }}>Sat - Sun (8 AM - 8 PM)</Text>
        </View>
      </View>

      
    </View>
  );
};

export default HelpSupport;
