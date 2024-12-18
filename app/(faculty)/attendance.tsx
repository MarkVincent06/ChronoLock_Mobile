import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import API_URL from "../../config/ngrok-api";
import { useUserContext } from "../../context/UserContext";

interface Subject {
  classID: string;
  scheduleID: string;
  courseName: string;
  userID: string;
}

interface AttendanceRecord {
  id: string;
  firstName: string;
  lastName: string;
  date: string;
  remark: string;
}

const AttendanceScreen = () => {
  const { user } = useUserContext();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(""); // Will store classID
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingAttendance, setIsFetchingAttendance] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/schedules/schedules`);
        if (!response.ok) throw new Error("Failed to fetch subjects");
        const data = await response.json();
        console.log("Fetched subjects data:", data); // Log the entire response for inspection

        if (data && data.data) {
          setSubjects(data.data);
          const idNumber = user?.idNumber;
          if (idNumber) {
            const filtered = data.data.filter(
              (subject: Subject) => subject.userID === idNumber
            );
            setFilteredSubjects(filtered);
          } else {
            setFilteredSubjects(data.data);
          }
        } else {
          console.error("API response does not contain 'data' field");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        Alert.alert("Error", "Failed to fetch subjects");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!selectedSubject) {
      setAttendanceRecords([]); // Clear attendance records when no subject is selected
      return;
    }

    const fetchAttendanceRecords = async () => {
      setIsFetchingAttendance(true);
      try {
        // Use the selected classID in the API endpoint
        const response = await fetch(
          `${API_URL}/users/attendance/${selectedSubject}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance records");
        }

        const data = await response.json();

        // Check if attendance data exists
        if (data && data.attendance) {
          const mappedRecords = data.attendance.map((record: any) => ({
            id: record.attendanceID.toString(),
            firstName: record.firstName,
            lastName: record.lastName,
            date: new Date(record.date).toLocaleDateString(),
            remark: record.remark, // Present or Absent
          }));

          setAttendanceRecords(mappedRecords);
        } else {
          setAttendanceRecords([]); // If no attendance data is found
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error);
        setAttendanceRecords([]); // Clear records on error
      } finally {
        setIsFetchingAttendance(false);
      }
    };

    fetchAttendanceRecords();
  }, [selectedSubject]); // Re-run when selectedSubject changes

  const handleSubjectChange = (itemValue: string) => {
    console.log("Selected classID:", itemValue); // Log the selected classID
    setSelectedSubject(itemValue); // Set the selected classID
  };

  const renderSubjectPicker = () => (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Select Subject</Text>
      <Picker
        selectedValue={selectedSubject}
        style={styles.picker}
        onValueChange={handleSubjectChange}
      >
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <Picker.Item
              key={subject.classID.toString()} // Use classID as the key
              label={subject.courseName}
              value={subject.classID} // Use classID as the value
            />
          ))
        ) : (
          <Picker.Item label="No subjects available" value="" />
        )}
      </Picker>
    </View>
  );

  const renderAttendanceList = () => (
    <FlatList
      data={attendanceRecords}
      keyExtractor={(item) => item.id} // Ensure keyExtractor uses unique id for attendance records
      ListHeaderComponent={() => (
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.headerText]}>Name</Text>
          <Text style={[styles.tableHeaderCell, styles.headerText]}>Date</Text>
          <Text style={[styles.tableHeaderCell, styles.headerText]}>
            Remark
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.tableCell}>{item.date}</Text>
          <Text style={styles.tableCell}>{item.remark}</Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4caf50" style={styles.loader} />
      ) : (
        <>
          {renderSubjectPicker()}
          {isFetchingAttendance ? (
            <ActivityIndicator
              size="large"
              color="#4caf50"
              style={styles.loader}
            />
          ) : (
            <>
              {attendanceRecords.length > 0 ? (
                renderAttendanceList()
              ) : (
                <Text style={styles.noRecordsText}>
                  No attendance records available.
                </Text>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16, color: "#333" },
  pickerContainer: { marginBottom: 20 },
  label: { fontSize: 16, color: "#555", marginBottom: 8 },
  picker: { height: 50, backgroundColor: "#fff", borderRadius: 8 },
  loader: { marginTop: 20 },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  tableHeaderCell: { flex: 1, textAlign: "center" },
  headerText: { fontWeight: "bold", color: "#333" },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  tableCell: { flex: 1, textAlign: "center", color: "#333" },
  noRecordsText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#999",
  },
});

export default AttendanceScreen;
