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
        {/* Lab Occupancy */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/occupancy")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="people-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Lab Occupancy</Text>
          </View>
          <Text style={styles.description}>
            Monitor lab availability and occupancy status, view current user
            count, and check active class schedules with instructor and course
            details.
          </Text>
        </TouchableOpacity>

        {/* Class Record */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/class-record")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="school-outline" // Updated icon to represent classes
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Class Record</Text>
          </View>
          <Text style={styles.description}>
            Update and monitor your classes, providing a comprehensive overview
            of schedules and activities.
          </Text>
        </TouchableOpacity>

        {/* Attendance */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/attendance-folder/class")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Class Attendance</Text>
          </View>
          <Text style={styles.description}>
            Update and monitor attendance records of your students, and generate
            detailed reports.
          </Text>
        </TouchableOpacity>

        {/* Seat Plan */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/seat-plan-folder/class")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="grid-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Seat Plan</Text>
          </View>
          <Text style={styles.description}>
            Organize seating arrangements for the ERP Laboratory, ensuring
            efficient workstation allocation.
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
            Monitor ERP laboratory schedules to ensure efficient session
            planning and availability.
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
