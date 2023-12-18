import { Text, StyleSheet } from "react-native";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
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
