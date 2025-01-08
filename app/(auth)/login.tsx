import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useUserContext } from "../../context/UserContext";
import * as Location from "expo-location";
import { BACKGROUND_LOCATION_TASK } from "@/app/tasks/backgroundLocationTask";
import API_URL from "../../config/ngrok-api";
import { useRouter } from "expo-router";
import eye from "../../assets/icons/eye.png";
import eyeHide from "../../assets/icons/eye-hide.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserContext();
  const router = useRouter();
  const [isNavigated, setIsNavigated] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Disable back action
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const handleLogin = async () => {
    if (!email || !password) {
      console.log("Login attempt with missing email or password.");
      alert("Please enter both email and password.");
      return;
    }

    const isValidEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(email)) {
      console.log("Invalid email address provided:", email);
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state

    try {
      console.log("Attempting login for email:", email);
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        const firebaseToken = response.data.firebaseToken;

        const userCredential = await signInWithCustomToken(auth, firebaseToken);
        const firebaseUser = userCredential.user;

        const userData = response.data.user;

        const mappedUser = {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          idNumber: userData.idNumber,
          userType: userData.userType,
          avatar: userData.avatar,
          location: null,
        };

        setUser(mappedUser);

        // Get the user's location after successful login
        // const { status } = await Location.requestForegroundPermissionsAsync();
        // if (status === "granted") {
        //   const location = await Location.getCurrentPositionAsync({
        //     accuracy: Location.Accuracy.High,
        //   });

        //   // Update user context with location
        //   setUser((prevUser) =>
        //     prevUser ? { ...prevUser, location } : prevUser
        //   );

        //   // Start background location tracking
        //   await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        //     accuracy: Location.Accuracy.High,
        //     timeInterval: 10000, // Fetch location every 10 seconds
        //     foregroundService: {
        //       notificationTitle: "ChronoLock is tracking your location",
        //       notificationBody:
        //         "Your location is being used in the background.",
        //       notificationColor: "#1A73E8",
        //     },
        //   });
        // } else {
        //   Alert.alert(
        //     "Permission Denied",
        //     "Background location access is required for this feature. Please enable it in your device's settings."
        //   );
        // }

        // Only navigate if not already navigated
        if (!isNavigated) {
          setIsNavigated(true); // Set to true to prevent additional navigation
          // Navigate based on userType
          if (userData.userType === "Faculty") {
            router.push("/home");
          } else if (userData.userType === "Student") {
            router.push("/(student)/home");
          } else if (userData.userType === "Admin") {
            router.push("/(admin)/dashboard");
          }
        }
      } else {
        console.log("Login failed:", response.data.message);
        setError(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error during login:", error.message);
        if (error.response) {
          console.log("Error response:", error.response.data);
          setError(
            error.response.data.message || "Request failed. Please try again."
          );
        }
      } else {
        console.error("An error occurred during login:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      console.log("Initiating Google sign-in...");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user: googleUser } = userInfo;

      const response = await axios.post(
        `${API_URL}/auth/googleSignIn`,
        { email: googleUser.email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.exists) {
        const googleCredential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, googleCredential);

        const userData = response.data.user;

        const mappedUser = {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          idNumber: userData.idNumber,
          userType: userData.userType,
          avatar: userData.avatar,
          location: null,
        };

        setUser(mappedUser);

        // Get the user's location after successful login
        // const { status } = await Location.requestForegroundPermissionsAsync();
        // if (status === "granted") {
        //   const location = await Location.getCurrentPositionAsync({
        //     accuracy: Location.Accuracy.High,
        //   });

        //   // Update user context with location
        //   setUser((prevUser) =>
        //     prevUser ? { ...prevUser, location } : prevUser
        //   );

        //   // Start background location tracking
        //   await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        //     accuracy: Location.Accuracy.High,
        //     distanceInterval: 10, // Minimum distance in meters between updates
        //     deferredUpdatesInterval: 1000, // Time interval in milliseconds
        //   });
        // } else {
        //   alert("Location permission is required to use this feature.");
        // }

        // Only navigate if not already navigated
        if (!isNavigated) {
          setIsNavigated(true); // Set to true to prevent additional navigation
          // Navigate based on userType
          if (userData.userType === "Faculty") {
            router.push("/home");
          } else if (userData.userType === "Student") {
            router.push("/(student)/home");
          } else if (userData.userType === "Admin") {
            router.push("/(admin)/dashboard");
          }
        }
      } else {
        console.log("Google sign-in failed:", response.data.message);
        alert(response.data.message);
        await GoogleSignin.signOut();
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Log in to ChronoLock</Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput
            style={[
              styles.input,
              focusedInput === "email" && styles.inputFocused,
            ]}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />

          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                styles.input,
                focusedInput === "password" && styles.inputFocused,
              ]}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              style={styles.eyeContainer}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Image
                source={showPassword ? eyeHide : eye}
                resizeMode="contain"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <GoogleSigninButton
            style={styles.googleSignInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignIn}
          />

          <TouchableOpacity
            onPress={() => router.push("/forgot-password")}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    paddingVertical: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A73E8",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingStart: 15,
    paddingEnd: 40,
    marginVertical: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#1A73E8",
    borderWidth: 2,
  },
  eyeContainer: {
    position: "absolute",
    right: 10,
    top: 21,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "black",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#1A73E8",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleSignInButton: {
    width: "100%",
    height: 48,
    marginTop: 20,
    borderRadius: 5,
  },
  forgotPasswordButton: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#1A73E8",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
  },
  loginButtonDisabled: {
    backgroundColor: "#9BB8E3",
  },
});
