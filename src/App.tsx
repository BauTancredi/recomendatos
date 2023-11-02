import React from "react";
import { useWarmUpBrowser } from "./hooks/useWarmUpBrowser";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignUpScreen from "./components/SignUpScreen";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import HomePageScreen from "./components/HomePageScreen";

const clerkKey = process.env.EXPO_PUBLIC_API_KEY!;

// Token
// Expo router
// Mail y numero de telefono

export default function App() {
  useWarmUpBrowser();
  console.log(clerkKey);

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <SafeAreaView style={styles.appContainer}>
        <SignedIn>
          <Text style={tw`bg-blue-100 self-center `}>
            <HomePageScreen />
          </Text>
        </SignedIn>
        <SignedOut>
          <SignUpScreen />
        </SignedOut>
      </SafeAreaView>
      <StatusBar style="auto" />
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "black",
    textAlign: "center",
    width: "100%",
  },
});
