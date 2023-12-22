import { useUser } from "@clerk/clerk-expo";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

import MunicipiosBottomSheet from "@/components/bottom/MunicipiosBottomSheet";
import ProvinciasBottomSheet from "@/components/bottom/ProvinciasBottomSheet";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";
import useFilterSearch from "@/hooks/useFilterSearch";
import useProvinciasAndMunicipios from "@/hooks/useProvinciasAndMunicipios";
import { Municipio, Provincia } from "@/interfaces/location";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

// [x] Update tablas para multple municipios
// [x] Test flujo entero
// [] Tablas actualizadas

const LocationScreen = () => {
  const provinciasBottomSheetRef = useRef<BottomSheet>(null);
  const municipiosBottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState<Provincia | null>(null);
  const [selectedMunicipios, setSelectedMunicipios] = useState<Municipio[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setProvincia, setMunicipios, type } = useOnboardingStore((state) => state);

  useEffect(() => {
    setProvincia(selectedProvincia);
    setMunicipios(selectedMunicipios);
  }, [selectedProvincia, selectedMunicipios]);

  const {
    provincias,
    isProvinciasLoading,
    municipios,
    isMunicipiosLoading,
    localidades,
    isLocalidadesLoading,
  } = useProvinciasAndMunicipios(selectedProvincia);

  const filteredProvincias = useFilterSearch(provincias, search);
  const filteredMunicipios = useFilterSearch(municipios, search);
  const filteredLocalidadesCABA = useFilterSearch(localidades, search);

  const openProvinciasBottomSheet = () => {
    provinciasBottomSheetRef.current?.expand();
  };

  const openMunicipiosBottomSheet = () => {
    municipiosBottomSheetRef.current?.expand();
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);

      if (type === "provider") {
        router.push("/(onboarding)/bio");
      } else {
        //TODO: "Update user location"
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error("Update error - Search Location: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.textCenter}>Ya casi estas!</Text>
      <Text style={defaultStyles.textCenter}>
        Indica tu localidad para encontrar proveedores que trabajen en tu zona.
      </Text>
      <View>
        <Text
          style={[
            defaultStyles.textCenter,
            { marginVertical: 20, fontFamily: "mon-sb", fontSize: 24 },
          ]}
        >
          Provincia
        </Text>
        <Text style={[defaultStyles.textCenter]}>{selectedProvincia?.nombre}</Text>
        <Text
          style={[defaultStyles.textCenter, { textDecorationLine: "underline" }]}
          onPress={() => {
            openProvinciasBottomSheet();
          }}
        >
          Seleccionar provincia
        </Text>
      </View>
      <View>
        <Text
          style={[
            defaultStyles.textCenter,
            { marginVertical: 20, fontFamily: "mon-sb", fontSize: 24 },
          ]}
        >
          Municipio
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
          {selectedMunicipios?.map((municipio) => (
            <Text
              key={municipio.id}
              style={[
                defaultStyles.textCenter,
                {
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 10,
                  color: "#fff",
                },
              ]}
            >
              {municipio.nombre}
            </Text>
          ))}
        </View>
        <Text
          style={[defaultStyles.textCenter, { textDecorationLine: "underline" }]}
          onPress={() => {
            openMunicipiosBottomSheet();
          }}
          disabled={!selectedProvincia}
        >
          Seleccionar municipio
        </Text>
      </View>
      <PrimaryButton
        text={TEXT_CONSTANTS.CONTINUE}
        onPress={handleContinue}
        // disabled={!selectedCombo.zona || !selectedCombo.localidad || isLoading}
        isLoading={isLoading}
      />
      <ProvinciasBottomSheet
        selectedProvincia={selectedProvincia}
        setSearch={setSearch}
        setSelectedProvincia={setSelectedProvincia}
        bottomSheetRef={provinciasBottomSheetRef}
        filteredProvincias={filteredProvincias}
        setSelectedMunicipios={setSelectedMunicipios}
        isProvinciasLoading={isProvinciasLoading}
        search={search}
      />
      <MunicipiosBottomSheet
        selectedMunicipios={selectedMunicipios}
        setSearch={setSearch}
        bottomSheetRef={municipiosBottomSheetRef}
        filteredMunicipios={filteredMunicipios}
        setSelectedMunicipios={setSelectedMunicipios}
        isMunicipiosLoading={isMunicipiosLoading}
        isLocalidadesLoading={isLocalidadesLoading}
        filteredLocalidadesCABA={filteredLocalidadesCABA}
        selectedProvincia={selectedProvincia}
        search={search}
      />
    </View>
  );
};

export default LocationScreen;
