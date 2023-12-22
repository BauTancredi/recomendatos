import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface CheckboxButtonProps {
  selected: boolean;
  style?: StyleProp<ViewStyle>;
}

const CheckboxButton: React.FC<CheckboxButtonProps> = ({ selected, style }) => {
  return (
    <View
      style={[
        {
          height: 24,
          width: 24,
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
            height: "100%",
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      ) : null}
    </View>
  );
};

export default CheckboxButton;
