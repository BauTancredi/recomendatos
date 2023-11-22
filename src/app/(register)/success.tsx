import { useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { defaultStyles } from "@/constants/Styles";

const SuccessScreen = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 5000);

    return () => clearTimeout(timer);
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
