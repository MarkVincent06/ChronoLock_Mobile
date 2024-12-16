import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import API_URL from "../../config/ngrok-api";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";

const ChangePassword = () => {
  const router = useRouter();

  const { user } = useUserContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(`${API_URL}/users/changePassword`, {
        userId: user?.id,
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        Alert.alert("Success", "Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        router.replace("/account");
      } else {
        Alert.alert(
          "Error",
          response.data.error || "Failed to change password."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          Alert.alert(
            "Error",
            error.response.data.error || "Unknown error occurred."
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          Alert.alert("Error", "No response from server.");
        } else {
          console.error("Error:", error.message);
          Alert.alert("Error", "An unexpected error occurred.");
        }
      } else {
        console.error("Unknown error:", error);
        Alert.alert("Error", "An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showCurrentPassword}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity
          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          <Ionicons
            name={showCurrentPassword ? "eye-off" : "eye"}
            size={24}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Ionicons
            name={showNewPassword ? "eye-off" : "eye"}
            size={24}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showConfirmNewPassword}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
        >
          <Ionicons
            name={showConfirmNewPassword ? "eye-off" : "eye"}
            size={24}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleChangePassword}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Change Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 10 },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
