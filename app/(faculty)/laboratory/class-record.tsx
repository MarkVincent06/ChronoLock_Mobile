import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // For the back arrow icon
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "expo-router"; // For navigation
import API_URL from "@/config/ngrok-api";

// Adjust the ClassRecordData interface based on the new response structure
interface ClassRecordData {
  scheduleID: string;
  courseCode: string;
  courseName: string;
  instFirstName: string;
  instLastName: string;
  startTime: string;
  endTime: string;
  day: string;
  schoolYear: string;
  semester: string;
  year: string;
  section: string;
  scheduleStatus: string;
}

const ClassRecord = () => {
  const { user } = useUserContext();
  const router = useRouter(); // Initialize router
  const [classRecords, setClassRecords] = useState<ClassRecordData[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<ClassRecordData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    let hoursFormatted = date.getHours();
    const minutesFormatted = date.getMinutes();
    const ampm = hoursFormatted >= 12 ? "PM" : "AM";

    hoursFormatted = hoursFormatted % 12 || 12;

    const minutesString =
      minutesFormatted < 10
        ? `0${minutesFormatted}`
        : minutesFormatted.toString();

    return `${hoursFormatted}:${minutesString} ${ampm}`;
  };

  useEffect(() => {
    const fetchClassRecords = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/schedules/user-classes/${user?.idNumber}`
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          const records: ClassRecordData[] = response.data.data.map(
            (item: any) => ({
              scheduleID: item.scheduleID.toString(),
              courseCode: item.courseCode,
              courseName: item.courseName,
              instFirstName: item.instFirstName,
              instLastName: item.instLastName,
              startTime: formatTime(item.startTime),
              endTime: formatTime(item.endTime),
              day: item.day,
              schoolYear: item.schoolYear,
              semester: item.semester,
              year: item.year,
              section: item.section,
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
    const filtered = classRecords.filter((record) =>
      record.courseName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>My Class Record</Text>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search course name..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#4caf50" />
      ) : filteredRecords.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No class records found.
        </Text>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.scheduleID.toString()}
          renderItem={({ item }) => (
            <View style={styles.classRecord}>
              <Text style={styles.classText}>
                <Text style={styles.bold}>Course: </Text>
                {item.courseCode} - {item.courseName}
              </Text>
              <Text style={styles.classText}>
                <Text style={styles.bold}>Class Time: </Text>
                {item.startTime} - {item.endTime}
              </Text>
              <Text style={styles.classText}>
                <Text style={styles.bold}>Day: </Text>
                {item.day}
              </Text>
              <Text style={styles.classText}>
                <Text style={styles.bold}>School Year: </Text>
                {item.schoolYear}
              </Text>
              <Text style={styles.classText}>
                <Text style={styles.bold}>Semester: </Text>
                {item.semester}
              </Text>
              <Text style={styles.classText}>
                <Text style={styles.bold}>Year & Section: </Text>
                {item.year}-{item.section}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  classRecord: {
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  classText: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
});

export default ClassRecord;
