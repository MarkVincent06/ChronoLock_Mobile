import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [academicTerm, setAcademicTerm] = useState<string | null>(null);

  const [sectionsHandled, setSectionsHandled] = useState(0);
  const [totalChats, setTotalChats] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [todayScheduleCount, setTodayScheduleCount] = useState(0);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [ongoingSchedule, setOngoingSchedule] = useState<any | null>(null);

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

  // Unified refetch function for pull-to-refresh
  const fetchAll = async () => {
    if (!(user?.idNumber && user.userType === "Faculty")) return;
    try {
      // academic term
      const termResp = await axios.get(`${API_URL}/schedules/academic-term`);
      if (termResp.data?.data) {
        const { schoolYear, semester } = termResp.data.data;
        setAcademicTerm(`SY ${schoolYear} | ${semester}`);
      }
      // chats handled
      const chatsResp = await axios.get(
        `${API_URL}/groups/fetchFilteredGroups/${user.idNumber}`
      );
      setTotalChats(chatsResp.data?.length || 0);
      // sections handled
      const sectResp = await axios.get(
        `${API_URL}/schedules/user-classes/${user.idNumber}`
      );
      setSectionsHandled(sectResp.data?.data?.length || 0);
      // total students
      const studResp = await axios.get(
        `${API_URL}/student-masterlists/faculty/${user.idNumber}/total-students`
      );
      setTotalStudents(studResp.data?.totalStudents || 0);
      // today's schedule
      const todayResp = await axios.get(
        `${API_URL}/schedules/user-classes/today/${user.idNumber}`
      );
      const list = todayResp.data?.data || [];
      setTodayScheduleCount(list.length || 0);
      setTodaySchedule(list.length > 0 ? list : []);
    } catch (err) {
      // keep silent; individual errors are already logged in effect
    } finally {
      setIsLoading(false);
    }
  };

  const { refreshing, onRefresh } = usePullToRefresh(fetchAll);

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
          console.log("Failed to fetch chats handled:", error);
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
            console.log("Failed to fetch academic term:", error.message);
          } else {
            console.log("Failed to fetch academic term:", error);
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
          console.log("Failed to fetch sections handled:", error);
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
          console.log("Failed to fetch total students handled:", error);
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
          console.log("Failed to fetch sections handled:", error);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchOngoingSchedule = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/schedules/ongoing/today`
          );
          if (response.data && response.data.success) {
            setOngoingSchedule(response.data.data);
          } else {
            setOngoingSchedule(null);
          }
        } catch (error: any) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            setOngoingSchedule(null);
          } else {
            console.log(
              "Failed to fetch ongoing schedule:",
              error?.message || error
            );
          }
        }
      };

      if (user?.idNumber) {
        fetchAcademicTerm();
        fetchChatsHandled();
        fetchSectionsHandled();
        fetchTotalStudents();
        fetchTodaySchedule();
        fetchOngoingSchedule();
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
                      {schedule.instructorFirstName}{" "}
                      {schedule.instructorLastName}
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

                    {ongoingSchedule &&
                      ongoingSchedule.scheduleID === schedule.scheduleID && (
                        <View style={styles.ongoingActionsRow}>
                          <View style={styles.sectionPill}>
                            <Text style={styles.sectionPillText}>
                              {`${ongoingSchedule.program} ${ongoingSchedule.year}${ongoingSchedule.section}`}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.takeAttendanceButton}
                            onPress={() => {
                              const sectionInfo = {
                                courseName: ongoingSchedule.courseName,
                                program: ongoingSchedule.program,
                                year: ongoingSchedule.year,
                                section: ongoingSchedule.section,
                              };

                              router.push({
                                pathname:
                                  "/(faculty)/laboratory/section-folder/record-attendance",
                                params: {
                                  scheduleID: `${schedule.scheduleID}`,
                                  classID: `${
                                    schedule.classID ?? ongoingSchedule.classID
                                  }`,
                                  section: JSON.stringify(sectionInfo),
                                },
                              });
                            }}
                          >
                            <Text style={styles.takeAttendanceButtonText}>
                              Take Attendance
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
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
    position: "relative",
  },
  ongoingActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
  },
  sectionPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  sectionPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },
  takeAttendanceButton: {
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  takeAttendanceButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
  fallbackText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    paddingVertical: 20,
  },
});
