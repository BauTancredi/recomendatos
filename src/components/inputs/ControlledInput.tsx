import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";

interface Props {
  control: any;
  errors: any;
  name:
    | "emailAddress"
    | "password"
    | "newPassword"
    | "firstName"
    | "lastName"
    | "verificationCode"
    | "phoneNumber";
  placeholder: string;
  style?: any;
}

const ControlledInput = ({
  control,
  errors,
  placeholder,
  name,
  style,
}: Props) => {
  return (
    <View style={{ height: 64 }}>
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
          />
        )}
      />

      {errors[name] && (
        <Text style={defaultStyles.textError}>{errors[name].message}</Text>
      )}
    </View>
  );
};

export default ControlledInput;
