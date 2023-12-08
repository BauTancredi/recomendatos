import { View, Text, StyleSheet } from "react-native";

const StatsItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.statsItem}>
      <Text style={{ fontFamily: "mon-sb", fontSize: 20 }}>{value}</Text>
      <Text style={{ fontFamily: "mon", fontSize: 12 }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statsItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingRight: 2,
    width: "33%",
  },
});

export default StatsItem;
