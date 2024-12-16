import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Switch, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "@/config/ngrok-api";

export default function Laboratory() {
  const [peripherals, setPeripherals] = useState([
    { id: "1", name: "Monitor", status: false },
    { id: "2", name: "Keyboard", status: false },
    { id: "3", name: "Mouse", status: false },
    { id: "4", name: "CPU", status: false },
    { id: "5", name: "Speakers", status: false },
    { id: "6", name: "Printer", status: false },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScreen, setShowScreen] = useState(false);
  const [attendanceMessage, setAttendanceMessage] = useState("");

  const getIdNumberFromStorage = async () => {
    try {
      const idNumber = await AsyncStorage.getItem("idNumber");
      if (idNumber !== null) {
        return idNumber;
      } else {
        throw new Error("idNumber not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error retrieving idNumber from AsyncStorage:", error);
    }
  };

  const checkAttendance = async () => {
    try {
      const idNumber = await getIdNumberFromStorage();
      if (idNumber) {
        const response = await fetch(`${API_URL}/users/checkAttendance/${idNumber}`);
        const data = await response.json();
        if (data.displayScreen) {
          setShowScreen(true);
        } else {
          setAttendanceMessage("You have no schedule right now.");
        }
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
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

  const toggleStatus = (id) => {
    setPeripherals((prevPeripherals) =>
      prevPeripherals.map((peripheral) =>
        peripheral.id === id
          ? { ...peripheral, status: !peripheral.status }
          : peripheral
      )
    );
  };

  const handleSubmit = async () => {
    const allChecked = peripherals.every((item) => item.status);
    const isNeedAttention = !allChecked;
    try {
      const idNumber = await getIdNumberFromStorage();
      if (idNumber) {
        const response = await fetch(`${API_URL}/users/updateAttentionStatus/${idNumber}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isNeedAttention }),
        });

        if (!response.ok) {
          throw new Error("Failed to update attention status");
        }

        Alert.alert(
          isNeedAttention ? "Alert" : "Success",
          isNeedAttention
            ? "Some peripherals need attention. Status has been reported."
            : "All peripherals are in working condition!"
        );
      } else {
        Alert.alert("Error", "Unable to retrieve your ID number.");
      }
    } catch (error) {
      console.error("Error updating attention status:", error);
      Alert.alert("Error", "Failed to update attention status.");
    }
  };

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
        </>
      ) : (
        <Text style={styles.noticeMessage}>{attendanceMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
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
  itemText: {
    fontSize: 18,
    color: "#333",
  },
  submitButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
});
