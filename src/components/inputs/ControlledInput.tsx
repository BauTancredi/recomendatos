import React from "react";
import { Controller, Control } from "react-hook-form";
import { StyleProp, Text, TextInput, TextStyle, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";

interface ControlledInputProps {
  control: Control<any>;
  errors: any;
  name:
    | "emailAddress"
    | "password"
    | "newPassword"
    | "firstName"
    | "lastName"
    | "verificationCode"
    | "phoneNumber"
    | "confirmPassword"
    | "currentPassword";
  placeholder: string;
  style?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  label?: string;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  errors,
  placeholder,
  name,
  style,
  secureTextEntry,
  label,
}) => {
  const handleKeyboardType = () => {
    switch (name) {
      case "emailAddress":
        return "email-address";
      case "phoneNumber":
        return "phone-pad";
      case "verificationCode":
        return "numeric";
      default:
        return "default";
    }
  };

  // La altura se usa dentro de register. Arreglar para que sea siempre la misma.
  // Pensar si se puede usar el mismo componente para todos los inputs.
  // La altura deberia cambiar si hay mensaje de error?
  return (
    <View style={{ gap: 5, height: label ? 74 : "auto" }}>
      {label && <Text>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[defaultStyles.inputField, style]}
            secureTextEntry={secureTextEntry}
            keyboardType={handleKeyboardType()}
          />
        )}
      />

      {errors[name] && <Text style={defaultStyles.textError}>{errors[name].message}</Text>}
    </View>
  );
};

export default ControlledInput;
