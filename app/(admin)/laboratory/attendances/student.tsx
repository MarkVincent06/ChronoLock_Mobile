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
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Ion from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import API_URL from "@/config/ngrok-api";
import RNHTMLtoPDF from "react-native-html-to-pdf";

// Type assertion to fix TypeScript compatibility issues
const Ionicons = Ion as any;

const StudentAttendance = () => {
  const router = useRouter();

  interface AttendanceRecord {
    instLastName: any;
    instFirstName: any;
    courseCode: any;
    date: string;
    studentName: string;
    remarks: string;
    courseName: string;
    program: string;
    year: string;
    section: string;
    time: string;
    attendanceID: string;
    studentId: string;
  }

  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [filteredData, setFilteredData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null
  );
  const [selectedRemark, setSelectedRemark] = useState("Present");
  const [updating, setUpdating] = useState(false);
  const [filters, setFilters] = useState({
    course: "",
    instructor: "",
    yearSection: "",
    program: "",
    remark: "",
    date: "",
    time: "",
  });
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [courses, setCourses] = useState<
    { courseCode: string; courseName: string }[]
  >([]);
  const [instructors, setInstructors] = useState<
    { instFirstName: string; instLastName: string }[]
  >([]);
  const [yearSections, setYearSections] = useState<
    { year: string; section: string }[]
  >([]);
  const [programs, setPrograms] = useState<{ name: string }[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message:
              "This app needs access to your storage to save the PDF files.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Storage permission granted");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
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
    requestStoragePermission();
  }, []);

  useEffect(() => {
    if (filterModalVisible) {
      fetchCourses();
      fetchInstructors();
      fetchYearSections();
      fetchPrograms();
    }
  }, [filterModalVisible]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/schedules/courses`);
      const { success, data, message } = await response.json();

      if (success) {
        setCourses(data);
      } else {
        console.error("Error fetching courses:", message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await fetch(`${API_URL}/schedules/instructors`);
      const { success, data, message } = await response.json();

      if (success) {
        setInstructors(data);
      } else {
        console.error("Error fetching instructors:", message);
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${API_URL}/schedules/programs`);
      const { success, data, message } = await response.json();

      if (success) {
        setPrograms(data);
      } else {
        console.error("Error fetching programs:", message);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const fetchYearSections = async () => {
    try {
      const response = await fetch(`${API_URL}/schedules/year-sections`);
      const { success, data, message } = await response.json();

      if (success) {
        setYearSections(data);
      } else {
        console.error("Error fetching year sections:", message);
      }
    } catch (error) {
      console.error("Error fetching year sections:", error);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/attendances/admin/student/attendance-records`
      );
      const formattedData = response.data.map(
        (record: {
          attendanceID: string;
          date: string;
          time: string;
          firstName: string;
          lastName: string;
          remark: string;
          studentId: string;
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
          studentName: `${record.firstName} ${record.lastName}`,
          remarks: record.remark,
          studentId: record.studentId,
          courseCode: record.courseCode,
          courseName: record.courseName,
          instFirstName: record.instFirstName,
          instLastName: record.instLastName,
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

  useEffect(() => {
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
        // Re-fetch attendance records to ensure data is up-to-date
        await fetchAttendanceRecords();

        setPickerModalVisible(false);
        Alert.alert("Success", "Remark updated successfully!");
      }
    } catch (error) {
      console.error("Error updating remark:", error);
      Alert.alert("Error", "Failed to update remark. Please try again.");
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
        item.studentName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const generatePDF = async () => {
    if (filteredData.length === 0) {
      Alert.alert(
        "No Records",
        "There are no attendance records to generate a PDF."
      );
      return;
    }

    setLoading(true);

    if (Platform.OS === "android") {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (!hasPermission) {
        await requestStoragePermission();
      }
    }

    // Sort the filteredData by date and time
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime(); // Ascending order
    });

    const rows = sortedData.map(
      (record, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${record.studentName}</td>
      <td>${record.studentId}</td>
      <td>${record.courseName}</td>
      <td>${record.program}</td>
      <td>${record.year} - ${record.section}</td>
      <td>${record.date}</td>
      <td>${record.time}</td>
      <td style="background-color:${getRemarkColor(record.remarks)}">${
        record.remarks
      }</td>
    </tr>`
    );

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h2 {
              text-align: center;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Student Attendance Report</h2>
          <table>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>User ID</th>
              <th>Course Name</th>
              <th>Program</th>
              <th>Year & Section</th>
              <th>Date</th>
              <th>Time</th>
              <th>Remark</th>
            </tr>
            ${rows.join("")}
          </table>
        </body>
      </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: `Attendance_Report_${Date.now()}`,
        directory: "Documents",
      };
      const pdf = await RNHTMLtoPDF.convert(options);

      if (pdf.filePath) {
        console.log("PDF saved at:", pdf.filePath);
        Alert.alert(
          "PDF Saved",
          `PDF successfully generated and saved at: ${pdf.filePath}`
        );
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate PDF.");
    } finally {
      setLoading(false);
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

  const applyFilters = () => {
    const filtered = attendanceData.filter((record) => {
      return (
        (!filters.course ||
          `${record.courseCode}-${record.courseName}` === filters.course) &&
        (!filters.instructor ||
          `${record.instFirstName} ${record.instLastName}` ===
            filters.instructor) &&
        (!filters.yearSection ||
          `${record.year}-${record.section}` === filters.yearSection) &&
        (!filters.program || record.program === filters.program) &&
        (!filters.remark || record.remarks === filters.remark) &&
        (!filters.date || record.date === filters.date) &&
        (!filters.time || record.time === filters.time)
      );
    });
    setFilteredData(filtered);
    setFilterModalVisible(false);

    // Check if any filter is applied
    const isAnyFilterApplied = Object.values(filters).some(
      (value) => value !== ""
    );
    setIsFilterApplied(isAnyFilterApplied);
  };

  const resetFilters = () => {
    setFilters({
      course: "",
      instructor: "",
      yearSection: "",
      program: "",
      remark: "",
      date: "",
      time: "",
    });
    setFilteredData(attendanceData);
    setFilterModalVisible(false);
    setIsFilterApplied(false);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || filters.date;
    setShowDatePicker(false);
    setFilters((prev) => ({
      ...prev,
      date: currentDate.toLocaleDateString(),
    }));
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
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Attendance</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter-outline" size={24} color="#FFF" />
          {isFilterApplied && <View style={styles.filterIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search student name..."
          placeholderTextColor="#b0b0b0"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.exportButton} onPress={generatePDF}>
          <Ionicons name="download-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.fixedHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Student Name</Text>
        <Text style={styles.tableHeaderText}>Remarks</Text>
        <Text style={styles.tableHeaderText}>Action</Text>
      </View>

      {/* Attendance Table */}
      <ScrollView style={styles.tableContainer}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableText}>{item.date}</Text>
              <Text style={styles.tableText}>{item.studentName}</Text>
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
          ))
        ) : (
          <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No attendance data found.</Text>
          </View>
        )}
      </ScrollView>

      {/* Attendance Details Modal */}
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
                <Text style={styles.boldText}>Student Name:</Text>{" "}
                {selectedRecord.studentName}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Student ID:</Text>{" "}
                {selectedRecord.studentId}
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
              style={{ color: "#222", backgroundColor: "#fff" }}
              dropdownIconColor="#888"
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

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setFilterModalVisible(false);
            Keyboard.dismiss();
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Filter Student Attendance</Text>

                <Picker
                  style={{ color: "#222", backgroundColor: "#fff" }}
                  dropdownIconColor="#888"
                  selectedValue={filters.course}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, course: value }))
                  }
                >
                  <Picker.Item label="Course" value="" />
                  {courses.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={`${item.courseCode}-${item.courseName}`}
                      value={`${item.courseCode}-${item.courseName}`}
                    />
                  ))}
                </Picker>

                <Picker
                  style={{ color: "#222", backgroundColor: "#fff" }}
                  dropdownIconColor="#888"
                  selectedValue={filters.instructor}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, instructor: value }))
                  }
                >
                  <Picker.Item label="Instructor" value="" />
                  {instructors.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={`${item.instFirstName} ${item.instLastName}`}
                      value={`${item.instFirstName} ${item.instLastName}`}
                    />
                  ))}
                </Picker>

                <Picker
                  style={{ color: "#222", backgroundColor: "#fff" }}
                  dropdownIconColor="#888"
                  selectedValue={filters.yearSection}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, yearSection: value }))
                  }
                >
                  <Picker.Item label="Year & Section" value="" />
                  {yearSections.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={`${item.year}-${item.section}`}
                      value={`${item.year}-${item.section}`}
                    />
                  ))}
                </Picker>

                <Picker
                  style={{ color: "#222", backgroundColor: "#fff" }}
                  dropdownIconColor="#888"
                  selectedValue={filters.program}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, program: value }))
                  }
                >
                  <Picker.Item label="Program" value="" />
                  {programs.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
                </Picker>

                <Picker
                  style={{ color: "#222", backgroundColor: "#fff" }}
                  dropdownIconColor="#888"
                  selectedValue={filters.remark}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, remark: value }))
                  }
                >
                  <Picker.Item label="Remark" value="" />
                  <Picker.Item label="Present" value="Present" />
                  <Picker.Item label="Absent" value="Absent" />
                  <Picker.Item label="Late" value="Late" />
                </Picker>
                <View style={{ position: "relative", marginBottom: 10 }}>
                  <TextInput
                    style={styles.dateInput}
                    placeholder="Select Date"
                    placeholderTextColor="#b0b0b0"
                    value={filters.date}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Ionicons name="calendar-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}

                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetFilters}
                  >
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={applyFilters}
                  >
                    <Text style={styles.buttonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  searchContainer: { flexDirection: "row", alignItems: "center" },
  exportButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
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
    marginTop: 50,
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
  fallbackContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  fallbackText: {
    fontSize: 16,
    color: "#888",
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
  filterButton: {
    position: "relative",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  filterIndicator: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  dateInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -14 }], // Center vertically (icon height is ~24)
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    backgroundColor: "#ff9800",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
