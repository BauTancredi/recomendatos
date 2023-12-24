import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 14,
            color: Colors.grey,
            textDecorationLine: "underline",
          }}
        >
          Editar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: "mon-b",
    fontSize: 20,
  },
});

export default SectionTitle;
