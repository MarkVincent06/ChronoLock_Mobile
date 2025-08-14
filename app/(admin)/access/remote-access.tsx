import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserContext } from "@/context/UserContext";
import API_URL from "@/config/ngrok-api";
import { router } from "expo-router";
import ESP32_URL from "@/config/esp32-api";

// Type assertion to fix TypeScript compatibility issues
const Icon = FontAwesome as any;

const AccessControl = () => {
  const { user } = useUserContext();
  const [connectionStatus, setConnectionStatus] = useState("Ready to unlock");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState("#28a745"); // Green
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const USER_ID_NUMBER = user?.idNumber;

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

  // Send command to unlock the door
  const unlockDoor = async () => {
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
        action: `Admin has attempted to unlock the ERP Laboratory.`,
        date: formattedDate, // YYYY-MM-DD format
        time: formattedTime, // HH:MM:SS format (24-hour)
      });

      sendCommand();
    } catch (error) {
      console.error("Error unlocking door:", error);
      Alert.alert("Failed to unlock door", "An error occurred.");
      setConnectionStatus("Failed to unlock the door.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
  }, [isLoading]);

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

            <Text style={styles.unlockButtonText}>Tap to Unlock</Text>
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
