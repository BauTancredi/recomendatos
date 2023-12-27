import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetSectionList,
} from "@gorhom/bottom-sheet";
import React, { MutableRefObject, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import RadioButton from "@/components/buttons/RadioButton";
import { Municipio, Provincia } from "@/interfaces/location";

interface ProvinciasBottomSheetProps {
  bottomSheetRef: MutableRefObject<BottomSheet | null>;
  selectedProvincia: Provincia | null;
  setSelectedProvincia: (provincia: Provincia) => void;
  setSelectedMunicipios: (municipio: Municipio[]) => void;
  setSearch: (text: string) => void;
  filteredProvincias: Provincia[];
  isProvinciasLoading: boolean;
  search: string;
}

const ProvinciasBottomSheet = React.forwardRef<BottomSheet, ProvinciasBottomSheetProps>(
  (
    {
      setSearch,
      setSelectedProvincia,
      setSelectedMunicipios,
      selectedProvincia,
      filteredProvincias,
      bottomSheetRef,
      isProvinciasLoading,
      search,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => ["95%"], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
      ),
      []
    );

    const renderItem = useCallback(
      ({ item }: { item: Provincia }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            setSelectedProvincia(item as Provincia);
            setSelectedMunicipios([]);
            // bottomSheetRef.current?.close();
          }}
        >
          <Text>{item.nombre}</Text>
          <RadioButton selected={item.id === selectedProvincia?.id} />
        </TouchableOpacity>
      ),
      [selectedProvincia]
    );

    const renderSectionHeader = useCallback(
      ({
        section,
      }: {
        section: {
          title: string;
          data: Provincia[];
        };
      }) => (
        <View style={styles.sectionHeaderContainer}>
          <Text style={{ fontFamily: "mon", fontSize: 16 }}>{section.title}</Text>
        </View>
      ),
      []
    );

    const sections = [
      { title: "Seleccionadas", data: selectedProvincia ? [selectedProvincia] : [] },
      {
        title: "Provincias",
        data: filteredProvincias.filter((provincia) => provincia !== selectedProvincia),
      },
    ];

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <View style={styles.contentContainer}>
          <Text style={{ fontFamily: "mon-sb", fontSize: 24 }}>Provincia</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#000", height: 50 }}
            placeholder="Buscar provincia..."
            onChangeText={(text) => setSearch(text)}
            value={search}
          />

          <Text style={{ fontFamily: "mon", fontSize: 16 }}>
            Selecciona la provincia en la que deseas buscar proveedores.
          </Text>

          {isProvinciasLoading ? (
            <ActivityIndicator />
          ) : (
            <BottomSheetSectionList
              data={filteredProvincias}
              keyExtractor={(i: Provincia) => i.id}
              renderItem={renderItem}
              sections={sections}
              renderSectionHeader={renderSectionHeader}
            />
          )}

          <PrimaryButton
            text="Continuar"
            onPress={() => {
              setSearch("");
              bottomSheetRef.current?.close();
            }}
            styles={{ marginTop: 20 }}
            disabled={!selectedProvincia}
          />
        </View>
      </BottomSheet>
    );
  }
);

export default ProvinciasBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 10,
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
  sectionHeaderContainer: {
    backgroundColor: "white",
    // padding: 6,
    paddingVertical: 6,
  },
});
