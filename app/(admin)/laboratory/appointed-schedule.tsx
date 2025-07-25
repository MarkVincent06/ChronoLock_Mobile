import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Icon = Ionicon as any;
const MaterialIconComponent = MaterialIcon as any;

const AppointedSchedule = () => {
  const router = useRouter();
  const [semester, setSemester] = React.useState("2nd Semester,2025-2026");
  const [scheduleType, setScheduleType] = React.useState("regularSchedule");
  const [schedules, setSchedules] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

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

  React.useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/schedules/`);
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setSchedules(res.data.data);
        } else {
          setSchedules([]);
          alert(res.data.message || "No schedules found.");
        }
      } catch (error: any) {
        setSchedules([]);
        alert(
          error.response?.data?.message ||
            "An error occurred while fetching schedules."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  // Filtering logic for schedule list
  // Parse selected semester and school year from semester picker value
  let selectedSemester = "";
  let selectedSchoolYear = "";
  if (semester) {
    const [sem, year] = semester.split(",");
    selectedSemester = sem?.trim();
    selectedSchoolYear = year?.trim();
  }
  const filteredSchedules = schedules.filter((item) => {
    const matchesSemester = selectedSemester
      ? item.semester?.toLowerCase().includes(selectedSemester.toLowerCase())
      : true;
    const matchesSchoolYear = selectedSchoolYear
      ? item.schoolYear
          ?.toLowerCase()
          .includes(selectedSchoolYear.toLowerCase())
      : true;
    const matchesType = scheduleType
      ? item.scheduleType === scheduleType
      : true;
    return matchesSemester && matchesSchoolYear && matchesType;
  });

  // Enhanced sorting for schedules
  const getDayIndex = (day: string) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // Accept both full and abbreviated day names
    const abbr = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    if (Object.prototype.hasOwnProperty.call(abbr, day))
      return abbr[day as keyof typeof abbr];
    return days.findIndex((d) => d.toLowerCase() === day.toLowerCase());
  };
  const now = new Date();
  const todayIdx = now.getDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const parseTimeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    const aDayIdx = getDayIndex(a.day);
    const bDayIdx = getDayIndex(b.day);
    // Calculate day difference from today (0 = today, 1 = tomorrow, ...)
    const aDayDiff = (aDayIdx - todayIdx + 7) % 7;
    const bDayDiff = (bDayIdx - todayIdx + 7) % 7;
    if (aDayDiff !== bDayDiff) return aDayDiff - bDayDiff;
    // If both are today, prioritize those with start time >= now
    if (aDayDiff === 0) {
      const aStart = parseTimeToMinutes(a.startTime);
      const bStart = parseTimeToMinutes(b.startTime);
      const aFuture = aStart >= nowMinutes;
      const bFuture = bStart >= nowMinutes;
      if (aFuture !== bFuture) return bFuture ? 1 : -1; // future first
      return aStart - bStart;
    }
    // For other days, sort by start time ascending
    return parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime);
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backArrow}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Appointed Schedule</Text>
      </View>

      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={semester}
            style={{ color: "#000" }}
            dropdownIconColor="#000"
            onValueChange={setSemester}
          >
            <Picker.Item
              style={styles.pickerItem}
              label="2nd Sem 2025-2026"
              value="2nd Semester,2025-2026"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="1st Sem 2025-2026"
              value="1st Semester,2025-2026"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="2nd Sem 2024-2025"
              value="2nd Semester,2024-2025"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="1st Sem 2024-2025"
              value="1st Semester,2024-2025"
            />
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={scheduleType}
            style={{ color: "#000", fontSize: 8 }}
            dropdownIconColor="#000"
            onValueChange={setScheduleType}
          >
            <Picker.Item
              style={styles.pickerItem}
              label="Regular Schedule"
              value="regularSchedule"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="Make Up Schedule"
              value="makeUpSchedule"
            />
          </Picker>
        </View>
      </View>
      {/* Schedule List */}
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <Text style={{ color: "#888", fontSize: 16 }}>
            Loading schedules...
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedSchedules}
          keyExtractor={(item) => String(item.scheduleID)}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: "#888", fontSize: 16 }}>
                No schedules found.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.scheduleItemContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.scheduleLabel}>
                  Prog, Yr & Section:{" "}
                  <Text style={styles.scheduleValue}>
                    {item.program} {item.year}-{item.section}
                  </Text>
                </Text>
                <Text style={styles.scheduleLabel}>
                  Course:{" "}
                  <Text style={styles.scheduleValue}>
                    {item.courseCode} - {item.courseName}
                  </Text>
                </Text>
                <Text style={styles.scheduleLabel}>
                  Status:{" "}
                  <Text
                    style={[
                      styles.scheduleValue,
                      item.scheduleStatus === "With Class"
                        ? { color: "green" }
                        : { color: "red" },
                    ]}
                  >
                    {item.scheduleStatus}
                  </Text>
                </Text>
                <Text style={styles.scheduleLabel}>
                  Time:{" "}
                  <Text style={styles.scheduleValue}>
                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                  </Text>
                </Text>
                <Text style={styles.scheduleLabel}>
                  Day: <Text style={styles.scheduleValue}>{item.day}</Text>
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                      router.push({
                        pathname: "/laboratory/edit-schedule",
                        params: { scheduleID: item.scheduleID },
                      })
                    }
                  >
                    <Icon
                      name="pencil"
                      size={16}
                      color="#fff"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.editButtonText}>Edit Schedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      console.log("Delete scheduleID:", item.scheduleID)
                    }
                  >
                    <MaterialIconComponent
                      name="delete"
                      size={18}
                      color="#fff"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.deleteButtonText}>Delete Schedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AppointedSchedule;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  backArrow: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 15,
    flex: 1,
  },
  pickerContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
    height: 50,
  },
  picker: {
    flex: 1,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
  },
  pickerItem: {
    fontSize: 11,
  },
  scheduleItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  scheduleLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    fontWeight: "600",
  },
  scheduleValue: {
    fontWeight: "400",
    color: "#444",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
