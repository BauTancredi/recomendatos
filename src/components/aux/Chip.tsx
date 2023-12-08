import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Chip = ({ title }: { title: string }) => {
  return (
    <View style={styles.chip}>
      <Text>{title}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    width: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
    alignSelf: "flex-start",
  },
});
