import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card } from "@rneui/themed";
import { useUserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../config/ngrok-api";
import PushNotification from "react-native-push-notification";

// Define the type for a schedule
interface Schedule {
  scheduleID: number;
  courseName: string;
  courseCode: string;
  instFirstName: string;
  instLastName: string;
  section: string;
  startTime: string;
  endTime: string;
  program: string;
  year: string;
  userID: string;
}
interface Log {
  id: number;
  lab_id: number;
  user_id: number;
  occupancy_date: string;
  start_time: string;
  end_time: string;
  remarks: string;
  statusMessage: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [logs, setLogs] = useState<Log[]>([]);

  // Initialize local notifications
  PushNotification.createChannel(
    {
      channelId: "default-channel-idds",
      channelName: "Default Channel",
      importance: 4, // Max importance for immediate delivery
    },
    (created) => console.log(`Channel created: ${created}`) // Log channel creation
  );

  const triggerNotification = (title: string, message: string): void => {
    PushNotification.localNotification({
      channelId: "default-channel-idds", // Channel ID must match created channel
      title,
      message,
    });
  };

  useEffect(() => {
    let previousLogs: Log[] = []; // To store the previous logs for comparison

    const fetchLatestLogs = async () => {
      try {
        const response = await fetch(`${API_URL}/schedules/latest-logs`);
        if (!response.ok) {
          throw new Error("Failed to fetch latest logs");
        }

        const data = await response.json();
        setLogs(data);

        // Compare with previous logs to detect status changes
        data.forEach((newLog: Log) => {
          const oldLog = previousLogs.find((log) => log.id === newLog.id);
          if (oldLog && oldLog.statusMessage !== newLog.statusMessage) {
            // Notify the user if the status has changed
            const message = `Status changed for Lab ID ${newLog.lab_id}: ${newLog.statusMessage}`;
            triggerNotification("Status Update", message);
          }
        });

        // Update previousLogs for the next comparison
        previousLogs = data;
      } catch (error) {
        console.error("Error fetching latest logs:", error);
      }
    };

    // Fetch logs every 5 seconds
    const interval = setInterval(() => {
      fetchLatestLogs();
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Fetch schedule data
  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/schedules/schedules`);
        if (!response.ok) {
          throw new Error("Failed to fetch schedules");
        }

        const data = await response.json();
        setSchedules(data.data); // Keep all schedules if needed elsewhere.

        // Retrieve the idNumber from AsyncStorage
        const storedIdNumber = await AsyncStorage.getItem("idNumber");
        console.log("Stored idNumber in AsyncStorage:", storedIdNumber);

        if (storedIdNumber) {
          // Filter schedules to match the user ID
          const filtered = data.data.filter(
            (schedule: Schedule) => schedule.userID === storedIdNumber
          );
          setFilteredSchedules(filtered);

          // Check for upcoming schedules
          const upcomingResponse = await fetch(
            `${API_URL}/schedules/upcoming-schedules/${storedIdNumber}`
          );
          const upcomingData = await upcomingResponse.json();

          if (
            upcomingData.success &&
            upcomingData.upcomingSchedules.length > 0
          ) {
            const upcoming = upcomingData.upcomingSchedules[0];
            const startTime = new Date(upcoming.startDate).toLocaleString();
            const message = `Your class "${upcoming.courseName}" with ${upcoming.instFirstName} ${upcoming.instLastName} starts at ${startTime}.`;

            // Trigger notification
            triggerNotification("Upcoming Schedule Alert!", message);
          }
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();

    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDate(date.toLocaleString());
    }, 60000); // Update the current time every minute

    setCurrentDate(new Date().toLocaleString());

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Lab Logs Card */}
      <Card containerStyle={styles.titleCard}>
        <Card.Title style={styles.titleText}>Lab Logs</Card.Title>
      </Card>

      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : (
        <>
          {logs.length > 0 ? (
            logs.map((log) => (
              <View key={log.id} style={styles.card}>
                <Text style={styles.cardTitle}>Lab ID: {log.lab_id}</Text>
                <Text style={styles.cardDetails}>User ID: {log.user_id}</Text>
                <Text style={styles.cardDetails}>
                  Occupancy Date:{" "}
                  {new Date(log.occupancy_date).toLocaleDateString()}
                </Text>
                <Text style={styles.cardDetails}>
                  Time: {log.start_time} - {log.end_time}
                </Text>
                <Text style={styles.cardDetails}>Remarks: {log.remarks}</Text>
                <Text style={styles.cardStatus}>
                  Status: {log.statusMessage}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noLogsText}>No logs available.</Text>
          )}
        </>
      )}

      {/* My Schedule Card */}
      <Card containerStyle={styles.titleCard}>
        <Card.Title style={styles.titleText}>My Schedule</Card.Title>
      </Card>

      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : (
        <>
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule) => (
              <View key={schedule.scheduleID} style={styles.card}>
                <Text style={styles.cardTitle}>{schedule.courseName}</Text>
                <Text style={styles.cardSubtitle}>
                  Code: {schedule.courseCode}
                </Text>
                <Text style={styles.cardDetails}>
                  Instructor: {schedule.instFirstName} {schedule.instLastName}
                </Text>
                <Text style={styles.cardDetails}>
                  Section: {schedule.section} | Time: {schedule.startTime} -{" "}
                  {schedule.endTime}
                </Text>
                <Text style={styles.cardDetails}>
                  Program: {schedule.program} | Year: {schedule.year}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noScheduleText}>
              No schedules found for this user.
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f7fc",
    paddingBottom: 100,
  },
  welcomeCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 2,
    backgroundColor: "#3d85c6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  userTypeText: {
    fontSize: 16,
    color: "#f1f1f1",
    textAlign: "center",
    marginBottom: 15,
    fontStyle: "italic",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  scheduleCard: {
    borderRadius: 15,
    marginBottom: 25,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  myScheduleText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#777",
    marginVertical: 5,
  },
  cardDetails: {
    fontSize: 14,
    color: "#555",
    marginVertical: 3,
  },
  noScheduleText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },

  titleCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#3d85c6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  cardStatus: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3d85c6",
    marginTop: 5,
    textTransform: "uppercase",
  },
  noLogsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});
