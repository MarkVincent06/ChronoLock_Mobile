import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserContext } from "@/context/UserContext";
import API_URL from "@/config/ngrok-api";
import usePullToRefresh from "@/hooks/usePullToRefresh";

const AccessControl = () => {
  const { user } = useUserContext();
  const [connectionStatus, setConnectionStatus] = useState("Idle");
  const [isLoading, setIsLoading] = useState(false);
  const [privilegeStatus, setPrivilegeStatus] = useState("");
  const [buttonColor, setButtonColor] = useState("#6c757d"); // Default grey
  const [isWithinSchedule, setIsWithinSchedule] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const RASPBERRY_PI_URL = "http://192.168.215.17:5000";
  const USER_ID_NUMBER = user?.idNumber;

  // Fetch today's schedule for the instructor
  const fetchTodayClasses = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/schedules/user-classes/today/${USER_ID_NUMBER}`
      );
      const classes = response.data.data; // Use `data` field as shown in your response.

      if (classes && classes.length > 0) {
        const currentDateTime = new Date();
        const currentTimeInMinutes =
          currentDateTime.getHours() * 60 + currentDateTime.getMinutes();

        // Check if the current time is within any scheduled class
        const isScheduled = classes.some((classItem) => {
          const [startHour, startMinutes] = classItem.startTime
            .split(":")
            .map(Number);
          const [endHour, endMinutes] = classItem.endTime
            .split(":")
            .map(Number);

          const startTotalMinutes = startHour * 60 + startMinutes;
          const endTotalMinutes = endHour * 60 + endMinutes;

          return (
            currentTimeInMinutes >= startTotalMinutes &&
            currentTimeInMinutes <= endTotalMinutes
          );
        });

        setIsWithinSchedule(isScheduled);
      } else {
        setIsWithinSchedule(false);
      }
    } catch (error) {}
  };

  // Fetch the privilege status from the backend
  const fetchPrivilegeStatus = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/remote-access/fetchAccessAccountByIdNumber/${USER_ID_NUMBER}`
      );

      const data = response.data.data[0];
      if (data) {
        setPrivilegeStatus(data.privilege_status);
        updateButtonAppearance(data.privilege_status);
      } else {
        setPrivilegeStatus("Unknown");
        setButtonColor("#6c757d");
      }
    } catch (error) {
      console.error("Error fetching privilege status:", error);
      Alert.alert("Error", "Failed to fetch privilege status.");
    }
  };

  // Combine both fetch functions for refresh
  const fetchData = async () => {
    await Promise.all([fetchPrivilegeStatus(), fetchTodayClasses()]);
  };

  const { refreshing, onRefresh } = usePullToRefresh(fetchData);

  // Fetch privilege status and today's schedule on component mount
  useEffect(() => {
    if (user?.userType === "Faculty") {
      fetchData();
    }
  }, []);

  // Update button appearance based on privilege status
  const updateButtonAppearance = (status: string) => {
    if (status === "Granted") {
      setButtonColor("#28a745"); // Green
    } else if (status === "Revoked") {
      setButtonColor("#dc3545"); // Danger (Red)
    } else if (status === "Pending") {
      setButtonColor("#ffc107"); // Yellow
    } else {
      setButtonColor("#6c757d"); // Default grey
    }
  };

  // Send command to unlock the door
  const sendCommand = async (command: number) => {
    if (privilegeStatus === "Granted" && isWithinSchedule) {
      setIsLoading(true);
      setConnectionStatus("Sending command...");

      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().split("T")[0];
      const currentTimeString = currentDate.toLocaleTimeString();

      try {
        // Insert log access attempt
        const logResponse = await axios.post(
          `${API_URL}/remote-access/insertAccessLog`,
          {
            idNumber: USER_ID_NUMBER,
            action: `User with ID number ${USER_ID_NUMBER} has attempted to unlock the ERP Laboratory.`,
            date: currentDateString,
            time: currentTimeString,
          }
        );

        if (logResponse.status === 200) {
          console.log("Access log inserted successfully.");
        } else {
          console.error("Failed to insert access log.");
        }

        // Send unlock command to Raspberry Pi
        const response = await axios.post(`${RASPBERRY_PI_URL}/control`, {
          command, // 1 for unlock
        });

        if (response.status === 200) {
          Alert.alert("Success", "Door unlocked successfully!");
          setConnectionStatus("Door unlocked successfully!");
        } else {
          throw new Error("Unexpected response from server");
        }
      } catch (error) {
        console.error("Error sending command:", error);
        Alert.alert("Failed to send command", "An error occurred.");
        setConnectionStatus("Failed to send command.");
      } finally {
        setIsLoading(false);
      }
    } else if (!isWithinSchedule) {
      Alert.alert(
        "Access Denied",
        "You can only unlock the lab during your scheduled time."
      );
    } else if (privilegeStatus === "Revoked") {
      Alert.alert(
        "Access Denied",
        "Your privilege status has been revoked. Please contact the administrator."
      );
    } else if (privilegeStatus === "Pending") {
      Alert.alert(
        "Access Pending",
        "Your access is pending approval. Please contact the administrator."
      );
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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        >
          <Icon name="lock-open" size={50} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
        {connectionStatus}
      </Text>
    </ScrollView>
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
