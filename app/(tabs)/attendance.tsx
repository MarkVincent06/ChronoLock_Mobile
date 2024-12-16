import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Switch, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import API_URL from "../../config/ngrok-api"; // Adjust the path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for the subject object
interface Subject {
  id: string;
  courseName: string;
  userID: string;
}

interface AttendanceRecord {
  id: string;
  name: string;
  sampleDate: string;
  status: boolean; // true for present, false for absent
}

export default function Attendance() {
  const [subjects, setSubjects] = useState<Subject[]>([]); // Store fetched subjects
  const [selectedSubject, setSelectedSubject] = useState<string>(""); // Store selected subject
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]); // Store filtered subjects
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]); // Store attendance records
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch subjects (or classes) from API
  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/schedules/schedules`); // Adjust API endpoint if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data = await response.json();
        setSubjects(data.data); // Assuming response contains a "data" array of subjects

        const storedIdNumber = await AsyncStorage.getItem("idNumber");
        if (storedIdNumber) {
          // Optionally filter based on the logged-in user's ID or other criteria
          const filtered = data.data.filter((subject: Subject) => subject.userID === storedIdNumber);
          setFilteredSubjects(filtered);
        } else {
          setFilteredSubjects(data.data); // If no filter needed, use all subjects
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Handle attendance toggle (Present/Absent)
  const handleToggleStatus = (id: string) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id ? { ...record, status: !record.status } : record
      )
    );
  };

  // Sample attendance records (replace with real data from API)
  const generateSampleAttendance = () => {
    return [
      { id: "1", name: "John Doe", sampleDate: "2024-12-11", status: false },
      { id: "2", name: "Jane Smith", sampleDate: "2024-12-11", status: false },
      { id: "3", name: "Mark Lee", sampleDate: "2024-12-11", status: false },
      { id: "4", name: "Emily Brown", sampleDate: "2024-12-11", status: false },
    ];
  };

  useEffect(() => {
    // Set the sample attendance records when subject is selected
    if (selectedSubject) {
      setAttendanceRecords(generateSampleAttendance());
    }
  }, [selectedSubject]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>

      {/* Loading Indicator */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : (
        <>
          {/* Subject Dropdown */}
          <Text style={styles.dropdownTitle}>Select Subject</Text>
          <Picker
            selectedValue={selectedSubject}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
          >
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <Picker.Item
                  key={subject.id}
                  label={subject.courseName}
                  value={subject.courseName}
                />
              ))
            ) : (
              <Picker.Item label="No subjects available" value="" />
            )}
          </Picker>

          {/* Attendance Table */}
          <FlatList
            data={attendanceRecords}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.headerCell]}>NAME</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>DATE</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>STATUS</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>ACTION</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.sampleDate}</Text>
                <Text style={styles.tableCell}>{item.status ? "Present" : "Absent"}</Text>
                <View style={styles.switchContainer}>
                  <Switch
                    value={item.status}
                    onValueChange={() => handleToggleStatus(item.id)}
                    trackColor={{ true: "#4CAF50", false: "#FF6347" }}
                    thumbColor={item.status ? "#fff" : "#fff"}
                  />
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  dropdownTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: "#555",
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  headerCell: {
    fontWeight: "700",
    backgroundColor: "#f8f8f8",
    color: "#777",
  },
  switchContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  loader: {
    marginTop: 20,
  },
});
