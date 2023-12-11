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
          style={defaultStyles.card}
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
          style={defaultStyles.card}
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
});
