import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as z from "zod";

import Button from "@/components/buttons/Button";
import ControlledInput from "@/components/inputs/ControlledInput";
import { defaultStyles } from "@/constants/Styles";

type FormData = {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
};

const schema = z.object({
  emailAddress: z
    .string({
      required_error: "El correo electronico es requerido",
      invalid_type_error: "Name must be a string",
    })
    .email("El correo electronico no es valido"),
  firstName: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "Name must be a string",
  }),
  lastName: z.string({
    required_error: "El apellido es requerido",
    invalid_type_error: "Name must be a string",
  }),
  // Validar lo siguiente para la contraseña:
  // [x] - Al menos 8 caracteres
  // [x] - Al menos una letra mayúscula
  // [x] - Al menos una numero
  // [x] - No puede contener espacios
  // [] - No puede contener el nombre o apellido
  // [] - No puede contener el correo electrónico
  password: z
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

const RegisterWithMail = () => {
  const { emailAddress: emailAddressParam } = useLocalSearchParams<{
    emailAddress: string;
  }>();

  const {
    formState: { errors, isValid, isLoading },
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailAddress: emailAddressParam,
    },
    mode: "onBlur",
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  const onSignUpPress = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }

    try {
      const { createdSessionId } = await signUp.create({
        emailAddress: data.emailAddress,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        // router.back();
      }
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
      console.log("Register error: ", err.errors[0].message);
    }
  };

  return (
    <View style={[defaultStyles.container, { gap: 2, paddingVertical: 20 }]}>
      <Spinner visible={isLoading} />
      <ControlledInput
        control={control}
        name="firstName"
        placeholder="Nombre"
        errors={errors}
      />

      <ControlledInput
        control={control}
        name="lastName"
        placeholder="Apellido"
        errors={errors}
      />

      <ControlledInput
        control={control}
        name="emailAddress"
        placeholder="Correo electronico"
        errors={errors}
      />

      <ControlledInput
        control={control}
        name="password"
        placeholder="Contraseña"
        errors={errors}
      />

      <Button
        text="Verificar"
        onPress={handleSubmit(onSignUpPress)}
        isValid={isValid}
      />
    </View>
  );
};

export default RegisterWithMail;
