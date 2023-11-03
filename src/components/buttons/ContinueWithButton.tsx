import React from "react";
import { Pressable, Text } from "react-native";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useOAuth, useAuth } from "@clerk/clerk-expo";

interface ContinueWithButtonProps {
  title: string;
  icon: "mail" | "logo-google" | "logo-apple" | "logo-facebook";
  backgroundColor?: string;
  strategy: "oauth_google" | "oauth_facebook" | "oauth_apple";
}

const ContinueWithButton = ({
  title,
  icon,
  strategy,
}: ContinueWithButtonProps) => {
  const { startOAuthFlow } = useOAuth({ strategy });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive, authSessionResult } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Pressable
      style={tw`flex-row my-1 w-full items-center justify-center p-4 border border-gray-300 rounded-full`}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={32}
        color="black"
        style={tw`absolute left-4`}
      />
      <Text style={{ textAlign: "center" }}>Continuar con {title}</Text>
    </Pressable>
  );
};

export default ContinueWithButton;
