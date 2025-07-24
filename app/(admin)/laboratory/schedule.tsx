import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicon from "react-native-vector-icons/FontAwesome";
import API_URL from "@/config/ngrok-api";
import usePullToRefresh from "@/hooks/usePullToRefresh";

const Icon = Ionicon as any;

const LaboratorySchedule = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  interface Schedule {
    date: string;
    events: Array<{
      courseCode: string;
      courseName: string;
      startTime: string;
      endTime: string;
      instructor: string;
      day: string; // Day of the week (e.g., Monday)
      startDate: string;
      endDate: string;
    }>;
  }

  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formatDate = (date: string | null) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
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

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/schedules/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        // Filter and group schedules based on the start and end dates
        const filteredSchedules: { [key: string]: { events: any[] } } = {};

        data.data.forEach((schedule: any) => {
          const {
            startDate,
            endDate,
            courseCode,
            courseName,
            startTime,
            endTime,
            instFirstName,
            instLastName,
            day,
          } = schedule;

          let currentDate = new Date(startDate);
          currentDate.setHours(currentDate.getHours() + 8);
          const lastDate = new Date(endDate);

          while (currentDate <= lastDate) {
            if (currentDate.getDay() === getDayOfWeek(day)) {
              const dateString = currentDate.toISOString().split("T")[0];
              if (!filteredSchedules[dateString]) {
                filteredSchedules[dateString] = { events: [] };
              }
              filteredSchedules[dateString].events.push({
                courseCode,
                courseName,
                startTime,
                endTime,
                instructor: `${instFirstName} ${instLastName}`,
                day,
                startDate,
                endDate,
              });
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

        // Convert filteredSchedules into an array of schedules
        const formattedSchedules = Object.keys(filteredSchedules).map(
          (date) => ({
            date,
            events: filteredSchedules[date].events,
          })
        );

        setScheduleData(formattedSchedules);
      } else {
        console.error("Invalid or empty data received:", data.message || data);
        setScheduleData([]);
      }
    } catch (error) {
      console.error(
        "Error fetching schedules:",
        error instanceof Error ? error.message : error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await fetchSchedules();
  };
  const { refreshing, onRefresh } = usePullToRefresh(fetchData);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const getDayOfWeek = (day: string) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Convert full day names to abbreviated names
    const fullDayNames = {
      Sunday: "Sun",
      Monday: "Mon",
      Tuesday: "Tue",
      Wednesday: "Wed",
      Thursday: "Thu",
      Friday: "Fri",
      Saturday: "Sat",
    };

    if (fullDayNames[day as keyof typeof fullDayNames]) {
      day = fullDayNames[day as keyof typeof fullDayNames];
    }

    return days.indexOf(day);
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const getMonthList = () => {
    const start = new Date("2024-08-01");
    const end = new Date();
    const months = [];
    let current = new Date(start);

    while (current <= end) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }

    return months.reverse();
  };

  const getEventsForDate = (date: string | null) => {
    return (
      scheduleData.find((schedule) => schedule.date === date)?.events || []
    );
  };

  const generateMonthView = () => {
    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayOffset = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    ).getDay();
    const weeks = [];
    let currentWeek = Array(firstDayOffset).fill(null);
    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    }
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);

    return weeks.map((week, i) => (
      <View key={i} style={styles.weekRow}>
        {week.map((day, j) => {
          const dateKey = day
            ? `${selectedMonth.getFullYear()}-${(selectedMonth.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
            : null;
          const isToday =
            day &&
            today.getFullYear() === selectedMonth.getFullYear() &&
            today.getMonth() === selectedMonth.getMonth() &&
            today.getDate() === day;
          const eventsForDay = getEventsForDate(dateKey);
          const hasEvents = eventsForDay.length > 0;

          return (
            <TouchableOpacity
              key={j}
              style={[styles.dayCell, hasEvents && styles.dayWithEvents]}
              onPress={() => {
                if (day) {
                  setSelectedDate(dateKey);
                  setModalVisible(true);
                }
              }}
            >
              {day && (
                <>
                  <View
                    style={[
                      styles.dayNumberContainer,
                      isToday && styles.todayIndicator,
                    ]}
                  >
                    <Text
                      style={[styles.dayNumber, isToday && styles.todayText]}
                    >
                      {day}
                    </Text>
                  </View>
                  {hasEvents && (
                    <View style={styles.eventIndicator}>
                      <Text style={styles.eventPreviewText}>
                        {eventsForDay.length} Schedule
                        {eventsForDay.length > 1 ? "s" : ""}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(selectedMonth.getMonth() - 1);
    setSelectedMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(selectedMonth.getMonth() + 1);
    setSelectedMonth(newMonth);
  };

  const isNextDisabled = () => {
    const currentMonth = new Date();
    return (
      selectedMonth.getFullYear() === currentMonth.getFullYear() &&
      selectedMonth.getMonth() === currentMonth.getMonth()
    );
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading schedules, please wait...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backArrow}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>ERP Schedule</Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity
          style={[
            styles.appointedScheduleButton,
            { flex: 0.6, marginRight: 6 },
          ]}
          onPress={() => router.push("/laboratory/appointed-schedule")}
        >
          <Icon
            name="calendar"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.appointedScheduleButtonText}>
            Appointed Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addScheduleButton, { flex: 0.4 }]}
          onPress={() => router.push("/laboratory/add-schedule")}
        >
          <Icon name="plus" size={16} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addScheduleButtonText}>Add Schedule</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.arrow}>
          <Icon name="chevron-left" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMonthModalVisible(true)}
          style={styles.monthButton}
        >
          <Text style={styles.monthText}>{getMonthName(selectedMonth)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextMonth}
          disabled={isNextDisabled()}
          style={[styles.arrow, isNextDisabled() && styles.disabledArrow]}
        >
          <Icon
            name="chevron-right"
            size={20}
            color={isNextDisabled() ? "#aaa" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.weekHeader}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {generateMonthView()}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Schedule for {formatDate(selectedDate)}
          </Text>
          {getEventsForDate(selectedDate).length > 0 ? (
            <FlatList
              data={getEventsForDate(selectedDate)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.scheduleItemContainerModal}>
                  <Text style={styles.scheduleLabelModal}>
                    Course:{" "}
                    <Text style={styles.scheduleValueModal}>
                      {item.courseCode} - {item.courseName}
                    </Text>
                  </Text>
                  <Text style={styles.scheduleLabelModal}>
                    Time:{" "}
                    <Text style={styles.scheduleValueModal}>
                      {formatTime(item.startTime)} - {formatTime(item.endTime)}
                    </Text>
                  </Text>
                  <Text style={styles.scheduleLabelModal}>
                    Instructor:{" "}
                    <Text style={styles.scheduleValueModal}>
                      {item.instructor}
                    </Text>
                  </Text>
                </View>
              )}
              style={{ marginBottom: 10 }}
            />
          ) : (
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEventsText}>
                No schedules for this date.
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={monthModalVisible}
        onRequestClose={() => setMonthModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Month</Text>
          <FlatList
            data={getMonthList()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalEventCard}
                onPress={() => {
                  setSelectedMonth(item);
                  setMonthModalVisible(false);
                }}
              >
                <Text style={styles.modalEventText}>{getMonthName(item)}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setMonthModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default LaboratorySchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
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
    flex: 1,
  },
  appointedScheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
  },
  appointedScheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  addScheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    justifyContent: "center",
  },
  addScheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  arrow: {
    padding: 10,
  },
  disabledArrow: {
    opacity: 0.3,
  },
  disabledArrowText: {
    color: "#aaa",
  },
  monthTouchable: {
    flex: 1,
    alignItems: "center",
  },
  monthButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  monthText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  dayCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    minHeight: 80,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  dayWithEvents: {
    backgroundColor: "#e6f7ff",
    borderColor: "#007bff",
  },
  dayNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  todayIndicator: {
    backgroundColor: "#007bff",
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  todayText: {
    color: "#fff",
  },
  eventIndicator: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: "#007bff",
    borderRadius: 3,
  },
  eventPreviewText: {
    fontSize: 10,
    color: "#fff",
    textAlign: "center",
  },
  eventPreview: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalEventCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  modalEventText: {
    fontSize: 14,
    marginBottom: 5,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  noEventsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  scheduleItemContainerModal: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 14,
    marginBottom: 12,
  },
  scheduleLabelModal: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    fontWeight: "600",
  },
  scheduleValueModal: {
    fontWeight: "400",
    color: "#444",
  },
});
