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
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

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

export default function Home() {
  const { user } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");

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
        setSchedules(data.data);

        // Retrieve the idnumber from AsyncStorage
        const storedIdNumber = await AsyncStorage.getItem("idNumber");
        console.log("Stored idNumber in AsyncStorage:", storedIdNumber);

        if (storedIdNumber) {
          const filtered = data.data.filter(
            (schedule: Schedule) => schedule.userID === storedIdNumber
          );
          setFilteredSchedules(filtered);

          // Send notifications for the instructor's schedule immediately after fetching data
          filtered.forEach((schedule) => {
            scheduleNotification(schedule); // Send the notification right away
          });
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

  const scheduleNotification = async (schedule: Schedule) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Upcoming Class: ${schedule.courseName} - ${schedule.courseCode}`,
          body: `Your class with ${schedule.instFirstName} ${schedule.instLastName} is about to start. Section: ${schedule.section} | Time: ${schedule.startTime} - ${schedule.endTime}`,
        },
        trigger: {
          // Trigger the notification immediately (on app launch)
          seconds: 1, // Delay by 1 second to give time for the app to load
        },
      });
      console.log(`Notification scheduled for ${schedule.courseName}`);
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.welcomeCard}>
        <Card.Title style={styles.welcomeText}>
          Welcome, {user?.firstName}!
        </Card.Title>
        <Text style={styles.userTypeText}>{user?.userType}</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </Card>

      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : (
        <>
          <Card containerStyle={styles.scheduleCard}>
            <Text style={styles.myScheduleText}>My Schedule</Text>

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
          </Card>
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
});
