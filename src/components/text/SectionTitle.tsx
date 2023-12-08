import { Text, StyleSheet } from "react-native";

const SectionTitle = ({ title }: { title: string }) => {
  return <Text style={styles.sectionTitle}>{title}</Text>;
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: "mon-b",
    fontSize: 20,
    marginBottom: 10,
  },
});

export default SectionTitle;
