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
  const [privilegeStatus, setPrivilegeStatus] = useState("");
  const [buttonColor, setButtonColor] = useState("#6c757d"); // Default gray
  const animatedValue = useRef(new Animated.Value(0)).current;

  // ESP32 endpoint (update IP as needed)
  const ESP32_URL = "http://10.173.66.110:5000";
  const USER_ID_NUMBER = user?.idNumber;

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

  // Send command to ESP32
  const sendCommand = async () => {
    try {
      const response = await axios.post(`${ESP32_URL}/unlock`, {
        command: "unlock",
      });

      if (response.status === 200) {
        Alert.alert("Success", "Door unlocked successfully!");
        setConnectionStatus("Door unlocked successfully!");
      } else {
        throw new Error("Unexpected response from ESP32");
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to unlock door: " + error.message);
      setConnectionStatus("Unlock failed");
    }
  };

  // Attempt to unlock the door
  const unlockDoor = async () => {
    if (privilegeStatus === "Granted") {
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

        // Insert access log
        await axios.post(`${API_URL}/remote-access/insertAccessLog`, {
          idNumber: USER_ID_NUMBER,
          action: `Lab In Charge has attempted to unlock the ERP Laboratory.`,
          date: formattedDate, // YYYY-MM-DD format
          time: formattedTime, // HH:MM:SS format (24-hour)
        });

        // Check if the instructor is on scheduled time
        try {
          const scheduleResponse = await axios.get(
            `${API_URL}/remote-access/checkScheduledTime/${USER_ID_NUMBER}`
          );

          if (scheduleResponse.data && scheduleResponse.data.success) {
            if (scheduleResponse.data.isScheduled) {
              const classId = scheduleResponse.data.scheduleInfo.classID;
              const scheduleId = scheduleResponse.data.scheduleInfo.scheduleID;
              // Insert intructor attendance
              try {
                const attendanceResponse = await axios.post(
                  `${API_URL}/attendances/faculty/attendance-records/remote-access`,
                  {
                    userID: USER_ID_NUMBER,
                    classID: classId,
                  }
                );

                // Update lab occupancy
                if (attendanceResponse.status === 201) {
                  try {
                    const occupancyResponse = await axios.post(
                      `${API_URL}/lab-occupancy/occupy/${scheduleId}`
                    );

                    if (occupancyResponse.data.success) {
                      // Remove this later
                      setConnectionStatus("Door unlocked successfully!");

                      console.log(
                        "Attendance note:",
                        attendanceResponse.data.message
                      );
                      console.log(
                        "Lab occupancy note:",
                        occupancyResponse.data.message
                      );
                      // sendCommand();
                    }
                  } catch (occupancyError) {
                    console.error(
                      "Error updating lab occupancy:",
                      occupancyError
                    );
                    setConnectionStatus("Idle");
                  }
                }
              } catch (attendanceError: any) {
                // Check if it's a 400 error with a message (attendance already recorded)
                if (
                  attendanceError.response?.status === 400 &&
                  attendanceError.response?.data?.message
                ) {
                  // Remove this later
                  setConnectionStatus("Door unlocked successfully!");
                  console.log(
                    "Attendance note:",
                    attendanceError.response.data.message
                  );

                  // sendCommand();
                } else {
                  console.error("Error recording attendance:", attendanceError);
                }
              }
            } else if (scheduleResponse.data.isScheduled === false) {
              // THIS IS FOR LAB IN CHARGE WHERE HE/SHE CAN OPEN THE LAB ANYTIME

              // Remove this later
              setConnectionStatus("Door unlocked successfully!");

              console.log("Door unlocked by lab-in-charge");
              // sendCommand();
            }
          }
        } catch (scheduleError) {
          console.error("Error checking schedule:", scheduleError);
          setConnectionStatus("Idle");
        }
      } catch (error) {
        console.error("Error sending command:", error);
        Alert.alert("Failed to send command", "An error occurred.");
        setConnectionStatus("Failed to send command.");
      } finally {
        setIsLoading(false);
      }
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

  // Fetch privilege status on component mount
  useEffect(() => {
    fetchPrivilegeStatus();
  }, []);

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
          // onPress={() => sendCommand()}
          onPress={() => unlockDoor()}
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
