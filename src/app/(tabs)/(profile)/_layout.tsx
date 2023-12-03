import { Stack } from "expo-router";
import React from "react";
import { Button, StyleSheet } from "react-native";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Mi Perfil",
        }}
      />
      <Stack.Screen
        name="edit-user-profile"
        options={{
          headerTitle: "Editar Perfil",
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerRight: () => (
            <Button
              title="Guardar"
              onPress={() => {
                // signOut();
              }}
              disabled
            />
          ),
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
