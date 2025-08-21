import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import { useUserContext } from "@/context/UserContext";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import { router } from "expo-router";
import Ion from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";

interface ClassItem {
  scheduleID: number;
  classID: number; // Added classID from backend
  courseCode: string;
  courseName: string;
  schoolYear: string | null;
  semester: string;
  program: string;
  year: string;
  section: string;
  day: string;
  startTime: string;
  endTime: string;
  avatar?: string; // Added avatar from backend
}

// Type assertion to fix TypeScript compatibility issues
const Ionicons = Ion as any;

const ClassList = () => {
  const { user } = useUserContext();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [studentCountData, setStudentCountData] = useState({
    totalStudents: 0,
    regular: 0,
    irregular: 0,
    drop: 0,
  });
  const [loadingCount, setLoadingCount] = useState(false);

  const fetchClasses = useCallback(async () => {
    if (user?.idNumber && user.userType === "Faculty") {
      try {
        const response = await axios.get(
          `${API_URL}/schedules/user-classes/${user?.idNumber}`
        );
        const data: ClassItem[] = response.data.data;
        setClasses(data);
        // Always prioritize ongoing classes on fresh data
        setFilteredClasses(sortByOngoingFirst(data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to fetch classes:", error.message);
        } else {
          console.error("Failed to fetch classes:", error);
        }
      }
    }
  }, [user?.idNumber]);

  const { refreshing, onRefresh } = usePullToRefresh(fetchClasses);

  useEffect(() => {
    setLoading(true);
    fetchClasses()
      .then(() => {
        // After initial fetch, ensure ongoing classes are prioritized
        setFilteredClasses((prev) =>
          prev.length ? sortByOngoingFirst(prev) : prev
        );
      })
      .finally(() => setLoading(false));
  }, [fetchClasses]);

  // Determine if a class is ongoing based on current day and time
  const isClassOngoing = (item: ClassItem): boolean => {
    if (!item?.day || !item?.startTime || !item?.endTime) return false;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const now = new Date();
    const currentDayName = days[now.getDay()];
    if ((item.day || "").toLowerCase() !== currentDayName.toLowerCase()) {
      return false;
    }
    const toMinutes = (t: string) => {
      const [hh, mm] = t.split(":");
      const hours = parseInt(hh, 10);
      const minutes = parseInt(mm || "0", 10);
      return hours * 60 + minutes;
    };
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const start = toMinutes(item.startTime);
    const end = toMinutes(item.endTime);
    return nowMinutes >= start && nowMinutes <= end;
  };

  const sortByOngoingFirst = (list: ClassItem[]): ClassItem[] => {
    const withFlag = list.map(
      (c) => ({ ...c, __ongoing: isClassOngoing(c) } as any)
    );
    withFlag.sort((a: any, b: any) => {
      if (a.__ongoing === b.__ongoing) return 0;
      return a.__ongoing ? -1 : 1;
    });
    return withFlag.map(({ __ongoing, ...rest }: any) => rest as ClassItem);
  };

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredClasses(sortByOngoingFirst(classes));
    } else {
      const filtered = classes.filter(
        (item) =>
          item.courseName.toLowerCase().includes(query.toLowerCase()) ||
          item.courseCode.toLowerCase().includes(query.toLowerCase()) ||
          item.program.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClasses(sortByOngoingFirst(filtered));
    }
  };

  const handleMoreDetails = async (item: ClassItem) => {
    setSelectedClass(item);
    setModalVisible(true);
    setLoadingCount(true);

    try {
      const response = await axios.get(
        `${API_URL}/class-list/students-count/${item.classID}`
      );
      if (response.data.success) {
        setStudentCountData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching student count:", error);
    } finally {
      setLoadingCount(false);
    }
  };

  const handleAttendance = (item: ClassItem) => {
    const section = {
      courseName: item.courseName,
      program: item.program,
      year: item.year,
      section: item.section,
    };

    router.push({
      pathname: "/laboratory/section-folder/attendances",
      params: {
        scheduleID: item.scheduleID,
        section: JSON.stringify(section),
      },
    });
  };

  const handleStudentList = (item: ClassItem) => {
    const section = {
      courseName: item.courseName,
      program: item.program,
      year: item.year,
      section: item.section,
    };

    router.push({
      pathname: "/laboratory/section-folder/student-list",
      params: {
        classID: item.classID,
        section: JSON.stringify(section),
      },
    });
  };

  const handleTakeAttendance = (item: ClassItem) => {
    const section = {
      courseName: item.courseName,
      program: item.program,
      year: item.year,
      section: item.section,
    };

    router.push({
      pathname: "/laboratory/section-folder/record-attendance",
      params: {
        scheduleID: item.scheduleID.toString(),
        classID: item.classID,
        section: JSON.stringify(section),
      },
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredClasses(classes);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(faculty)/laboratory")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Sections Handled</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search classes, courses, programs..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        {filteredClasses.length !== classes.length && (
          <Text style={styles.searchResult}>
            {filteredClasses.length} of {classes.length} classes
          </Text>
        )}
      </View>

      {/* Class List */}
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.scheduleID.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.classCard}>
            {/* Class Header */}
            <View style={styles.classHeader}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseCode}>{item.courseCode}</Text>
                <TouchableOpacity
                  onPress={() => handleMoreDetails(item)}
                  style={styles.moreButton}
                >
                  <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Class Details */}
            <View style={styles.classContent}>
              <Text style={styles.courseName}>{item.courseName}</Text>

              {isClassOngoing(item) && (
                <View style={styles.ongoingBanner}>
                  <Text style={styles.ongoingText}>Class is ongoing</Text>
                  <TouchableOpacity
                    style={styles.ongoingButton}
                    onPress={() => handleTakeAttendance(item)}
                  >
                    <Ionicons name="checkmark-circle" size={16} color="#fff" />
                    <Text style={styles.ongoingButtonText}>
                      Take Attendance
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {item.schoolYear} • {item.semester}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="school-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {item.program} - {item.year}
                  {item.section}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {item.day} • {formatTime(item.startTime)} -{" "}
                  {formatTime(item.endTime)}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.attendanceButton]}
                onPress={() => handleAttendance(item)}
              >
                <Ionicons name="document-text-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Attendance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.studentListButton]}
                onPress={() => handleStudentList(item)}
              >
                <Ionicons name="people-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Student List</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="school-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No classes found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? "Try adjusting your search terms"
                : "You don't have any classes assigned yet"}
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4caf50"]}
            tintColor="#4caf50"
          />
        }
        contentContainerStyle={styles.listContainer}
      />

      {/* Student Count Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {selectedClass
              ? `${selectedClass.courseCode} - ${selectedClass.courseName}`
              : "Class Details"}
          </Text>

          {loadingCount ? (
            <ActivityIndicator size="large" color="#4caf50" />
          ) : (
            <View style={styles.countContainer}>
              {studentCountData.totalStudents === 0 ? (
                <View style={styles.noStudentsContainer}>
                  <Ionicons name="people-outline" size={48} color="#ccc" />
                  <Text style={styles.noStudentsText}>
                    No students enrolled yet
                  </Text>
                  <Text style={styles.noStudentsSubtext}>
                    Students will appear here once they enroll in this class
                  </Text>
                </View>
              ) : (
                <>
                  <View style={styles.countItem}>
                    <Text style={styles.countLabel}>Total Students</Text>
                    <Text style={styles.countValue}>
                      {studentCountData.totalStudents}
                    </Text>
                  </View>
                  <View style={styles.countItem}>
                    <Text style={styles.countLabel}>Regular</Text>
                    <Text style={[styles.countValue, styles.regularColor]}>
                      {studentCountData.regular}
                    </Text>
                  </View>
                  <View style={styles.countItem}>
                    <Text style={styles.countLabel}>Irregular</Text>
                    <Text style={[styles.countValue, styles.irregularColor]}>
                      {studentCountData.irregular}
                    </Text>
                  </View>
                  <View style={styles.countItem}>
                    <Text style={styles.countLabel}>Drop</Text>
                    <Text style={[styles.countValue, styles.dropColor]}>
                      {studentCountData.drop}
                    </Text>
                  </View>
                </>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ClassList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 10,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e5e9",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  searchResult: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  listContainer: {
    padding: 16,
  },
  classCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  ongoingBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF3C7",
    borderColor: "#F59E0B",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  ongoingText: {
    color: "#92400E",
    fontSize: 13,
    fontWeight: "600",
  },
  ongoingButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#10B981",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  ongoingButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 6,
  },
  classHeader: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  courseInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  moreButton: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  classContent: {
    padding: 16,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  actionContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  attendanceButton: {
    backgroundColor: "#2196f3",
  },
  studentListButton: {
    backgroundColor: "#ff9800",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  countContainer: {
    marginBottom: 20,
  },
  countItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  countLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  countValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  regularColor: {
    color: "#4caf50",
  },
  irregularColor: {
    color: "#ff9800",
  },
  dropColor: {
    color: "#f44336",
  },
  closeButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  noStudentsContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noStudentsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 10,
  },
  noStudentsSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 5,
  },
});
