import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import * as z from "zod";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ControlledInput from "@/components/inputs/ControlledInput";
import { defaultStyles } from "@/constants/Styles";

const schema = z.object({
  phoneNumber: z
    .string({
      required_error: "El numero es requerido",
      invalid_type_error: "Name must be a string",
    })
    .startsWith("+54", "El numero debe empezar con +54")
    .min(10, "El numero debe tener 10 digitos"),
});

type FormData = {
  phoneNumber: string;
};

const PrepareScreen = () => {
  const router = useRouter();

  const { user } = useUser();

  const {
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onPrepareVerification = async (data: FormData) => {
    try {
      await user?.createPhoneNumber({
        phoneNumber: data.phoneNumber,
      });

      await user?.reload();

      await user?.phoneNumbers[0].prepareVerification();

      router.push("/(register)/attempt");
    } catch (err: any) {
      Alert.alert(err.errors[0].message);

      console.error("OAuth error - Prepare Phone Verification:", err.errors[0].message);
    }
  };

  // const onResend = async () => {
  //   try {
  //     await user?.phoneNumbers[0].prepareVerification();
  //   } catch (err: any) {
  //     Alert.alert(err.errors[0].message);

  //     console.error("OAuth error - Prepare Phone Verification:", err.errors[0].message);
  //   }
  // };

  return (
    <View style={[defaultStyles.container, { paddingVertical: 20 }]}>
      <ControlledInput
        control={control}
        name="phoneNumber"
        placeholder="Numero de telefono"
        errors={errors}
        // keyboardType="phone-pad"
      />

      <PrimaryButton
        text="Enviar codigo"
        onPress={handleSubmit(onPrepareVerification)}
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
      />

      {/* <PrimaryButton text="Enviar nuevamente" onPress={handleSubmit(onResend)} isValid={isValid} /> */}
    </View>
  );
};

export default PrepareScreen;
