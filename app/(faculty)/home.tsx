import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import API_URL from "@/config/ngrok-api";

const Home = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [academicTerm, setAcademicTerm] = useState<string | null>(null);

  const [sectionsHandled, setSectionsHandled] = useState(0);
  const [totalChats, setTotalChats] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [todayScheduleCount, setTodayScheduleCount] = useState(0);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);

  const formatTime = (timeString: string) => {
    // Manually parse the time string as local time by creating a Date object
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set the time without time zone conversion

    let hoursFormatted = date.getHours();
    const minutesFormatted = date.getMinutes();
    const ampm = hoursFormatted >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hoursFormatted = hoursFormatted % 12;
    hoursFormatted = hoursFormatted ? hoursFormatted : 12; // Handle 12 as '12' instead of '0'

    const minutesString =
      minutesFormatted < 10
        ? `0${minutesFormatted}`
        : minutesFormatted.toString();

    return `${hoursFormatted}:${minutesString} ${ampm}`;
  };

  useEffect(() => {
    if (user?.idNumber && user.userType === "Faculty") {
      const fetchChatsHandled = async () => {
        try {
          if (user?.idNumber) {
            const response = await axios.get(
              `${API_URL}/groups/fetchFilteredGroups/${user.idNumber}`
            );
            setTotalChats(response.data.length); // Count the total groups (chats)
          }
        } catch (error) {
          // console.error("Failed to fetch chats handled:", error);
        }
      };

      const fetchAcademicTerm = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/schedules/academic-term`
          );
          const { schoolYear, semester } = response.data.data;
          setAcademicTerm(`SY ${schoolYear} | ${semester}`);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Failed to fetch academic term:", error.message);
          } else {
            console.error("Failed to fetch academic term:", error);
          }
        }
      };

      const fetchSectionsHandled = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${API_URL}/schedules/user-classes/${user?.idNumber}`
          );
          const sectionsCount = response.data.data.length;
          setSectionsHandled(sectionsCount);
        } catch (error) {
          // console.error("Failed to fetch sections handled:", error);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchTotalStudents = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${API_URL}/student-masterlists/faculty/${user?.idNumber}/total-students`
          );
          setTotalStudents(response.data.totalStudents);
        } catch (error) {
          // console.error("Failed to fetch total students handled:", error);
        }
      };

      const fetchTodaySchedule = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${API_URL}/schedules/user-classes/today/${user?.idNumber}`
          );

          setTodayScheduleCount(response.data.data.length);

          setTodaySchedule(
            response.data.data.length > 0 ? response.data.data : null
          );
        } catch (error) {
          // console.error("Failed to fetch sections handled:", error);
        } finally {
          setIsLoading(false);
        }
      };

      if (user?.idNumber) {
        fetchAcademicTerm();
        fetchChatsHandled();
        fetchSectionsHandled();
        fetchTotalStudents();
        fetchTodaySchedule();
      }
    }
  }, [user?.idNumber]);

  // Card data
  type IconName =
    | "account-group"
    | "wechat"
    | "account-check-outline"
    | "calendar-clock";

  const cardData: { title: string; data: string; icon: IconName }[] = [
    {
      title: "Sections Handled",
      data: isLoading
        ? "Loading..."
        : `${sectionsHandled} ${
            sectionsHandled !== 1 ? "Sections" : "Section"
          }` || "N/A",
      icon: "account-group",
    },
    {
      title: "Chats Handled",
      data: isLoading
        ? "Loading..."
        : `${totalChats} ${totalChats !== 1 ? "Group Chats" : "Group Chat"}` ||
          "N/A",
      icon: "wechat",
    },
    {
      title: "Students Handled",
      data: isLoading
        ? "Loading..."
        : `${totalStudents} ${totalStudents !== 1 ? "Students" : "Student"}` ||
          "N/A",
      icon: "account-check-outline",
    },
    {
      title: "Today's Schedule",
      data: isLoading
        ? "Loading..."
        : `${todayScheduleCount} ${
            todayScheduleCount !== 1 ? "Classes" : "Class"
          }` || "N/A",
      icon: "calendar-clock",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Card */}
      <Card style={styles.welcomeCard}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.firstName || "User"}!
          </Text>
          <Text style={styles.userTypeText}>{user?.userType || "Unknown"}</Text>
          {academicTerm && (
            <Text style={styles.academicTermText}>{academicTerm}</Text>
          )}
        </Card.Content>
      </Card>

      {/* Grid of Small Cards */}
      <View style={styles.grid}>
        {cardData.map((item, index) => (
          <Card key={index} style={styles.smallCard}>
            <View style={styles.smallCardContent}>
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color="#555"
                style={styles.icon}
              />
              <View>
                <Text style={styles.placeholderTitle}>{item.title}</Text>
                <Text style={styles.placeholderData}>{item.data}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* My Today's Class Schedule Header */}
      <Text style={styles.scheduleHeader}>My Today's Class Schedule</Text>

      {/* Schedule Card */}
      <Card style={styles.scheduleCard}>
        <Card.Content>
          {isLoading ? (
            <Text>Loading Today's Classes...</Text> // Loading state
          ) : todaySchedule.length > 0 ? (
            todaySchedule.map((schedule, index) => (
              <View key={index}>
                <View style={styles.scheduleItem}>
                  <Text style={styles.scheduleIndex}>{index + 1}.</Text>
                  <Image
                    source={
                      schedule.avatar
                        ? {
                            uri: schedule.avatar.startsWith("http")
                              ? schedule.avatar
                              : `${API_URL}${schedule.avatar}`,
                          }
                        : require("@/assets/images/default_avatar.png")
                    }
                    style={styles.avatar}
                  />
                  <View style={styles.scheduleDetails}>
                    <Text style={styles.boldText}>Instructor:</Text>
                    <Text style={styles.normalText}>
                      {schedule.instructorFirstName}{" "}
                      {schedule.instructorLastName}
                    </Text>
                    <Text style={styles.boldText}>Course:</Text>
                    <Text style={styles.normalText}>
                      {schedule.courseCode} - {schedule.courseName}
                    </Text>
                    <Text style={styles.boldText}>Time:</Text>
                    <Text style={styles.normalText}>
                      {formatTime(schedule.startTime)} -{" "}
                      {formatTime(schedule.endTime)}
                    </Text>
                    <Text style={styles.boldText}>Day:</Text>
                    <Text style={styles.normalText}>{schedule.day}</Text>
                  </View>
                </View>
                {index < todaySchedule.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))
          ) : (
            <Text style={styles.fallbackText}>
              No classes scheduled for today.
            </Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  welcomeCard: {
    width: "100%",
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#ffffff",
    marginBottom: 16,
  },
  cardContent: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userTypeText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
  academicTermText: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  smallCard: {
    width: "48%",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#fff",
  },
  smallCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
  placeholderTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  placeholderData: {
    fontSize: 13,
    color: "#666",
  },
  scheduleHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  scheduleCard: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 30,
  },
  scheduleItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  scheduleIndex: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    color: "#333",
  },
  scheduleDetails: {
    flex: 1,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  normalText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  fallbackText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    paddingVertical: 20,
  },
});
