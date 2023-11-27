import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProgressSteps from "@/components/aux/ProgressSteps";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";
import { useProviderStore } from "@/stores/useProviderStore";

const AddressScreen = () => {
  const router = useRouter();
  const setAddress = useProviderStore((state) => state.setAddress);
  const address = useProviderStore((state) => state.address);

  useEffect(() => {
    return () => {
      setAddress({ description: "", location: { lat: 0, lng: 0 } });
    };
  }, []);

  return (
    <View style={[defaultStyles.container, { paddingBottom: 40, justifyContent: "space-between" }]}>
      <ProgressSteps progress={2} />
      <Text style={[defaultStyles.textCenter]}>
        Si el servicio que brindas cuenta con una ubicación física, indícala aquí.
      </Text>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY!,
            language: "en",
            components: "country:ar",
          }}
          fetchDetails
          onPress={(data, details = null) =>
            setAddress({
              description: data.description,
              location: {
                lat: details?.geometry.location.lat,
                lng: details?.geometry.location.lng,
              },
            })
          }
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          onTimeout={() => console.log("timeout")}
        />
      </View>
      <PrimaryButton
        text={TEXT_CONSTANTS.CONTINUE}
        onPress={() => {
          router.push("/(onboarding)/bio");
        }}
        disabled={!address.description}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    height: 40,
  },
  container: {
    height: 400,
  },
});

export default AddressScreen;
