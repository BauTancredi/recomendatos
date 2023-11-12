import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ControlledInput from "@/components/inputs/ControlledInput";
import { defaultStyles } from "@/constants/Styles";

const schema = z.object({
  verificationCode: z.string({
    required_error: "Por favor ingrese el codigo",
    invalid_type_error: "Name must be a string",
  }),
});

type FormData = {
  verificationCode: string;
};

const AttemptScreen = () => {
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

  const onAttemptVerification = async (data: FormData) => {
    try {
      await user?.phoneNumbers[0].attemptVerification({
        code: data.verificationCode,
      });

      router.push("/(tabs)/home");
    } catch (err: any) {
      console.error("OAuth error - Attempt Phone Verification:", err.errors[0].message);
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

      <PrimaryButton
        text="Enviar codigo"
        onPress={handleSubmit(onAttemptVerification)}
        isValid={isValid}
      />
    </View>
  );
};

export default AttemptScreen;
