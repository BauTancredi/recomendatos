import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { defaultStyles } from "@/constants/Styles";

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  styles?: any;
}

const PrimaryButton = ({ onPress, text, disabled, styles }: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        defaultStyles.btn,
        disabled && defaultStyles.btnDisabled,
        { marginTop: 10, alignSelf: "stretch" },

        styles,
      ]}
      onPress={onPress}
    >
      <Text style={defaultStyles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
