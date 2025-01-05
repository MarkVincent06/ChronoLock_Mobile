import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  RefreshControl,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import API_URL from "@/config/ngrok-api";
import { useUserContext } from "@/context/UserContext";
import usePullToRefresh from "@/hooks/usePullToRefresh";

const StudentAttendance = () => {
  const router = useRouter();

  interface AttendanceRecord {
    date: string;
    remarks: string;
    courseCode: string;
    courseName: string;
    instructorName: string;
    program: string;
    year: string;
    section: string;
    time: string;
    attendanceID: string;
  }

  const { user } = useUserContext();
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [filteredData, setFilteredData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    // Manually parse the time string as local time by creating a Date object
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set the time without time zone conversion

    let hoursFormatted = date.getHours();
    const minutesFormatted = date.getMinutes();
    const ampm = hoursFormatted >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hoursFormatted = hoursFormatted % 12;
    hoursFormatted = hoursFormatted ? hoursFormatted : 12; // Handle 12 as '12' instead of '0'

    const minutesString =
      minutesFormatted < 10
        ? `0${minutesFormatted}`
        : minutesFormatted.toString();

    return `${hoursFormatted}:${minutesString} ${ampm}`;
  };

  const fetchAttendanceRecords = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/attendances/users/${user?.idNumber}/attendance`
      );

      const formattedData = response.data.map(
        (record: {
          attendanceID: string;
          date: string;
          time: string;
          remark: string;
          courseCode: string;
          courseName: string;
          instFirstName: string;
          instLastName: string;
          program: string;
          year: string;
          section: string;
        }) => ({
          attendanceID: record.attendanceID,
          date: formatDate(record.date),
          time: record.time,
          remarks: record.remark,
          courseCode: record.courseCode,
          courseName: record.courseName,
          instructorName: `${record.instFirstName} ${record.instLastName}`,
          program: record.program,
          year: record.year,
          section: record.section,
        })
      );
      setAttendanceData(formattedData);
      setFilteredData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, [fetchAttendanceRecords]);

  const { refreshing, onRefresh } = usePullToRefresh(fetchAttendanceRecords);

  const getRemarkColor = (remark: string) => {
    switch (remark) {
      case "Present":
        return "#28a745";
      case "Absent":
        return "#dc3545";
      case "Late":
        return "#ffc107";
      default:
        return "#333";
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredData(attendanceData);
    } else {
      const filtered = attendanceData.filter((item) =>
        item.courseName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleViewDetails = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Class Attendance</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search course name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.fixedHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Course Name</Text>
        <Text style={styles.tableHeaderText}>Remarks</Text>
        <Text style={styles.tableHeaderText}>Action</Text>
      </View>

      <ScrollView
        style={styles.tableContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableText}>{item.date}</Text>
            <Text style={styles.tableText}>{item.courseName}</Text>
            <Text
              style={[
                styles.tableText,
                { color: getRemarkColor(item.remarks) },
              ]}
            >
              {item.remarks}
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleViewDetails(item)}
            >
              <Text style={styles.actionButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {selectedRecord && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Attendance Details</Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Date:</Text> {selectedRecord.date}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Time:</Text>{" "}
                {formatTime(selectedRecord.time)}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Instructor Name:</Text>{" "}
                {selectedRecord.instructorName}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Course Name:</Text>{" "}
                {selectedRecord.courseName}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Program:</Text>{" "}
                {selectedRecord.program}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Year & Section:</Text>{" "}
                {selectedRecord.year} - {selectedRecord.section}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Remarks:</Text>{" "}
                {selectedRecord.remarks}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default StudentAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  fixedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#007BFF",
    paddingBottom: 10,
    backgroundColor: "#fff",
    position: "absolute",
    top: 140,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#007BFF",
    flex: 1,
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 70,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableText: {
    flex: 1,
    textAlign: "center",
    color: "#333",
  },
  menuTrigger: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android devices
    marginTop: 5, // Space between button and content
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 5,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  changeButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
