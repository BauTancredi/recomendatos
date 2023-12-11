import { Text, StyleSheet } from "react-native";

interface SectionSubtitleProps {
  title: string;
}

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({ title }) => {
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
