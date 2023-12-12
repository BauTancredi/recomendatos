import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

import { defaultStyles } from "@/constants/Styles";

interface PrimaryButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  styles?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  text,
  disabled,
  styles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[defaultStyles.btn, (disabled || isLoading) && defaultStyles.btnDisabled, styles]}
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
