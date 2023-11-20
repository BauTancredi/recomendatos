import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";

const WelcomeProviderScreen = () => {
  const router = useRouter();

  return (
    <View style={[defaultStyles.container, { gap: 50, alignItems: "center" }]}>
      <Text style={[defaultStyles.textCenter]}>!Bienvenido Proveedor!</Text>
      <Image
        source={{ uri: "https://placehold.co/600x400/png" }}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[defaultStyles.textCenter, { fontFamily: "mon-sb" }]}>
        ¿Listo para comenzar a trabajar?
      </Text>
      <Text style={[defaultStyles.textCenter]}>
        Completa tu perfil de proveedor con la información solicitada.
      </Text>
      <PrimaryButton
        onPress={() => {
          router.push("/(new-user)/jobs");
        }}
        text={TEXT_CONSTANTS.CONTINUE}
      />
    </View>
  );
};

export default WelcomeProviderScreen;
