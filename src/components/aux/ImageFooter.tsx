import { View, Text, StyleSheet } from "react-native";

interface ImageFooterProps {
  imageIndex: number;
  imagesCount: number;
}

const ImageFooter: React.FC<ImageFooterProps> = ({ imageIndex, imagesCount }) => (
  <View style={styles.root}>
    <Text style={styles.text}>{`${imageIndex + 1} / ${imagesCount}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    height: 64,
    backgroundColor: "#00000077",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    color: "#FFF",
  },
});

export default ImageFooter;
