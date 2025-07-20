import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

type LabStatusType = "available" | "occupied" | "under_maintenance" | "closed";

interface LabStatus {
  status: LabStatusType;
  currentUsers: number;
  maxCapacity: number;
  instructor: string;
  subject: string;
}

const labStatus: LabStatus = {
  status: "occupied",
  currentUsers: 20,
  maxCapacity: 50,
  instructor: "Dr. John Doe",
  subject: "Database Architecture",
};

// Define base colors for statuses globally
const baseColors = {
  available: "#22bb33", // Green
  occupied: `hsl(0, 100%, 50%)`, // Default red (dynamic lightness adjusted in function)
  under_maintenance: "#f0ad4e", // Orange
  closed: "#aaaaaa", // Gray
};

const getDynamicTintColor = (
  baseColor: keyof typeof baseColors,
  progress: number
): string => {
  if (baseColor === "occupied") {
    // Dynamically adjust red lightness for "occupied"
    return `hsl(0, 100%, ${100 - progress}%)`;
  }
  return baseColors[baseColor];
};

const LaboratoryOccupancy: React.FC = () => {
  const router = useRouter();
  const { status, currentUsers, maxCapacity, instructor, subject } = labStatus;

  // Calculate progress based on status
  const progress =
    status === "occupied" ? (currentUsers / maxCapacity) * 100 : 100;

  const currentDate = new Date().toLocaleDateString();

  let iconName: string;
  let baseColor: keyof typeof baseColors;

  switch (status) {
    case "available":
      baseColor = "available";
      iconName = "door-open";
      break;
    case "occupied":
      baseColor = "occupied";
      iconName = "door-closed";
      break;
    case "under_maintenance":
      baseColor = "under_maintenance";
      iconName = "tools";
      break;
    case "closed":
      baseColor = "closed";
      iconName = "door-closed-lock";
      break;
    default:
      baseColor = "closed";
      iconName = "help";
  }

  const tintColor = getDynamicTintColor(baseColor, progress);

  return (
    <View style={styles.container}>
      {/* Header with Back Icon */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={router.back}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>ERP Lab Occupancy Monitoring</Text>
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
              {status === "occupied" && (
                <Text style={[styles.occupancyText]}>
                  {currentUsers} / {maxCapacity}
                </Text>
              )}
              <Text style={[styles.statusText, { color: tintColor }]}>
                {status.replace("_", " ").toUpperCase()}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Details Below Progress Bar */}
      <Text style={styles.detailText}>Date: {currentDate}</Text>
      <Text style={styles.detailText}>Instructor: {instructor}</Text>
      <Text style={[styles.detailText, { marginBottom: 30 }]}>
        Subject: {subject}
      </Text>
    </View>
  );
};

export default LaboratoryOccupancy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  detailText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
