import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicon from "react-native-vector-icons/Ionicons";

const Ionicons = Ionicon as any;

const LaboratoryIndex = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ERP Laboratory Management</Text>

      <View style={[styles.buttonContainer, { marginBottom: 25 }]}>
        {/* Class List */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laboratory/class-list")}
        >
          <View style={styles.iconAndText}>
            <Ionicons
              name="list"
              size={20}
              color="#007BFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Class List</Text>
          </View>
          <Text style={styles.description}>
            This class list updates and monitors the classes of instructors,
            providing a streamlined overview of schedules and activities for
            effective management.
          </Text>
        </TouchableOpacity> */}

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
            <Text style={styles.buttonText}>ERP Schedule</Text>
          </View>
          <Text style={styles.description}>
            Monitor and Manage ERP laboratory schedules to ensure efficient
            session planning and availability.
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
            Admin/Lab-in-Charge can view, resolve, or update the status of
            workstation issues, ensuring all reported problems are properly
            tracked and handled.
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
