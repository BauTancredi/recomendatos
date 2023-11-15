import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const RegisterLayout = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    console.log("a");
    await signOut();
    router.back();
  };

  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />

      <Stack.Screen
        name="prepare"
        options={{
          headerTitle: "Verificar telefono",
          headerLeft: () => (
            <TouchableOpacity onPress={handleSignOut}>
              <Ionicons name="chevron-back" size={22} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="attempt"
        options={{
          headerTitle: "Verificar telefono",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="password"
        options={{
          presentation: "modal",
          title: "Iniciar sesión",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          gestureEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          presentation: "modal",
          title: "Terminá de registrarte",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RegisterLayout;
