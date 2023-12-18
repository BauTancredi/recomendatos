import React from "react";
import ContentLoader from "react-content-loader/native";
import { Rect } from "react-native-svg";

interface TextSkeletonProps {
  width: number;
  height: number;
  radius: number;
}

const TextSkeleton: React.FC<TextSkeletonProps> = ({ height, width, radius }) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="0" y="0" rx={radius} ry={radius} width={width} height={height} />
    </ContentLoader>
  );
};

export default TextSkeleton;
