import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import API_URL from "@/config/ngrok-api";
import ESP32_URL from "@/config/esp32-api";
// Type assertion to fix TypeScript compatibility issues
const Icon = FontAwesome as any;

const { width, height } = Dimensions.get("window");

const AccessControl = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [connectionStatus, setConnectionStatus] = useState("Ready to unlock");
  const [isLoading, setIsLoading] = useState(false);
  const [privilegeStatus, setPrivilegeStatus] = useState("");
  const [buttonColor, setButtonColor] = useState("#6c757d"); // Default gray
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
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
      setButtonColor("#10B981"); // Emerald green
    } else if (status === "Revoked") {
      setButtonColor("#EF4444"); // Red
    } else if (status === "Pending") {
      setButtonColor("#F59E0B"); // Amber
    } else {
      setButtonColor("#6B7280"); // Gray
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
                      // Remove this line later
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
                    setConnectionStatus("Ready to unlock");
                  }
                }
              } catch (attendanceError: any) {
                // Check if it's a 400 error with a message (attendance already recorded)
                if (
                  attendanceError.response?.status === 400 &&
                  attendanceError.response?.data?.message
                ) {
                  // Remove this line later
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

              // Remove this line later
              setConnectionStatus("Door unlocked successfully!");

              console.log("Door unlocked by lab-in-charge");
              // sendCommand();
            }
          }
        } catch (scheduleError) {
          console.error("Error checking schedule:", scheduleError);
          setConnectionStatus("Ready to unlock");
        }
      } catch (error) {
        console.error("Error unlocking door:", error);
        Alert.alert("Failed to unlock door", "An error occurred.");
        setConnectionStatus("Failed to unlock the door.");
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

    // Fade in animation
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Animate button border and pulse effect
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      animatedValue.stopAnimation();
      animatedValue.setValue(0);
    }

    // Pulse animation for ready state
    if (privilegeStatus === "Granted" && !isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isLoading, privilegeStatus]);

  const borderColorAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#10B981", "#06B6D4"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#F8FAFC", "#F1F5F9", "#E2E8F0"]}
        style={styles.container}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Remote Access</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Animated.View style={[styles.content, { opacity: fadeAnimation }]}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Icon
              name="lock-smart"
              size={40}
              color="#10B981"
              style={styles.titleIcon}
            />
            <Text style={styles.title}>ERP Laboratory</Text>
            <Text style={styles.subtitle}>Remote Door Control</Text>
          </View>

          {/* Main Unlock Button */}
          <View style={styles.buttonSection}>
            <Animated.View
              style={[
                styles.unlockButtonContainer,
                {
                  borderColor: isLoading ? borderColorAnimation : buttonColor,
                  transform: [{ scale: pulseAnimation }],
                },
              ]}
            >
              <TouchableOpacity
                onPress={unlockDoor}
                style={[
                  styles.unlockButton,
                  { backgroundColor: buttonColor },
                  isLoading && styles.loadingButton,
                ]}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Animated.View
                    style={[
                      styles.loadingIcon,
                      {
                        transform: [
                          {
                            rotate: animatedValue.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", "360deg"],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Icon name="loading" size={50} color="#FFFFFF" />
                  </Animated.View>
                ) : (
                  <Icon name="lock-open-variant" size={50} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.unlockButtonText}>
              {privilegeStatus === "Granted"
                ? "Tap to Unlock"
                : "Access Restricted"}
            </Text>
          </View>

          {/* Status Message */}
          <View style={styles.statusMessageContainer}>
            <Text
              style={[
                styles.statusMessage,
                connectionStatus.includes("successfully") &&
                  styles.successMessage,
                connectionStatus.includes("failed") && styles.errorMessage,
              ]}
            >
              {connectionStatus}
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1F2937",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  titleIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
  buttonSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  unlockButtonContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  unlockButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  loadingButton: {
    opacity: 0.8,
  },
  loadingIcon: {
    // Animation styling handled by Animated.View
  },
  unlockButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },
  statusMessageContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statusMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  successMessage: {
    color: "#10B981",
  },
  errorMessage: {
    color: "#EF4444",
  },
});

export default AccessControl;
