import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, TextInput, Button, DataTable } from "react-native-paper";

// Define a type for attendance records
type AttendanceRecord = {
  id: number;
  name: string;
  date: string;
  status: string;
};

const Attendance = ({ userType }: { userType: "Faculty" | "Student" }) => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([
    { id: 1, name: "John Doe", date: "2024-09-01", status: "Present" },
    { id: 2, name: "Jane Smith", date: "2024-09-01", status: "Absent" },
    // Sample data; replace with fetched data from the database
  ]);

  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const handleUpdate = (id: number) => {
    const updatedData = attendanceData.map((record) =>
      record.id === id ? { ...record, status: newStatus } : record
    );
    setAttendanceData(updatedData);
    setSelectedRecord(null);
    setNewStatus("");
    Alert.alert("Success", "Attendance record updated.");
  };

  const renderStudentView = () => {
    // Assuming the student can only view their own attendance, filter it
    const studentAttendance = attendanceData.filter(
      (record) => record.name === "John Doe" // Replace with actual student name logic
    );

    return (
      <View style={styles.studentContainer}>
        <Text style={styles.title}>My Attendance</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>

          {studentAttendance.map((record) => (
            <DataTable.Row key={record.id}>
              <DataTable.Cell>{record.date}</DataTable.Cell>
              <DataTable.Cell>{record.status}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    );
  };

  const renderInstructorView = () => (
    <View>
      <Text style={styles.title}>Attendance Monitoring</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {attendanceData.map((record) => (
          <DataTable.Row key={record.id}>
            <DataTable.Cell>{record.name}</DataTable.Cell>
            <DataTable.Cell>{record.date}</DataTable.Cell>
            <DataTable.Cell>{record.status}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                mode="contained"
                onPress={() => setSelectedRecord(record.id)}
              >
                Edit
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {selectedRecord && (
        <View style={styles.overrideContainer}>
          <Text>Update Attendance for Record ID: {selectedRecord}</Text>
          <TextInput
            label="New Status"
            value={newStatus}
            onChangeText={(text) => setNewStatus(text)}
            style={styles.input}
          />
          <Button mode="contained" onPress={() => handleUpdate(selectedRecord)}>
            Save
          </Button>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {userType === "Student" ? renderStudentView() : renderInstructorView()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  studentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  overrideContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    marginBottom: 10,
  },
});

export default Attendance;
