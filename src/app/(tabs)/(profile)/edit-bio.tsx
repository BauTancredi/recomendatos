import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useProviderQuery } from "@/hooks/supabase";

const EditBioScreen = () => {
  const { user } = useUser();
  const { data } = useProviderQuery(user?.id!);
  const [bio, setBio] = useState(data?.data.bio);

  const handleBioChange = (text: string) => {
    setBio(text);
  };

  const handleSave = () => {
    // save the bio
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button title="Guardar" onPress={() => {}} disabled={bio === data?.data.bio} />
          ),
        }}
      />
      <View style={defaultStyles.container}>
        <TextInput multiline style={styles.bioInput} value={bio} onChangeText={handleBioChange} />
      </View>
    </>
  );
};

export default EditBioScreen;

const styles = StyleSheet.create({
  bioInput: {
    flexGrow: 1,
    minHeight: 60,
    maxHeight: 200,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    fontFamily: "mon",
    fontSize: 14,
  },
});
