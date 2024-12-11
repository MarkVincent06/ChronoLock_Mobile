import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "@rneui/themed";
import { useUserContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import API_URL from "../../config/ngrok-api"; // Adjust the path as needed

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
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]); // State for schedules with proper type
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]); // State for filtered schedules with proper type
  const [currentDate, setCurrentDate] = useState<string>("");

  // Fetch schedule data
  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      try {
        // Fetch the schedule data from the API
        const response = await fetch(`${API_URL}/schedules/schedules`);

        // Check if the response is okay
        if (!response.ok) {
          throw new Error("Failed to fetch schedules");
        }

        const data = await response.json();
        setSchedules(data.data); // Assuming 'data' contains the schedule data

        // Retrieve the idnumber from AsyncStorage
        const storedIdNumber = await AsyncStorage.getItem("idNumber");
        console.log("Stored idNumber in AsyncStorage:", storedIdNumber); // Log the stored idNumber

        // Filter schedules based on the stored idnumber
        if (storedIdNumber) {
          const filtered = data.data.filter(
            (schedule: Schedule) => schedule.userID === storedIdNumber // Type-safe filtering
          );
          setFilteredSchedules(filtered); // Update the filteredSchedules state
          
          // Log the filtered schedules
          console.log("Filtered Schedules:", filtered);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();

    // Update the current date and time every minute
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDate(date.toLocaleString()); // Set the current date and time
    }, 60000); // 60000ms = 1 minute

    // Initial call to set the current time immediately
    setCurrentDate(new Date().toLocaleString());

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Card containerStyle={styles.welcomeCard}>
        <Card.Title style={styles.welcomeText}>
          Welcome, {user?.firstName}!
        </Card.Title>
        <Text style={styles.userTypeText}>{user?.userType}</Text>
        {/* Display current time and date under faculty text */}
        <Text style={styles.dateText}>{currentDate}</Text>
      </Card>

      {/* Loading Indicator */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" style={styles.loader} />
      ) : (
        <>
          {/* My Schedule Section inside a single Card */}
          <Card containerStyle={styles.scheduleCard}>
            <Text style={styles.myScheduleText}>My Schedule</Text>

            {/* Display filtered schedule data */}
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <View key={schedule.scheduleID} style={styles.card}>
                  <Text style={styles.cardTitle}>{schedule.courseName}</Text>
                  <Text style={styles.cardSubtitle}>Code: {schedule.courseCode}</Text>
                  <Text style={styles.cardDetails}>
                    Instructor: {schedule.instFirstName} {schedule.instLastName}
                  </Text>
                  <Text style={styles.cardDetails}>
                    Section: {schedule.section} | Time: {schedule.startTime} - {schedule.endTime}
                  </Text>
                  <Text style={styles.cardDetails}>
                    Program: {schedule.program} | Year: {schedule.year}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No schedules found for this user.</Text>
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
    backgroundColor: "#f4f7fc", // Soft background color
    paddingBottom: 100,
  },
  welcomeCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 2,
    backgroundColor: "#3d85c6",
    shadowColor: "#000", // Soft shadow
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
