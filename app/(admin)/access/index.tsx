import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ion from "react-native-vector-icons/Ionicons";

const Ionicons = Ion as any;

const AccessIndex = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Management</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/access/remote-access")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="key-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Remote Unlock</Text>
            {/* Updated title */}
          </View>
          <Text style={styles.description}>
            Unlock the ERP lab door remotely and ensure secure access for
            authorized users.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/access/access-control")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Remote Access Accounts</Text>
          </View>
          <Text style={styles.description}>
            Manage user's remote access accounts by granting or revoking
            permissions to ensure secure and authorized entry to the facility.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/access/access-logs")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Access Control Logs</Text>
          </View>
          <Text style={styles.description}>
            Review detailed logs of door activities to monitor access history
            and identify suspicious activities.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007BFF",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default AccessIndex;
