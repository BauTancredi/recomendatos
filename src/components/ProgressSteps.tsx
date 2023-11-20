import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

interface Props {
  progress: 1 | 2 | 3 | 4;
}

const ProgressSteps: React.FC<Props> = ({ progress }) => {
  const steps = [1, 2, 3, 4];

  return (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.progressItem,
            { backgroundColor: index < progress ? Colors.primary : Colors.grey },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 0,
    paddingHorizontal: 20,
  },
  progressItem: {
    width: 70,
    backgroundColor: Colors.grey,
    height: 5,
  },
});

export default ProgressSteps;
