import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import { useUserContext } from "@/context/UserContext";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import { router } from "expo-router";
import Ion from "react-native-vector-icons/Ionicons";

interface ClassItem {
  scheduleID: number;
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
}

// Type assertion to fix TypeScript compatibility issues
const Ionicons = Ion as any;

const ClassList = () => {
  const { user } = useUserContext();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchClasses = useCallback(async () => {
    if (user?.idNumber && user.userType === "Lab-in-Charge") {
      try {
        const response = await axios.get(
          `${API_URL}/schedules/user-classes/${user?.idNumber}`
        );
        setClasses(response.data.data);
        setFilteredClasses(response.data.data);
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
    fetchClasses().finally(() => setLoading(false));
  }, [fetchClasses]);

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
      setFilteredClasses(classes); // Reset to original list if query is empty
    } else {
      const filtered = classes.filter((item) =>
        item.courseName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClasses(filtered);
    }
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
          onPress={() => router.replace("/laboratory")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Class</Text>
      </View>
      <Text style={styles.subText}>
        Tap on a class below to view and manage your student's seating plan.
      </Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search class name..."
        placeholderTextColor="#b2b2b2"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Class List */}
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.scheduleID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.classItem}
            onPress={() =>
              router.push({
                pathname: "/laboratory/seat-plan-folder/seat-plan",
                params: {
                  scheduleID: item.scheduleID.toString(),
                  courseName: item.courseName,
                },
              })
            }
          >
            <View style={styles.classHeader}></View>
            <Text style={styles.class}>
              {item.courseCode} - {item.courseName}
            </Text>
            <Text style={styles.academicPeriod}>
              {item.schoolYear} | {item.semester}
            </Text>
            <Text style={styles.programDetails}>
              {item.program} - {item.year}
              {item.section}
            </Text>
            <Text style={styles.classDetails}>
              {item.day} • {formatTime(item.startTime)} -{" "}
              {formatTime(item.endTime)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No classes found.</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ClassList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the content
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  classItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  classHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  class: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  academicPeriod: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  programDetails: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  classDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
