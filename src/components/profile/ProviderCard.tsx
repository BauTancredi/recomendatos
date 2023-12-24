import { UserResource } from "@clerk/types";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// import { TextSkeleton } from "@/components/skeleton";
import Colors from "@/constants/Colors";

interface ProviderCardProps {
  user: UserResource;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ user }) => {
  return (
    <View
      style={{
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image style={styles.profileImage} source={{ uri: user?.imageUrl }} />
      <Text
        style={{
          fontFamily: "mon-sb",
          fontSize: 18,
        }}
      >
        {user?.firstName} {user?.lastName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "center",
        }}
      >
        {/* <TextSkeleton width={100} height={10} radius={0} /> */}
        {Array.from({ length: 3 }).flatMap((_, i, arr) => [
          <Text key={i}>Plomero</Text>,
          i < arr.length - 1 && <Text>-</Text>,
        ])}
      </View>
      <Text
        style={{
          color: Colors.grey,
        }}
      >
        Activo desde&nbsp;
        {new Date(user.createdAt!).toLocaleDateString("en-AR")}
      </Text>
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
