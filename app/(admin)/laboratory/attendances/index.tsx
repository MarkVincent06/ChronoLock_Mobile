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
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

// Type assertion to fix TypeScript compatibility issues
const Ionicons = Ion as any;
const MaterialCommunityIcons = MaterialCommunity as any;

const AttendanceIndex = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Management</Text>
      </View>

      <ScrollView>
        <View style={[styles.buttonContainer, { marginBottom: 25 }]}>
          {/* Student */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/laboratory/attendances/student")}
          >
            <View style={styles.iconAndText}>
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                size={20}
                color="#007BFF"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Student Attendance</Text>
            </View>
            <Text style={styles.description}>
              Access and monitor detailed attendance records for all students,
              ensuring compliance and accuracy across classes.
            </Text>
          </TouchableOpacity>

          {/* Instructor */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/laboratory/attendances/instructor")}
          >
            <View style={styles.iconAndText}>
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                size={20}
                color="#007BFF"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Instructor Attendance</Text>
            </View>
            <Text style={styles.description}>
              Oversee and manage attendance tracking for instructors, ensuring
              proper documentation and reporting.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    marginRight: 23,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    padding: 20,
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
