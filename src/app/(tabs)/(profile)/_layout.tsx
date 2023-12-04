import { useUser } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native";

const ProfileLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Mi Perfil",
          headerShadowVisible: false,

          headerRight: () => (
            <Button
              title="Editar"
              onPress={() => {
                router.push("/edit-user-profile");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="edit-user-profile"
        options={{
          headerTitle: "Editar Perfil",
          headerBackVisible: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          // headerRight: () => (
          //   <Button title="Guardar" onPress={saveChanges} disabled={!hasChanges} />
          // ),
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerTitle: "Cambiar Contraseña",
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
