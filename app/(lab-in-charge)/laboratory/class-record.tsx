import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import API_URL from "@/config/ngrok-api";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";

// Updated interface based on the new API response structure
interface ClassRecordData {
  classID: string;
  scheduleID: string;
  program: string;
  yearSection: string;
  courseCode: string;
  courseName: string;
  semester: string;
  enrollmentKey: string;
  scheduleStatus: string;
}

// Type assertion to fix TypeScript compatibility issues
const Icon = MaterialIcons as any;

const ClassRecord = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [classRecords, setClassRecords] = useState<ClassRecordData[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<ClassRecordData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editClassID, setEditClassID] = useState<string | null>(null);
  const [editSemester, setEditSemester] = useState<string>("");
  const [editEnrollmentKey, setEditEnrollmentKey] = useState<string>("");
  const [editLoading, setEditLoading] = useState(false);
  const [editSemesterOptions, setEditSemesterOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchClassRecords = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/class-list/user/${user?.idNumber}`
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          const records: ClassRecordData[] = response.data.data.map(
            (item: any) => ({
              classID: item.classID.toString(),
              scheduleID: item.scheduleID.toString(),
              program: item.program,
              yearSection: item.yearSection,
              courseCode: item.courseCode,
              courseName: item.courseName,
              semester: item.semester,
              enrollmentKey: item.enrollmentKey,
              scheduleStatus: item.scheduleStatus,
            })
          );
          setClassRecords(records);
          setFilteredRecords(records);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching class records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassRecords();
  }, [user?.idNumber]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filtered = classRecords.filter(
      (record) =>
        record.courseName.toLowerCase().includes(text.toLowerCase()) ||
        record.courseCode.toLowerCase().includes(text.toLowerCase()) ||
        record.program.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  // Open modal and set initial values
  const handleEditClass = (
    classID: string,
    semester: string,
    enrollmentKey: string
  ) => {
    setEditClassID(classID);
    setEditSemester(semester);
    setEditEnrollmentKey(enrollmentKey);
    setEditSemesterOptions([
      semester,
      semester === "1st Semester" ? "2nd Semester" : "1st Semester",
    ]);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editClassID) return;
    setEditLoading(true);
    try {
      await axios.put(`${API_URL}/class-list/update/${editClassID}`, {
        semester: editSemester,
        enrollmentKey: editEnrollmentKey,
      });
      // Refresh class records after update
      const response = await axios.get(
        `${API_URL}/class-list/user/${user?.idNumber}`
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        const records: ClassRecordData[] = response.data.data.map(
          (item: any) => ({
            classID: item.classID.toString(),
            scheduleID: item.scheduleID.toString(),
            program: item.program,
            yearSection: item.yearSection,
            courseCode: item.courseCode,
            courseName: item.courseName,
            semester: item.semester,
            enrollmentKey: item.enrollmentKey,
            scheduleStatus: item.scheduleStatus,
          })
        );
        setClassRecords(records);
        setFilteredRecords(records);
      }
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating class record:", error);
      // Optionally show an error message
    } finally {
      setEditLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "with class":
        return "#4caf50";
      case "unscheduled":
        return "#757575";
      default:
        return "#757575";
    }
  };

  const renderClassItem = ({ item }: { item: ClassRecordData }) => (
    <View style={styles.classCard}>
      {/* Header with Course Code and Status */}
      <View style={styles.cardHeader}>
        <Text style={styles.courseCode}>{item.courseCode}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.scheduleStatus) },
          ]}
        >
          <Text style={styles.statusText}>{item.scheduleStatus}</Text>
        </View>
      </View>
      {/* Course Name */}
      <Text style={styles.courseName}>{item.courseName}</Text>
      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Program</Text>
          <Text style={styles.detailValue}>{item.program}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Year & Section</Text>
          <Text style={styles.detailValue}>{item.yearSection}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Semester</Text>
          <Text style={styles.detailValue}>{item.semester}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Enrollment Key</Text>
          <Text style={styles.enrollmentKey}>{item.enrollmentKey}</Text>
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() =>
            handleEditClass(item.classID, item.semester, item.enrollmentKey)
          }
        >
          <Icon name="edit" size={18} color="#fff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>My Class Records</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#757575"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by course, program, or code..."
          placeholderTextColor="#b2b2b2"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {searchTerm !== "" && (
          <TouchableOpacity
            onPress={() => handleSearch("")}
            style={styles.clearButton}
          >
            <Icon name="clear" size={20} color="#757575" />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4caf50" />
          <Text style={styles.loadingText}>Loading class records...</Text>
        </View>
      ) : filteredRecords.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="school" size={64} color="#e0e0e0" />
          <Text style={styles.emptyTitle}>No Classes Found</Text>
          <Text style={styles.emptySubtitle}>
            {searchTerm
              ? "Try adjusting your search terms"
              : "You don't have any class records yet"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.classID}
          renderItem={renderClassItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Edit Modal */}
      <Modal
        isVisible={editModalVisible}
        onBackdropPress={() => setEditModalVisible(false)}
      >
        <View
          style={{ backgroundColor: "white", borderRadius: 10, padding: 20 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Edit Class
          </Text>
          <Text style={{ marginBottom: 5 }}>Semester:</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              marginBottom: 15,
            }}
          >
            <Picker
              style={{ color: "black" }}
              selectedValue={editSemester}
              dropdownIconColor="black"
              onValueChange={(itemValue) => setEditSemester(itemValue)}
            >
              {editSemesterOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
          <Text style={{ marginBottom: 5 }}>Enrollment Key:</Text>
          <TextInput
            value={editEnrollmentKey}
            onChangeText={setEditEnrollmentKey}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              marginBottom: 15,
              padding: 8,
            }}
            placeholder="Enter enrollment key"
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={{ marginRight: 10, padding: 10 }}
              disabled={editLoading}
            >
              <Text style={{ color: "#888" }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={{
                backgroundColor: "#1976d2",
                padding: 10,
                borderRadius: 5,
              }}
              disabled={editLoading}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {editLoading ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 34,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  classCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  courseCode: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2196f3",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  detailItem: {
    width: "50%",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: "#757575",
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  enrollmentKey: {
    fontSize: 14,
    color: "#4caf50",
    fontWeight: "700",
    fontFamily: "monospace",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 130,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: "#2196f3",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#757575",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ClassRecord;
