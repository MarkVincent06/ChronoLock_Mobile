import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUserContext } from "@/context/UserContext";
import API_URL from "@/config/ngrok-api";

interface Seat {
  seatLabel: any;
  seat_id: number;
  seat_name: string;
  assigned: boolean;
  student_name: string | null;
  pc_number: string;
}

const SeatPlan = () => {
  const router = useRouter();
  const { scheduleID } = useLocalSearchParams<{ scheduleID: string }>();
  const { courseName } = useLocalSearchParams<{ courseName: string }>();
  const { user } = useUserContext();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const scale = useSharedValue(1);

  useEffect(() => {
    const hardcodedSeats = [];
    // Create PC1 to PC30 with assigned seats
    for (let i = 1; i <= 30; i++) {
      hardcodedSeats.push({
        seat_id: i,
        seatLabel: `S${i}`,
        seat_name: `PC${i}`,
        assigned: true,
        student_name: `Mark Vincent  Cleofe ${i}`,
        pc_number: `PC${i}`,
      });
    }

    setSeats(hardcodedSeats);
    setLoading(false); // Set loading to false after the data is set
  }, []); // Empty dependency array to run only once when component mounts

  const handleSeatPress = (seatId: any) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.seat_id === seatId ? { ...seat, assigned: !seat.assigned } : seat
      )
    );
  };

  const handleSeatSelection = (seatId: any) => {
    handleSeatPress(seatId);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text>Loading Seats...</Text>
      </View>
    );
  }

  const handleAutoAssign = async () => {
    if (!selectedOption) {
      console.log("No option selected.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/seats/assign-seats/${selectedOption}/${user?.idNumber}/${scheduleID}`
      );
      const assignedSeats = response.data.assignments;

      // Map the assignments to update the seats state
      const updatedSeats = assignedSeats.map((assignment: any) => ({
        seat_id: assignment.studentID,
        seat_label: assignment.seatRow + assignment.seatColumn,
        assigned: true,
        student_name: assignment.studentID,
        pc_number: assignment.seatName,
      }));

      setSeats(updatedSeats);
      setModalVisible(false); // Close modal after assigning seats
    } catch (error) {
      console.error("Error auto-assigning seats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleBackgroundPress = (e: any) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false); // Close modal if clicked outside of it
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Seat Plan</Text>
      </View>

      {/* Display Course Name */}
      {courseName && <Text style={styles.courseName}>{courseName}</Text>}

      {/* Auto Assign Button */}
      <TouchableOpacity
        style={styles.autoAssignButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="auto-awesome" size={20} color="white" />
        <Text style={styles.buttonText}>Auto Assign Seats</Text>
      </TouchableOpacity>

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
              <Text style={styles.buttonText}>Auto Assign Seats</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Table of Seats */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>S_Label</Text>
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
              <Text style={styles.studentColumn}>{item.student_name}</Text>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: item.assigned ? "#f44336" : "#4caf50" },
                ]}
                onPress={() => handleSeatSelection(item.seat_id)}
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
    marginTop: 180,
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  autoAssignButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 10,
    marginBottom: 185,
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
    paddingVertical: 10,
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
