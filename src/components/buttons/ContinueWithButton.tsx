import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { defaultStyles } from "@/constants/Styles";

interface ContinueWithButtonProps {
  title: string;
  icon: "mail" | "logo-google" | "logo-apple" | "logo-facebook";
  onPress: () => void;
}

const ContinueWithButton = ({ title, icon, onPress }: ContinueWithButtonProps) => {
  return (
    <TouchableOpacity style={defaultStyles.btnOutline} onPress={onPress}>
      <Ionicons name={icon} size={24} style={defaultStyles.btnIcon} />
      <Text style={defaultStyles.btnOutlineText}>Continuar con {title}</Text>
    </TouchableOpacity>
  );
};

export default ContinueWithButton;
