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

// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

// // Define seat data
// const generateSeats = (rows, columns) => {
//   const seats = [];
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < columns; col++) {
//       seats.push({ id: `${row}-${col}`, row, col, status: "available" }); // Seat status: available, occupied, reserved
//     }
//   }
//   return seats;
// };

// export default function SeatPlan() {
//   const [seats, setSeats] = useState(generateSeats(5, 8)); // Example: 5 rows x 8 columns
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const handleSeatPress = (seatId) => {
//     const updatedSeats = seats.map((seat) => {
//       if (seat.id === seatId) {
//         if (seat.status === "available") {
//           seat.status = "selected";
//         } else if (seat.status === "selected") {
//           seat.status = "available";
//         }
//       }
//       return seat;
//     });

//     setSeats(updatedSeats);
//     setSelectedSeats(
//       updatedSeats.filter((seat) => seat.status === "selected").map((seat) => seat.id)
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Seat Plan</Text>
//       <FlatList
//         data={seats}
//         numColumns={8} // Adjust columns based on your layout
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.seat,
//               item.status === "available" && styles.availableSeat,
//               item.status === "occupied" && styles.occupiedSeat,
//               item.status === "selected" && styles.selectedSeat,
//             ]}
//             disabled={item.status === "occupied"} // Disable touch for occupied seats
//             onPress={() => handleSeatPress(item.id)}
//           >
//             <Text style={styles.seatText}>{item.row + 1}{String.fromCharCode(65 + item.col)}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.grid}
//       />
//       <View style={styles.legendContainer}>
//         <View style={[styles.legend, styles.availableSeat]} />
//         <Text>Available</Text>
//         <View style={[styles.legend, styles.occupiedSeat]} />
//         <Text>Occupied</Text>
//         <View style={[styles.legend, styles.selectedSeat]} />
//         <Text>Selected</Text>
//       </View>
//       <Text style={styles.selectedSeats}>
//         Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   grid: {
//     alignItems: "center",
//   },
//   seat: {
//     width: 40,
//     height: 40,
//     margin: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   availableSeat: {
//     backgroundColor: "#d4edda",
//   },
//   occupiedSeat: {
//     backgroundColor: "#f8d7da",
//     borderColor: "#f5c6cb",
//   },
//   selectedSeat: {
//     backgroundColor: "#cce5ff",
//     borderColor: "#b8daff",
//   },
//   seatText: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   legendContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   legend: {
//     width: 20,
//     height: 20,
//     marginHorizontal: 5,
//     borderRadius: 3,
//   },
//   selectedSeats: {
//     marginTop: 20,
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
// });
