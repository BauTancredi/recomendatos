import { Tabs } from "expo-router";
import React from "react";

const PrivateLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="(test)"
        options={{
          title: "Test",
        }}
      />
    </Tabs>
  );
};

export default PrivateLayout;
