import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native";
import API_URL from "../../config/ngrok-api"; // Adjust the path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";

// Update seat generation to use seatId as the unique identifier
const seat = (rows, columns) => {
  const seats = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const seatId = `seat-${row}-${col}`; // Unique seat ID
      seats.push({
        id: seatId,
        row,
        col,
        status: "available",
        assignedTo: null,
      });
    }
  }
  return seats;
};

export default function SeatPlan() {
  const [seats, setSeats] = useState(seat(5, 8));
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSeat, setActiveSeat] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/schedules/schedules`);
        if (!response.ok) {
          throw new Error("Failed to fetch schedules");
        }
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setClasses(data.data);
          const storedIdNumber = await AsyncStorage.getItem("idNumber");
          if (storedIdNumber) {
            const filtered = data.data.filter(
              (classItem) => classItem.userID === storedIdNumber
            );
            setFilteredClasses(filtered);
            if (filtered.length > 0) {
              const firstClass = filtered[0];
              setSelectedClass(firstClass.courseName);
              const scheduleID = firstClass.scheduleID;
              await AsyncStorage.setItem("scheduleID", scheduleID.toString());
            }
          }
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const scheduleID = await AsyncStorage.getItem("scheduleID");
        if (!scheduleID) {
          console.warn("No scheduleID available to fetch students.");
          return;
        }

        const response = await fetch(`${API_URL}/users/students/${scheduleID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        if (Array.isArray(data.students)) {
          const formattedStudents = data.students.map((student) => ({
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            idNumber: student.idNumber,
          }));
          setStudents(formattedStudents);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents(); // Initial fetch for students

    const intervalId = setInterval(() => {
      fetchStudents(); // Fetch students every second
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [selectedClass]); // Re-fetch students when selectedClass changes

  const handleSeatPress = (seatId) => {
    const clickedSeat = seats.find((seat) => seat.id === seatId);
    setActiveSeat(clickedSeat);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setActiveSeat(null);
  };

  useEffect(() => {
    const fetchOccupiedSeats = async () => {
      try {
        const scheduleID = await AsyncStorage.getItem("scheduleID");
        if (!scheduleID) {
          console.warn("No scheduleID available to fetch seats.");
          return;
        }

        const selectedClassObj = filteredClasses.find(
          (classItem) => classItem.courseName === selectedClass
        );
        if (!selectedClassObj) {
          console.warn("Selected class not found.");
          return;
        }

        const newNumber = selectedClassObj.classList;
        const response = await fetch(
          `${API_URL}/schedules/class/${newNumber}/seatNumbers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch occupied seats");
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const occupiedSeats = data.data.map((seat) => seat.seatNumber);

          const updatedSeats = seats.map((seat) => {
            if (occupiedSeats.includes(seat.id)) {
              return { ...seat, status: "occupied" };
            }
            return seat;
          });

          setSeats(updatedSeats);
        }
      } catch (error) {
        console.error("Error fetching occupied seats:", error);
      }
    };

    if (selectedClass) {
      fetchOccupiedSeats();
    }
  }, [selectedClass, filteredClasses]);

  const handleStudentAssign = async () => {
    if (activeSeat && selectedStudent) {
      try {
        const selectedStudentObj = students.find(
          (student) => student.id === selectedStudent
        );
        if (!selectedStudentObj) {
          console.error("Selected student not found.");
          return;
        }

        const seatNumber = activeSeat.id; // Save seatId for assignment
        const jsonRequest = {
          userId: selectedStudentObj.idNumber,
          seatNumber: seatNumber,
        };

        const response = await fetch(`${API_URL}/users/updateSeatNumber`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonRequest),
        });

        if (!response.ok) {
          throw new Error("Failed to assign seat");
        }

        // Update the seat locally
        const updatedSeats = seats.map((seat) =>
          seat.id === activeSeat.id
            ? { ...seat, assignedTo: selectedStudent, status: "occupied" }
            : seat
        );
        setSeats(updatedSeats);
      } catch (error) {
        console.error("Error assigning student:", error);
      } finally {
        handleModalClose();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratory Seat Plan</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : (
        <>
          <FlatList
            data={seats}
            numColumns={8}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.seat,
                  item.status === "available" && styles.availableSeat,
                  item.status === "occupied" && styles.occupiedSeat,
                ]}
                disabled={item.status === "occupied"}
                onPress={() => handleSeatPress(item.id)}
              >
                <Text style={styles.seatText}>{item.id}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.grid}
          />

          <Text style={styles.dropdownTitle}>Select Class</Text>
          <Picker
            selectedValue={selectedClass}
            style={styles.picker}
            onValueChange={async (itemValue) => {
              setSelectedClass(itemValue);
              const selectedClassObj = filteredClasses.find(
                (classItem) => classItem.courseName === itemValue
              );
              if (selectedClassObj) {
                const newScheduleID = selectedClassObj.scheduleID;
                const newNumber = selectedClassObj.classList;
                await AsyncStorage.setItem(
                  "scheduleID",
                  newScheduleID.toString()
                );
              }
            }}
          >
            {filteredClasses.map((classItem) => (
              <Picker.Item
                key={classItem.scheduleID}
                label={classItem.courseName}
                value={classItem.courseName}
              />
            ))}
          </Picker>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleModalClose}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Assign Student</Text>
                {activeSeat && (
                  <View style={styles.modalDetails}>
                    <Text style={styles.modalText}>Seat ID: {activeSeat.id}</Text>
                    <Text style={styles.modalText}>
                      Row: {activeSeat.row + 1}
                    </Text>
                    <Text style={styles.modalText}>
                      Column: {String.fromCharCode(65 + activeSeat.col)}
                    </Text>
                  </View>
                )}
                <Picker
                  selectedValue={selectedStudent}
                  style={styles.modalPicker}
                  onValueChange={(itemValue) => {
                    setSelectedStudent(itemValue);
                  }}
                >
                  <Picker.Item label="None" value="" />
                  {students.map((student) => (
                    <Picker.Item
                      key={student.id}
                      label={`${student.name} (${student.email})`}
                      value={student.id}
                    />
                  ))}
                </Picker>

                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.assignButton]}
                    onPress={handleStudentAssign}
                  >
                    <Text style={styles.buttonText}>Assign</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={handleModalClose}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalDetails: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalPicker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  assignButton: {
    backgroundColor: "#28a745",
  },
  closeButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  grid: {
    alignItems: "center",
  },
  seat: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  availableSeat: {
    backgroundColor: "#d4edda",
  },
  occupiedSeat: {
    backgroundColor: "#f8d7da",
  },
  seatText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  picker: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
  },
});
