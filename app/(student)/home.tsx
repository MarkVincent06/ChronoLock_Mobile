import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import usePullToRefresh from "@/hooks/usePullToRefresh";

const Home = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [academicTerm, setAcademicTerm] = useState<string | null>(null);
  const [attendanceSummary, setAttendanceSummary] = useState({
    presents: 0,
    absents: 0,
    lates: 0,
  });
  const [enrolledCourses, setEnrolledCourses] = useState<number | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<
    {
      day: string;
      instFirstName: string;
      instLastName: string;
      courseName: string;
      courseCode: string;
      startTime: string;
      endTime: string;
      avatar: string;
    }[]
  >([]);
  const [upcomingSchedule, setUpcomingSchedule] = useState<
    {
      day: string;
      instFirstName: string;
      instLastName: string;
      courseName: string;
      courseCode: string;
      startTime: string;
      endTime: string;
      avatar: string;
    }[]
  >([]);

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

  const parseTimeToMinutes = (time: string) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const getScheduleStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const start = parseTimeToMinutes(startTime);
    const end = parseTimeToMinutes(endTime);

    if (nowMinutes < start) return "Upcoming";
    if (nowMinutes >= start && nowMinutes <= end) return "Ongoing";
    return "Ended";
  };

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Ongoing":
        return styles.statusBadgeOngoing;
      case "Upcoming":
        return styles.statusBadgeUpcoming;
      case "Ended":
      default:
        return styles.statusBadgeEnded;
    }
  };

  // Function to fetch all necessary data
  const fetchData = async () => {
    try {
      if (user?.idNumber && user.userType === "Student") {
        const fetchAcademicTerm = async () => {
          try {
            const response = await axios.get(
              `${API_URL}/schedules/academic-term`
            );
            const { schoolYear, semester } = response.data.data;
            setAcademicTerm(`SY ${schoolYear} | ${semester}`);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log("Failed to fetch academic term:", error);
            } else {
              console.log("Failed to fetch academic term:", error);
            }
          }
        };

        const fetchAttendanceSummary = async () => {
          const response = await axios.get(
            `${API_URL}/attendances/users/${user.idNumber}/attendance-summary`
          );
          setAttendanceSummary(response.data.data);
        };

        const fetchEnrolledCourses = async () => {
          const response = await axios.get(
            `${API_URL}/student-masterlists/user-classes/student/${user.idNumber}`
          );
          setEnrolledCourses(response.data.data.enrolledCourses);
        };

        const fetchTodaySchedules = async () => {
          const response = await axios.get(
            `${API_URL}/schedules/user-classes/today-schedule/student/${user.idNumber}`
          );
          setTodaySchedule(response.data?.data);
        };

        const fetchUpcomingSchedules = async () => {
          const response = await axios.get(
            `${API_URL}/schedules/user-classes/upcoming-schedule/student/${user.idNumber}`
          );
          setUpcomingSchedule(response.data?.data);
        };
        await Promise.all([
          fetchAcademicTerm(),
          fetchAttendanceSummary(),
          fetchEnrolledCourses(),
          fetchTodaySchedules(),
          fetchUpcomingSchedules(),
        ]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Use the pull-to-refresh hook
  const { refreshing, onRefresh } = usePullToRefresh(fetchData);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [user]);

  const cardData: {
    title: string;
    data: string;
    icon:
      | "book-open-page-variant-outline"
      | "account-remove-outline"
      | "account-star-outline"
      | "account-minus-outline";
  }[] = [
    {
      title: "Enrolled Course",
      data: isLoading ? "Loading..." : enrolledCourses?.toString() || "0",
      icon: "book-open-page-variant-outline",
    },
    {
      title: "Presents",
      data: isLoading
        ? "Loading..."
        : attendanceSummary.presents.toString() || "N/A",
      icon: "account-star-outline",
    },
    {
      title: "Absents",
      data: isLoading
        ? "Loading..."
        : attendanceSummary.absents.toString() || "N/A",
      icon: "account-remove-outline",
    },
    {
      title: "Lates",
      data: isLoading
        ? "Loading..."
        : attendanceSummary.lates.toString() || "N/A",
      icon: "account-minus-outline",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
                size={28}
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

      <Text style={styles.scheduleHeader}>Today's Class Schedule</Text>

      <Card style={styles.scheduleCard}>
        <Card.Content>
          {todaySchedule.length > 0 ? (
            todaySchedule.map((schedule, index) => (
              <View key={index}>
                <View style={styles.scheduleItem}>
                  {/* Status Badge */}
                  {(() => {
                    const status = getScheduleStatus(
                      schedule.startTime,
                      schedule.endTime
                    );
                    return (
                      <View style={[styles.statusBadge, getBadgeStyle(status)]}>
                        <Text style={styles.statusBadgeText}>{status}</Text>
                      </View>
                    );
                  })()}
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
                      {schedule.instFirstName} {schedule.instLastName}
                    </Text>
                    <Text style={styles.boldText}>Course:</Text>
                    <Text style={styles.normalText}>
                      {schedule.courseCode} - {schedule.courseName}
                    </Text>
                    <Text style={styles.boldText}>Day:</Text>
                    <Text style={styles.normalText}>{schedule.day}</Text>
                    <Text style={styles.boldText}>Time:</Text>
                    <Text style={styles.normalText}>
                      {formatTime(schedule.startTime)} -{" "}
                      {formatTime(schedule.endTime)}
                    </Text>
                  </View>
                </View>
                {index < todaySchedule.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noScheduleText}>
              No class schedule for today.
            </Text>
          )}
        </Card.Content>
      </Card>

      {upcomingSchedule.length > 0 && (
        <>
          <Text style={styles.scheduleHeader}>Upcoming Class Schedule</Text>
          <Card style={styles.scheduleCard}>
            <Card.Content>
              {upcomingSchedule.map((schedule, index) => (
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
                        {schedule.instFirstName} {schedule.instLastName}
                      </Text>
                      <Text style={styles.boldText}>Course:</Text>
                      <Text style={styles.normalText}>
                        {schedule.courseCode} - {schedule.courseName}
                      </Text>
                      <Text style={styles.boldText}>Day:</Text>
                      <Text style={styles.normalText}>{schedule.day}</Text>
                      <Text style={styles.boldText}>Time:</Text>
                      <Text style={styles.normalText}>
                        {formatTime(schedule.startTime)} -{" "}
                        {formatTime(schedule.endTime)}
                      </Text>
                    </View>
                  </View>
                  {index < upcomingSchedule.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>
        </>
      )}
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
    textAlign: "center",
  },
  userTypeText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  placeholderData: {
    fontSize: 14,
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
    position: "relative",
  },
  statusBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  statusBadgeOngoing: {
    backgroundColor: "#10B981", // green
  },
  statusBadgeUpcoming: {
    backgroundColor: "#3B82F6", // blue
  },
  statusBadgeEnded: {
    backgroundColor: "#6B7280", // gray
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
  noScheduleText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 16,
  },
});
