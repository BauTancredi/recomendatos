import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { defaultStyles } from "@/constants/Styles";

const AttemptPhoneVerification = () => {
  const [number, onChangeNumber] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const handlePress = async () => {
    try {
      await user?.phoneNumbers[0].attemptVerification({
        code: number,
      });

      router.push("/(tabs)/home");
    } catch (err) {
      console.error("OAuth error - Attempt Phone Verification", err);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <TextInput
        style={[defaultStyles.inputField, { marginTop: 20 }]}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Codigo de verificacion"
        keyboardType="numeric"
      />
      <Button title="Verificar" onPress={handlePress} />
    </View>
  );
};

export default AttemptPhoneVerification;
