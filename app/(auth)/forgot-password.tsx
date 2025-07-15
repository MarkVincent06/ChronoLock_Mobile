import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import API_URL from "@/config/ngrok-api";

import eye from "../../assets/icons/eye.png";
import eyeHide from "../../assets/icons/eye-hide.png";

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("email");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleVerifyEmail = async () => {
    if (!email) {
      Alert.alert("Please enter your email.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/forgotPassword`, {
        email,
      });
      if (response.data.success) {
        Alert.alert("Verification successful. Please enter your new password.");
        setStep("reset");
      } else {
        Alert.alert("Email not found.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_URL}/users/resetPassword`, {
        email,
        newPassword,
      });
      if (response.data.success) {
        Alert.alert("Password reset successfully.");
        router.replace("/login");
      } else {
        Alert.alert("Error resetting password.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/login")}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Forgot Password</Text>
      {step === "email" ? (
        <View>
          <TextInput
            style={[
              styles.input,
              focusedInput === "email" && styles.inputFocused,
            ]}
            placeholder="Enter your email"
            placeholderTextColor="#b0b0b0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyEmail}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify Email</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                styles.input,
                focusedInput === "new-password" && styles.inputFocused,
              ]}
              placeholder="Enter new password"
              placeholderTextColor="#b0b0b0"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              onFocus={() => setFocusedInput("new-password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              style={styles.eyeContainer}
              onPress={() => setShowNewPassword((prev) => !prev)}
            >
              <Image
                source={showNewPassword ? eyeHide : eye}
                resizeMode="contain"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                styles.input,
                focusedInput === "confirm-new-password" && styles.inputFocused,
              ]}
              placeholder="Confirm new password"
              placeholderTextColor="#b0b0b0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              onFocus={() => setFocusedInput("confirm-new-password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              style={styles.eyeContainer}
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Image
                source={showConfirmPassword ? eyeHide : eye}
                resizeMode="contain"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
    padding: 10,
    paddingLeft: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#1A73E8",
    borderWidth: 2,
  },
  button: {
    backgroundColor: "#1A73E8",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
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
});
