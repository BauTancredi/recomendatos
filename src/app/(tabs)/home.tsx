import { useAuth, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";

WebBrowser.maybeCompleteAuthSession();

const HomeScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const deletePhoneNumber = async () => {
    await user?.phoneNumbers[0].destroy();
  };

  const createPhoneNumber = async () => {
    await user?.createPhoneNumber({
      phoneNumber: "+5491141643790",
    });
  };

  return (
    <SafeAreaView style={defaultStyles.safeArea}>
      <View>
        <Text> {user?.firstName} </Text>
        <Text> {user?.lastName} </Text>
        <Text> {user?.fullName} </Text>
        <Text> {user?.emailAddresses[0].emailAddress} </Text>
        {/* <Text> {user?.phoneNumbers[0].phoneNumber} </Text> */}
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
        <Button title="Delete phone" onPress={deletePhoneNumber} />
        <Button title="Create phone" onPress={createPhoneNumber} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
