import React from "react";
import { Tabs } from "expo-router";

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
