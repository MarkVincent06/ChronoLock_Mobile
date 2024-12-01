import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useUserContext } from "@/context/UserContext";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useRouter } from "expo-router";
import API_URL from "../../config/ngrok-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

const AccountSettings = () => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePickAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your photos to upload an avatar."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const updatedFormData = new FormData();

      updatedFormData.append("id", user?.id?.toString() || "");
      updatedFormData.append("firstName", formData.firstName || "");
      updatedFormData.append("lastName", formData.lastName || "");
      updatedFormData.append("email", formData.email || "");

      // Append the avatar file if it exists
      if (avatar) {
        const filename = avatar.split("/").pop();
        const fileType = filename?.split(".").pop();
        updatedFormData.append("avatar", {
          uri: avatar,
          name: filename || "avatar.jpg",
          type: `image/${fileType}`, // E.g., image/jpeg, image/png
        } as any);
      }

      console.warn(updatedFormData);

      // Send the data using Axios
      await axios.put(`${API_URL}/users/updateUser`, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update user context
      setUser({
        id: user?.id || 0,
        idNumber: user?.idNumber || "",
        userType: user?.userType || "",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar: avatar || null,
      });

      Alert.alert("Success", "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogout = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.signOut(); // Sign out from Google
      await signOut(auth); // Sign out from Firebase
      await AsyncStorage.removeItem("user");
      setUser(null);

      Alert.alert("Success", "You have been logged out.");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to log out.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/users/${user?.id}`);
              setUser(null);
              Alert.alert("Account Deleted", "Your account has been deleted.");
              router.replace("/(auth)/login");
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert("Error", "Failed to delete account.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={isEditing ? handlePickAvatar : undefined}>
          <Image
            source={
              avatar
                ? {
                    uri:
                      avatar.startsWith("http") || avatar.startsWith("file")
                        ? avatar
                        : `${API_URL}${avatar}`,
                  }
                : require("@/assets/images/default_avatar.png")
            }
            style={styles.avatar}
          />
          {isEditing && (
            <View style={styles.editIcon}>
              <Icon name="edit" type="feather" color="#fff" size={16} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>User Type</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#f0f0f0" }]}
          value={user?.userType || ""}
          editable={false}
        />

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
          editable={isEditing}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
          editable={isEditing}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          editable={isEditing}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007bff" }]}
        onPress={isEditing ? handleSaveChanges : () => setIsEditing(true)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isEditing ? "Save Changes" : "Edit Details"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ff9800" }]}
        onPress={() => {
          router.push(`/account/change-password`);
        }}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#f44336" }]}
        onPress={handleGoogleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#d32f2f" }]}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  avatarContainer: { alignItems: "center", marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 5,
  },
  form: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});