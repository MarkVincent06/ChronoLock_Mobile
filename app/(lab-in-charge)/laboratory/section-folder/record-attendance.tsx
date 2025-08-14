import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import axios from "axios";
import Ion from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams } from "expo-router";
import API_URL from "@/config/ngrok-api";
import usePullToRefresh from "@/hooks/usePullToRefresh";
// Type assertion to fix TypeScript compatibility issues
const Ionicons = Ion as any;

interface StudentRow {
  userID: string;
  name: string;
  status: string; // enrollment status e.g., Regular
  hasAttendanceToday: boolean;
  attendanceRemark: string | null; // Present | Late | Absent | null
  attendanceTime: string | null; // e.g., "07:15:00" | null
}

const RecordAttendance = () => {
  const router = useRouter();
  const { scheduleID } = useLocalSearchParams<{ scheduleID: string }>();
  const { classID } = useLocalSearchParams<{ classID: string }>();
  const { section: sectionString } = useLocalSearchParams<{
    section: string;
  }>();
  const section = sectionString ? JSON.parse(sectionString) : null;
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState<StudentRow[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const fetchStudents = async () => {
    if (!scheduleID) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/attendances/faculty/schedules/${scheduleID}/students-today`
      );
      const data: StudentRow[] = response.data?.data || [];
      setStudents(data);
      setFilteredStudents(data);
      setCurrentPage(1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching students:", error.message);
      } else {
        console.error("Error fetching students:", error);
      }
      Alert.alert("Error", "Failed to fetch list of students.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await fetchStudents();
  };
  const { refreshing, onRefresh } = usePullToRefresh(fetchData);

  useEffect(() => {
    if (scheduleID) {
      fetchStudents();
    }
  }, [scheduleID]);

  const formatTime = (time: string | null) => {
    if (!time) return "";
    const [hh, mm, ss] = time.split(":").map((v) => parseInt(v, 10));
    const date = new Date();
    date.setHours(hh, mm, isNaN(ss) ? 0 : ss, 0);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const getRemarkBadgeStyle = (remark: string | null) => {
    if (!remark) return [styles.badge, styles.badgeDefault];
    const r = remark.toLowerCase();
    if (r.includes("present")) return [styles.badge, styles.badgePresent];
    if (r.includes("late")) return [styles.badge, styles.badgeLate];
    if (r.includes("absent")) return [styles.badge, styles.badgeAbsent];
    return [styles.badge, styles.badgeDefault];
  };

  // Inline buttons will call submitAttendance directly

  const submitAttendance = async (
    userID: string,
    remark: "Present" | "Late" | "Absent"
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/attendances/student/attendance-records`,
        {
          userID,
          classID,
          remark,
        }
      );
      // Optimistically update the local list
      const serverTime = response?.data?.data?.time || null;
      setStudents((prev) =>
        prev.map((s) =>
          s.userID === userID
            ? {
                ...s,
                hasAttendanceToday: true,
                attendanceRemark: remark,
                attendanceTime: serverTime,
              }
            : s
        )
      );
      setFilteredStudents((prev) =>
        prev.map((s) =>
          s.userID === userID
            ? {
                ...s,
                hasAttendanceToday: true,
                attendanceRemark: remark,
                attendanceTime: serverTime,
              }
            : s
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to record attendance:", error.message);
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to record attendance."
        );
      } else {
        console.error("Failed to record attendance:", error);
        Alert.alert("Error", "Failed to record attendance.");
      }
    }
  };

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return filteredStudents;
    return filteredStudents.filter(
      (s) =>
        (s.name || "").toLowerCase().includes(q) ||
        (s.userID || "").toLowerCase().includes(q)
    );
  }, [filteredStudents, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record Attendance</Text>
      </View>

      {/* Display Section Details */}
      {section && (
        <Text style={styles.section}>
          {section.program} {section.year}
          {section.section} - {section.courseName}
        </Text>
      )}

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#b2b2b2"
            style={{ marginHorizontal: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or student ID..."
            placeholderTextColor="#b2b2b2"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4caf50" />
        </View>
      ) : (
        <>
          <FlatList
            data={pageData}
            keyExtractor={(item) => item.userID}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.studentName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.studentMeta}>{item.userID}</Text>
                  </View>
                  {item.hasAttendanceToday && (
                    <View style={getRemarkBadgeStyle(item.attendanceRemark)}>
                      <Text style={styles.badgeText}>
                        {item.attendanceRemark || "Recorded"}
                      </Text>
                    </View>
                  )}
                </View>

                {item.hasAttendanceToday && (
                  <Text style={styles.attendanceTimeText}>
                    Time: {formatTime(item.attendanceTime)}
                  </Text>
                )}

                {item.hasAttendanceToday ? (
                  <View style={[styles.buttonGroupRow]}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.actionBtnDisabled]}
                      disabled
                    >
                      <Text style={styles.actionBtnText}>Recorded</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.buttonGroupRow}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.presentBtn]}
                      onPress={() => submitAttendance(item.userID, "Present")}
                    >
                      <Text style={styles.actionBtnText}>Present</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.lateBtn]}
                      onPress={() => submitAttendance(item.userID, "Late")}
                    >
                      <Text style={styles.actionBtnText}>Late</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.absentBtn]}
                      onPress={() => submitAttendance(item.userID, "Absent")}
                    >
                      <Text style={styles.actionBtnText}>Absent</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 40 }}>
                <Text style={{ color: "#888" }}>No students found.</Text>
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
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          />

          {/* Pagination */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={[
                styles.pageButton,
                currentPage === 1 && styles.pageButtonDisabled,
              ]}
            >
              <Ionicons name="chevron-back" size={18} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={[
                styles.pageButton,
                currentPage === totalPages && styles.pageButtonDisabled,
              ]}
            >
              <Ionicons name="chevron-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default RecordAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  section: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  courseName: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  searchContainer: { flexDirection: "row", alignItems: "center" },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 8,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  studentMeta: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  attendanceTimeText: {
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
  },
  recordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#2563EB",
  },
  recordButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  recordButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  buttonGroupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 6,
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  presentBtn: {
    backgroundColor: "#10B981",
  },
  lateBtn: {
    backgroundColor: "#F59E0B",
  },
  absentBtn: {
    backgroundColor: "#EF4444",
  },
  actionBtnDisabled: {
    backgroundColor: "#9CA3AF",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  badgePresent: {
    backgroundColor: "#10B981",
  },
  badgeLate: {
    backgroundColor: "#F59E0B",
  },
  badgeAbsent: {
    backgroundColor: "#EF4444",
  },
  badgeDefault: {
    backgroundColor: "#6B7280",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 12,
  },
  pageButton: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pageButtonDisabled: {
    backgroundColor: "#a7d7a9",
  },
  pageInfo: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
  },
});
