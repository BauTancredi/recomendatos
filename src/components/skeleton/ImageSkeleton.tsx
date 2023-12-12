import React from "react";
import ContentLoader from "react-content-loader/native";
import { Rect } from "react-native-svg";

const ImageSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={150}
      height={200}
      viewBox="0 0 150 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="0" y="0" rx="15" ry="15" width="150" height="200" />
    </ContentLoader>
  );
};

export default ImageSkeleton;
