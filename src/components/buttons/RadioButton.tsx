import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface RadioButtonProps {
  selected: boolean;
  style?: StyleProp<ViewStyle>;
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected, style }) => {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: "#000",
          }}
        />
      ) : null}
    </View>
  );
};

export default RadioButton;
