import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useUserContext } from "../../context/UserContext";
import API_URL from "../../config/ngrok-api"; // Adjust the path as needed

// Define the type for the attendance record object
interface AttendanceRecord {
  attendanceID: number;
  userID: string;
  classID: number;
  date: string;
  time: string;
  remark: string;
  isNeedAttention: number;
}

export default function Attendance() {
  const { user } = useUserContext();
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]); // Store attendance records
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch attendance data from API
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      setIsLoading(true);
      try {
        const idNumber = await user?.idNumber;
        if (!idNumber) throw new Error("idNumber not found in AsyncStorage");

        const response = await fetch(
          `${API_URL}/users/attendanceByIdNumber/${idNumber}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch attendance records");
        }

        const data = await response.json();
        setAttendanceRecords(data.data || []); // Ensure data is set to an array if no records are returned
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Records</Text>

      {/* Loading Indicator */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : attendanceRecords.length > 0 ? (
        <FlatList
          data={attendanceRecords}
          keyExtractor={(item) => item.attendanceID.toString()}
          ListHeaderComponent={() => (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.headerCell]}>DATE</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>TIME</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>REMARK</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>
                ATTENTION
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
              <Text style={styles.tableCell}>{item.time}</Text>
              <Text style={styles.tableCell}>{item.remark}</Text>
              <Text style={styles.tableCell}>
                {item.isNeedAttention === 1 ? "Yes" : "No"}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noRecordsMessage}>
          No attendance records found.
        </Text>
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
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: "700",
    backgroundColor: "#f8f8f8",
    color: "#777",
  },
  loader: {
    marginTop: 20,
  },
  noRecordsMessage: {
    textAlign: "center",
    color: "#999",
    fontSize: 18,
    marginTop: 20,
  },
});
