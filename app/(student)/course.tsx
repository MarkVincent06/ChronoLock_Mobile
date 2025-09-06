import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import usePullToRefresh from "@/hooks/usePullToRefresh";

interface EnrolledCourse {
  scheduleID: number;
  courseCode: string;
  courseName: string;
  userID: string;
  instFirstName: string;
  instLastName: string;
  program: string;
  section: string;
  year: string;
  semester: string;
  schoolYear: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  day: string;
  scheduleStatus: string;
  scheduleType: string;
  created_at: string;
  updated_at: string;
  status: string;
  avatar: string;
}

const StudentCourse = () => {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState<"courses" | "enroll">("courses");
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const Icon = FontAwesome as any;

  const headerTitle =
    activeTab === "courses" ? "Your Courses" : "Enroll Course";

  const fetchEnrolledCourses = useCallback(async () => {
    if (!user?.idNumber) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/student-masterlists/enrolled-classes/student/${user.idNumber}`
      );
      if (response.data.success) {
        setEnrolledCourses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.idNumber]);

  const { refreshing, onRefresh } = usePullToRefresh(fetchEnrolledCourses);

  useEffect(() => {
    if (activeTab === "courses") {
      fetchEnrolledCourses();
    }
  }, [activeTab, fetchEnrolledCourses]);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    let hoursFormatted = date.getHours();
    const minutesFormatted = date.getMinutes();
    const ampm = hoursFormatted >= 12 ? "PM" : "AM";

    hoursFormatted = hoursFormatted % 12;
    hoursFormatted = hoursFormatted ? hoursFormatted : 12;

    const minutesString =
      minutesFormatted < 10
        ? `0${minutesFormatted}`
        : minutesFormatted.toString();

    return `${hoursFormatted}:${minutesString} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "regular":
        return "#4caf50";
      case "irregular":
        return "#ff9800";
      case "dropped":
        return "#f44336";
      default:
        return "#2196f3";
    }
  };

  const renderCourseCard = ({
    item,
    index,
  }: {
    item: EnrolledCourse;
    index: number;
  }) => (
    <View style={styles.courseCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              item.avatar
                ? {
                    uri: item.avatar.startsWith("http")
                      ? item.avatar
                      : `${API_URL}${item.avatar}`,
                  }
                : require("@/assets/images/default_avatar.png")
            }
            style={styles.avatar}
          />
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseNumber}>#{index + 1}</Text>
          <Text style={styles.course}>
            {item.courseCode} - {item.courseName}
          </Text>
          {/* <Text style={styles.courseCode}>{item.courseCode}</Text> */}
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Icon name="user" size={14} color="#666" />
          <Text style={styles.detailText}>
            {item.instFirstName} {item.instLastName}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clock-o" size={14} color="#666" />
          <Text style={styles.detailText}>
            {formatTime(item.startTime)} - {formatTime(item.endTime)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="calendar" size={14} color="#666" />
          <Text style={styles.detailText}>{item.day}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="graduation-cap" size={14} color="#666" />
          <Text style={styles.detailText}>
            {item.program} - {item.year}
            {item.section}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{headerTitle}</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "courses" && styles.activeToggle,
          ]}
          onPress={() => setActiveTab("courses")}
        >
          <Icon
            name="book"
            size={16}
            color={activeTab === "courses" ? "#fff" : "#333"}
          />
          <Text
            style={[
              styles.toggleText,
              activeTab === "courses" && styles.activeToggleText,
            ]}
          >
            Courses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "enroll" && styles.activeToggle,
          ]}
          onPress={() => setActiveTab("enroll")}
        >
          <Icon
            name="plus-circle"
            size={16}
            color={activeTab === "enroll" ? "#fff" : "#333"}
          />
          <Text
            style={[
              styles.toggleText,
              activeTab === "enroll" && styles.activeToggleText,
            ]}
          >
            Enroll
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body Content */}
      <View style={styles.bodyContainer}>
        {activeTab === "courses" ? (
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007bff" />
              <Text style={styles.loadingText}>Loading your courses...</Text>
            </View>
          ) : (
            <FlatList
              data={enrolledCourses}
              keyExtractor={(item) => item.scheduleID.toString()}
              renderItem={renderCourseCard}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Icon name="book" size={48} color="#ccc" />
                  <Text style={styles.emptyText}>
                    No enrolled courses found
                  </Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
          )
        ) : (
          <Text style={styles.bodyText}>Enroll course</Text>
        )}
      </View>
    </View>
  );
};

export default StudentCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    gap: 8,
  },
  activeToggle: {
    backgroundColor: "#007bff",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  activeToggleText: {
    color: "#fff",
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  bodyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  courseInfo: {
    flex: 1,
  },
  courseNumber: {
    fontSize: 12,
    color: "#007bff",
    fontWeight: "600",
    marginBottom: 4,
  },
  course: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  cardDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
    textAlign: "center",
  },
});
