import { SafeAreaView, Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignUpScreen from "./components/SignUpScreen";
import tw from "twrnc";

const clerkKey = process.env.EXPO_PBULIC_CLERK_PUBLISHABLE_KEY!;

export default function App() {
  return (
    <ClerkProvider
      publishableKey={"pk_test_Y3V0ZS1yaGluby04LmNsZXJrLmFjY291bnRzLmRldiQ"}
    >
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <Text style={tw`bg-blue-100`}>You are Signed in</Text>
        </SignedIn>
        <SignedOut>
          <SignUpScreen />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
