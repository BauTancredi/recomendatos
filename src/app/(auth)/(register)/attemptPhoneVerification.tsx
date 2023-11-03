import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const attemptPhoneVerification = () => {
  const [number, onChangeNumber] = React.useState("");
  const router = useRouter();
  const { user } = useUser();

  const handlePress = async () => {
    await user?.phoneNumbers[0].prepareVerification();
    router.replace("/(auth)/(tabs)/(home)/home");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Numero de telefono"
        keyboardType="numeric"
      />
      <Button title="Verificar" onPress={handlePress} />
    </View>
  );
};

export default attemptPhoneVerification;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 100,
  },
});
