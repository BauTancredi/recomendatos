import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProgressSteps from "@/components/ProgressSteps";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";

const AddressScreen = () => {
  const router = useRouter();
  return (
    <View style={[defaultStyles.container, { paddingBottom: 40, justifyContent: "space-between" }]}>
      <ProgressSteps progress={3} />
      <Text style={[defaultStyles.textCenter]}>
        Si el servicio que brindas cuenta con una ubicación física, indícala aquí.
      </Text>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: "AIzaSyAEfK65F0K1nauMnfWcLxKY22OVtwc488E",
            language: "en",
            components: "country:ar",
          }}
          fetchDetails
          onPress={(data, details = null) => console.log(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          onTimeout={() => console.log("timeout")}
        />
      </View>
      <PrimaryButton
        text={TEXT_CONSTANTS.CONTINUE}
        onPress={() => {
          router.push("/(new-user)/bio");
        }}
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
