import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";

import { defaultStyles } from "@/constants/Styles";
import { useProviderStore } from "@/stores/useProviderStore";

const ProviderTypeScreen = () => {
  const setType = useProviderStore((state) => state.setType);
  const router = useRouter();

  return (
    <SafeAreaView style={defaultStyles.safeArea}>
      <View style={[defaultStyles.container, styles.welcomeContainer]}>
        <Text style={defaultStyles.textCenter}>
          ¿Deseas continuar como proveedor que ofrece servicos o como comercio?
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setType("provider");
            router.push("/(onboarding)/welcome-provider");
          }}
        >
          <Image
            source={{ uri: "https://placehold.co/600x400/png" }}
            style={{ width: "100%", height: 200 }}
          />
          <Text style={defaultStyles.textCenter}>Como proveedor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setType("shop");
            router.push("/(onboarding)/welcome-provider");
          }}
        >
          <Image
            source={{ uri: "https://placehold.co/600x400/png" }}
            style={{ width: "100%", height: 200 }}
          />
          <Text style={defaultStyles.textCenter}>Como comercio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProviderTypeScreen;

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
