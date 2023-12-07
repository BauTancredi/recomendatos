import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { defaultStyles } from "@/constants/Styles";

const HomeScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const menuItems = [
    {
      title: "Editar Perfil",
      icon: <Ionicons name="person-circle-outline" size={24} color="black" />,
      onPress: () => {
        router.push("/edit-user-profile");
      },
    },
    {
      title: "Configuración",
      icon: <Ionicons name="settings-outline" size={24} color="black" />,
      onPress: () => {
        router.push("/user-settings");
      },
    },
    {
      title: "Quiero ser proveedor",
      icon: <Entypo name="tools" size={24} color="black" />,
      onPress: () => {
        console.log("Quiero ser proveedor");
      },
    },
    {
      title: "Dudas y sugerencias",
      icon: <Ionicons name="mail-outline" size={24} color="black" />,
      onPress: () => {
        Linking.openURL("whatsapp://send?text=putoelquelee&phone=5491128320754");
      },
    },
    {
      title: "Cerrar sesión",
      icon: <Ionicons name="log-out-outline" size={24} color="black" />,
      onPress: () => {
        signOut();
      },
    },
  ];

  return (
    <View style={[defaultStyles.container, { alignItems: "center", gap: 30 }]}>
      <View style={styles.card}>
        <Image style={styles.profileImage} source={{ uri: user?.imageUrl }} />
        <Text>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text>
          Activo desde&nbsp;
          {new Date(user?.createdAt!).toLocaleDateString("en-AR")}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          gap: 30,
        }}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
            onPress={() => {
              item.onPress && item.onPress();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.icon}
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "mon",
                  fontSize: 16,
                }}
              >
                {item.title}
              </Text>
            </View>

            {item.title === "Cerrar sesión" ? null : (
              <Ionicons name="chevron-forward-sharp" size={24} color="black" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
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

export default HomeScreen;
