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
      <Stack.Screen
        name="provider-type"
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
        name="welcome-provider"
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: true,
          headerBackTitle: "",
          headerTitle: "",
          // headerTitle: "Atras",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerTintColor: Colors.primary,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="jobs"
        options={{
          headerBackVisible: true,
          headerBackTitle: "Atras",
          headerTitle: "Oficios",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="address"
        options={{
          headerBackVisible: true,
          headerBackTitle: "Atras",
          headerTitle: "Dirección Comercial",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="bio"
        options={{
          headerBackVisible: true,
          headerBackTitle: "Atras",
          headerTitle: "Bio",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="provider-location"
        options={{
          headerBackVisible: true,
          headerBackTitle: "Atras",
          headerTitle: "Localidades",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="shops"
        options={{
          headerBackVisible: true,
          headerBackTitle: "Atras",
          headerTitle: "Comercio",
          headerStyle: {
            backgroundColor: "#fdffff",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default WelcomeLayout;
