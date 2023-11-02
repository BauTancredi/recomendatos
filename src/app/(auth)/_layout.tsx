import React from "react";
import { Stack } from "expo-router";

const PrivateLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: "Clerk Auth App",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default PrivateLayout;
