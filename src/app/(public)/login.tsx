import React from "react";
import { Text, StyleSheet, Platform, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import ContinueWithButton from "@/components/buttons/ContinueWithButton";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  return (
    <View style={styles.loginContainer}>
      <View style={{ alignItems: "center" }}>
        <Text>Hola</Text>
        <Text>Bienvenido a RecomenDatos</Text>
        <Text style={styles.textCenter}>
          Registrate o inicia sesion para comenzar a formar parte de nuestra
          comunidad.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        {/* <ContinueWithButton title="mi mail" icon="mail" /> */}
        <ContinueWithButton
          title="Google"
          icon="logo-google"
          strategy="oauth_google"
        />
        {Platform.OS === "ios" && (
          <ContinueWithButton
            title="Apple"
            icon="logo-apple"
            strategy="oauth_apple"
          />
        )}
        <ContinueWithButton
          title="Facebook"
          icon="logo-facebook"
          strategy="oauth_facebook"
        />
      </View>
      <Text style={styles.termsAndConditions}>
        Al registrarte en RecomenDatos estás aceptando nuestros términos y
        condiciones y políticas de privacidad
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: 16,
    textAlign: "center",
    gap: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  termsAndConditions: {
    position: "absolute",
    bottom: 5,
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
});
