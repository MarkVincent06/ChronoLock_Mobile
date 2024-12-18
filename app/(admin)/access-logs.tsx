import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "@/config/ngrok-api";

interface AccessLog {
  id: number;
  idNumber: string;
  action: string;
  date: string;
  time: string;
}

const AccessLogs = () => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to format date in 'Month Day, Year' format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to format time in 12-hour format with AM/PM
  const formatTime = (timeString: string) => {
    const date = new Date(`1970-01-01T${timeString}Z`); // Assuming time is in 24-hour format
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  // Fetch logs from the backend
  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/remote-access/fetchAccessLogs`
      );
      setLogs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Access Control Logs</Text>
      <ScrollView style={styles.cardContainer}>
        {logs.reverse().map((log, index) => (
          <View key={log.id} style={styles.card}>
            <Text style={styles.cardTitle}>Log #{logs.length - index}</Text>
            <Text style={styles.cardText}>Action: {log.action}</Text>
            <Text style={styles.cardText}>Date: {formatDate(log.date)}</Text>
            <Text style={styles.cardText}>Time: {formatTime(log.time)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AccessLogs;
