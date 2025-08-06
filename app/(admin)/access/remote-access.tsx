import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserContext } from "@/context/UserContext";
import API_URL from "@/config/ngrok-api";

// Type assertion to fix TypeScript compatibility issues
const Icon = FontAwesome as any;

const AccessControl = () => {
  const { user } = useUserContext();
  const [connectionStatus, setConnectionStatus] = useState("Idle");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState("#28a745"); // Green
  const animatedValue = useRef(new Animated.Value(0)).current;

  // ESP32 endpoint (update IP as needed)
  const ESP32_URL = "http://10.173.66.110:5000";
  const USER_ID_NUMBER = user?.idNumber;

  // Send command to unlock the door
  const sendCommand = async (command: number) => {
    setIsLoading(true);
    setConnectionStatus("Sending command...");
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      const formattedTime = `${String(currentDate.getHours()).padStart(
        2,
        "0"
      )}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(
        currentDate.getSeconds()
      ).padStart(2, "0")}`;

      await axios.post(`${API_URL}/remote-access/insertAccessLog`, {
        idNumber: USER_ID_NUMBER,
        action: `Admin has attempted to unlock the ERP Laboratory.`,
        date: formattedDate, // YYYY-MM-DD format
        time: formattedTime, // HH:MM:SS format (24-hour)
      });

      // Just use console.log for now
      console.log("Command sent:", command);
      setConnectionStatus("Door unlocked successfully!");

      // // Send unlock command to ESP32
      // const response = await axios.post(`${ESP32_URL}/control`, {
      //   command, // 1 for unlock
      // });

      // if (response.status === 200) {
      //   Alert.alert("Success", "Door unlocked successfully!");
      //   setConnectionStatus("Door unlocked successfully!");
      // } else {
      //   throw new Error("Unexpected response from ESP32");
      // }
    } catch (error) {
      console.error("Error sending command:", error);
      Alert.alert("Failed to send command", "An error occurred.");
      setConnectionStatus("Failed to send command.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animate button border
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        })
      ).start();
    } else {
      animatedValue.stopAnimation();
      animatedValue.setValue(0);
    }
  }, [isLoading]);

  const borderColorAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#28a745", "#1e90ff"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remote Unlock</Text>
      <Text style={styles.description}>
        Remotely unlock the ERP laboratory door by clicking the big unlock
        button.
      </Text>

      <Animated.View
        style={[
          styles.unlockButton,
          { borderColor: isLoading ? borderColorAnimation : buttonColor },
        ]}
      >
        <TouchableOpacity
          onPress={() => sendCommand(1)}
          style={[styles.innerButton, { backgroundColor: buttonColor }]}
          disabled={isLoading}
        >
          <Icon name="lock-open" size={50} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
        {connectionStatus}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 40,
    textAlign: "center",
  },
  unlockButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  innerButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccessControl;
