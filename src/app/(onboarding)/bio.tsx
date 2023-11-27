import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProgressSteps from "@/components/aux/ProgressSteps";
import { defaultStyles } from "@/constants/Styles";
import { TEXT_CONSTANTS } from "@/constants/texts";
import { useProviderStore } from "@/stores/useProviderStore";
import { getSupabase } from "@/utils/supabase";

const BioScreen = () => {
  const providerStore = useProviderStore();
  const supabase = getSupabase();
  const { user } = useUser();

  const handleContinue = async () => {
    const { error } = await supabase.from("providers").upsert({
      bio: providerStore.bio,
      address_description: providerStore.address?.description,
      address_lat: providerStore.address?.location.lat,
      address_lng: providerStore.address?.location.lng,
      type: providerStore.type,
      // shops: providerStore.shops,
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
          onChangeText={(text) => providerStore.setBio(text)}
          value={providerStore.bio}
        />
      </View>
      <PrimaryButton
        text={TEXT_CONSTANTS.CONTINUE}
        onPress={handleContinue}
        disabled={providerStore.bio.length < 10}
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
