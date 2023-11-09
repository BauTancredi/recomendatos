import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";

interface Props {
  onPress: () => void;
  isValid?: boolean;
  text: string;
}

const Button = ({ onPress, isValid = true, text }: Props) => {
  return (
    <TouchableOpacity
      disabled={!isValid}
      style={[
        defaultStyles.btn,
        !isValid && defaultStyles.btnDisabled,
        { marginTop: 10 },
      ]}
      onPress={onPress}
    >
      <Text style={defaultStyles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
