import { useOAuth, useSignUp, useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as z from "zod";

import ContinueWithButton from "@/components/buttons/ContinueWithButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ControlledInput from "@/components/inputs/ControlledInput";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

type FormData = {
  emailAddress: string;
};

const schema = z.object({
  emailAddress: z
    .string({
      required_error: "El correo electronico es requerido",
      invalid_type_error: "Name must be a string",
    })
    .email("El correo electronico no es valido"),
});

const LoginScreen = () => {
  useWarmUpBrowser();
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const { isLoaded } = useSignUp();
  const { signIn } = useSignIn();

  const {
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    // reValidateMode: "onBlur",
  });

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
      setLoading(true);
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    } finally {
      setLoading(false);
    }
  };

  const onSignUpPress = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn?.create({
        identifier: data.emailAddress,
      });

      if (completeSignIn?.status === "needs_first_factor") {
        router.push({
          pathname: "/(register)/password",
          params: {
            emailAddress: data.emailAddress,
          },
        });
      }
    } catch (err: any) {
      // Need to handle the case where the user is not found
      if (err.errors[0].code === "form_identifier_not_found") {
        router.push({
          pathname: "/(register)/register",
          params: {
            emailAddress: data.emailAddress,
          },
        });
      }
      // console.error("Register error - ", err.errors[0].message);
    }
  };

  return (
    <SafeAreaView style={[defaultStyles.container]}>
      <Spinner visible={isSubmitting || loading} />

      <View style={[defaultStyles.container, styles.loginContainer]}>
        <View style={{ alignItems: "center" }}>
          <Text>Hola</Text>
          <Text>Bienvenido a RecomenDatos</Text>
          <Text style={defaultStyles.textCenter}>
            Registrate o inicia sesion para comenzar a formar parte de nuestra comunidad.
          </Text>
        </View>
        <View style={{ gap: 20 }}>
          <View>
            <ControlledInput
              errors={errors}
              control={control}
              name="emailAddress"
              placeholder="Correo electronico"
            />

            <PrimaryButton
              text="Continuar"
              onPress={handleSubmit(onSignUpPress)}
              isValid={isValid}
            />
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
              Al registrarte en RecomenDatos estás aceptando nuestros términos y condiciones y
              políticas de privacidad
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
