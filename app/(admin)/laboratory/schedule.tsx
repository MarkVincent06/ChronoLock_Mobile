import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const LaboratorySchedule = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const router = useRouter();

  const scheduleData = [
    {
      date: "2024-09-02",
      events: [
        {
          courseCode: "CCIS 104",
          courseName: "Data Structures & Algorithms",
          startTime: "07:00:00",
          endTime: "10:00:00",
          instructor: "Mac Dancalan",
        },
        {
          courseCode: "IS 317",
          courseName: "Database Architecture",
          startTime: "10:00:00",
          endTime: "13:00:00",
          instructor: "Jeremy Jireh Neo",
        },
      ],
    },
    {
      date: "2024-09-06",
      events: [
        {
          courseCode: "CCIS 104",
          courseName: "Event Driven Programming",
          startTime: "07:00:00",
          endTime: "10:00:00",
          instructor: "Mac Dancalan",
        },
        {
          courseCode: "IS 317",
          courseName: "Web Development",
          startTime: "10:00:00",
          endTime: "13:00:00",
          instructor: "Jeremy Jireh Neo",
        },
      ],
    },
  ];

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
    return scheduleData.find((d) => d.date === date)?.events || [];
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
    const today = new Date(); // Current date

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
                        {eventsForDay.length} Schedules
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backArrow}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>ERP Schedule Monitoring</Text>
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
      <ScrollView>{generateMonthView()}</ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Schedule for {selectedDate}</Text>
          {getEventsForDate(selectedDate).length > 0 ? (
            <FlatList
              data={getEventsForDate(selectedDate)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.modalEventCard}>
                  <Text style={styles.modalEventText}>
                    {item.courseCode}: {item.courseName}
                  </Text>
                  <Text style={styles.modalEventText}>
                    {item.startTime} - {item.endTime}
                  </Text>
                  <Text style={styles.modalEventText}>
                    Instructor: {item.instructor}
                  </Text>
                </View>
              )}
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
    marginVertical: 10,
  },
  backArrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
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
});
