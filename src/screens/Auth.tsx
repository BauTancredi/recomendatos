import React from "react";
import { StyleSheet, View, Platform } from "react-native";

import AppleLogin from "../components/auth/AppleLogin";
import EmailLogin from "../components/auth/EmailLogin";
import { GoogleLogin } from "../components/auth/GoogleLogin";

const Auth = () => {
  return (
    <View style={styles.appContainer}>
      <EmailLogin />
      {Platform.OS === "android" && <GoogleLogin />}
      {Platform.OS === "ios" && <AppleLogin />}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    marginTop: 40,
    padding: 12,
  },
});

export default Auth;
