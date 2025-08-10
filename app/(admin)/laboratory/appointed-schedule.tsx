import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import API_URL from "@/config/ngrok-api";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import usePullToRefresh from "@/hooks/usePullToRefresh";

const Icon = Ionicon as any;
const MaterialIconComponent = MaterialIcon as any;

const AppointedSchedule = () => {
  const router = useRouter();
  const [semester, setSemester] = React.useState("2nd Semester,2025-2026");
  const [scheduleType, setScheduleType] = React.useState("regularSchedule");
  const [schedules, setSchedules] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

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

  const fetchData = async () => {
    await fetchSchedules();
  };
  const { refreshing, onRefresh } = usePullToRefresh(fetchData);

  React.useEffect(() => {
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

  // Delete schedule function
  const handleDeleteSchedule = (scheduleID: number) => {
    if (deleting) return;
    Alert.alert(
      "Delete Schedule",
      "Are you sure you want to delete this schedule? This will also delete all class lists and students enrolled into it. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDeleting(true);
            axios
              .delete(`${API_URL}/schedules/${scheduleID}`)
              .then((res) => {
                if (res.data && res.data.success) {
                  Alert.alert(
                    "Success",
                    "Schedule has been deleted successfully.",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          router.dismissAll();
                          router.push("/laboratory/appointed-schedule");
                        },
                      },
                    ]
                  );
                } else {
                  Alert.alert(
                    "Error",
                    res.data.message || "Failed to delete schedule."
                  );
                }
              })
              .catch((err) => {
                Alert.alert(
                  "Error",
                  err.response?.data?.message ||
                    "An error occurred while deleting the schedule."
                );
              })
              .finally(() => setDeleting(false));
          },
        },
      ]
    );
  };

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: "#888", fontSize: 16 }}>
                No schedules found.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.scheduleItemContainer}>
              <View style={styles.topRow}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.courseCode} · {item.courseName}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    item.scheduleStatus === "With Class"
                      ? styles.statusWithClass
                      : styles.statusNoClass,
                  ]}
                >
                  <Text style={styles.statusBadgeText}>
                    {item.scheduleStatus}
                  </Text>
                </View>
              </View>

              <View style={styles.metaChipsRow}>
                <View style={styles.chip}>
                  <MaterialIconComponent
                    name="school"
                    size={12}
                    color="#555"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.chipText}>
                    {item.program} {item.year}-{item.section}
                  </Text>
                </View>
                <View style={styles.chip}>
                  <MaterialIconComponent
                    name="event"
                    size={12}
                    color="#555"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.chipText}>{item.day}</Text>
                </View>
                <View style={styles.chip}>
                  <MaterialIconComponent
                    name="schedule"
                    size={12}
                    color="#555"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.chipText}>
                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                  </Text>
                </View>
              </View>

              <View style={styles.instructorRow}>
                <MaterialIconComponent
                  name="person"
                  size={14}
                  color="#555"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.instructor} numberOfLines={1}>
                  {item.instFirstName} {item.instLastName}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteSchedule(item.scheduleID)}
                >
                  <MaterialIconComponent
                    name="delete"
                    size={16}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
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
                    size={14}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
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
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginRight: 10,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusWithClass: {
    backgroundColor: "#e7f7ef",
  },
  statusNoClass: {
    backgroundColor: "#fde8e8",
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2e7d32",
  },
  metaChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f9fafb",
  },
  chipText: {
    fontSize: 11,
    color: "#444",
  },
  instructorRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  instructor: {
    fontSize: 12,
    color: "#666",
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
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
