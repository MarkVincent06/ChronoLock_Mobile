import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

const Laboratory = () => {
  const [beforeCheck, setBeforeCheck] = useState("");
  const [afterCheck, setAfterCheck] = useState("");
  const [pcNumber, setPcNumber] = useState("");
  const [fullName, setFullName] = useState(""); 

  const handleSubmit = () => {
    if (!fullName || !beforeCheck || !afterCheck || !pcNumber) {
      Alert.alert("Error", "Please complete all fields before submitting.");
      return;
    }

    Alert.alert(
      "Equipment Check Results",
      `Full Name: ${fullName}\nPC Number: ${pcNumber}\nIssue Before Session: ${beforeCheck}\nIssue After Session: ${afterCheck}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratory Equipment Check</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>PC Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter PC Number"
        value={pcNumber}
        onChangeText={setPcNumber}
      />

      <Text style={styles.label}>Before Session Check</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter equipment issue before session"
        value={beforeCheck}
        onChangeText={setBeforeCheck}
      />
      <Text style={styles.note}>If nothing input NONE</Text>

      <Text style={styles.label}>After Session Check</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter equipment issue after session"
        value={afterCheck}
        onChangeText={setAfterCheck}
      />
      <Text style={styles.note}>If nothing input NONE</Text>

      <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fafafa",
    marginBottom: 150,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 18,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  note: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Laboratory;
