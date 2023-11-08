import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const PublicLayout = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />

      <Stack.Screen
        name="preparePhoneVerification"
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
        name="attemptPhoneVerification"
        options={{
          headerTitle: "Verificar telefono",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
