import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import API_URL from "@/config/ngrok-api";
import eye from "../../assets/icons/eye.png";
import eyeHide from "../../assets/icons/eye-hide.png";
import { useUserContext } from "../../context/UserContext";

const EditGroupChat = () => {
  const localSearchParams = useLocalSearchParams<{
    group_id?: string;
    group_name?: string;
    group_key?: string;
    group_avatar?: string;
  }>();

  const { user } = useUserContext();
  const { group_id, group_name, group_key, group_avatar } = localSearchParams;
  const [name, setName] = useState(group_name || "");
  const [groupKey, setGroupKey] = useState(group_key || "");
  const [avatar, setAvatar] = useState<string | null>(group_avatar || null);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [showGroupKey, setShowGroupKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (group_key) setGroupKey(group_key);
    if (group_avatar) setAvatar(group_avatar);
  }, [group_key, group_avatar]);

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

  const handleSaveChanges = async () => {
    try {
      if (!name || !groupKey) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("groupKey", groupKey);

      if (avatar && image) {
        formData.append("avatar", {
          uri: avatar,
          type: "image/jpeg",
          name: image.fileName || "avatar.jpg",
        });
      }

      if (!group_id) {
        Alert.alert("Error", "Group ID is missing.");
        return;
      }

      // Determine if group_name or avatar has changed
      const hasNameChanged = group_name !== name;
      const hasAvatarChanged = group_avatar !== avatar;

      await axios.put(`${API_URL}/groups/updateGroup/${group_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Post a system message if group_name or avatar has changed
      if (hasNameChanged || hasAvatarChanged) {
        const changes = [];
        if (hasNameChanged) changes.push(`Group name changed to "${name}"`);
        if (hasAvatarChanged) changes.push("Group avatar updated");

        const message = `${changes.join(" and ")}.`;

        await axios.post(
          `${API_URL}/messages/group/${group_id}/newSystemMessage`,
          {
            userId: user?.idNumber,
            text: message,
          }
        );
      }

      Alert.alert("Success", "Group details updated!");
      router.push("/chat");
    } catch (error) {
      console.error("Error updating group:", error);
      Alert.alert("Error", "Could not update group details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!group_id) {
      Alert.alert("Error", "Group ID is missing.");
      return;
    }

    setLoading(true);

    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group chat? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            setLoading(false);
          },
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/groups/deleteGroup/${group_id}`);
              Alert.alert("Success", "Group deleted successfully.");
              router.push("/chat");
            } catch (error) {
              console.error("Error deleting group:", error);
              Alert.alert("Error", "Failed to delete the group.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter group name"
          />

          <Text style={styles.label}>Group Key</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputWithIcon}
              value={groupKey}
              onChangeText={setGroupKey}
              placeholder="Enter group key"
              secureTextEntry={!showGroupKey}
            />
            <TouchableOpacity onPress={() => setShowGroupKey((prev) => !prev)}>
              <Image
                source={showGroupKey ? eyeHide : eye}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Group Avatar</Text>
          {avatar ? (
            <Image
              source={{
                uri:
                  avatar.startsWith("http") || avatar.startsWith("file")
                    ? avatar
                    : `${API_URL}${avatar}`,
              }}
              style={styles.avatar}
            />
          ) : (
            <Text style={styles.noAvatarText}>No avatar selected</Text>
          )}
          <TouchableOpacity
            onPress={pickImage}
            style={styles.imagePickerButton}
          >
            <Text style={styles.imagePickerText}>
              {avatar ? "Change Avatar" : "Select Avatar"}
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteGroup}
            >
              <Text style={styles.deleteButtonText}>Delete Group</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveChangesButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.saveChangesButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  inputWithIcon: { flex: 1, paddingVertical: 8 },
  icon: { width: 20, height: 20, marginLeft: 8 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 16 },
  noAvatarText: { fontStyle: "italic", color: "#888", marginBottom: 16 },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerText: { color: "#fff", fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  deleteButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveChangesButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  saveChangesButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditGroupChat;
