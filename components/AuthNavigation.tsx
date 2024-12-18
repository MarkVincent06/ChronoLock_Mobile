import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "@/context/UserContext";
import * as SplashScreen from "expo-splash-screen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const AuthNavigation = () => {
  const { user } = useUserContext();
  const router = useRouter();

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Configure Google Sign In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "365575308659-inf0orupn0be52425i241vepteremriq.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

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

  // Navigation Logic
  useEffect(() => {
    const navigate = async () => {
      if (hasSeenOnboarding !== null && isAuthenticated !== null) {
        await SplashScreen.hideAsync();

        if (!hasSeenOnboarding) {
          router.replace("/(auth)/onboarding");
        } else if (isAuthenticated) {
          if (user?.userType === "Faculty") {
            router.replace("/(faculty)/home");
          } else if (user?.userType === "Student") {
            router.replace("/(student)/HomeStudents");
          } else if (user?.userType === "Admin") {
            router.replace("/(admin)/dashboard");
          }
        } else {
          router.replace("/(auth)/login");
        }
      }
    };

    navigate();
  }, [hasSeenOnboarding, isAuthenticated, user]);

  return null; // This component doesn't render anything, it just handles navigation
};

export default AuthNavigation;
