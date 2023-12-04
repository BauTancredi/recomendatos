import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ProfileImage = ({ user, bottomSheetRef }: { user: any; bottomSheetRef: any }) => {
  return (
    <View style={{ position: "relative" }}>
      <Image style={styles.profileImage} source={{ uri: user?.imageUrl }} />
      <View style={styles.editIconContainer}>
        <Ionicons
          name="pencil"
          size={18}
          color="grey"
          onPress={() => {
            bottomSheetRef.current?.expand();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fdffff",
    padding: 5,
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProfileImage;
