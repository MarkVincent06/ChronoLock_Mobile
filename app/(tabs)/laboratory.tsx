import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

// Define seat data
const seat = (rows, columns) => {
  const seats = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      seats.push({ id: `${row}-${col}`, row, col, status: "available" }); // Seat status: available, occupied, reserved
    }
  }
  return seats;
};

export default function SeatPlan() {
  const [seats, setSeats] = useState(seat(5, 8)); // Example: 5 rows x 8 columns
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatPress = (seatId) => {
    const updatedSeats = seats.map((seat) => {
      if (seat.id === seatId) {
        if (seat.status === "available") {
          seat.status = "selected";
        } else if (seat.status === "selected") {
          seat.status = "available";
        }
      }
      return seat;
    });

    setSeats(updatedSeats);
    setSelectedSeats(
      updatedSeats.filter((seat) => seat.status === "selected").map((seat) => seat.id)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratory Seat Plan</Text>
      <FlatList
        data={seats}
        numColumns={8} // Adjust columns based on your layout
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.seat,
              item.status === "available" && styles.availableSeat,
              item.status === "occupied" && styles.occupiedSeat,
              item.status === "selected" && styles.selectedSeat,
            ]}
            disabled={item.status === "occupied"} // Disable touch for occupied seats
            onPress={() => handleSeatPress(item.id)}
          >
            <Text style={styles.seatText}>{item.row + 1}{String.fromCharCode(65 + item.col)}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.grid}
      />
      <View style={styles.legendContainer}>
        <View style={[styles.legend, styles.availableSeat]} />
        <Text>Available</Text>
        <View style={[styles.legend, styles.occupiedSeat]} />
        <Text>Occupied</Text>
        <View style={[styles.legend, styles.selectedSeat]} />
        <Text>Selected</Text>
      </View>
      <Text style={styles.selectedSeats}>
        Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: "#f5c6cb",
  },
  selectedSeat: {
    backgroundColor: "#cce5ff",
    borderColor: "#b8daff",
  },
  seatText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  legend: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    borderRadius: 3,
  },
  selectedSeats: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});