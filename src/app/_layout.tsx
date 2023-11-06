import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { useEffect } from "react";

const clerkKey = process.env.EXPO_PUBLIC_API_KEY!;

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();

  // UseFocusEffect
  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

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
      console.log(err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.log(err);
    }
  },
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;

// TODO
// [] - Setup Linter
// [] - Arreglar nombres de archivos y funciones
// [] - Configurar github devuelta
// [] - Arreglar ese minisegundo donde se ve page undefined
// [] - Configurar continuar con mail
// [] - Arregar clerk
// [] - Pulir el flujo de login. Try catch, etc, awaits, errores, if, etc.
