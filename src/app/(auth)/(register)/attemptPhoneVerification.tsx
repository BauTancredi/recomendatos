import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const AttemptPhoneVerification = () => {
  const [number, onChangeNumber] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const handlePress = async () => {
    await user?.phoneNumbers[0].attemptVerification({
      code: number,
    });
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

export default AttemptPhoneVerification;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 100,
  },
});
