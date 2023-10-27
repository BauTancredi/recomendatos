import React from "react";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../supabase";

export const GoogleLogin = () => {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "563135596111-tt116ge2gs65s2fst6pfiiu39ok2ga0f.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    // iosClientId:
    //   "563135596111-ftm1aqlkb8r5upotfgprpkanhrq9pnhi.apps.googleusercontent.com",
  });

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn({});

          // Sign in via Supabase Auth.
          if (userInfo.idToken) {
            const {
              error,
              data: { user },
            } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: userInfo.idToken,
            });

            console.log(JSON.stringify({ error, user }, null, 2));
            if (!error) {
              // User is signed in.
            }
          }
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
  );
};
