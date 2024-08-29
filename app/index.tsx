import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";

import logo from "../assets/images/chronolock-logo2.png";

// OAuth2 Credentials
// Expo Go: 727616176560-gf86ciiva3jbrh89krit9d0r1jm4ikse.apps.googleusercontent.com
// Android: 727616176560-v1st3bp301d0r3h8olidh3892p2d0ud7.apps.googleusercontent.com
// Web: 727616176560-diafqpv650m6sci93d8l5joi1c36npnr.apps.googleusercontent.com

export default function Onboarding() {
  const [user, setUser] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "727616176560-diafqpv650m6sci93d8l5joi1c36npnr.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const { idToken, user } = userInfo;

      // Send a request to the backend to check if the user exists
      const response = await axios.post("http://10.0.2.2:3000/checkUser", {
        email: user.email,
      });

      if (response.data.exists) {
        console.warn("User exists, logging in...");
        setUser(user.name);
      } else {
        console.warn("User does not exist!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ChronoLock</Text>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.slogan}>Secure Access. Anytime. Anywhere.</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Welcome to ChronoLock</Text>
        <Text style={styles.subText}>
          Effortless control over your laboratory access with the power of
          Bluetooth technology.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          style={styles.googleSignInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#F0F4F8",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 100,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A73E8",
  },
  slogan: {
    fontSize: 17,
    color: "#555",
    marginTop: 10,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#1A73E8",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleSignInButton: {
    width: "80%",
    height: 60,
  },
  footer: {
    marginBottom: 30,
  },
  termsText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
