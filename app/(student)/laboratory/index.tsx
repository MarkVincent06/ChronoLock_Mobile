import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Ion from "react-native-vector-icons/Ionicons";

// Type assertion to fix TypeScript compatibility issues
const Ionicons = Ion as any;

const LaboratoryIndex = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ERP Laboratory Management</Text>

      <View style={[styles.buttonContainer, { marginBottom: 25 }]}>
        {/* Attendance */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/attendance/class")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Attendance</Text>
          </View>
          <Text style={styles.description}>
            View your attendance logs based on your class schedules.
          </Text>
        </TouchableOpacity>

        {/* Schedule */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/schedule")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Schedule</Text>
          </View>
          <Text style={styles.description}>
            Check your upcoming ERP laboratory schedules easily.
          </Text>
        </TouchableOpacity>

        {/* Equipment Issue */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/report-issue")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="construct-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Report Equipment Issue</Text>
          </View>
          <Text style={styles.description}>
            Report any issues with laboratory equipment for faster resolution.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
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

export default LaboratoryIndex;
