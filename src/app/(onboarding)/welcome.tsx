import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import { defaultStyles } from "@/constants/Styles";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={defaultStyles.safeArea}>
      <View style={[defaultStyles.container, styles.welcomeContainer]}>
        <Text style={defaultStyles.textCenter}>RecomenDatos</Text>
        <Text style={defaultStyles.textCenter}>Que te trae por aca?</Text>
        <Link href={{ pathname: "/(onboarding)/onboarding", params: { type: "user" } }} asChild>
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: "https://placehold.co/600x400/png" }}
              style={{ width: "100%", height: 200 }}
            />
            <Text style={defaultStyles.textCenter}>Buscar datos</Text>
          </TouchableOpacity>
        </Link>
        <Link href={{ pathname: "/(onboarding)/onboarding", params: { type: "provider" } }} asChild>
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: "https://placehold.co/600x400/png" }}
              style={{ width: "100%", height: 200 }}
            />
            <Text style={defaultStyles.textCenter}>Contratar servicios</Text>
          </TouchableOpacity>
        </Link>
        <Text style={defaultStyles.textCenter}>
          Escoge si deseas contratar servicios o ser tu quién lo ofrece.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
});
