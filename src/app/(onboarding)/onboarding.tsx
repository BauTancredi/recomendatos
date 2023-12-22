import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

const steps = {
  user: [
    {
      id: 1,
      title: "Step 1",
      description: "This is the first step.",
    },
    {
      id: 2,
      title: "Step 2",
      description: "This is the second step.",
    },
    {
      id: 3,
      title: "Step 3",
      description: "This is the third step.",
    },
  ],
  provider: [
    {
      id: 1,
      title: "Step 1 PROVIDER",
      description: "This is the first step.",
    },
    {
      id: 2,
      title: "Step 2 PROVIDER",
      description: "This is the second step.",
    },
    {
      id: 3,
      title: "Step 3 PROVIDER",
      description: "This is the third step.",
    },
  ],
};

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const type = useOnboardingStore((state) => state.type);

  const typeSteps = steps[type as keyof typeof steps];

  const handleNext = () => {
    if (currentStep < typeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    if (type === "user") {
      router.push("/(onboarding)/location");
    } else if (type === "provider") {
      router.push("/(onboarding)/provider-type");
    }
  };

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={styles.title}>{typeSteps[currentStep].title}</Text>
      <Text style={styles.description}>{typeSteps[currentStep].description}</Text>
      <Button title="Back" onPress={handleBack} disabled={currentStep === 0} />

      <Button title="Next" onPress={handleNext} disabled={currentStep === typeSteps.length - 1} />
      {currentStep === typeSteps.length - 1 && <Button title="Comenzar" onPress={handleContinue} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default OnboardingScreen;
