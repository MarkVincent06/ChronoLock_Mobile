import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { UserContextProvider } from "../context/UserContext";
import "expo-dev-client";
import { MenuProvider } from "react-native-popup-menu";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  // Check onboarding status
  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(!!value);
    };

    checkOnboarding();
  }, []);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Hide splash screen and navigate based on app state
  useEffect(() => {
    const navigate = async () => {
      if (
        fontsLoaded &&
        hasSeenOnboarding !== null &&
        isAuthenticated !== null
      ) {
        await SplashScreen.hideAsync();

        if (isAuthenticated) {
          router.replace("/(tabs)/home");
        } else if (!isAuthenticated && hasSeenOnboarding) {
          router.replace("/(auth)/login");
        }
      }
    };

    navigate();
  }, [fontsLoaded, hasSeenOnboarding, isAuthenticated]);

  if (!fontsLoaded || hasSeenOnboarding === null || isAuthenticated === null) {
    return null;
  }

  return (
    <UserContextProvider>
      <MenuProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="account" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
      </MenuProvider>
    </UserContextProvider>
  );
}
