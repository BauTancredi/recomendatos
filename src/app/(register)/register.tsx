import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";

const RegisterWithMail = () => {
  const { emailAddress: emailAddressParam } = useLocalSearchParams<{
    emailAddress: string;
  }>();

  const [emailAddress, setEmailAddress] = useState(emailAddressParam);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { isLoaded, signUp, setActive } = useSignUp();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const { createdSessionId } = await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error("Register error", JSON.stringify(err));
    }
  };

  return (
    <View style={[defaultStyles.container, { gap: 10, marginTop: 10 }]}>
      <TextInput
        placeholder="firstName"
        value={firstName}
        onChangeText={setFirstName}
        style={defaultStyles.inputField}
      />
      <TextInput
        placeholder="lastName"
        value={lastName}
        onChangeText={setLastName}
        style={defaultStyles.inputField}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="simon@galaxies.dev"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={defaultStyles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={defaultStyles.inputField}
      />

      <Button title="Continue" color="#6c47ff" onPress={onSignUpPress} />
    </View>
  );
};

export default RegisterWithMail;
