import React from "react";
import { StyleSheet, View } from "react-native";
import StatsItem from "./StatsItem";

const StatsContainer = () => {
  return (
    <View style={styles.statsContainer}>
      <StatsItem title="RECOMENDATO" value="67" />
      <StatsItem title="RESEÑAS" value="24" />
      <StatsItem title="VALORACION" value="4.4" />
    </View>
  );
};

export default StatsContainer;

const styles = StyleSheet.create({
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 1,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
