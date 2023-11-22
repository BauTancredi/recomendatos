import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Option } from "@/interfaces/location";

interface SelectButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text: string;
  selectedOption: Option | null;
}

const SelectButton: React.FC<SelectButtonProps> = ({ onPress, disabled, text, selectedOption }) => (
  <TouchableOpacity
    style={[styles.select, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text>{selectedOption?.title || text}</Text>
    <Ionicons name="chevron-down" size={22} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  disabled: {
    backgroundColor: "#ccc",
  },
});

export default SelectButton;
