import * as WebBrowser from "expo-web-browser";
import React from "react";
import { SafeAreaView, Text } from "react-native";

import { defaultStyles } from "@/constants/Styles";

WebBrowser.maybeCompleteAuthSession();

const HomeScreen = () => {
  return (
    <SafeAreaView style={defaultStyles.safeArea}>
      <Text>Hello World</Text>
      {/* Search bar */}
      {/* Carousel */}
      {/* Que estas buscando */}
      {/* Categorias destacadas */}
      {/* Proveedores destacados */}
    </SafeAreaView>
  );
};

export default HomeScreen;
