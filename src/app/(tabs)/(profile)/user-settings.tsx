import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";

const UserSettingsScreen = () => {
  const menuItems = [
    {
      title: "Información",
      icon: <Ionicons name="information-circle-outline" size={24} color="black" />,
      onPress: () => {
        console.log("Información");
      },
    },
    {
      title: "Eliminar cuenta",
      icon: <Ionicons name="trash-outline" size={24} color="red" />,
      onPress: () => {
        console.log("Eliminar cuenta");
      },
    },
  ];

  return (
    <View style={[defaultStyles.container, { alignItems: "center", gap: 30 }]}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
          onPress={() => {
            item.onPress && item.onPress();
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {item.icon}
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "mon",
                fontSize: 16,
                color: item.icon.props.color,
              }}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserSettingsScreen;
