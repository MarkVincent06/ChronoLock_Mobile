import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/ngrok-api";

const CreateGroupChat = () => {
  const [name, setName] = useState("");
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const router = useRouter();

  const handleCreateGroup = async () => {
    try {
      await axios.post(`${API_URL}/groups`, { name, enrollmentKey });
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
      <Button title="Create Group" onPress={handleCreateGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4 },
});

export default CreateGroupChat;
