import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ProviderCard = ({ user }: { user: any }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.profileImage} source={{ uri: user?.imageUrl }} />
      <Text>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text>Plomero</Text>
      <Text>
        Activo desde&nbsp;
        {new Date(user?.createdAt!).toLocaleDateString("en-AR")}
      </Text>
      <TouchableOpacity>
        <Text>Ver mas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProviderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    // margin: 10,
    alignItems: "center",
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
