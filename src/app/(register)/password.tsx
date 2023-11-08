import { useSignIn } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View, Text, TouchableOpacity } from "react-native";

import { defaultStyles } from "@/constants/Styles";

const AttemptPhoneVerification = () => {
  const [password, onChangePassword] = useState("");
  const [code, setCode] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const { emailAddress } = useLocalSearchParams<{ emailAddress: string }>();

  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      setForgotPassword(true);

      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
    } catch (err: any) {
      console.log("Password reset request error: ", err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      await setActive!({ session: result?.createdSessionId });
    } catch (err: any) {
      console.log("Password reset error: ", err.errors[0].message);
    }
  };

  const handlePress = async () => {
    try {
      const completeSignIn = await signIn?.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      if (completeSignIn?.createdSessionId) {
        await setActive!({ session: completeSignIn?.createdSessionId });
        router.back();
      }
    } catch (err: any) {
      console.error("Login error - Password", err.errors[0].message);
    }
  };

  return (
    <View style={defaultStyles.container}>
      {forgotPassword ? (
        <View>
          <TextInput
            style={[defaultStyles.inputField, { marginTop: 20 }]}
            onChangeText={setCode}
            value={code}
            placeholder="Codigo"
          />
          <TextInput
            style={[defaultStyles.inputField, { marginTop: 20 }]}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Nueva contraseña"
          />
          <Button title="Resetear" onPress={onReset} />
        </View>
      ) : (
        <>
          <TextInput
            style={[defaultStyles.inputField, { marginTop: 20 }]}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Contraseña"
          />

          <TouchableOpacity
            style={{ alignItems: "flex-end", marginVertical: 10 }}
            onPress={onRequestReset}
          >
            <Text style={{ fontFamily: "mon-sb" }}>Olvide mi contraseña </Text>
          </TouchableOpacity>
          <Button title="Verificar" onPress={handlePress} />
        </>
      )}
    </View>
  );
};

export default AttemptPhoneVerification;
