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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  getAuth,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { FirebaseError } from "firebase/app";
import { useUserContext } from "../../context/UserContext";
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

  const { setUser } = useUserContext();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const isValidEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Send the email to the backend to fetch additional user data
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

        // Map the response data to the User type
        const mappedUser = {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          idNumber: userData.idNumber,
          userType: userData.userType,
          avatar: userData.avatar,
        };

        // Set the user in the context
        setUser(mappedUser);
      } else {
        alert("User not found or invalid credentials.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;

          switch (status) {
            case 401:
              alert(
                data.message || "Incorrect email or password. Please try again."
              );
              break;
            case 404:
              alert(data.message || "User not found. Please register first.");
              break;
            default:
              alert(data.message || "An error occurred. Please try again.");
              break;
          }
        } else {
          alert(
            "A network error occurred. Please check your connection and try again."
          );
        }
      } else if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/wrong-password":
            alert("Incorrect password. Please try again.");
            break;
          case "auth/user-not-found":
            alert("User not found. Please register first.");
            break;
          default:
            alert("An error occurred. Please try again.");
            break;
        }
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
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
        };

        setUser(mappedUser);

        console.log("Google sign-in successful and context updated!");
      } else {
        alert(response.data.message);
        await GoogleSignin.signOut();
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("An error occurred during Google Sign-In.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Log in to ChronoLock</Text>

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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <GoogleSigninButton
            style={styles.googleSignInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignIn}
          />

          {/* Forgot Password Button */}
          <TouchableOpacity
            onPress={() => router.push("/forgot-password")}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#1A73E8" />
          </View>
        )}
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
  },
  forgotPasswordButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: "#1A73E8",
    fontSize: 16,
    fontWeight: "500",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1,
  },
});
