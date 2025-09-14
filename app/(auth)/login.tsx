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
import API_URL from "../../config/ngrok-api";
import { useRouter } from "expo-router";
import eye from "../../assets/icons/eye.png";
import eyeHide from "../../assets/icons/eye-hide.png";
import {
  requestNotificationPermissions,
  getExpoPushToken,
  sendTokenToBackend,
} from "../../services/notificationService";

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

  const setupNotifications = async (userId: string) => {
    try {
      console.log("Setting up notifications...");

      // Request notification permissions
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        console.log("Notification permission denied");
        return;
      }

      // Get the Expo push token
      const token = await getExpoPushToken();
      if (!token) {
        console.log("Failed to get push token");
        return;
      }

      // Send token to backend
      const success = await sendTokenToBackend(token, userId);
      if (success) {
        console.log("Notification token registered successfully");
      } else {
        console.log("Failed to register notification token");
      }
    } catch (error) {
      console.error("Error setting up notifications:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Disable back action
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
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

        // Setup notifications after successful login
        setupNotifications(userData.idNumber);

        // Only navigate if not already navigated
        if (!isNavigated) {
          setIsNavigated(true); // Set to true to prevent additional navigation
          // Navigate based on userType
          if (userData.userType === "Faculty") {
            router.replace("/home");
          } else if (userData.userType === "Student") {
            router.replace("/(student)/home");
          } else if (userData.userType === "Admin") {
            router.replace("/(admin)/dashboard");
          } else if (
            userData.userType === "Lab-in-Charge" ||
            userData.userType === "Technician"
          ) {
            router.replace("/(lab-in-charge)/home");
          }
        }
      } else {
        console.log("Login failed:", response.data.message);
        setError(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

      // Restrict to school domain
      if (!googleUser.email.endsWith("@my.cspc.edu.ph")) {
        alert("Only valid CSPC accounts are allowed.");
        await GoogleSignin.signOut(); // force logout if not allowed
        setLoading(false);
        return;
      }

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

        // Setup notifications after successful Google sign-in
        setupNotifications(userData.idNumber);

        // Only navigate if not already navigated
        if (!isNavigated) {
          setIsNavigated(true); // Set to true to prevent additional navigation
          // Navigate based on userType
          if (userData.userType === "Faculty") {
            router.replace("/home");
          } else if (userData.userType === "Student") {
            router.replace("/(student)/home");
          } else if (userData.userType === "Admin") {
            router.replace("/(admin)/dashboard");
          } else if (
            userData.userType === "Lab-in-Charge" ||
            userData.userType === "Technician"
          ) {
            router.replace("/(lab-in-charge)/home");
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
              textContentType="password"
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
    color: "#000",
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
