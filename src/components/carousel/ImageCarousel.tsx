import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ScrollView, Image, View, TouchableOpacity, StyleProp, ImageStyle } from "react-native";

// import ImageSkeleton from "../skeleton/ImageSkeleton";
import SectionTitle from "../text/SectionTitle";
import { processImage } from "@/utils/image";

interface ImageCarouselProps {
  carouselTitle: string;
  imageStyles: StyleProp<ImageStyle>;
  setIsImageViewerVisible?: (visible: boolean) => void;
  images?: any[];
  setImageIndex?: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  carouselTitle,
  imageStyles,
  setIsImageViewerVisible,
  images,
  setImageIndex,
}) => {
  const launchGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

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
        {images?.map((image, index) => (
          // <ImageSkeleton key={index} />

          <TouchableOpacity
            onPress={() => {
              setImageIndex?.(index);
              setIsImageViewerVisible?.(true);
            }}
            key={index}
          >
            <Image source={{ uri: image.uri }} style={imageStyles} key={index} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageCarousel;
