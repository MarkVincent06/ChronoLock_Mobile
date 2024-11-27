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
import API_URL from "../../config/ngrok-api";

const AccountSettings = () => {
  const { user, setUser } = useUserContext();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    idNumber: user?.idNumber || "",
  });
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Function to pick a new avatar using expo-image-picker
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

  // Function to save changes
  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Make API call to update the user details
      await axios.put(`${API_URL}/users/updateUser`, {
        id: user?.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar, // Pass the new avatar URL
      });

      // Ensure `user.id` is not undefined when setting the new state
      if (user?.id !== undefined) {
        setUser({
          id: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          idNumber: formData.idNumber,
          userType: user.userType || "", // Ensure userType is provided
          avatar,
        });
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        throw new Error("User ID is undefined.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handlePickAvatar}>
          <Image
            source={
              avatar
                ? {
                    uri: avatar.startsWith("http")
                      ? avatar
                      : `${API_URL}${avatar}`,
                  }
                : require("@/assets/images/default_avatar.png") // Default avatar image
            }
            style={styles.avatar}
          />
          <View style={styles.editIcon}>
            <Icon name="edit" type="feather" color="#fff" size={16} />
          </View>
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

        <Text style={styles.label}>ID Number</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#f0f0f0" }]}
          value={formData.idNumber}
          editable={false}
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveChanges}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#ccc",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 5,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
