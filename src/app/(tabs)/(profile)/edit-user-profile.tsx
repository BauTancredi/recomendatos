import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";

import { defaultStyles } from "@/constants/Styles";

// [] Guardar cambios
// [] Cambiar contraseña
// [] Camiar foto
// [] Mapa de telefono
// [] Labels

const EditUserProfileScreen = () => {
  const { user } = useUser();

  const areaCode = user?.phoneNumbers![0].phoneNumber.slice(0, 3);

  return (
    <View style={[defaultStyles.container, { alignItems: "center", gap: 20 }]}>
      <View style={{ position: "relative" }}>
        <Image style={styles.profileImage} source={{ uri: user?.imageUrl }} />
        <View style={styles.editIconContainer}>
          <Ionicons name="pencil" size={18} color="grey" />
        </View>
      </View>

      <TextInput style={styles.input} defaultValue={user?.firstName!} />

      <TextInput style={styles.input} defaultValue={user?.lastName!} />

      <TextInput
        style={[styles.input, { color: "grey" }]}
        defaultValue={user?.emailAddresses![0].emailAddress}
        editable={false}
      />

      <TextInput
        style={[styles.input, { color: "grey" }]}
        defaultValue="********"
        editable={false}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "80%",
        }}
      >
        <TextInput
          style={[styles.input, { width: "25%", color: "grey" }]}
          defaultValue={`🇦🇷 ${areaCode}`}
          editable={false}
        />
        <TextInput
          style={[styles.input, { flex: 1, color: "grey" }]}
          defaultValue={user?.phoneNumbers![0].phoneNumber.slice(3)}
          editable={false}
        />
      </View>
    </View>
  );
};

export default EditUserProfileScreen;

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
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
