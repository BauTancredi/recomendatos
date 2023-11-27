import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { Category } from "@/interfaces/category";

const FeaturedCategory = ({ category }: { category: Category }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: "https://placehold.co/600x400/png" }} style={styles.categoryImage} />
      <Text style={[styles.imageText, { fontSize: 14 }]} numberOfLines={1} ellipsizeMode="tail">
        {category.title}
      </Text>
    </View>
  );
};

export default FeaturedCategory;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    borderRadius: 15,
    overflow: "hidden",
  },
  imageText: {
    position: "absolute",
    color: "white",
    fontFamily: "mon",
    fontSize: 16,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 6,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add a semi-transparent background for the text
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
});
