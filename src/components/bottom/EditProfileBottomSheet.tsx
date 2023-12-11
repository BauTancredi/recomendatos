import BottomSheet, { BottomSheetBackdropProps, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useMemo, useCallback } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MenuItem } from "@/interfaces";

interface EditProfileBottomSheetProps {
  menuItems: MenuItem[];
}

const EditProfileBottomSheet = React.forwardRef<BottomSheet, EditProfileBottomSheetProps>(
  ({ menuItems }, bottomSheetRef) => {
    const snapPoints = useMemo(() => ["40%"], []);

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
          {menuItems.map(
            (
              item: {
                title: string;
                icon: JSX.Element;
                onPress: () => void;
              },
              index: number
            ) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  item.onPress && item.onPress();
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: "mon",
                      fontSize: 16,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
      </BottomSheet>
    );
  }
);

export default EditProfileBottomSheet;
