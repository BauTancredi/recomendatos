import { useSignUp } from "@clerk/clerk-expo";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
// import Spinner from "react-native-loading-spinner-overlay";

const RegisterWithMail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    console.log("1");

    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      const { createdSessionId } = await signUp.create({
        emailAddress,
        password,
        // firstName,
        // lastName,
        phoneNumber,
      });

      await setActive({ session: createdSessionId });
      router.push("/(auth)/(register)/preparePhoneVerification");

      //   console.log("2");

      //   // Send verification sms
      //   await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      //   console.log("3");

      //   // change the UI to verify the email address
      //   setPendingVerification(true);
      // } catch (err: any) {
      //   console.log(err.errors[0]);
      //   // alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    console.log("4");

    try {
      const { createdSessionId } = await signUp.attemptPhoneNumberVerification({
        code,
      });
      console.log("5");

      // console.log("requiredFields", emailAddress);
      // console.log("missingFields", hasPassword);
      console.log("createdSessionId", createdSessionId);
      // console.log("status", status);
      await setActive({ session: createdSessionId });
      console.log("6");

      // router.push("/(auth)/(tabs)/(home)/home");
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder="simon@galaxies.dev"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="firstName"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="lastName"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />
      <TextInput
        placeholder="phoneNumber"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.inputField}
      />

      <Button title="Continue" color="#6c47ff" onPress={onSignUpPress} />

      {pendingVerification && (
        <>
          <TextInput
            placeholder="Verification code"
            value={code}
            onChangeText={setCode}
            style={styles.inputField}
          />
          <Button title="Verify" color="#6c47ff" onPress={onPressVerify} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default RegisterWithMail;
