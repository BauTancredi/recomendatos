import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";

import ContinueWithButton from "@/components/buttons/ContinueWithButton";
import { defaultStyles } from "@/constants/Styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const LoginScreen = () => {
  useWarmUpBrowser();

  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <SafeAreaView style={[defaultStyles.container]}>
      <View style={[defaultStyles.container, styles.loginContainer]}>
        <View style={{ alignItems: "center" }}>
          <Text>Hola</Text>
          <Text>Bienvenido a RecomenDatos</Text>
          <Text style={defaultStyles.textCenter}>
            Registrate o inicia sesion para comenzar a formar parte de nuestra
            comunidad.
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View style={{ gap: 10 }}>
            <ContinueWithButton
              title="Email"
              icon="mail"
              onPress={() => router.push("/(register)/register")}
            />
            <ContinueWithButton
              title="Google"
              icon="logo-google"
              onPress={() => onSelectAuth(Strategy.Google)}
            />
            {Platform.OS === "ios" && (
              <ContinueWithButton
                title="Apple"
                icon="logo-apple"
                onPress={() => onSelectAuth(Strategy.Apple)}
              />
            )}
            <ContinueWithButton
              title="Facebook"
              icon="logo-facebook"
              onPress={() => onSelectAuth(Strategy.Facebook)}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={defaultStyles.textCenter}>
              Al registrarte en RecomenDatos estás aceptando nuestros términos y
              condiciones y políticas de privacidad
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "space-between",
  },
});
