import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "@/config/ngrok-api";

type LabStatusType = "Available" | "Occupied" | "Under Maintenance" | "Closed";

interface LabOccupancy {
  id: number;
  lab_id: number;
  schedule_id?: number;
  status: LabStatusType;
  currentUsers: number;
  created_at: string;
  updated_at: string;
}

interface Schedule {
  scheduleID: number;
  courseCode: string;
  courseName: string;
  instructorID: string;
  instFirstName: string;
  instLastName: string;
  startTime: string;
  endTime: string;
  day: string;
  startDate: string;
  endDate: string;
  scheduleStatus: string;
  scheduleType: string;
}

interface ApiResponse {
  success: boolean;
  hasActiveSchedule: boolean;
  labOccupancy: LabOccupancy;
  schedule?: Schedule;
}

const Icon = MaterialCommunityIcons as any;

// Define base colors for statuses globally
const baseColors = {
  Available: "#22bb33", // Green
  Occupied: `hsl(0, 100%, 50%)`, // Default red (dynamic lightness adjusted in function)
  "Under Maintenance": "#f0ad4e", // Orange
  Closed: "#aaaaaa", // Gray
};

// Update getDynamicTintColor to accept currentUsers and maxCapacity for dynamic red
const getDynamicTintColor = (
  baseColor: keyof typeof baseColors,
  progress: number,
  currentUsers?: number,
  maxCapacity?: number
): string => {
  if (
    baseColor === "Occupied" &&
    typeof currentUsers === "number" &&
    typeof maxCapacity === "number"
  ) {
    // Lightness: 85% (empty) to 40% (full)
    const minLightness = 40;
    const maxLightness = 85;
    const ratio = Math.min(currentUsers / maxCapacity, 1);
    const lightness = maxLightness - (maxLightness - minLightness) * ratio;
    return `hsl(0, 100%, ${lightness}%)`;
  }
  return baseColors[baseColor];
};

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

const LaboratoryOccupancy: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [labData, setLabData] = useState<ApiResponse | null>(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const maxCapacity = 50; // You might want to get this from API too

  useEffect(() => {
    fetchLabOccupancy();
  }, []);

  const fetchLabOccupancy = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/lab-occupancy/current`);
      setLabData(response.data);
    } catch (error) {
      console.error("Error fetching lab occupancy:", error);
      Alert.alert("Error", "Failed to fetch lab occupancy data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading lab occupancy...</Text>
      </View>
    );
  }

  if (!labData || !labData.success) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load lab data</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchLabOccupancy}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { labOccupancy, schedule, hasActiveSchedule } = labData;

  // If there is no active schedule, override status to 'Available' and set subtext
  const status = hasActiveSchedule ? labOccupancy.status : "Available";
  const currentUsers = hasActiveSchedule ? labOccupancy.currentUsers : 0;

  // Calculate progress based on status and users
  let progress = 0;
  if (status === "Occupied" && currentUsers > 0) {
    progress = (currentUsers / maxCapacity) * 100;
  } else if (status === "Available") {
    progress = 100;
  } else {
    progress = 100;
  }

  let iconName: string;
  let baseColor: keyof typeof baseColors;

  switch (status) {
    case "Available":
      baseColor = "Available";
      iconName = "door-open";
      break;
    case "Occupied":
      baseColor = "Occupied";
      iconName = "door-closed";
      break;
    case "Under Maintenance":
      baseColor = "Under Maintenance";
      iconName = "tools";
      break;
    case "Closed":
      baseColor = "Closed";
      iconName = "door-closed-lock";
      break;
    default:
      baseColor = "Closed";
      iconName = "help";
  }

  const tintColor = getDynamicTintColor(
    baseColor,
    progress,
    currentUsers,
    maxCapacity
  );

  const getStatusMessage = () => {
    if (!hasActiveSchedule) {
      return "No scheduled classes today";
    }
    if (status === "Available" && currentUsers === 0) {
      return "Class starting soon";
    }
    if (hasActiveSchedule && status === "Occupied" && currentUsers > 0) {
      return "Class is in session";
    }
    return "";
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Icon */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={router.back}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>ERP Lab Occupancy</Text>
        <TouchableOpacity onPress={fetchLabOccupancy}>
          <Icon name="refresh" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Circular Progress Bar */}
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={200}
          width={10}
          fill={progress}
          rotation={0}
          tintColor={tintColor}
          backgroundColor="#D3D3D3"
          lineCap="round"
        >
          {() => (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={40} color={tintColor} />
              {status === "Occupied" && currentUsers > 0 && (
                <Text style={styles.occupancyText}>
                  {currentUsers} / {maxCapacity}
                </Text>
              )}
              <Text style={[styles.statusText, { color: tintColor }]}>
                {status.toUpperCase()}
              </Text>
              {getStatusMessage() && (
                <Text style={styles.subStatusText}>{getStatusMessage()}</Text>
              )}
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Basic Info */}

      {hasActiveSchedule && schedule && (
        <View style={styles.infoContainer}>
          <Text style={styles.detailText}>
            Instructor: {schedule.instFirstName} {schedule.instLastName}
          </Text>
          <Text style={styles.detailText}>
            Course: {schedule.courseCode} - {schedule.courseName}
          </Text>
          <Text style={styles.detailText}>
            Class Time: {formatTime(schedule.startTime)} -{" "}
            {formatTime(schedule.endTime)}
          </Text>
        </View>
      )}

      {/* More Info Button */}
      {hasActiveSchedule && schedule && (
        <TouchableOpacity
          style={styles.moreInfoButton}
          onPress={() => setShowMoreInfo(!showMoreInfo)}
        >
          <Text style={styles.moreInfoButtonText}>
            {showMoreInfo ? "Hide Details" : "Show More Details"}
          </Text>
          <Icon
            name={showMoreInfo ? "chevron-up" : "chevron-down"}
            size={20}
            color="#007BFF"
          />
        </TouchableOpacity>
      )}

      {/* Expanded Info */}
      {showMoreInfo && hasActiveSchedule && schedule && (
        <View style={styles.expandedInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Instructor ID:</Text>
            <Text style={styles.infoValue}>{schedule.instructorID}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Day:</Text>
            <Text style={styles.infoValue}>{schedule.day}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Schedule Type:</Text>
            <Text style={styles.infoValue}>
              {schedule.scheduleType === "regularSchedule"
                ? "Regular Class"
                : "Make Up Class"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Schedule Status:</Text>
            <Text style={[styles.infoValue, styles.scheduleStatus]}>
              {schedule.scheduleStatus}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Period:</Text>
            <Text style={styles.infoValue}>
              {new Date(schedule.startDate).toLocaleDateString()} -{" "}
              {new Date(schedule.endDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      )}

      {/* Refresh Button */}
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={fetchLabOccupancy}
      >
        <Icon
          name="refresh"
          size={20}
          color="#fff"
          style={styles.refreshIcon}
        />
        <Text style={styles.refreshButtonText}>Refresh Status</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LaboratoryOccupancy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  occupancyText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  subStatusText: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    maxWidth: 150,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
    textAlign: "center",
    marginVertical: 2,
  },
  moreInfoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  moreInfoButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  expandedInfo: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    textAlign: "right",
  },
  scheduleStatus: {
    color: "#007BFF",
    fontWeight: "600",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 12,
    marginVertical: 20,
  },
  refreshIcon: {
    marginRight: 8,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
