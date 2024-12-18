import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Divider } from "react-native-paper";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import API_URL from "@/config/ngrok-api";

interface User {
  id: number;
  accountName: string;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  userType: string;
  avatar: string;
}

const AdminDashboard = () => {
  const { width } = useWindowDimensions();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFaculty, setTotalFaculty] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${API_URL}/users/fetchUsers`);
        const users = response.data;

        // Calculate totals based on userType
        const total = users.length;
        const faculty = users.filter(
          (user) => user.userType === "Faculty"
        ).length;
        const students = users.filter(
          (user) => user.userType === "Student"
        ).length;

        setTotalUsers(total);
        setTotalFaculty(faculty);
        setTotalStudents(students);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* Summary Cards */}
      <View style={styles.summarySection}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="group" size={30} color="#808080" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Total Users</Text>
              <Text style={styles.cardValue}>{totalUsers}</Text>
            </View>
          </View>
        </Card>

        {/* Total Faculty Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="group" size={30} color="#007bff" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Total Faculty</Text>
              <Text style={styles.cardValue}>{totalFaculty}</Text>
            </View>
          </View>
        </Card>

        {/* Total Students Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="group" size={30} color="#28a745" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Total Students</Text>
              <Text style={styles.cardValue}>{totalStudents}</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Attendance Trends */}
      <Text style={styles.sectionTitle}>Attendance Trends</Text>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data: [10, 20, 15, 30, 25],
            },
          ],
        }}
        width={width - 40}
        height={200}
        chartConfig={{
          backgroundColor: "#f4f4f4",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Lab Usage */}
      <Text style={styles.sectionTitle}>Lab Usage</Text>
      <PieChart
        data={[
          {
            name: "Occupied",
            population: 3,
            color: "#4caf50",
            legendFontColor: "#000",
            legendFontSize: 12,
          },
          {
            name: "Available",
            population: 2,
            color: "#f44336",
            legendFontColor: "#000",
            legendFontSize: 12,
          },
        ]}
        width={width - 40}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
        style={styles.chart}
      />

      {/* Alerts */}
      <Text style={styles.sectionTitle}>Alerts</Text>
      <Card style={styles.alertCard}>
        <Text style={styles.alertText}>
          John Doe missed attendance for Class 101
        </Text>
        <Divider />
        <Text style={styles.alertText}>
          Unauthorized access attempt in Lab 3
        </Text>
      </Card>

      {/* Recent Logs */}
      <Text style={styles.sectionTitle}>Recent Logs</Text>
      <Card style={styles.logsCard}>
        <Text style={styles.logText}>[10:05 AM] Jane Smith accessed Lab 2</Text>
        <Divider />
        <Text style={styles.logText}>[10:10 AM] John Doe logged in</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summarySection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTextContainer: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: "#555",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 8,
  },
  alertCard: {
    padding: 10,
    backgroundColor: "#fff",
  },
  alertText: {
    fontSize: 14,
    color: "#d32f2f",
    marginVertical: 5,
  },
  logsCard: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  logText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
});

export default AdminDashboard;
