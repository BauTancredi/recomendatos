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

import CheckboxButton from "../buttons/CheckboxButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import RadioButton from "@/components/buttons/RadioButton";
import { Municipio, Provincia } from "@/interfaces/location";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

interface MunicipiosBottomSheetProps {
  bottomSheetRef: MutableRefObject<BottomSheet | null>;
  selectedMunicipios: Municipio[];
  setSelectedMunicipios: (municipio: Municipio[]) => void;
  setSearch: (text: string) => void;
  filteredMunicipios: Municipio[];
  isMunicipiosLoading: boolean;
  filteredLocalidadesCABA: Municipio[];
  isLocalidadesLoading: boolean;
  selectedProvincia: Provincia | null;
  search: string;
}

const MunicipiosBottomSheet = React.forwardRef<BottomSheet, MunicipiosBottomSheetProps>(
  (
    {
      setSearch,
      setSelectedMunicipios,
      selectedMunicipios,
      filteredMunicipios,
      bottomSheetRef,
      isMunicipiosLoading,
      isLocalidadesLoading,
      filteredLocalidadesCABA,
      selectedProvincia,
      search,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => ["95%"], []);
    const { type } = useOnboardingStore((state) => state);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
      ),
      []
    );

    const renderItem = useCallback(
      ({ item }: { item: Municipio }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            setSelectedMunicipios([item]);
            // bottomSheetRef.current?.close();
          }}
        >
          <Text>{item.nombre}</Text>
          <RadioButton selected={item.id === selectedMunicipios[0]?.id} />
        </TouchableOpacity>
      ),
      [selectedMunicipios]
    );

    const renderSectionHeader = useCallback(
      ({ section }) => (
        <View style={styles.sectionHeaderContainer}>
          <Text style={{ fontFamily: "mon", fontSize: 16 }}>{section.title}</Text>
        </View>
      ),
      []
    );

    const isCABASelected = selectedProvincia?.id === "02";
    const notSelectedData = isCABASelected
      ? filteredLocalidadesCABA.filter((localidad) => !selectedMunicipios.includes(localidad))
      : filteredMunicipios.filter((municipio) => !selectedMunicipios.includes(municipio));

    const sections = [
      { title: "Seleccionadas:", data: selectedMunicipios ? selectedMunicipios : [] },
      {
        title: "Localidades:",
        data: notSelectedData,
      },
    ];

    const renderCheckboxItem = useCallback(
      ({ item }: { item: Municipio }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            if (selectedMunicipios.some((m) => m.id === item.id)) {
              setSelectedMunicipios(selectedMunicipios.filter((m) => m.id !== item.id));
            } else {
              setSelectedMunicipios([...selectedMunicipios, item]);
            }
          }}
        >
          <Text>{item.nombre}</Text>
          <CheckboxButton selected={selectedMunicipios.some((m) => m.id === item.id)} />
        </TouchableOpacity>
      ),
      [selectedMunicipios]
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <View style={styles.contentContainer}>
          <Text style={{ fontFamily: "mon-sb", fontSize: 24 }}>Municipios</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#000", height: 50 }}
            placeholder="Buscar municipios..."
            onChangeText={(text) => setSearch(text)}
            value={search}
          />

          <Text style={{ fontFamily: "mon", fontSize: 16 }}>
            Selecciona el municipio en el que deseas buscar proveedores.
          </Text>

          {isMunicipiosLoading || isLocalidadesLoading ? (
            <ActivityIndicator />
          ) : (
            <BottomSheetSectionList
              data={selectedProvincia?.id === "02" ? filteredLocalidadesCABA : filteredMunicipios}
              keyExtractor={(i: Municipio) => i.id}
              renderItem={type === "provider" ? renderCheckboxItem : renderCheckboxItem}
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
            disabled={!selectedMunicipios}
          />
        </View>
      </BottomSheet>
    );
  }
);

export default MunicipiosBottomSheet;

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
