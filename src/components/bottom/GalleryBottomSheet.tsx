import { UserResource } from "@clerk/types";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdropProps, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useMemo, useCallback } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import Colors from "@/constants/Colors";

interface GalleryBottomSheetProps {
  // Define the props for your custom bottom sheet here
  launchCamera: () => void;
  launchGallery: () => void;
  title?: string;
}

const GalleryBottomSheet = React.forwardRef<BottomSheet, GalleryBottomSheetProps>(
  ({ launchCamera, launchGallery, title }, bottomSheetRef) => {
    const snapPoints = useMemo(() => ["25%"], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
      ),
      []
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <View
          style={{
            alignItems: "flex-start",
            gap: 20,
            marginVertical: 20,
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
            {title || "Editar foto de perfil"}
          </Text>
          <TouchableOpacity
            onPress={launchCamera}
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          >
            <Ionicons name="camera" size={24} color="black" />
            <Text>Tomar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={launchGallery}
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          >
            <Ionicons name="image" size={24} color="black" />
            <Text>Seleccionar de la galeria</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  }
);

export default GalleryBottomSheet;
