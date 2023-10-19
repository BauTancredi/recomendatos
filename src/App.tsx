import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";

import Profile from "./screens/Profile";
import Auth from "./screens/Auth";
import { supabase } from "./supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        <Profile key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
