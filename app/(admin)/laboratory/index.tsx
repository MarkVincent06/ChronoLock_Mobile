import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

const LaboratoryIndex = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ERP Laboratory Management</Text>

      <View style={[styles.buttonContainer, { marginBottom: 25 }]}>
        {/* Occupancy */}
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
            <Text style={styles.buttonText}>Occupancy Monitoring</Text>
          </View>
          <Text style={styles.description}>
            Track real-time lab occupancy based on user entry/exit data,
            ensuring optimal space utilization. View logs to review past
            occupancy trends and user activity details.
          </Text>
        </TouchableOpacity>

        {/* Attendance */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/attendances")}
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
            Update and monitor attendance records for students and instructors,
            and generate detailed reports.
          </Text>
        </TouchableOpacity>

        {/* Seat Plan */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/seat-plan")}
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

        {/* Equipment */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/equipment-issue")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="construct-outline"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Equipment Issues</Text>
          </View>
          <Text style={styles.description}>
            Admin/Faculty can view, resolve, or update the status of workstation
            issues, ensuring all reported problems are properly tracked and
            handled.
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
