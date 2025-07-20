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
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import API_URL from "@/config/ngrok-api";
import eye from "../../assets/icons/eye.png";
import eyeHide from "../../assets/icons/eye-hide.png";
import { useUserContext } from "../../context/UserContext";

const CreateGroupChat = () => {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [groupKey, setGroupKey] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [showGroupKey, setShowGroupKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const userIdNumber = user?.idNumber;

  // Handle image selection
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to grant gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
      setImage(result.assets[0]);
    }
  };

  const handleCreateGroup = async () => {
    try {
      if (!name || !groupKey) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      if (userIdNumber) {
        formData.append("userIdNumber", userIdNumber);
      } else {
        throw new Error("User ID is missing.");
      }

      formData.append("name", name);
      formData.append("groupKey", groupKey);

      if (avatar && image) {
        formData.append("avatar", {
          uri: avatar,
          type: "image/jpeg",
          name: image.fileName || "avatar.jpg",
        });
      }

      // Create the group
      const response = await axios.post(
        `${API_URL}/groups/insertGroup`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const groupId = response.data.groupId;

      // Post a system message
      const welcomeMessage = `This group is now active. Feel free to start discussions and collaborate with others.`;
      await axios.post(
        `${API_URL}/messages/group/${groupId}/newSystemMessage`,
        {
          userId: user?.idNumber,
          text: welcomeMessage,
        }
      );

      Alert.alert("Success", "Group chat created!");
      router.replace("/chat");
    } catch (error) {
      console.error("Error creating group:", error);
      Alert.alert("Error", "Could not create group chat.");
    } finally {
      setLoading(false);
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
        placeholderTextColor="#b2b2b2"
      />

      <Text style={styles.label}>Group Key</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputWithIcon}
          value={groupKey}
          onChangeText={setGroupKey}
          placeholder="Enter group key"
          placeholderTextColor="#b2b2b2"
          secureTextEntry={!showGroupKey}
        />
        <TouchableOpacity onPress={() => setShowGroupKey((prev) => !prev)}>
          <Image source={showGroupKey ? eyeHide : eye} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Group Avatar</Text>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>
          {avatar ? "Change Avatar" : "Select Avatar"}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.createGroupButton}
            onPress={handleCreateGroup}
          >
            <Text style={styles.createGroupButtonText}>Create Group</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  inputWithIcon: { flex: 1, paddingVertical: 8, color: "#000" },
  icon: { width: 20, height: 20, marginLeft: 8 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 16 },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerText: { color: "#fff", fontWeight: "bold" },
  loader: {
    marginTop: 16,
  },
  createGroupButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createGroupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateGroupChat;
