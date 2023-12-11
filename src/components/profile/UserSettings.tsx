import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface UserSettingsProps {
  menuItems: any;
}

const UserSettings: React.FC<UserSettingsProps> = ({ menuItems }) => {
  return (
    <View
      style={{
        width: "100%",
        gap: 30,
      }}
    >
      {menuItems.map(
        (
          item: {
            title: string;
            icon: JSX.Element;
            onPress: () => void;
          },
          index: number
        ) => (
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
                }}
              >
                {item.title}
              </Text>
            </View>

            {item.title === "Cerrar sesión" ? null : (
              <Ionicons name="chevron-forward-sharp" size={24} color="black" />
            )}
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export default UserSettings;
