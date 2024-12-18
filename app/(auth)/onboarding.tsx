import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "@/assets/images/chronolock-logo2.png";

export default function Onboarding() {
  const router = useRouter();

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/(auth)/login"); // Navigate to login
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
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
  continueButton: {
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
  footer: {
    marginBottom: 30,
  },
  termsText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
