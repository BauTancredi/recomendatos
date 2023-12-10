import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { defaultStyles } from "@/constants/Styles";

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  styles?: any;
  isLoading?: boolean;
}

const PrimaryButton = ({ onPress, text, disabled, styles, isLoading }: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[
        defaultStyles.btn,
        (disabled || isLoading) && defaultStyles.btnDisabled,
        { marginTop: 10, alignSelf: "stretch" },

        styles,
      ]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={defaultStyles.btnText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
