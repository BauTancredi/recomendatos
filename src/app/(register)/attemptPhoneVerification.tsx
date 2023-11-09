import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/components/buttons/Button";
import { defaultStyles } from "@/constants/Styles";
import ControlledInput from "@/components/inputs/ControlledInput";

const schema = z.object({
  verificationCode: z.string({
    required_error: "Por favor ingrese el codigo",
    invalid_type_error: "Name must be a string",
  }),
});

type FormData = {
  verificationCode: string;
};

const AttemptPhoneVerification = () => {
  const router = useRouter();
  const { user } = useUser();

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const handlePress = async (data: FormData) => {
    try {
      await user?.phoneNumbers[0].attemptVerification({
        code: data.verificationCode,
      });

      router.push("/(tabs)/home");
    } catch (err: any) {
      console.error(
        "OAuth error - Attempt Phone Verification:",
        err.errors[0].message
      );
    }
  };

  return (
    <View style={defaultStyles.container}>
      <ControlledInput
        control={control}
        name="verificationCode"
        placeholder="Codigo de verificacion"
        errors={errors}
        // keyboardType="numeric"
      />

      <Button
        text="Enviar codigo"
        onPress={handleSubmit(handlePress)}
        isValid={isValid}
      />
    </View>
  );
};

export default AttemptPhoneVerification;
