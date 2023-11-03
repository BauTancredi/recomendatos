import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const clerkKey = process.env.EXPO_PUBLIC_API_KEY!;

// TODO
// [] - Setup Linter
// [] - Definir convencion de nombres de archivos
// [] - Configurar continuar con mail
// [] - Arreglar ese minisegundo donde se ve page undefined
// [] - Configurar github devuelta
// [] - Pulir el flujo de login. Try catch, etc.

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();

  // UseFocusEffect
  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";
    console.log("a");

    if (isSignedIn && !inTabsGroup) {
      // TODO: Pensar este IF. Deberia representar un usuario recien registrado.
      if (!user?.hasVerifiedPhoneNumber) {
        router.replace("/prepare-phone-verification");
      } else {
        router.replace("/(auth)/(tabs)/(home)/home");
      }
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;
