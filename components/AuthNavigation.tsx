import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "@/context/UserContext";
import * as SplashScreen from "expo-splash-screen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Location from "expo-location";
import { BACKGROUND_LOCATION_TASK } from "@/app/tasks/backgroundLocationTask";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const AuthNavigation = () => {
  const { user, setUser } = useUserContext();
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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from the database if necessary
        setIsAuthenticated(true);

        // Request location permissions and start updates
        // (async () => {
        //   const { status } = await Location.requestForegroundPermissionsAsync();
        //   if (status === "granted") {
        //     const location = await Location.getCurrentPositionAsync({
        //       accuracy: Location.Accuracy.High,
        //     });

        //     // Update user context with location
        //     setUser((prevUser) =>
        //       prevUser ? { ...prevUser, location } : prevUser
        //     );

        //     // Start background location updates
        //     await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        //       accuracy: Location.Accuracy.High,
        //       timeInterval: 10000, // Update every 10 seconds
        //       foregroundService: {
        //         notificationTitle: "ChronoLock is tracking your location",
        //         notificationBody:
        //           "Your location is being used in the background.",
        //         notificationColor: "#1A73E8",
        //       },
        //     });
        //   } else {
        //     console.warn("Location permissions denied.");
        //   }
        // })();
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
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
            router.replace("/(student)/home");
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
