import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserContext } from "../../context/UserContext";

const Home = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  // Card data with updated relevant icons
  const cardData: {
    title: string;
    data: string;
    icon:
      | "book-open-page-variant-outline"
      | "account-remove-outline"
      | "account-star-outline"
      | "account-minus-outline";
  }[] = [
    {
      title: "Enrolled Course",
      data: "1",
      icon: "book-open-page-variant-outline",
    },
    { title: "Presents", data: "5", icon: "account-star-outline" },
    {
      title: "Absents",
      data: "2",
      icon: "account-remove-outline",
    },
    { title: "Lates", data: "3", icon: "account-minus-outline" },
  ];

  // Schedule data
  const scheduleData = [
    {
      instructor: "John Doe",
      courseName: "Introduction to Programming",
      courseCode: "CS101",
      time: "8:00 AM - 10:00 AM",
      date: "January 5, 2025",
    },
    {
      instructor: "John Doe",
      courseName: "Data Structures",
      courseCode: "CS201",
      time: "10:30 AM - 12:30 PM",
      date: "January 5, 2025",
    },
    {
      instructor: "John Doe",
      courseName: "Database Systems",
      courseCode: "CS301",
      time: "1:00 PM - 3:00 PM",
      date: "January 5, 2025",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Card */}
      <Card style={styles.welcomeCard}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.firstName || "User"}!
          </Text>
          <Text style={styles.userTypeText}>{user?.userType || "Unknown"}</Text>
        </Card.Content>
      </Card>

      {/* Grid of Small Cards */}
      <View style={styles.grid}>
        {cardData.map((item, index) => (
          <Card key={index} style={styles.smallCard}>
            <View style={styles.smallCardContent}>
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color="#555"
                style={styles.icon}
              />
              <View>
                <Text style={styles.placeholderTitle}>{item.title}</Text>
                <Text style={styles.placeholderData}>{item.data}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Today's Class Schedule Header */}
      <Text style={styles.scheduleHeader}>Today's Class Schedule</Text>

      {/* Schedule Card */}
      <Card style={styles.scheduleCard}>
        <Card.Content>
          {scheduleData.map((schedule, index) => (
            <View key={index}>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleIndex}>{index + 1}.</Text>
                <View style={styles.scheduleDetails}>
                  <Text style={styles.boldText}>Instructor:</Text>
                  <Text style={styles.normalText}>{schedule.instructor}</Text>
                  <Text style={styles.boldText}>Course Name:</Text>
                  <Text style={styles.normalText}>{schedule.courseName}</Text>
                  <Text style={styles.boldText}>Course Code:</Text>
                  <Text style={styles.normalText}>{schedule.courseCode}</Text>
                  <Text style={styles.boldText}>Time:</Text>
                  <Text style={styles.normalText}>{schedule.time}</Text>
                  <Text style={styles.boldText}>Date:</Text>
                  <Text style={styles.normalText}>{schedule.date}</Text>
                </View>
              </View>
              {index < scheduleData.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  welcomeCard: {
    width: "100%",
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#ffffff",
    marginBottom: 16,
  },
  cardContent: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  userTypeText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  smallCard: {
    width: "48%",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#fff",
  },
  smallCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
  placeholderTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  placeholderData: {
    fontSize: 14,
    color: "#666",
  },
  scheduleHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  scheduleCard: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 30,
  },
  scheduleItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  scheduleIndex: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    color: "#333",
  },
  scheduleDetails: {
    flex: 1,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  normalText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
});
