import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";

const AccessManagement = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    program: "",
    section: "",
    year: "",
    startTime: "",
    endTime: "",
    startDate: new Date(),
    endDate: new Date(),
    day: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const addSchedule = () => {
    setScheduleData([...scheduleData, { id: Date.now(), ...form }]);
    resetForm();
    setModalVisible(false);
  };

  const deleteSchedule = (id) => {
    setScheduleData(scheduleData.filter((schedule) => schedule.id !== id));
  };

  const updateSchedule = () => {
    setScheduleData(
      scheduleData.map((schedule) =>
        schedule.id === editingScheduleId ? { ...schedule, ...form } : schedule
      )
    );
    resetForm();
    setModalVisible(false);
    setEditingScheduleId(null);
  };

  const resetForm = () => {
    setForm({
      courseCode: "",
      courseName: "",
      program: "",
      section: "",
      year: "",
      startTime: "",
      endTime: "",
      startDate: new Date(),
      endDate: new Date(),
      day: "",
    });
  };

  const openEditModal = (schedule) => {
    setForm({
      courseCode: schedule.courseCode,
      courseName: schedule.courseName,
      program: schedule.program,
      section: schedule.section,
      year: schedule.year,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      startDate: new Date(schedule.startDate),
      endDate: new Date(schedule.endDate),
      day: schedule.day,
    });
    setEditingScheduleId(schedule.id);
    setModalVisible(true);
  };

  const onDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || form.startDate;
    if (type === "start") {
      setForm({ ...form, startDate: currentDate });
      setShowStartDatePicker(false);
    } else {
      setForm({ ...form, endDate: currentDate });
      setShowEndDatePicker(false);
    }
  };

  const onTimeChange = (event, selectedTime, type) => {
    const currentTime = selectedTime || form.startTime;
    if (type === "start") {
      setForm({ ...form, startTime: currentTime });
      setShowStartTimePicker(false);
    } else {
      setForm({ ...form, endTime: currentTime });
      setShowEndTimePicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Management</Text>
      <Text style={styles.description}>Manage user access permissions, schedules, and more.</Text>

      {/* Card for displaying additional information */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Manage Schedules</Card.Title>
        <Card.Divider />
        <View style={styles.sectionContent}>
          <Text style={styles.descriptionText}>
            Provides faculty, staff, laboratory personnel with the ability to manage class schedules in the laboratory.
          </Text>
        </View>

        {/* Button to open the modal inside the card */}
        <TouchableOpacity
          style={styles.addButtonInsideCard}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Schedule</Text>
        </TouchableOpacity>
      </Card>

{/* Button to update schedule (only visible when editing a schedule) */}
{editingScheduleId && (
    <TouchableOpacity
      style={styles.addButtonInsideCard}
      onPress={() => setModalVisible(true)} // Opens the modal for updating
    >
      <Text style={styles.addButtonText}>Update Schedule</Text>
    </TouchableOpacity>
  )}
      {/* Modal for adding/updating schedule */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingScheduleId ? "Update Schedule" : "Add Schedule"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Course Code"
              value={form.courseCode}
              onChangeText={(value) => handleChange("courseCode", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Course Name"
              value={form.courseName}
              onChangeText={(value) => handleChange("courseName", value)}
            />

            <Picker
              selectedValue={form.program}
              onValueChange={(value) => handleChange("program", value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Program" value="" />
              <Picker.Item label="BSIT" value="BSIT" />
              <Picker.Item label="BSIS" value="BSIS" />
              <Picker.Item label="BSCS" value="BSCS" />
              <Picker.Item label="BLIS" value="BLIS" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Section"
              value={form.section}
              onChangeText={(value) => handleChange("section", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Year"
              value={form.year}
              onChangeText={(value) => handleChange("year", value)}
            />

            {/* Start Time Picker */}
            <TouchableOpacity
              onPress={() => setShowStartTimePicker(true)}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                Start Time: {form.startTime ? form.startTime.toLocaleTimeString() : "Select Time"}
              </Text>
            </TouchableOpacity>

            {/* End Time Picker */}
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                End Time: {form.endTime ? form.endTime.toLocaleTimeString() : "Select Time"}
              </Text>
            </TouchableOpacity>

            {showStartTimePicker && (
              <DateTimePicker
                value={form.startTime || new Date()}
                mode="time"
                display="default"
                onChange={(event, time) => onTimeChange(event, time, "start")}
              />
            )}

            {showEndTimePicker && (
              <DateTimePicker
                value={form.endTime || new Date()}
                mode="time"
                display="default"
                onChange={(event, time) => onTimeChange(event, time, "end")}
              />
            )}

            {/* Start Date Picker */}
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                Start Date: {form.startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {/* End Date Picker */}
            <TouchableOpacity
              onPress={() => setShowEndDatePicker(true)}
              style={styles.dateButton}
            >
              <Text style={styles.dateButtonText}>
                End Date: {form.endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showStartDatePicker && (
              <DateTimePicker
                value={form.startDate}
                mode="date"
                display="default"
                onChange={(event, date) => onDateChange(event, date, "start")}
              />
            )}

            {showEndDatePicker && (
              <DateTimePicker
                value={form.endDate}
                mode="date"
                display="default"
                onChange={(event, date) => onDateChange(event, date, "end")}
              />
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={editingScheduleId ? updateSchedule : addSchedule}
              >
                <Text style={styles.modalButtonText}>
                  {editingScheduleId ? "Update" : "Save"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Display Schedule List */}
      <View style={styles.scheduleList}>
        {scheduleData.map((schedule) => (
          <View key={schedule.id} style={styles.scheduleItem}>
            <Text>
              {schedule.courseName} - {schedule.courseCode}
            </Text>
            <Text>
              {schedule.startTime} - {schedule.endTime}
            </Text>
            <TouchableOpacity onPress={() => deleteSchedule(schedule.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openEditModal(schedule)}>
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },
  sectionContent: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: "#888",
  },
  addButtonInsideCard: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scheduleList: {
    marginTop: 20,
  },
  scheduleItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  deleteText: {
    color: "#ff0000",
    fontSize: 14,
    marginTop: 10,
  },
  updateText: {
    color: "#007BFF",
    fontSize: 14,
    marginTop: 10,
  },
});

export default AccessManagement;
