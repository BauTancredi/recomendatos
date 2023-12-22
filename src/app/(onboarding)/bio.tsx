import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";

import ProgressSteps from "@/components/aux/ProgressSteps";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { getSupabase } from "@/utils/supabase";

const BioScreen = () => {
  const supabase = getSupabase();
  const { user } = useUser();
  const { address, bio, providerType, provincia, municipios, setBio } = useOnboardingStore(
    (state) => state
  );

  const handleContinue = async () => {
    const { error } = await supabase.from("providers").upsert({
      bio,
      // address_description: address?.description,
      // address_lat: address?.location.lat,
      // address_lng: address?.location.lng,
      provider_type: providerType,
      address,
      province: provincia,
      locations: municipios,
      first_name: user?.firstName,
      last_name: user?.lastName,
    });

    if (error) {
      console.log("Supabase error:", error);
      return;
    }

    // for (const job of providerStore.jobs) {
    //   const { error } = await supabase.from("provider_job").insert({
    //     clerk_id: user?.id,
    //     job_id: job,
    //   });

    //   if (error) {
    //     console.log("Supabase error:", error.message);
    //     return;
    //   }
    // }

    await user?.update({
      unsafeMetadata: {
        finishedOnboarding: true,
      },
    });

    console.log("Provider created");
    Keyboard.dismiss();
  };

  return (
    <View style={[defaultStyles.container, { paddingBottom: 40 }]}>
      <View>
        <ProgressSteps progress={3} />
        <Text style={[defaultStyles.textCenter, { marginVertical: 20 }]}>
          Cuentanos un poco de ti...
        </Text>
        <TextInput
          multiline
          numberOfLines={10}
          style={styles.input}
          placeholder="Mas de 20 años de experiencia"
          onChangeText={(text) => setBio(text)}
          value={bio}
        />
      </View>
      <PrimaryButton
        text={TEXT_CONSTANTS.CONTINUE}
        onPress={handleContinue}
        disabled={bio.length < 10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    textAlignVertical: "top",
    width: "100%",
    marginHorizontal: 0,
  },
});

export default BioScreen;
