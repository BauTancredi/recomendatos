import { View, Text, StyleSheet } from "react-native";
import { CircleSkeleton } from "../skeleton";

interface StatsItemProps {
  title: string;
  value: string;
}

const StatsItem: React.FC<StatsItemProps> = ({ title, value }) => {
  return (
    <View style={styles.statsItem}>
      {/* <CircleSkeleton /> */}
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
