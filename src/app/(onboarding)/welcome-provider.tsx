import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

const WelcomeProviderScreen = () => {
  const router = useRouter();
  const providerType = useOnboardingStore((state) => state.providerType);

  return (
    <View style={[defaultStyles.container, { gap: 50, alignItems: "center" }]}>
      <Text style={[defaultStyles.textCenter]}>
        {providerType === "professional" ? "¡Bienvenido proveedor!" : "¡Bienvenido!"}
      </Text>
      <Image
        source={{ uri: "https://placehold.co/600x400/png" }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[defaultStyles.textCenter, { fontFamily: "mon-sb" }]}>
        ¿Listo para comenzar a trabajar?
      </Text>

      {providerType === "professional" && (
        <Text style={[defaultStyles.textCenter]}>
          Completa tu perfil de proveedor con la información solicitada.
        </Text>
      )}
      <PrimaryButton
        onPress={() => {
          if (providerType === "professional") {
            router.push("/(onboarding)/jobs");
          } else if (providerType === "shop") {
            router.push("/(onboarding)/shops");
          }
        }}
        text={TEXT_CONSTANTS.CONTINUE}
      />
    </View>
  );
};

export default WelcomeProviderScreen;
