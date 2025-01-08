import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import API_URL from "@/config/ngrok-api";

const InstructorAttendance = () => {
  const router = useRouter();

  interface AttendanceRecord {
    date: string;
    facultyName: string;
    remarks: string;
    courseCode: string;
    courseName: string;
    program: string;
    year: string;
    section: string;
    time: string;
    attendanceID: string;
    facultyId: string;
  }

  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [filteredData, setFilteredData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null
  );
  const [selectedRemark, setSelectedRemark] = useState("Present");
  const [updating, setUpdating] = useState(false);

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

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/attendances/admin/faculty/attendance-records`
        );
        const formattedData = response.data.map(
          (record: {
            attendanceID: string;
            date: string;
            time: string;
            firstName: string;
            lastName: string;
            remark: string;
            facultyId: string;
            courseCode: string;
            courseName: string;
            program: string;
            year: string;
            section: string;
          }) => ({
            attendanceID: record.attendanceID,
            date: formatDate(record.date),
            time: record.time,
            facultyName: `${record.firstName} ${record.lastName}`,
            remarks: record.remark,
            facultyId: record.facultyId,
            courseCode: record.courseCode,
            courseName: record.courseName,
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
    };

    fetchAttendanceRecords();
  }, []);

  const handleChangeRemark = async () => {
    if (!selectedRecord) return;

    setUpdating(true);
    try {
      const response = await axios.put(
        `${API_URL}/attendances/admin/attendance-records/${selectedRecord.attendanceID}/remark`,
        { remark: selectedRemark }
      );
      if (response.status === 200) {
        setAttendanceData((prevData) =>
          prevData.map((record) =>
            record.attendanceID === selectedRecord.attendanceID
              ? { ...record, remarks: selectedRemark }
              : record
          )
        );
        setFilteredData((prevData) =>
          prevData.map((record) =>
            record.attendanceID === selectedRecord.attendanceID
              ? { ...record, remarks: selectedRemark }
              : record
          )
        );
        setPickerModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating remark:", error);
    } finally {
      setUpdating(false);
    }
  };

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

  const handleDeleteAttendance = async (attendanceID: string) => {
    try {
      // Show a confirmation dialog
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this attendance record?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              try {
                const response = await axios.delete(
                  `${API_URL}/attendances/admin/attendance-records/${attendanceID}`
                );

                if (response.status === 200) {
                  // Update the local state to remove the deleted record
                  setAttendanceData((prevData) =>
                    prevData.filter(
                      (record) => record.attendanceID !== attendanceID
                    )
                  );
                  setFilteredData((prevData) =>
                    prevData.filter(
                      (record) => record.attendanceID !== attendanceID
                    )
                  );

                  // Show success message
                  Alert.alert(
                    "Success",
                    "Attendance record deleted successfully."
                  );
                }
              } catch (error) {
                console.error("Error deleting attendance record:", error);
                Alert.alert("Error", "Failed to delete the attendance record.");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredData(attendanceData);
    } else {
      const filtered = attendanceData.filter((item) =>
        item.facultyName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleViewDetails = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setSelectedRemark(record.remarks);
    setModalVisible(true);
  };

  const handleOpenPickerModal = (item: AttendanceRecord) => {
    setSelectedRecord(item);
    setSelectedRemark(item.remarks);
    setPickerModalVisible(true);
  };

  const handleClosePickerModal = () => {
    setPickerModalVisible(false);
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
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Instructor Attendance</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search instructor name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.fixedHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Instructor Name</Text>
        <Text style={styles.tableHeaderText}>Remarks</Text>
        <Text style={styles.tableHeaderText}>Action</Text>
      </View>

      <ScrollView style={styles.tableContainer}>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableText}>{item.date}</Text>
            <Text style={styles.tableText}>{item.facultyName}</Text>
            <Text
              style={[
                styles.tableText,
                { color: getRemarkColor(item.remarks) },
              ]}
            >
              {item.remarks}
            </Text>
            <Menu>
              <MenuTrigger>
                <View style={styles.menuTrigger}>
                  <Text style={styles.actionButtonText}>Actions</Text>
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleViewDetails(item)}>
                  <Text style={styles.menuOption}>View Details</Text>
                </MenuOption>
                <MenuOption onSelect={() => handleOpenPickerModal(item)}>
                  <Text style={styles.menuOption}>Change Remark</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => handleDeleteAttendance(item.attendanceID)}
                >
                  <Text style={[styles.menuOption, styles.deleteOption]}>
                    Delete
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
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
                <Text style={styles.boldText}>Course Code:</Text>{" "}
                {selectedRecord.courseCode}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Course Name:</Text>{" "}
                {selectedRecord.courseName}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Program & Section:</Text>{" "}
                {selectedRecord.program} - {selectedRecord.year}
                {selectedRecord.section}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Instructor Name:</Text>{" "}
                {selectedRecord.facultyName}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Instructor ID:</Text>{" "}
                {selectedRecord.facultyId}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Remarks:</Text>{" "}
                {selectedRecord.remarks}
              </Text>
            </View>
          </View>
        </Modal>
      )}

      {/* Picker Modal */}
      <Modal
        visible={pickerModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={handleClosePickerModal}
            disabled={updating}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Remark</Text>
            <Picker
              selectedValue={selectedRemark}
              onValueChange={(itemValue) => setSelectedRemark(itemValue)}
            >
              <Picker.Item label="Present" value="Present" />
              <Picker.Item label="Absent" value="Absent" />
              <Picker.Item label="Late" value="Late" />
            </Picker>
            <TouchableOpacity
              style={styles.saveRemarkButton}
              onPress={handleChangeRemark}
              disabled={updating}
            >
              {updating ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InstructorAttendance;

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
  backButton: {
    marginRight: 15,
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
  actionButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  menuOption: {
    padding: 10,
    color: "#000",
  },
  deleteOption: {
    color: "#dc3545",
    fontWeight: "bold",
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
  saveRemarkButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
