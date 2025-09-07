import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
  Alert,
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

interface AvailableCourse {
  classID: number;
  scheduleID: number;
  instructorName: string;
  instructorAvatar: string;
  courseName: string;
  courseCode: string;
  program: string;
  yearSection: string;
  day: string;
  time: string;
}

const StudentCourse = () => {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState<"courses" | "enroll">("courses");
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [availableCourses, setAvailableCourses] = useState<AvailableCourse[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<AvailableCourse | null>(
    null
  );
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [enrolling, setEnrolling] = useState(false);
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

  const fetchAvailableCourses = useCallback(async () => {
    if (!user?.idNumber) return;

    setEnrollLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/class-list/available/${user.idNumber}`
      );
      if (response.data.success) {
        setAvailableCourses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching available courses:", error);
    } finally {
      setEnrollLoading(false);
    }
  }, [user?.idNumber]);

  const { refreshing, onRefresh } = usePullToRefresh(fetchEnrolledCourses);
  const { refreshing: enrollRefreshing, onRefresh: onEnrollRefresh } =
    usePullToRefresh(fetchAvailableCourses);

  useEffect(() => {
    if (activeTab === "courses") {
      fetchEnrolledCourses();
    } else if (activeTab === "enroll") {
      fetchAvailableCourses();
    }
  }, [activeTab, fetchEnrolledCourses, fetchAvailableCourses]);

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

  const formatTimeRange = (timeRange: string) => {
    const [startTime, endTime] = timeRange.split(" - ");
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  const handleEnrollCourse = (course: AvailableCourse) => {
    setSelectedCourse(course);
    setEnrollmentKey("");
    setEnrollModalVisible(true);
  };

  const handleEnrollmentSubmit = async () => {
    if (!selectedCourse || !enrollmentKey.trim()) {
      Alert.alert("Error", "Please enter an enrollment key.");
      return;
    }

    if (!user?.idNumber) {
      Alert.alert("Error", "User information not found.");
      return;
    }

    setEnrolling(true);
    try {
      const response = await axios.post(
        `${API_URL}/student-masterlists/enroll`,
        {
          userID: user.idNumber,
          classID: selectedCourse.classID,
          enrollmentKey: enrollmentKey.trim(),
        }
      );

      if (response.data.success) {
        Alert.alert("Success", response.data.message, [
          {
            text: "OK",
            onPress: () => {
              setEnrollModalVisible(false);
              setEnrollmentKey("");
              setSelectedCourse(null);
              // Refetch available courses after successful enrollment
              fetchAvailableCourses();
            },
          },
        ]);
      }
    } catch (error: any) {
      console.log("Enrollment error:", error);

      let errorMessage = "An error occurred while enrolling.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "Missing required information.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid enrollment key.";
      } else if (error.response?.status === 404) {
        errorMessage = "Class not found.";
      } else if (error.response?.status === 409) {
        errorMessage = "You are already enrolled in this course.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }

      Alert.alert("Enrollment Failed", errorMessage);
    } finally {
      setEnrolling(false);
    }
  };

  const closeEnrollModal = () => {
    setEnrollModalVisible(false);
    setEnrollmentKey("");
    setSelectedCourse(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredEnrolledCourses = enrolledCourses.filter((course) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      course.courseName.toLowerCase().includes(searchLower) ||
      course.courseCode.toLowerCase().includes(searchLower) ||
      `${course.instFirstName} ${course.instLastName}`
        .toLowerCase()
        .includes(searchLower)
    );
  });

  const filteredAvailableCourses = availableCourses.filter((course) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      course.courseName.toLowerCase().includes(searchLower) ||
      course.courseCode.toLowerCase().includes(searchLower) ||
      course.instructorName.toLowerCase().includes(searchLower)
    );
  });

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

  const renderAvailableCourseCard = ({
    item,
    index,
  }: {
    item: AvailableCourse;
    index: number;
  }) => (
    <View style={styles.courseCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              item.instructorAvatar
                ? {
                    uri: item.instructorAvatar.startsWith("http")
                      ? item.instructorAvatar
                      : `${API_URL}${item.instructorAvatar}`,
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
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Icon name="user" size={14} color="#666" />
          <Text style={styles.detailText}>{item.instructorName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="clock-o" size={14} color="#666" />
          <Text style={styles.detailText}>{formatTimeRange(item.time)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="calendar" size={14} color="#666" />
          <Text style={styles.detailText}>{item.day}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="graduation-cap" size={14} color="#666" />
          <Text style={styles.detailText}>
            {item.program} - {item.yearSection}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.enrollButton}
        onPress={() => handleEnrollCourse(item)}
      >
        <Text style={styles.enrollButtonText}>Enroll Course</Text>
      </TouchableOpacity>
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search courses and instructors..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
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
              data={filteredEnrolledCourses}
              keyExtractor={(item) => item.scheduleID.toString()}
              renderItem={renderCourseCard}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Icon name="book" size={48} color="#ccc" />
                  <Text style={styles.emptyText}>
                    {searchQuery
                      ? "No courses found matching your search"
                      : "No enrolled courses found"}
                  </Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
          )
        ) : enrollLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>Loading available courses...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAvailableCourses}
            keyExtractor={(item) => `${item.classID}-${item.scheduleID}`}
            renderItem={renderAvailableCourseCard}
            refreshControl={
              <RefreshControl
                refreshing={enrollRefreshing}
                onRefresh={onEnrollRefresh}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Icon name="plus-circle" size={48} color="#ccc" />
                <Text style={styles.emptyText}>
                  {searchQuery
                    ? "No courses found matching your search"
                    : "No available courses found"}
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>

      {/* Enrollment Modal */}
      <Modal
        visible={enrollModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeEnrollModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enroll in Course</Text>
              <TouchableOpacity
                onPress={closeEnrollModal}
                style={styles.modalCloseButton}
              >
                <Icon name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedCourse && (
              <View style={styles.modalCourseInfo}>
                <Text style={styles.courseInfoTitle}>
                  {selectedCourse.courseCode} - {selectedCourse.courseName}
                </Text>
                <Text style={styles.courseInfoInstructor}>
                  Instructor: {selectedCourse.instructorName}
                </Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Enrollment Key</Text>
              <TextInput
                style={styles.enrollmentInput}
                placeholder="Enter enrollment key"
                placeholderTextColor="#999"
                value={enrollmentKey}
                onChangeText={setEnrollmentKey}
                autoCapitalize="characters"
                autoCorrect={false}
                secureTextEntry={false}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeEnrollModal}
                disabled={enrolling}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleEnrollmentSubmit}
                disabled={enrolling}
              >
                {enrolling ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Enroll</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StudentCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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
    paddingVertical: 8,
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
  enrollButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  enrollButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    position: "relative",
    marginBottom: 20,
  },
  searchBar: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 45,
    paddingVertical: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    paddingLeft: 40,
    color: "#333",
  },
  searchIcon: {
    position: "absolute",
    left: 15,
    top: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalCloseButton: {
    padding: 5,
  },
  modalCourseInfo: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  courseInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  courseInfoInstructor: {
    fontSize: 14,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  enrollmentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: "#007bff",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
