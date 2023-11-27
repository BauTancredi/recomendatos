import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import Colors from "@/constants/Colors";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={Colors.primary} size={size} />
          ),
          headerLeft: () => (
            <MaterialIcons name="menu" size={24} color="black" style={{ marginLeft: 16 }} />
          ),
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-sharp" size={24} color="black" />

              <Text>Av Siempre Viva #123</Text>
              <Ionicons name="chevron-down" size={24} color="black" />
            </View>
          ),
          headerRight: () => (
            <Ionicons
              name="person-circle-outline"
              size={24}
              color="black"
              style={{ marginRight: 16 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          tabBarLabel: "Test",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
