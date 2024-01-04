import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Slot, useRouter, SplashScreen } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { QueryClient, QueryClientProvider } from "react-query";

import { initializeSupabase } from "@/utils/supabase";

const clerkKey = process.env.EXPO_PUBLIC_API_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      console.log("Error getting token from cache: ", err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.log("Error saving the token in cache: ", err);
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

  if (!loaded) return null;

  const queryClient = new QueryClient();

  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
          <InitialLayout />
        </ClerkProvider>
      </QueryClientProvider>
    </RootSiblingParent>
  );
}

const InitialLayout = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchTokenAndInitialize = async () => {
      const token = await getToken({ template: "supabase" });
      initializeSupabase(token!);
    };

    fetchTokenAndInitialize();
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) return;

    SplashScreen.hideAsync();

    router.replace("/(tabs)/(profile)/leave-review");
    // if (isSignedIn) {
    //   if (user?.hasVerifiedPhoneNumber) {
    //     if (!user?.unsafeMetadata.finishedOnboarding) {
    //       router.replace("/(onboarding)/welcome");
    //     } else {
    //       router.replace("/(tabs)/home");
    //     }
    //   } else {
    //     // router.replace("/(onboarding)/welcome");
    //     router.replace("/(register)/prepare");
    //   }
    // } else {
    //   router.replace("/(register)/login");
    // }
  }, [isSignedIn]);

  return <Slot />;
};
