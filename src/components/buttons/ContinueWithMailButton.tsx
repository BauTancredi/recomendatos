import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import tw from "twrnc";

const ContinueWithMailButton = () => {
  return (
    <Pressable
      style={tw`flex-row my-1 w-full items-center justify-center p-4 border border-gray-300 rounded-full`}
    >
      <Ionicons
        name="mail"
        size={32}
        color="black"
        style={tw`absolute left-4`}
      />
      <Link href="/(public)/registerWithMail" asChild>
        <Text style={{ textAlign: "center" }}>Continuar con mi mail</Text>
      </Link>
    </Pressable>
  );
};

export default ContinueWithMailButton;
