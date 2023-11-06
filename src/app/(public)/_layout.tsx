import { Stack } from "expo-router";
import React from "react";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
