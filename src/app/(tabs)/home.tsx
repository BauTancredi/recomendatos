import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, Text, TextInput, View, StyleSheet, ScrollView } from "react-native";

import providers from "@/assets/data/providers.json";
import shops from "@/assets/data/shops.json";
import FeaturesCategory from "@/components/cards/FeaturedCategory";
import FeaturedProvider from "@/components/cards/FeaturedProvider";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

WebBrowser.maybeCompleteAuthSession();

const HomeScreen = () => {
  // Fetch data from Supabase
  return (
    <ScrollView style={[defaultStyles.container, { paddingHorizontal: 0 }]}>
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
            gap: 10,
            marginVertical: 20,
          }}
          decelerationRate={0.5}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              source={{ uri: "https://placehold.co/600x400/png" }}
              style={styles.carouselImage}
              key={index}
            />
          ))}
        </ScrollView>
      </View>

      {/* Que estas buscando */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20, fontFamily: "mon-b" }}>¿Qué estás buscando?</Text>
        <Text style={{ fontSize: 16, color: Colors.grey, fontFamily: "mon" }}>
          Explora las categorías
        </Text>

        <View style={styles.providerTypeImageContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://placehold.co/600x400/png" }}
              style={styles.providerTypeImage}
            />
            <Text style={[styles.imageText, { fontFamily: "mon-sb" }]}>Profesionales</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://placehold.co/600x400/png" }}
              style={styles.providerTypeImage}
            />
            <Text style={[styles.imageText, { fontFamily: "mon-sb" }]}>Comercios</Text>
          </View>
        </View>
      </View>

      {/* Categorias destacadas */}
      <View style={{ paddingLeft: 16, gap: 20, marginVertical: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: "mon-b" }}>Categorías destacadas</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
          }}
          decelerationRate={0.3}
        >
          {shops.map((category) => (
            <FeaturesCategory category={category} key={category.id} />
          ))}
        </ScrollView>
      </View>

      {/* Proveedores destacados */}
      <View style={{ paddingHorizontal: 16, marginBottom: 32, gap: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: "mon-b" }}>Proveedores destacados</Text>
        <View>
          {providers.map((provider) => (
            <FeaturedProvider provider={provider} key={provider.id} />
          ))}
        </View>
      </View>
    </ScrollView>
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
    width: 350,
    height: 150,
    borderRadius: 15,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 15,
    overflow: "hidden",
  },
  imageText: {
    position: "absolute",
    color: "white",
    fontFamily: "mon",
    fontSize: 16,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 6,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add a semi-transparent background for the text
  },
  providerTypeImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  providerTypeImage: {
    width: 170,
    height: 150,
    borderRadius: 15,
  },
});
export default HomeScreen;
