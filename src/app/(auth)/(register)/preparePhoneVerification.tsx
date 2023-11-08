import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const PreparePhoneVerification = () => {
  const [number, onChangeNumber] = useState("");
  const router = useRouter();

  const { user } = useUser();
  console.log(user);

  const handlePress = async () => {
    // await user?.createPhoneNumber({
    //   phoneNumber: number,
    // });
    await user?.phoneNumbers[0].prepareVerification();
    router.push("/(auth)/(register)/attemptPhoneVerification");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Numero de telefono"
        keyboardType="phone-pad"
      />
      <Button title="Enviar codigo" onPress={handlePress} />
      <Text>{user?.phoneNumbers[0]?.phoneNumber}</Text>
    </View>
  );
};

export default PreparePhoneVerification;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
