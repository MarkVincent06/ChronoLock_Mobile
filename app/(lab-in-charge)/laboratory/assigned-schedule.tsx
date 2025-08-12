import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";
import IonIcon from "react-native-vector-icons/FontAwesome";
import API_URL from "@/config/ngrok-api";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import axios from "axios";

// Type assertion to fix TypeScript compatibility issues
const Icon = IonIcon as any;

const AssignedSchedule = () => {
  const { user } = useUserContext();
  const userID = user?.idNumber;
  const router = useRouter();
  const [schedules, setSchedules] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    let hoursFormatted = date.getHours();
    const minutesFormatted = date.getMinutes();
    const ampm = hoursFormatted >= 12 ? "PM" : "AM";
    hoursFormatted = hoursFormatted % 12 || 12;
    const minutesString =
      minutesFormatted < 10 ? `0${minutesFormatted}` : `${minutesFormatted}`;
    return `${hoursFormatted}:${minutesString} ${ampm}`;
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return d.toLocaleDateString("en-US", options);
  };

  const fetchSchedules = async () => {
    if (!userID) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/schedules/instructor/assigned-schedules/${userID}`,
        {
          data: { userID },
        }
      );
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setSchedules(res.data.data);
      } else {
        setSchedules([]);
      }
    } catch (error) {
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSchedules();
  }, [userID]);

  const { refreshing, onRefresh } = usePullToRefresh(fetchSchedules);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backArrow}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>My Assigned Schedule</Text>
      </View>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading schedules, please wait...</Text>
        </View>
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item) => String(item.scheduleID)}
          contentContainerStyle={{ paddingBottom: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No assigned schedules found.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.courseCode} · {item.courseName}
              </Text>
              <View style={styles.cardRow}>
                <Icon
                  name="calendar"
                  size={14}
                  color="#555"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.cardMeta}>
                  {formatDate(item.startDate)} - {formatDate(item.endDate)}
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Icon
                  name="sun-o"
                  size={14}
                  color="#555"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.cardMeta}>{item.day}</Text>
              </View>
              <View style={styles.cardRow}>
                <Icon
                  name="clock-o"
                  size={14}
                  color="#555"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.cardMeta}>
                  {formatTime(item.startTime)} - {formatTime(item.endTime)}
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Icon
                  name="graduation-cap"
                  size={14}
                  color="#555"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.cardMeta}>
                  {item.program} {item.year}-{item.section}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AssignedSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  backArrow: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
  },
  cardRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  cardMeta: {
    fontSize: 12,
    color: "#555",
  },
});
