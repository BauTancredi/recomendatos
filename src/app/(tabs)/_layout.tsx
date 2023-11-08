import { Tabs } from "expo-router";
import React from "react";

const PrivateLayout = () => {
  return (
    <Tabs
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
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

export default PrivateLayout;
