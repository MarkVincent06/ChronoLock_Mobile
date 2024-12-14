import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "@rneui/themed";
import { useUserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../config/ngrok-api";
import * as Notifications from "expo-notifications";

// Define the type for a schedule
interface Schedule {
  scheduleID: number;
  courseName: string;
  courseCode: string;
  instFirstName: string;
  instLastName: string;
  section: string;
  startTime: string;
  day: string;
  endTime: string;
  program: string;
  year: string;
  userID: string;
  startDate?: string; // Added startDate for notification scheduling
}

export default function Home() {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(""); // State for current date and time

  // Fetch schedule data and upcoming schedules
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Retrieve the idNumber from AsyncStorage
        const storedIdNumber = await AsyncStorage.getItem("idNumber");
        if (!storedIdNumber) {
          throw new Error("User ID number not found in storage.");
        }

        // Fetch all schedules
        const schedulesResponse = await fetch(`${API_URL}/schedules/schedules`);
        if (!schedulesResponse.ok) throw new Error("Failed to fetch schedules.");

        const schedulesData = await schedulesResponse.json();
        setSchedules(schedulesData.data);

        // Filter schedules for the current user
        const filtered = schedulesData.data.filter(
          (schedule: Schedule) => schedule.userID === storedIdNumber
        );
        setFilteredSchedules(filtered);

        // Fetch upcoming schedules from the API
        const upcomingResponse = await fetch(`${API_URL}/schedules/upcoming-schedules/${storedIdNumber}`);
        if (!upcomingResponse.ok) throw new Error("Failed to fetch upcoming schedules.");

        const upcomingData = await upcomingResponse.json();
        if (upcomingData.success) {
          setUpcomingSchedules(upcomingData.upcomingSchedules);
          // Schedule notifications for upcoming schedules
          scheduleNotifications(upcomingData.upcomingSchedules);
        } else {
          console.warn("No upcoming schedules found.");
        }

        // Fetch current time
        await fetchCurrentTime();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCurrentTime = async () => {
      try {
        // Fetch the current time from your API endpoint
        const response = await fetch(`${API_URL}/schedules/currentTime`);
        if (!response.ok) throw new Error("Failed to fetch current time.");

        const data = await response.json();
        if (data.success) {
          setCurrentDate(data.data.currentTime); // Set fetched time
        }
      } catch (error) {
        console.error("Error fetching current time:", error);
      }
    };

    fetchData();

    // Update current time every minute
    const interval = setInterval(fetchCurrentTime, 1000); // 60000 ms = 1 minute

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Schedule notifications
  const scheduleNotifications = async (upcomingSchedules: Schedule[]) => {
    try {
      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted.');
        return;
      }

      for (const schedule of upcomingSchedules) {
        if (!schedule.startDate || !schedule.startTime) {
          console.warn(`Schedule ID ${schedule.scheduleID} is missing startDate or startTime.`);
          continue;
        }

        // Combine startDate and startTime to create a Date object
        const startDateTime = new Date(`${schedule.startDate.split('T')[0]}T${schedule.startTime}`);

        // Set notification time 10 minutes before class start
        const notificationTime = new Date(startDateTime.getTime() - 10 * 60 * 1000);

        // Ensure notification time is in the future
        if (notificationTime > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `Upcoming Class: ${schedule.courseName}`,
              body: `Your class "${schedule.courseName}" starts at ${schedule.startTime}.`,
            },
            trigger: notificationTime,
          });
        } else {
          // console.warn(`Notification time for schedule ID ${schedule.scheduleID} is in the past.`);
        }
      }
    } catch (error) {
      console.error("Error scheduling notifications:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Card containerStyle={styles.welcomeCard}>
        <Card.Title style={styles.welcomeText}>
          Welcome, {user?.firstName}!
        </Card.Title>
        <Text style={styles.userTypeText}>{user?.userType}</Text>
        {/* Display fetched current time */}
        <Text style={styles.dateText}>
          {currentDate ? `Current Time: ${currentDate}` : "Loading current time..."}
        </Text>
      </Card>

      {/* Loading Indicator */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : (
        <>
          {/* My Schedule Section */}
          <Card containerStyle={styles.scheduleCard}>
            <Text style={styles.myScheduleText}>My Schedule</Text>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <View key={schedule.scheduleID} style={styles.card}>
                  <Text style={styles.cardTitle}>{schedule.courseName}</Text>
                  <Text style={styles.cardSubtitle}>Code: {schedule.courseCode}</Text>
                  <Text style={styles.cardDetails}>
                    Instructor: {schedule.instFirstName} {schedule.instLastName}
                  </Text>
                  <Text style={styles.cardDetails}>Day: {schedule.day}</Text>
                  <Text style={styles.cardDetails}>
                    Section: {schedule.section} | Time: {schedule.startTime} - {schedule.endTime}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No schedules found for this user.</Text>
            )}
          </Card>

          {/* Upcoming Schedule Section */}
          <Card containerStyle={styles.scheduleCard}>
            <Text style={styles.myScheduleText}>Upcoming Laboratory Schedule</Text>
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.map((schedule) => (
                <View key={schedule.scheduleID} style={styles.card}>
                  <Text style={styles.cardTitle}>{schedule.courseName}</Text>
                  <Text style={styles.cardSubtitle}>Code: {schedule.courseCode}</Text>
                  <Text style={styles.cardDetails}>
                    Instructor: {schedule.instFirstName} {schedule.instLastName}
                  </Text>
                  <Text style={styles.cardDetails}>Day: {schedule.day}</Text>
                  <Text style={styles.cardDetails}>
                    Section: {schedule.section} | Time: {schedule.startTime} - {schedule.endTime}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No upcoming schedules for the next day.</Text>
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
    padding: 15,
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3d85c6",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#333",
  },
  cardDetails: {
    fontSize: 14,
    color: "#555",
  },
  noScheduleText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});
