import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, View, StyleSheet } from "react-native";
import * as z from "zod";

import CountryCodePicker from "@/components/aux/CountryCodePicker";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ControlledInput from "@/components/inputs/ControlledInput";
import CountryCodeInput from "@/components/inputs/CountryCodeInput";
import { defaultStyles } from "@/constants/Styles";

const schema = z.object({
  phoneNumber: z
    .string({
      required_error: "El numero es requerido",
      invalid_type_error: "Name must be a string",
    })
    .regex(/^9?(?:11|[2368]\d)\d{8}$/, "El numero debe ser valido")
    .refine((val) => !val.startsWith("54") && !val.startsWith("0"), {
      message: "El número no debe empezar con 54 ni 0",
    }),
});

type FormData = {
  phoneNumber: string;
};

const PrepareScreen = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState({
    dial_code: "+54",
    code: "AR",
    flag: "🇦🇷",
  });

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
      const phone = `${country.dial_code}${data.phoneNumber}`;

      await user?.createPhoneNumber({
        phoneNumber: phone,
      });

      await user?.reload();

      await user?.phoneNumbers[0].prepareVerification();

      router.push("/(register)/attempt");
    } catch (err: any) {
      Alert.alert(err.errors[0].message);

      console.error("OAuth error - Prepare Phone Verification:", err.errors[0].message);
    }
  };

  return (
    <View style={[defaultStyles.container, { paddingVertical: 20 }]}>
      <View style={styles.phoneContainer}>
        <CountryCodeInput country={country} setShow={setShow} />
        <ControlledInput
          control={control}
          name="phoneNumber"
          placeholder="Numero de telefono"
          errors={errors}
          style={{
            width: 250,
          }}
        />
      </View>

      <PrimaryButton
        text="Enviar codigo"
        onPress={handleSubmit(onPrepareVerification)}
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
      />

      <CountryCodePicker show={show} setShow={setShow} setCountry={setCountry} />
      {/* <PrimaryButton text="Enviar nuevamente" onPress={handleSubmit(onResend)} isValid={isValid} /> */}
    </View>
  );
};

export default PrepareScreen;

const styles = StyleSheet.create({
  phoneContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
});
