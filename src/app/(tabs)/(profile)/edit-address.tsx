import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { defaultStyles } from "@/constants/Styles";

const EditAddress = () => {
  const [address, setAddress] = React.useState({
    description: "",
    location: { lat: 0, lng: 0 },
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Guardar"
              // onPress={handleSubmit(saveChanges)}
              // disabled={!isDirty || !isValid}
            />
          ),
        }}
      />

      <View style={defaultStyles.container}>
        <GooglePlacesAutocomplete
          placeholder="Direccion actual"
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY!,
            language: "en",
            components: "country:ar",
          }}
          // fetchDetails
          // onPress={(data, details = null) =>
          //   setAddress({
          //     description: data.description,
          //     location: {
          //       lat: details?.geometry.location.lat,
          //       lng: details?.geometry.location.lng,
          //     },
          //   })
          // }
          // onFail={(error) => console.log(error)}

          onNotFound={() => console.log("no results")}
          onTimeout={() => console.log("timeout")}
          styles={{
            textInput: {
              borderWidth: 1,
            },
          }}
        />
      </View>
    </>
  );
};

export default EditAddress;

const styles = StyleSheet.create({});
