import { Stack } from "expo-router";
import React from "react";
import Colors from "@/constants/Colors";

const WelcomeLayout = () => {
  return (
    <Stack screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="onboarding"
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: true,
          headerBackTitle: "",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerTintColor: Colors.primary,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="location"
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: true,
          headerBackTitle: "",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerTintColor: Colors.primary,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default WelcomeLayout;
