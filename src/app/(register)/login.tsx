import { useOAuth, useSignUp, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ContinueWithButton from "@/components/buttons/ContinueWithButton";
import Colors from "@/constants/Colors";
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
  const [emailAddress, setEmailAddress] = useState("");
  const { isLoaded } = useSignUp();
  const { signIn } = useSignIn();

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

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn?.create({
        identifier: emailAddress,
      });

      if (completeSignIn?.status === "needs_first_factor") {
        router.push({
          pathname: "/(register)/password",
          params: {
            emailAddress,
          },
        });
      }
    } catch (err: any) {
      // Need to handle the case where the user is not found
      if (err.errors[0].code === "form_identifier_not_found") {
        router.push({
          pathname: "/(register)/register",
          params: {
            emailAddress,
          },
        });
      }
      // console.error("Register error", JSON.stringify(err));
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
          <View>
            <TextInput
              style={defaultStyles.inputField}
              onChangeText={setEmailAddress}
              value={emailAddress}
              placeholder="Correo electronico"
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={[defaultStyles.btn, { marginTop: 10 }]}
              onPress={onSignUpPress}
            >
              <Text style={defaultStyles.btnText}>Continuar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.seperatorView}>
            <View
              style={{
                flex: 1,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={styles.seperator}>o</Text>
            <View
              style={{
                flex: 1,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>

          <View style={{ gap: 10 }}>
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
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
    fontSize: 16,
  },
});
