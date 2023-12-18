import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, Alert } from "react-native";
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

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const {
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onAttemptVerification = async (data: FormData) => {
    try {
      await user?.phoneNumbers[0].attemptVerification({
        code: data.verificationCode,
      });

      router.push("/(register)/success");
    } catch (err: any) {
      console.error("OAuth error - Attempt Phone Verification:", err.errors[0].message);
    }
  };

  const onResend = async () => {
    if (canResend) {
      try {
        await user?.phoneNumbers[0].prepareVerification();
      } catch (err: any) {
        Alert.alert(err.errors[0].message);

        console.error("OAuth error - Resend Phone Verification:", err.errors[0].message);
      } finally {
        setTimer(30);
        setCanResend(false);
      }
    }
  };

  return (
    <View style={[defaultStyles.container, { paddingVertical: 20 }]}>
      <ControlledInput
        control={control}
        name="verificationCode"
        placeholder="Codigo de verificacion"
        errors={errors}
      />

      <PrimaryButton
        text="Enviar codigo"
        onPress={handleSubmit(onAttemptVerification)}
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
      />

      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
        }}
      >
        No recibiste el codigo?
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          color: "blue",
        }}
        onPress={onResend}
      >
        {canResend ? "Reenviar" : `Reenviar en ${timer} segundos`}
      </Text>
    </View>
  );
};

export default AttemptScreen;
