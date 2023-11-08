import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { defaultStyles } from "@/constants/Styles";

const PreparePhoneVerification = () => {
  const [number, onChangeNumber] = useState("");
  const router = useRouter();

  const { user } = useUser();

  const handlePress = async () => {
    try {
      await user?.createPhoneNumber({
        phoneNumber: "+5491141643790",
      });

      await user?.reload();

      await user?.phoneNumbers[0].prepareVerification();

      router.push("/(register)/attemptPhoneVerification");
    } catch (err: any) {
      console.error("OAuth error - Prepare Phone Verification:", err.errors[0].message);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <TextInput
        style={[defaultStyles.inputField, { marginTop: 20 }]}
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
