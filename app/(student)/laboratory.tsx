import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Switch,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import PushNotification from "react-native-push-notification";
import API_URL from "@/config/ngrok-api";
import { TouchableOpacity } from "react-native";
import { useUserContext } from "../../context/UserContext";

interface Peripheral {
  id: string;
  name: string;
  status: boolean;
}

export default function Laboratory(): JSX.Element {
  const [peripherals, setPeripherals] = useState<Peripheral[]>([
    { id: "1", name: "Monitor", status: false },
    { id: "2", name: "Keyboard", status: false },
    { id: "3", name: "Mouse", status: false },
    { id: "4", name: "CPU", status: false },
    { id: "5", name: "Speakers", status: false },
    { id: "6", name: "Printer", status: false },
  ]);

  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [attendanceMessage, setAttendanceMessage] = useState<string>("");

  // 1. Initialize Notification and Create Channel
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("Notification Received:", notification);
      },
      requestPermissions: Platform.OS === "ios", // Request permissions for iOS
    });

    PushNotification.createChannel(
      {
        channelId: "default-channel-idds", // Unique ID for the channel
        channelName: "Default Channel", // Visible name for the channel
        channelDescription: "General notifications for Laboratory App",
        importance: 4, // Default: Importance.HIGH (4)
        vibrate: true, // Vibrate on notification
        playSound: true,
      },
      (created) => {
        console.log(`Notification Channel Creation Status: ${created}`);
        if (!created) {
          console.log("Channel was not created. It may already exist.");
        }
      }
    );
  }, []);

  // Helper function to trigger a notification
  const triggerNotification = (title: string, message: string): void => {
    PushNotification.localNotification({
      channelId: "default-channel-idds", // Channel ID must match created channel
      title,
      message,
    });
  };

  // 2. Attendance Check
  const getIdNumberFromStorage = async (): Promise<string | null> => {
    try {
      const idNumber = user?.idNumber;
      return idNumber || null;
    } catch (error) {
      console.error("Error retrieving idNumber from AsyncStorage:", error);
      return null;
    }
  };

  const checkAttendance = async (): Promise<void> => {
    try {
      const idNumber = await getIdNumberFromStorage();
      if (idNumber) {
        const response = await fetch(
          `${API_URL}/users/checkAttendance/${idNumber}`
        );
        const data = await response.json();
        if (data.displayScreen) {
          setShowScreen(true);
        } else {
          // setAttendanceMessage("You have no schedule right now.");
          // triggerNotification("Attendance", "You have no schedule at the moment.");
        }
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      triggerNotification("Error", "Error fetching attendance data.");
      setAttendanceMessage("Error fetching attendance data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkAttendance();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Handle Checklist Submission
  const toggleStatus = (id: string): void => {
    setPeripherals((prevPeripherals) =>
      prevPeripherals.map((peripheral) =>
        peripheral.id === id
          ? { ...peripheral, status: !peripheral.status }
          : peripheral
      )
    );
  };

  const handleSubmit = async (): Promise<void> => {
    const allChecked = peripherals.every((item) => item.status);
    const isNeedAttention = !allChecked;

    try {
      const idNumber = await getIdNumberFromStorage();
      if (idNumber) {
        const response = await fetch(
          `${API_URL}/users/updateAttentionStatus/${idNumber}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isNeedAttention }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update attention status");
        }

        if (isNeedAttention) {
          triggerNotification(
            "Alert",
            "Some peripherals need attention. Status reported."
          );
        } else {
          triggerNotification(
            "Success",
            "All peripherals are in working condition!"
          );
        }

        Alert.alert(
          isNeedAttention ? "Alert" : "Success",
          isNeedAttention
            ? "Some peripherals need attention. Status has been reported."
            : "All peripherals are in working condition!"
        );
      }
    } catch (error) {
      console.error("Error updating attention status:", error);
      triggerNotification("Error", "Failed to update attention status.");
    }
  };
  const testNotification = () => {
    triggerNotification("Test Notification", "This is a test notification!");
  };
  // Render UI
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      ) : showScreen ? (
        <>
          <Text style={styles.header}>Computer Peripherals Checklist</Text>
          <FlatList
            data={peripherals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Switch
                  value={item.status}
                  onValueChange={() => toggleStatus(item.id)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={item.status ? "#007bff" : "#f4f3f4"}
                />
              </View>
            )}
          />
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButton} onPress={handleSubmit}>
              Submit Checklist
            </Text>
          </View>

          {/* Test Notification Button */}
          <TouchableOpacity
            style={styles.testButton}
            onPress={testNotification}
          >
            <Text style={styles.testButtonText}>Test Notification</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noticeMessage}>{attendanceMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  itemText: { fontSize: 18, color: "#333" },
  submitButtonContainer: { marginTop: 20, alignItems: "center" },
  submitButton: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: "center",
    overflow: "hidden",
    elevation: 3,
  },
  noticeMessage: {
    fontSize: 18,
    color: "#ff6347",
    textAlign: "center",
    marginTop: 20,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderText: { fontSize: 16, marginTop: 10, color: "#555" },
});
