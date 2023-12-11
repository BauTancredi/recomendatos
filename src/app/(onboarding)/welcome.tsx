import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import { defaultStyles } from "@/constants/Styles";

const WelcomeScreen = () => {
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (type: "provider" | "user") => {
    try {
      setIsLoading(true);

      await user?.update({
        unsafeMetadata: {
          type,
        },
      });

      router.push({
        pathname: "/(onboarding)/onboarding",
        params: {
          type,
        },
      });
    } catch (error) {
      console.error("Update error - User Type: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={defaultStyles.safeArea}>
      <View style={[defaultStyles.container, styles.welcomeContainer]}>
        <Text style={defaultStyles.textCenter}>RecomenDatos</Text>
        <Text style={defaultStyles.textCenter}>Que te trae por aca?</Text>
        <TouchableOpacity
          style={defaultStyles.card}
          onPress={() => handleClick("user")}
          disabled={isLoading}
        >
          <Image
            source={{ uri: "https://placehold.co/600x400/png" }}
            style={{ width: "100%", height: 200 }}
          />
          <Text style={defaultStyles.textCenter}>Buscar datos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={defaultStyles.card}
          onPress={() => handleClick("provider")}
          disabled={isLoading}
        >
          <Image
            source={{ uri: "https://placehold.co/600x400/png" }}
            style={{ width: "100%", height: 200 }}
          />
          <Text style={defaultStyles.textCenter}>Contratar servicios</Text>
        </TouchableOpacity>
        <Text style={defaultStyles.textCenter}>
          Escoge si deseas contratar servicios o ser tu quién lo ofrece.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // width: "100%",
  },
});
