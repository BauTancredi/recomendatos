import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";
import { useProviderStore } from "@/stores/useProviderStore";

const WelcomeProviderScreen = () => {
  const router = useRouter();
  const type = useProviderStore((state) => state.type);

  return (
    <View style={[defaultStyles.container, { gap: 50, alignItems: "center" }]}>
      <Text style={[defaultStyles.textCenter]}>
        {type === "provider" ? "¡Bienvenido proveedor!" : "¡Bienvenido!"}
      </Text>
      <Image
        source={{ uri: "https://placehold.co/600x400/png" }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[defaultStyles.textCenter, { fontFamily: "mon-sb" }]}>
        ¿Listo para comenzar a trabajar?
      </Text>

      {type === "provider" && (
        <Text style={[defaultStyles.textCenter]}>
          Completa tu perfil de proveedor con la información solicitada.
        </Text>
      )}
      <PrimaryButton
        onPress={() => {
          if (type === "provider") {
            router.push("/(onboarding)/jobs");
          } else if (type === "shop") {
            router.push("/(onboarding)/shops");
          }
        }}
        text={TEXT_CONSTANTS.CONTINUE}
      />
    </View>
  );
};

export default WelcomeProviderScreen;
