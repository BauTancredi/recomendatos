import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

import { Text, View, Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const HomeScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View>
      <Text> {user?.firstName} </Text>
      <Text> {user?.lastName} </Text>
      <Text> {user?.fullName} </Text>
      <Text> {JSON.stringify(user?.phoneNumbers)} </Text>
      <Text> {JSON.stringify(user?.emailAddresses)} </Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default HomeScreen;
