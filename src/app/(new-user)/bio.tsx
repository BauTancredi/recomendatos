import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProgressSteps from "@/components/ProgressSteps";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";
import { useProviderStore } from "@/stores/useProviderStore";

const BioScreen = () => {
  const providerStore = useProviderStore();

  const handleContinue = () => {
    console.log("continue", providerStore);
    console.log(
      "continue",
      providerStore.bio,
      providerStore.address,
      providerStore.jobs,
      providerStore.type
    );
  };

  return (
    <View style={[defaultStyles.container, { paddingBottom: 40, justifyContent: "space-between" }]}>
      <View>
        <ProgressSteps progress={4} />
        <Text style={[defaultStyles.textCenter, { marginVertical: 20 }]}>
          Cuentanos un poco de ti...
        </Text>
        <TextInput
          multiline
          numberOfLines={10}
          style={styles.input}
          placeholder="Mas de 20 años de experiencia"
          onChangeText={(text) => providerStore.setBio(text)}
          value={providerStore.bio}
        />
      </View>
      <PrimaryButton text={TEXT_CONSTANTS.CONTINUE} onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    textAlignVertical: "top",
  },
});

export default BioScreen;
