import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ScrollView, Image, View, TouchableOpacity } from "react-native";

import SectionTitle from "../text/SectionTitle";
import { processImage } from "@/utils/image";

const ImageCarousel = ({
  carouselTitle,
  imageStyles,
}: {
  carouselTitle: string;
  imageStyles: any;
}) => {
  const launchGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      console.log(result);

      if (!result.canceled) {
        const finalBase64Image = await processImage(result.assets[0].uri);
        // user?.setProfileImage({ file: finalBase64Image! });
      }
    } catch (error) {
      console.error("Error launching gallery: ", error);
      alert("Failed to open gallery.");
    } finally {
      // bottomSheetRef.current?.close();
    }
  };

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <SectionTitle title={carouselTitle} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          // paddingRight: 0,
        }}
        decelerationRate={0.3}
      >
        <TouchableOpacity
          style={[
            imageStyles,
            {
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
            },
          ]}
          onPress={launchGallery}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            source={{ uri: "https://placehold.co/150x250/png" }}
            style={imageStyles}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageCarousel;
