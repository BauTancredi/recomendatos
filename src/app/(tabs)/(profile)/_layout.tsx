import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: "black",
        headerTitleStyle: {
          fontFamily: "mon-sb",
        },
      }}
    >
      <Stack.Screen
        name="user-profile"
        options={{
          headerTitle: "Mi Perfil",
        }}
      />

      <Stack.Screen
        name="edit-user-profile"
        options={{
          headerTitle: "Editar Perfil",
        }}
      />

      <Stack.Screen
        name="user-settings"
        options={{
          headerTitle: "Configuración",
        }}
      />

      <Stack.Screen
        name="change-password"
        options={{
          headerTitle: "Cambiar Contraseña",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
