import { Text, StyleSheet } from "react-native";

const SectionSubtitle = ({ title }: { title: string }) => {
  return <Text style={styles.sectionSubtitle}>{title}</Text>;
};

const styles = StyleSheet.create({
  sectionSubtitle: {
    fontFamily: "mon-b",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SectionSubtitle;
