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
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  errors,
  placeholder,
  name,
  style,
  secureTextEntry,
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

  return (
    <View>
      {/* La altura se usa dentro de register. Arreglar para que sea siempre la misma. */}
      {/* <View style={{ height: 64 }}> */}
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
