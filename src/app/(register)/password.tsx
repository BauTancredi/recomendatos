import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as z from "zod";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ControlledInput from "@/components/inputs/ControlledInput";
import { defaultStyles } from "@/constants/Styles";

const passwordSchema = z.object({
  password: z.string({
    required_error: "Por favor ingrese su contraseña",
    invalid_type_error: "Name must be a string",
  }),
});

const newPasswordSchema = z.object({
  verificationCode: z.string({
    required_error: "Por favor ingrese el codigo",
    invalid_type_error: "Name must be a string",
  }),
  newPassword: z
    .string({
      required_error: "La contraseña es requerida",
      invalid_type_error: "Name must be a string",
    })
    .min(8, "Password must be at least 8 characters")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /\d/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => !/\s/.test(password), {
      message: "Password cannot contain spaces",
    }),
});

type FormData = {
  password: string;
  verificationCode: string;
  newPassword: string;
};

const PasswordScreen = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  const { emailAddress: emailAddressParam } = useLocalSearchParams<{
    emailAddress: string;
  }>();

  const { signIn, setActive } = useSignIn();

  const {
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(forgotPassword ? newPasswordSchema : passwordSchema),
    mode: "onBlur",
  });

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: emailAddressParam,
      });
    } catch (err: any) {
      console.log("Password reset request error: ", err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async (data: FormData) => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.verificationCode!,
        password: data.newPassword!,
      });

      await setActive!({ session: result?.createdSessionId });
    } catch (err: any) {
      console.log("Password reset error: ", err.errors[0].message);
    }
  };

  const onSignIn = async (data: FormData) => {
    try {
      const completeSignIn = await signIn?.create({
        identifier: emailAddressParam,
        password: data.password,
      });

      // This indicates the user is signed in
      if (completeSignIn?.createdSessionId) {
        await setActive!({ session: completeSignIn?.createdSessionId });
        // router.back();
      }
    } catch (err: any) {
      console.error("Login error - Password", err.errors[0].message);
    }
  };

  return (
    <View style={[defaultStyles.container, { paddingTop: 20 }]}>
      <Spinner visible={isSubmitting} />
      {forgotPassword ? (
        <View>
          <ControlledInput
            control={control}
            name="verificationCode"
            placeholder="Codigo"
            errors={errors}
          />

          <ControlledInput
            control={control}
            name="newPassword"
            placeholder="Nueva contraseña"
            errors={errors}
          />

          <PrimaryButton text="Enviar codigo" onPress={onRequestReset} />

          <PrimaryButton
            text="Resetear contraseña"
            onPress={handleSubmit(onReset)}
            isValid={isValid}
          />

          <PrimaryButton text="Cancelar" onPress={() => setForgotPassword(false)} />
        </View>
      ) : (
        <>
          <ControlledInput
            control={control}
            name="password"
            placeholder="Contraseña"
            errors={errors}
          />

          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontFamily: "mon-sb" }} onPress={() => setForgotPassword(true)}>
              Olvide mi contraseña
            </Text>
          </View>

          <PrimaryButton
            text="Iniciar sesion"
            onPress={handleSubmit(onSignIn)}
            // isValid={isValid}
          />
        </>
      )}
    </View>
  );
};

export default PasswordScreen;
