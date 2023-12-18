import { useUser } from "@clerk/clerk-expo";
import { Entypo } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import locations from "@/assets/data/locations.json";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SelectButton from "@/components/buttons/SelectButton";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/Texts";
import { Option, SelectedCombo } from "@/interfaces/location";

const LocationScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [currentList, setCurrentList] = useState<Option[]>(locations);
  const [selectedCombo, setSelectedCombo] = useState<SelectedCombo>({
    zona: null,
    localidad: null,
  });

  const snapPoints = useMemo(() => {
    // calculate the height based on the number of items + header height
    const height = 130 + 50 * currentList.length; // replace 50 with the height of your list items
    return [height];
  }, [currentList]);

  const openBottomSheet = (type: "zona" | "localidad") => {
    if (type === "zona") {
      setCurrentList(locations);
      setSelectedCombo((prev) => ({ ...prev, localidad: null }));
    }

    bottomSheetRef.current?.expand();
  };

  const handleOptionPress = (item: Option) => {
    if (item.children) {
      setCurrentList(item.children);
      setSelectedCombo((prev) => ({
        ...prev,
        zona: {
          id: item.id,
          title: item.title,
        },
      }));
    } else {
      setSelectedCombo((prev) => ({ ...prev, localidad: item }));
    }

    bottomSheetRef.current?.close();
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);

      await user?.update({
        unsafeMetadata: {
          searchLocation: selectedCombo,
          finishedOnboarding: true,
        },
      });

      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Update error - Search Location: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: Option }) => (
      <TouchableOpacity style={styles.item} onPress={() => handleOptionPress(item)}>
        <Text>{item.title}</Text>
        <Entypo name="circle" size={22} />
      </TouchableOpacity>
    ),
    []
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
    ),
    []
  );

  const { zona, localidad } = selectedCombo;

  return (
    <View style={defaultStyles.container}>
      {/* <Spinner visible={isLoading} /> */}
      <Text style={defaultStyles.textCenter}>Ya casi estas!</Text>
      <Text style={defaultStyles.textCenter}>
        Indica tu localidad para encontrar proveedores que trabajen en tu zona.
      </Text>
      <SelectButton
        onPress={() => openBottomSheet("zona")}
        text={TEXT_CONSTANTS.SELECT_ZONE}
        selectedOption={zona}
      />
      <SelectButton
        onPress={() => openBottomSheet("localidad")}
        disabled={!zona}
        text={TEXT_CONSTANTS.SELECT_LOCATION}
        selectedOption={localidad}
      />
      <PrimaryButton
        text={TEXT_CONSTANTS.CONTINUE}
        onPress={handleContinue}
        disabled={!selectedCombo.zona || !selectedCombo.localidad || isLoading}
        isLoading={isLoading}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        enableDynamicSizing
      >
        <View style={styles.contentContainer}>
          <Text style={{ fontFamily: "mon-sb", fontSize: 32 }}>Zonas</Text>
          <Text style={{ fontFamily: "mon", fontSize: 16 }}>
            Selecciona la zona en la que deseas buscar proveedores.
          </Text>
          <BottomSheetFlatList
            data={currentList}
            keyExtractor={(i) => i.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default LocationScreen;
