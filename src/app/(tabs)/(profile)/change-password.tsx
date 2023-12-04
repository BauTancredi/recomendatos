import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ControlledInput from "@/components/inputs/ControlledInput";
import { defaultStyles } from "@/constants/Styles";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
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
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { user } = useUser();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await user?.updatePassword({
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      });
    } catch (error: any) {
      Alert.alert("La contraseña actual es incorrecta.");
      console.error("Error saving changes: ", error.errors[0].message);
    } finally {
      router.back();
    }
  };

  console.log("errors: ", errors);

  return (
    <View style={[defaultStyles.container, { gap: 10 }]}>
      <View style={{ gap: 5 }}>
        <Text>Contraseña actual</Text>

        <ControlledInput
          control={control}
          name="currentPassword"
          placeholder="Contraseña actual"
          errors={errors}
          secureTextEntry
          style={styles.input}
        />
        {/* <TextInput style={styles.input} placeholder="Contraseña actual" secureTextEntry /> */}
      </View>
      <View style={{ gap: 5 }}>
        <Text>Nueva contraseña</Text>
        <ControlledInput
          control={control}
          name="newPassword"
          placeholder="Nueva contraseña"
          errors={errors}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={{ gap: 5 }}>
        <Text>Confirmar nueva contraseña</Text>
        <ControlledInput
          control={control}
          name="confirmPassword"
          placeholder="Confirmar nueva contraseña"
          errors={errors}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <PrimaryButton
        text="Cambiar contraseña"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
