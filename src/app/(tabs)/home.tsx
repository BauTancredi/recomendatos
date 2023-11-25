import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { defaultStyles } from "@/constants/Styles";

WebBrowser.maybeCompleteAuthSession();

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

const HomeScreen = () => {
  return (
    <View style={[defaultStyles.container, { paddingHorizontal: 0 }]}>
      {/* Search bar */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={[defaultStyles.inputField, styles.inputSearchContainer]}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput placeholder="Buscar en RecomenDatos" style={{ marginLeft: 15 }} />
        </View>
      </View>

      {/* Carousel */}
      {/* react-native-pager-view */}
      {/* Indicador de imagen */}
      <View style={{ paddingLeft: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            marginVertical: 20,
          }}
        >
          <Image
            source={{ uri: "https://placehold.co/600x400/png" }}
            style={styles.carouselImage}
          />
          <Image
            source={{ uri: "https://placehold.co/600x400/png" }}
            style={styles.carouselImage}
          />
          <Image
            source={{ uri: "https://placehold.co/600x400/png" }}
            style={styles.carouselImage}
          />
        </ScrollView>
      </View>

      {/* Que estas buscando */}
      {/* Categorias destacadas */}
      {/* Proveedores destacados */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
  },

  carouselImage: {
    width: 300,
    height: 150,
    borderRadius: 15,
  },
});
export default HomeScreen;
