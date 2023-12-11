import { UserResource } from "@clerk/types";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

interface ProfileImageProps {
  user: UserResource;
  bottomSheetRef: React.RefObject<BottomSheet>;
  isLoadingPhoto: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ user, bottomSheetRef, isLoadingPhoto }) => {
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
      {isLoadingPhoto && <ActivityIndicator color="white" style={styles.activityIndicator} />}
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

  activityIndicator: {
    position: "absolute",
    borderRadius: 50,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
    width: 100,
    height: 100,
  },
});

export default ProfileImage;
