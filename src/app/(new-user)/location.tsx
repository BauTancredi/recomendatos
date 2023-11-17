import { Ionicons, Entypo } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";

const data = {
  zonas: [
    {
      id: 1,
      name: "Zona Norte",
    },
    {
      id: 2,
      name: "Zona Sur",
    },
    {
      id: 3,
      name: "Zona Oeste",
    },
  ],
  localidades: [
    {
      id: 1,
      name: "Cali",
    },
    {
      id: 2,
      name: "Bogota",
    },
    {
      id: 3,
      name: "Medellin",
    },
  ],
};

interface Option {
  id: number;
  name: string;
}

const LocationScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  const snapPoints = useMemo(() => {
    // calculate the height based on the number of items + header height

    const height = 130 + 50 * data.zonas.length; // replace 50 with the height of your list items
    return [height];
  }, [data]);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleOptionPress = (item: Option) => {
    console.log(item);
    bottomSheetRef.current?.close();
  };

  const handleContinue = () => {
    // save user data in clerk
    router.push("/(tabs)/home");
  };

  const renderItem = useCallback(
    ({ item }: { item: Option }) => (
      <TouchableOpacity style={styles.item} onPress={() => handleOptionPress(item)}>
        <Text>{item.name}</Text>
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

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.textCenter}>Ya casi estas! </Text>
      <Text style={defaultStyles.textCenter}>
        Indica tu localidad para encontrar proveedores que trabajen en tu zona.
      </Text>
      <TouchableOpacity style={styles.select} onPress={() => openBottomSheet()}>
        <Text>Selecciona tu zona</Text>
        <Ionicons name="chevron-down" size={22} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.select} onPress={() => openBottomSheet()}>
        <Text>Selecciona tu localidad</Text>
        <Ionicons name="chevron-down" size={22} />
      </TouchableOpacity>
      <PrimaryButton text="Continuar" onPress={handleContinue} />
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
            data={data.zonas}
            keyExtractor={(i) => i.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
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
