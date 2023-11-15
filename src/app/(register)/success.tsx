import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";

const SuccessScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 5000);

    return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the timeout finishes
  }, []);

  return (
    <SafeAreaView style={defaultStyles.safeArea}>
      <View style={[styles.successContainer]}>
        <Text>✅</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SuccessScreen;
