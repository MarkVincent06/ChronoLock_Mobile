import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const StudentCourse = () => {
  const [activeTab, setActiveTab] = useState<"courses" | "enroll">("courses");
  const Icon = FontAwesome as any;

  const headerTitle =
    activeTab === "courses" ? "Your Courses" : "Enroll Course";

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
          <Text style={styles.bodyText}>Your courses</Text>
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
    alignItems: "center",
  },
  bodyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
