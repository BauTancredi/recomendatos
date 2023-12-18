import React from "react";
import ContentLoader from "react-content-loader/native";
import { Circle } from "react-native-svg";

const CircleSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Circle cx="12" cy="12" r="12" />
    </ContentLoader>
  );
};

export default CircleSkeleton;
