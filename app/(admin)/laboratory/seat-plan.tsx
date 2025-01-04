import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome6"; // Importing the icon library

// Sample seat data (hardcoded for now)
const seatsData = [
  { seat_id: 1, seat_name: "A1", is_active: 1, assigned: true },
  { seat_id: 2, seat_name: "A2", is_active: 1, assigned: false },
  { seat_id: 3, seat_name: "B1", is_active: 1, assigned: true },
  { seat_id: 4, seat_name: "B2", is_active: 1, assigned: false },
  { seat_id: 5, seat_name: "C1", is_active: 1, assigned: false },
  { seat_id: 6, seat_name: "C2", is_active: 1, assigned: true },
];

// Styled Components
const SeatContainer = styled.TouchableOpacity<{ assigned: boolean }>`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: ${({ assigned }) => (assigned ? "red" : "green")};
  border-radius: 10px;
`;

const SeatText = styled.Text`
  color: white;
  font-weight: bold;
`;

const SeatPlan = () => {
  const [seats, setSeats] = useState(seatsData);

  const handleSeatPress = (seatId: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.seat_id === seatId ? { ...seat, assigned: !seat.assigned } : seat
      )
    );
  };

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleSeatSelection = (seatId: number) => {
    scale.value = withTiming(1.2, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
    handleSeatPress(seatId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seat Plan</Text>
      <FlatList
        data={seats}
        numColumns={3} // Adjust grid layout
        keyExtractor={(item) => item.seat_id.toString()}
        renderItem={({ item }) => (
          <Animated.View style={animatedStyle}>
            <SeatContainer
              assigned={item.assigned}
              onPress={() => handleSeatSelection(item.seat_id)}
            >
              {/* Displaying seat icon instead of text */}
              <Icon name="chair" size={30} color="white" />
              <SeatText>{item.seat_name}</SeatText>
            </SeatContainer>
          </Animated.View>
        )}
      />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
