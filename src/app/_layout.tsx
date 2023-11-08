import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments, SplashScreen } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { useEffect } from "react";

const clerkKey = process.env.EXPO_PUBLIC_API_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      {/* <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}> */}
      <InitialLayout />
    </ClerkProvider>
  );
}

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup) {
      // TODO: Pensar este IF. Deberia representar un usuario recien registrado.
      if (!user?.hasVerifiedPhoneNumber) {
        router.push("/(auth)/(register)/preparePhoneVerification");
      } else {
        router.replace("/(auth)/(tabs)/(home)/home");
      }
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

// TODO
// [x] - Setup Linter
// [x] - Arreglar nombres de archivos y funciones
// [x] - Configurar github devuelta
// [x] - Arreglar ese minisegundo donde se ve page undefined
// [x] - Arreglar clerk
// [x] - Configurar continuar con mail
// [] - Pulir el flujo de login. Try catch, etc, awaits, errores, if,
//      loading state, react-hook-form, etc, (react-native-loading-spinner-overlay)
