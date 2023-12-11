import { UserResource } from "@clerk/types";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

interface ProviderCardProps {
  user: UserResource;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.profileImage} source={{ uri: user?.imageUrl }} />
      <View
        style={{
          width: "70%",
          gap: 10,
        }}
      >
        <Text>
          {user?.firstName} {user?.lastName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <Text>Plomero</Text>
        </View>
        <Text
          style={{
            verticalAlign: "bottom",
          }}
        >
          Activo desde&nbsp;
          {new Date(user?.createdAt!).toLocaleDateString("en-AR")}
        </Text>
      </View>
    </View>
  );
};

export default ProviderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
    flexDirection: "row",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
