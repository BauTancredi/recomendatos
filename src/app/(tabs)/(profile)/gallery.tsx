import { Ionicons, Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { Button, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { ImageSkeleton } from "@/components/skeleton";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const gallery = () => {
  const [selectMode, setSelectMode] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

  const toggleSelectImage = (image: string) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(image)) {
        return prevSelectedImages.filter((i) => i !== image);
      } else {
        return [...prevSelectedImages, image];
      }
    });
  };

  const HeaderRight = () => {
    return (
      <View style={{ width: "auto", alignItems: "flex-end", justifyContent: "center" }}>
        {selectMode ? (
          <Ionicons
            name="md-trash-outline"
            title="Eliminar"
            onPress={() => setSelectMode(false)}
            color={Colors.error}
            size={24}
          />
        ) : (
          <Button title="Seleccionar" onPress={() => setSelectMode(true)} />
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: HeaderRight,
        }}
      />
      <View
        style={[
          defaultStyles.container,
          {
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "center",
            gap: 15,
          },
        ]}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          // <ImageSkeleton key={index} width={110} height={110} />
          <TouchableOpacity style={{ position: "relative" }} onPress={() => toggleSelectImage("1")}>
            <Image
              source={{ uri: "https://placehold.co/600x400/png" }}
              style={[styles.image, selectedImages.includes("1") ? { opacity: 0.5 } : {}]}
              key={index}
            />
            {selectedImages.includes("1") ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="black"
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              />
            ) : (
              <Feather
                name="circle"
                size={24}
                color="black"
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default gallery;

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
});
