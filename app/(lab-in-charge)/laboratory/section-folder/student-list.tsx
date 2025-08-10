import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  FlatList,
  RefreshControl,
  Modal,
} from "react-native";
import axios from "axios";
import Ion from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams } from "expo-router";
import API_URL from "@/config/ngrok-api";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import { Picker } from "@react-native-picker/picker";
// Type assertion to fix TypeScript compatibility issues
const Ionicons = Ion as any;

const StudentList = () => {
  const router = useRouter();
  const { classID } = useLocalSearchParams<{ classID: string }>();
  const { section: sectionString } = useLocalSearchParams<{
    section: string;
  }>();
  const section = sectionString ? JSON.parse(sectionString) : null;
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  interface EnrolledStudent {
    studentName: string;
    studentID: string;
    program: string;
    yearSection: string;
    status: string;
  }

  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusValue, setStatusValue] = useState<string>("Regular");
  const [statusTarget, setStatusTarget] = useState<{
    studentID: string;
    currentStatus: string;
  } | null>(null);
  const [unenrollingId, setUnenrollingId] = useState<string | null>(null);

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message:
              "This app needs access to your storage to save the PDF files.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Storage permission granted");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const generatePDF = async () => {
    setLoading(true);
    try {
      const courseName = section?.courseName;
      const block =
        section?.program + "-" + section?.year + "" + section?.section;

      const rowsHtml = filteredStudents
        .map(
          (s) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">${s.studentName}</td>
          <td style="padding:8px;border:1px solid #ddd;">${s.studentID}</td>
          <td style="padding:8px;border:1px solid #ddd;">${s.program}</td>
          <td style="padding:8px;border:1px solid #ddd;">${s.yearSection}</td>
          <td style="padding:8px;border:1px solid #ddd;">${s.status}</td>
        </tr>`
        )
        .join("");

      const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
            }
            .course-header {
              text-align: center;
              margin-bottom: 30px;
            }
            .course-name {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
            }
            .block-info {
              font-size: 18px;
              color: #666;
              margin-bottom: 5px;
            }
            .enrolled-label {
              font-size: 16px;
              color: #888;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px;
            }
            thead th { 
              background: #f0f3f7; 
              border: 1px solid #ddd; 
              padding: 12px; 
              text-align: left; 
              font-weight: bold;
            }
            tbody td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            tbody tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="course-header">
            <div class="course-name">${courseName || "Course Name"}</div>
            <div class="block-info">${block}</div>
            <div class="enrolled-label">Enrolled Students</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Program</th>
                <th>Year & Section</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </body>
      </html>`;

      const options = {
        html,
        fileName: `${
          courseName?.replace(/\s+/g, "_") || "course"
        }_${block}_students`,
        directory: Platform.OS === "android" ? "Downloads" : "docs",
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert("Success", `PDF generated at: ${file.filePath}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate PDF.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/class-list/students/${classID}`
      );
      const data = (response.data?.data ?? []) as EnrolledStudent[];
      setStudents(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching students:", error);
      Alert.alert("Error", "Failed to fetch enrolled students.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await fetchStudents();
  };
  const { refreshing, onRefresh } = usePullToRefresh(fetchData);

  useEffect(() => {
    if (classID) {
      fetchStudents();
    }
  }, [classID]);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => {
      const name = s.studentName?.toLowerCase() ?? "";
      const id = s.studentID?.toLowerCase() ?? "";
      return name.includes(q) || id.includes(q);
    });
  }, [students, searchQuery]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = filteredStudents.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleUpdatePress = (studentID: string) => {
    const target = students.find((s) => s.studentID === studentID);
    const current = target?.status ?? "Regular";
    setStatusTarget({ studentID, currentStatus: current });
    setStatusValue(normalizeStatusForPicker(current));
    setIsStatusModalVisible(true);
  };

  const handleUnenrollPress = (studentID: string) => {
    const student = students.find((s) => s.studentID === studentID);
    Alert.alert(
      "Unenroll Student",
      `Are you sure you want to unenroll ${
        student?.studentName || "this student"
      }?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Unenroll",
          style: "destructive",
          onPress: async () => {
            setUnenrollingId(studentID);
            try {
              await axios.delete(`${API_URL}/student-masterlists/enrollment`, {
                data: { studentID, classID },
              });
              const updated = students.filter((s) => s.studentID !== studentID);
              setStudents(updated);
              // Adjust pagination if current page exceeds new total pages
              const q = searchQuery.trim().toLowerCase();
              const filteredNew = q
                ? updated.filter(
                    (s) =>
                      (s.studentName?.toLowerCase() ?? "").includes(q) ||
                      (s.studentID?.toLowerCase() ?? "").includes(q)
                  )
                : updated;
              const newTotalPages = Math.max(
                1,
                Math.ceil(filteredNew.length / pageSize) || 1
              );
              if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages);
              }
              Alert.alert("Success", "Student unenrolled successfully.");
            } catch (error) {
              console.error("Error unenrolling student:", error);
              Alert.alert(
                "Error",
                "An error occurred while unenrolling the student."
              );
            } finally {
              setUnenrollingId(null);
            }
          },
        },
      ]
    );
  };

  const getStatusColors = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("drop")) {
      return { badgeBg: "#fde8e8", textColor: "#dc3545" };
    }
    if (s.includes("irregular")) {
      return { badgeBg: "#fff7e6", textColor: "#d39e00" };
    }
    return { badgeBg: "#e6f4ff", textColor: "#007bff" };
  };

  const normalizeStatusForPicker = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("drop")) return "Drop";
    if (s.includes("irregular")) return "Irregular";
    return "Regular";
  };

  const selectedStudent = useMemo(() => {
    if (!statusTarget) return null;
    return students.find((s) => s.studentID === statusTarget.studentID) || null;
  }, [statusTarget, students]);

  const handleSubmitStatusUpdate = async () => {
    if (!statusTarget) return;
    setStatusUpdating(true);
    try {
      await axios.put(`${API_URL}/student-masterlists/status`, {
        studentID: statusTarget.studentID,
        classID,
        status: statusValue,
      });

      setStudents((prev) =>
        prev.map((s) =>
          s.studentID === statusTarget.studentID
            ? { ...s, status: statusValue }
            : s
        )
      );
      Alert.alert("Success", "Enrollment status updated.");
      setIsStatusModalVisible(false);
      setStatusTarget(null);
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update enrollment status.");
    } finally {
      setStatusUpdating(false);
    }
  };

  const renderStudentItem = ({ item }: { item: EnrolledStudent }) => {
    const { badgeBg, textColor } = getStatusColors(item.status);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.nameText}>{item.studentName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.statusText, { color: textColor }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={styles.metaText}>Student ID: {item.studentID}</Text>
        <Text style={styles.metaText}>Program: {item.program}</Text>
        <Text style={styles.metaText}>Year & Section: {item.yearSection}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.updateButton]}
            onPress={() => handleUpdatePress(item.studentID)}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.unenrollButton]}
            onPress={() => handleUnenrollPress(item.studentID)}
            activeOpacity={0.8}
          >
            <Ionicons name="person-remove-outline" size={18} color="#fff" />
            {unenrollingId === item.studentID ? (
              <ActivityIndicator style={{ marginLeft: 6 }} color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Unenroll</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Student List</Text>
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
        <TouchableOpacity style={styles.exportButton} onPress={generatePDF}>
          <Ionicons name="download-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={currentPageData}
        keyExtractor={(item) => item.studentID}
        renderItem={renderStudentItem}
        contentContainerStyle={
          currentPageData.length === 0
            ? { flexGrow: 1, justifyContent: "center" }
            : undefined
        }
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyText}>No students enrolled yet.</Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {students.length >= 11 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.paginationButtonDisabled,
            ]}
            onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <Ionicons name="chevron-back-outline" size={18} color="#fff" />
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.paginationButtonDisabled,
            ]}
            onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.paginationText}>Next</Text>
            <Ionicons name="chevron-forward-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      <Modal
        visible={isStatusModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsStatusModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Enrollment Status</Text>
              <TouchableOpacity
                onPress={() => setIsStatusModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close-outline" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedStudent && (
              <View style={styles.modalInfoCard}>
                <Text style={styles.modalInfoName}>
                  {selectedStudent.studentName}
                </Text>
                <Text style={styles.modalInfoMeta}>
                  Student ID: {selectedStudent.studentID}
                </Text>
                <Text style={styles.modalInfoMeta}>
                  Program: {selectedStudent.program}
                </Text>
                <Text style={styles.modalInfoMeta}>
                  Year & Section: {selectedStudent.yearSection}
                </Text>
              </View>
            )}

            <View style={{ marginTop: 10 }}>
              <Text style={styles.modalLabel}>Status</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  style={{ color: "black" }}
                  selectedValue={statusValue}
                  dropdownIconColor={"black"}
                  onValueChange={(value) => setStatusValue(value)}
                >
                  <Picker.Item label="Regular" value="Regular" />
                  <Picker.Item label="Irregular" value="Irregular" />
                  <Picker.Item label="Drop" value="Drop" />
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.saveButton,
                statusUpdating && styles.saveButtonDisabled,
              ]}
              onPress={handleSubmitStatusUpdate}
              disabled={statusUpdating}
              activeOpacity={0.8}
            >
              {statusUpdating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StudentList;

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
  exportButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 6,
  },

  // List item card styles
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    flexShrink: 1,
  },
  statusBadge: {
    backgroundColor: "#e6f4ff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    color: "#007bff",
    fontSize: 12,
    fontWeight: "600",
  },
  metaText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  updateButton: {
    backgroundColor: "#28a745",
  },
  unenrollButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  paginationButtonDisabled: {
    opacity: 0.5,
  },
  paginationText: {
    color: "#fff",
    fontWeight: "600",
  },
  paginationInfo: {
    color: "#555",
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 20,
    justifyContent: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  modalCloseButton: {
    padding: 6,
  },
  modalLabel: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    overflow: "hidden",
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  modalInfoCard: {
    marginTop: 12,
    backgroundColor: "#f8f9fb",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 8,
    padding: 12,
  },
  modalInfoName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  modalInfoMeta: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
});
