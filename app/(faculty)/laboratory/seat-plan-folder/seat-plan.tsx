import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUserContext } from "@/context/UserContext";
import API_URL from "@/config/ngrok-api";
import RNHTMLtoPDF from "react-native-html-to-pdf";

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

interface Seat {
  seatLabel: string;
  seat_id: number;
  assigned: boolean;
  student_id?: string;
  student_name: string | null;
  pc_number: string;
}

interface Student {
  idNumber: string;
  firstName: string;
  lastName: string;
}

const SeatPlan = () => {
  const router = useRouter();
  const { scheduleID } = useLocalSearchParams<{ scheduleID: string }>();
  const { courseName } = useLocalSearchParams<{ courseName: string }>();
  const { user } = useUserContext();
  const [remainingStudents, setRemainingStudents] = useState<Student[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const rows = ["A", "B", "C", "D", "E", "F"];
  const columns = 5;

  const generateDefaultLabels = (): Seat[] => {
    const seats: Seat[] = [];
    let seatId = 1;
    rows.forEach((row) => {
      for (let col = 1; col <= columns; col++) {
        seats.push({
          seat_id: seatId,
          seatLabel: `${row}${col}`, // Generates A1, A2, ..., F5
          assigned: false,
          student_name: null,
          pc_number: `PC${seatId}`, // Placeholder for PC number
        });
        seatId++;
      }
    });
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateDefaultLabels());
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  useEffect(() => {
    const fetchSeatAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/seats/assignments/${scheduleID}`
        );
        const assignments = response.data;

        const updatedSeats = seats.map((seat) => {
          const assignment = assignments.find(
            (a: { seat_name: string }) => a.seat_name === seat.pc_number
          );

          return assignment
            ? {
                ...seat,
                seatLabel: `${assignment.seat_row}${assignment.seat_column}`,
                assigned: true,
                student_name: `${assignment.lastName} ${assignment.firstName}`,
                student_id: assignment.idNumber,
              }
            : seat;
        });

        setSeats(updatedSeats);
      } catch (error) {
        console.error("Error fetching seat assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeatAssignments();
  }, [scheduleID]);

  // PDF layout styles
  const generatePDFLayout = (seats: Seat[]) => {
    let seatRows = "";
    const rows = ["A", "B", "C", "D", "E", "F"];
    const columns = 5;

    seats.forEach((seat, index) => {
      const rowLabel = rows[Math.floor(index / columns)];
      const seatColumn = (index % columns) + 1;
      seatRows += `
      <tr>
        <td>${rowLabel}${seatColumn}</td>
        <td>${seat.pc_number}</td>
        <td>${seat.student_name || "Vacant"}</td>
      </tr>
    `;
    });

    return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          h2 {text-align: center}
          td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; text-align: center }
          td { text-align: center; }
        </style>
      </head>
      <body>
        <h2>Seat Assignment Report - ${courseName}</h2>
        <table>
          <thead>
            <tr>
              <th>Seat Label</th>
              <th>PC#</th>
              <th>Student</th>
            </tr>
          </thead>
          <tbody>
            ${seatRows}
          </tbody>
        </table>
      </body>
    </html>
  `;
  };

  const handleAutoAssign = async () => {
    if (!selectedOption) {
      alert("No option selected.");
      return;
    }

    Alert.alert(
      "Confirm Auto-Assign",
      "This will clear all existing seat arrangements. Do you want to continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              setLoading(true);

              // Perform the auto-assign API call
              const response = await axios.post(
                `${API_URL}/seats/assign-seats/${selectedOption}/${user?.idNumber}/${scheduleID}`
              );

              if (response.status === 201) {
                alert("Seats assigned successfully");

                // Clear the current seat assignments in the state
                setSeats(generateDefaultLabels()); // Reset to default labels

                // Fetch updated seat assignments
                const fetchSeatAssignments = await axios.get(
                  `${API_URL}/seats/assignments/${scheduleID}`
                );

                const assignments = fetchSeatAssignments.data;

                // Update seats with the new assignments
                const updatedSeats = seats.map((seat) => {
                  const assignment = assignments.find(
                    (a: { seat_name: string }) => a.seat_name === seat.pc_number
                  );
                  return assignment
                    ? {
                        ...seat,
                        seatLabel: `${assignment.seat_row}${assignment.seat_column}`,
                        assigned: true,
                        student_name: `${assignment.lastName} ${assignment.firstName}`,
                        student_id: assignment.idNumber,
                      }
                    : seat;
                });

                setSeats(updatedSeats);
                setModalVisible(false);
              }
            } catch (error) {
              console.error("Error auto-assigning seats:", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleClearAssignments = () => {
    Alert.alert(
      "Clear All Assignments",
      "Are you sure you want to empty all seat assignments?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              setLoading(true);
              await axios.delete(`${API_URL}/seats/unassign-all/${scheduleID}`);
              setSeats(generateDefaultLabels()); // Reset seats to default
              alert("All seat assignments have been cleared.");
            } catch (error) {
              console.error("Error clearing seat assignments:", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const generatePDF = async () => {
    const htmlContent = generatePDFLayout(seats);
    const options = {
      html: htmlContent,
      fileName: "seat-assignment-report",
      directory: "Documents",
    };

    setLoading(true);

    try {
      const file = await RNHTMLtoPDF.convert(options);
      alert(`PDF generated at ${file.filePath}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRemainingStudents = async (scheduleID: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/seats/remaining-students/${scheduleID}`
      );
      setRemainingStudents(response.data);
    } catch (error) {}
  };

  const openAssignModal = async (seat: Seat) => {
    setSelectedSeat(seat);
    await fetchRemainingStudents(scheduleID!);
    setAssignModalVisible(true);
  };

  const handleAssignSeat = async () => {
    if (selectedSeat && selectedStudent) {
      try {
        setLoading(true);
        setAssignModalVisible(false);

        // Make the API request
        const response = await axios.post(
          `${API_URL}/seats/assign-seat/${user?.idNumber}/${scheduleID}`,
          {
            seat_id: selectedSeat.seat_id,
            studentID: selectedStudent.idNumber,
          }
        );

        if (response.status === 201) {
          Alert.alert(
            "Success",
            `Seat ${selectedSeat.seatLabel} assigned to ${selectedStudent.firstName} ${selectedStudent.lastName} successfully.`
          );

          // Update the seats state to reflect the assignment
          setSeats((prevSeats) =>
            prevSeats.map((seat) =>
              seat.seat_id === selectedSeat.seat_id
                ? {
                    ...seat,
                    assigned: true,
                    student_name: `${selectedStudent.lastName} ${selectedStudent.firstName}`,
                  }
                : seat
            )
          );
        }
      } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error) && error.response) {
          const { status, data } = error.response;
          if (status === 409) {
            Alert.alert("Conflict", data.error || "Conflict occurred.");
          } else {
            Alert.alert("Error", data.error || "An error occurred.");
          }
        } else {
          Alert.alert("Error", "Unable to assign seat. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Error", "Please select a student to assign.");
    }
  };

  const handleSeatUnassign = async (seatId: number) => {
    const seat = seats.find((s) => s.seat_id === seatId);

    if (!seat || !seat.assigned) {
      Alert.alert("Unassign Seat", "This seat is already unassigned.");
      return;
    }

    Alert.alert(
      "Unassign Seat",
      `Are you sure you want to unassign ${seat.student_name} from ${seat.pc_number}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              setLoading(true);

              // Make the API call to unassign the seat
              const response = await axios.delete(
                `${API_URL}/seats/unassign-seat/${scheduleID}/${seat.student_id}`
              );

              if (response.status === 200) {
                alert(response.data.message);

                // Update the seat status in the state
                setSeats((prevSeats) =>
                  prevSeats.map((s) =>
                    s.seat_id === seatId
                      ? { ...s, assigned: false, student_name: null }
                      : s
                  )
                );
              }
            } catch (error) {
              console.error("Error unassigning seat:", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleBackgroundPress = (e: any) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text>Loading Seats...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/laboratory/seat-plan-folder/class")}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Seat Plan</Text>
      </View>

      {/* Course Name */}
      {courseName && <Text style={styles.courseName}>{courseName}</Text>}

      {/* Button Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.autoAssignButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="auto-awesome" size={20} color="white" />
          <Text style={styles.buttonText}>Auto Assign</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearAssignments}
        >
          <MaterialIcons name="delete" size={20} color="white" />
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exportButton} onPress={generatePDF}>
          <MaterialIcons name="get-app" size={20} color="white" />
          <Text style={styles.buttonText}>Export PDF</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Auto Assign */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={(e) => handleBackgroundPress(e)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Auto Assign Type</Text>
            <Picker
              selectedValue={selectedOption}
              onValueChange={(value) => setSelectedOption(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item
                label="📝 Alphabetically Assigned"
                value="automatic-alphabetically"
              />
              <Picker.Item
                label="🎲 Randomized Assignment"
                value="automatic-random"
              />
            </Picker>
            <TouchableOpacity
              style={styles.autoAssignButton}
              onPress={handleAutoAssign}
            >
              <MaterialIcons name="auto-awesome" size={20} color="white" />
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Remaining Students Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={assignModalVisible}
        onRequestClose={() => setAssignModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setAssignModalVisible(false)} // Close modal on overlay press
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Assign Seat {selectedSeat?.seatLabel}
            </Text>
            <FlatList
              data={remainingStudents}
              keyExtractor={(item: { idNumber: string }) => item.idNumber}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.studentItem,
                    selectedStudent?.idNumber === item.idNumber &&
                      styles.selectedStudent,
                  ]}
                  onPress={() => setSelectedStudent(item)}
                >
                  <Text>{`${item.lastName}, ${item.firstName}`}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text>No remaining students available.</Text>}
            />
            <TouchableOpacity
              style={[
                styles.assignButton,
                remainingStudents.length === 0 && styles.disabledButton,
              ]}
              onPress={handleAssignSeat}
              disabled={remainingStudents.length === 0}
            >
              <Text style={styles.assignButtonText}>Assign Seat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Table of Seats */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Seat Label</Text>
          <Text style={styles.tableHeaderText}>PC#</Text>
          <Text style={styles.tableHeaderText}>Student</Text>
          <Text style={styles.tableHeaderText}>Action</Text>
        </View>

        <FlatList
          data={seats}
          keyExtractor={(item) => item.seat_id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" },
              ]}
            >
              <Text style={styles.tableCell}>{item.seatLabel}</Text>
              <Text style={styles.tableCell}>{item.pc_number}</Text>
              <Text
                style={[
                  styles.studentColumn,
                  !item.student_name && { color: "red" },
                ]}
              >
                {item.student_name ? item.student_name : "Vacant"}
              </Text>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: item.assigned ? "#f44336" : "#4caf50" },
                ]}
                onPress={() =>
                  item.assigned
                    ? handleSeatUnassign(item.seat_id)
                    : openAssignModal(item)
                }
              >
                <MaterialIcons
                  name={item.assigned ? "person-remove" : "person-add"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SeatPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  header: {
    marginTop: 190,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  courseName: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  studentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedStudent: {
    backgroundColor: "#e0f7fa",
  },
  assignButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  assignButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    borderColor: "#aaaaaa",
  },
  autoAssignButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    gap: 10,
  },
  tableContainer: {
    marginTop: 10,
    marginBottom: 200,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3f51b5",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  studentColumn: {
    flex: 2, // Double the width of the other columns
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  actionButton: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
