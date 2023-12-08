import * as FileSystem from "expo-file-system";

export const processImage = async (uri: string) => {
  try {
    const base64Image = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const base64Prefix = "data:image/png;base64,";
    return base64Image.startsWith(base64Prefix) ? base64Image : base64Prefix + base64Image;
  } catch (error) {
    console.error("Error processing image: ", error);
    alert("Error processing the image.");
  }
};
