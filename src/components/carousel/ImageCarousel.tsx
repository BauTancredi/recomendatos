import React from "react";
import { ScrollView, Image, View } from "react-native";
import SectionTitle from "../text/SectionTitle";

const ImageCarousel = ({
  carouselTitle,
  imageStyles,
}: {
  carouselTitle: string;
  imageStyles: any;
}) => {
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
