import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Card, Divider } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { useWindowDimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import { useUserContext } from "@/context/UserContext";
import usePullToRefresh from "@/hooks/usePullToRefresh";

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

interface Log {
  time: string;
  userName: string;
  action: string;
}

// Type assertion to fix TypeScript compatibility issues
const Icon = FontAwesome as any;

const AdminDashboard = () => {
  const { width } = useWindowDimensions();
  const { user } = useUserContext();
  const [attendanceTrends, setAttendanceTrends] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFaculty, setTotalFaculty] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);
  const [recentLogs, setRecentLogs] = useState<Log[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true); // Add loading state

  useEffect(() => {
    if (user?.idNumber && user.userType === "Admin") {
      fetchUsers();
      fetchGroups();
      fetchLogs();
      fetchAttendanceTrends();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${API_URL}/users/fetchUsers`);
      const users = response.data;
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

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API_URL}/groups/fetchAllgroups`);
      setTotalGroups(response.data.length);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get<{ logs: Log[] }>(
        `${API_URL}/users/fetchUserLogs`
      );
      setRecentLogs(response.data.logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const fetchAttendanceTrends = async () => {
    try {
      setLoadingAttendance(true);
      const response = await axios.get(
        `${API_URL}/attendances/admin/attendance-trends`
      );
      const trends = response.data;
      const formatDate = (isoString: string | number | Date) => {
        const date = new Date(isoString);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      };
      const labels = trends.map(
        (item: { date: string | number | Date }, index: number) =>
          index % 2 === 0 ? formatDate(item.date) : " "
      );
      const data = trends.map((item: { count: any }) => item.count);
      setAttendanceTrends({ labels, datasets: [{ data }] });
    } catch (error) {
      console.error("Error fetching attendance trends:", error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const fetchAll = async () => {
    await Promise.all([
      fetchUsers(),
      fetchGroups(),
      fetchLogs(),
      fetchAttendanceTrends(),
    ]);
  };

  const { refreshing, onRefresh } = usePullToRefresh(fetchAll);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* Summary Cards */}
      <View style={styles.summarySection}>
        {/* Total Users Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="group" size={24} color="#808080" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Total Users</Text>
              <Text style={styles.cardValue}>{totalUsers}</Text>
            </View>
          </View>
        </Card>

        {/* Total Faculty Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="group" size={24} color="#007bff" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Total Faculty</Text>
              <Text style={styles.cardValue}>{totalFaculty}</Text>
            </View>
          </View>
        </Card>

        {/* Total Students Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="group" size={24} color="#28a745" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Total Students</Text>
              <Text style={styles.cardValue}>{totalStudents}</Text>
            </View>
          </View>
        </Card>

        {/* Total Groups Card */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="group" size={24} color="#ff9800" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Total Group Chats</Text>
              <Text style={styles.cardValue}>{totalGroups}</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Attendance Trends */}
      <Text style={styles.sectionTitle}>Attendance Trends</Text>
      {loadingAttendance ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={styles.loading}
        />
      ) : (
        attendanceTrends.labels.length > 0 && (
          <LineChart
            data={attendanceTrends}
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
        )
      )}

      {/* Recent Logs */}
      <Text style={styles.sectionTitle}>Recent User Logs</Text>
      <Card style={styles.logsCard}>
        {recentLogs.map((log, index) => (
          <View key={index}>
            <Text style={styles.logText}>
              [{log.time}] {log.userName} {log.action}
            </Text>
            {index < recentLogs.length - 1 && <Divider />}
          </View>
        ))}
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
    fontSize: 13,
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
  loading: {
    marginVertical: 20,
  },
});

export default AdminDashboard;
