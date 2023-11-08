import { Stack } from "expo-router";
import React from "react";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="attemptPhoneVerification"
        options={{
          title: "Verificar telefono",
          headerBackTitle: "Atras",
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
