import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Colors from "@/constants/Colors";
import { Provider } from "@/interfaces/provider";

const FeaturedProvider = ({ provider }: { provider: Provider }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: "https://placehold.co/600x400/png" }} style={styles.profileImage} />
      <View style={{ justifyContent: "space-between" }}>
        <View>
          <Text style={{ fontSize: 14, fontFamily: "mon-sb" }}>{provider.name}</Text>
          <Text style={{ fontSize: 12, fontFamily: "mon", color: Colors.grey }}>
            {provider.categories}
          </Text>
        </View>
        <View style={styles.profileRatinContainer}>
          <View style={styles.profileRating}>
            <Ionicons name="star" size={16} color="black" />

            <Text style={{ fontSize: 12, fontFamily: "mon-sb" }}>{provider.rating}</Text>
          </View>
          <Text style={{ fontSize: 12, fontFamily: "mon", color: Colors.grey }}>
            {provider.ratingCount} valoraciones
          </Text>
        </View>
      </View>
      <Ionicons name="heart-outline" size={24} color="black" style={styles.favoriteIcon} />
    </View>
  );
};

export default FeaturedProvider;

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    position: "relative",
    gap: 10,
    marginVertical: 5,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  profileRatinContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileRating: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    gap: 5,
  },
  favoriteIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
  },
});
