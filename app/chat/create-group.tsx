import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import API_URL from "../../config/ngrok-api";

const CreateGroupChat = () => {
  const [name, setName] = useState("");
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const router = useRouter();

  // Handle image selection
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to grant gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
      setImage(result.assets[0]);
    }
  };

  // In `handleCreateGroup`
  const handleCreateGroup = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("enrollmentKey", enrollmentKey);

      if (avatar && image) {
        const fileType =
          image.type && typeof image.type === "string"
            ? image.type
            : "image/jpeg";
        const fileName =
          image.fileName && typeof image.fileName === "string"
            ? image.fileName
            : "avatar.jpg";

        formData.append("file", {
          uri: avatar,
          type: fileType,
          name: fileName,
        });
      }

      await axios.post(`${API_URL}/groups`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Group chat created!");
      router.push("/chat");
    } catch (error) {
      console.error("Error creating group:", error);
      Alert.alert("Error", "Could not create group chat.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Group Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter group name"
      />

      <Text style={styles.label}>Enrollment Key</Text>
      <TextInput
        style={styles.input}
        value={enrollmentKey}
        onChangeText={setEnrollmentKey}
        placeholder="Enter enrollment key"
        secureTextEntry
      />

      <Text style={styles.label}>Group Avatar</Text>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>
          {avatar ? "Change Avatar" : "Select Avatar"}
        </Text>
      </TouchableOpacity>

      <Button title="Create Group" onPress={handleCreateGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 16 },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerText: { color: "#fff", fontWeight: "bold" },
});

export default CreateGroupChat;
