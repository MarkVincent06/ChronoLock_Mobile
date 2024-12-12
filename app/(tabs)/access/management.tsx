import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from "react-native";
import { Card, Button } from "@rneui/themed";

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
    startDate: "",
    endDate: "",
    day: "",
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState(null);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const addSchedule = () => {
    setScheduleData([...scheduleData, { id: Date.now(), ...form }]);
    resetForm();
    setModalVisible(false); // Close modal after adding
  };

  const deleteSchedule = (id) => {
    setScheduleData(scheduleData.filter(schedule => schedule.id !== id));
  };

  const updateSchedule = () => {
    setScheduleData(scheduleData.map(schedule =>
      schedule.id === editingScheduleId ? { ...schedule, ...form } : schedule
    ));
    resetForm();
    setModalVisible(false); // Close modal after updating
    setEditingScheduleId(null); // Reset editing state
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
      startDate: "",
      endDate: "",
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
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      day: schedule.day,
    });
    setEditingScheduleId(schedule.id);
    setModalVisible(true);
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
          <Text style={styles.descriptionText}>Provides faculty, staff, laboratory personnel with the ability to manage class schedules in the laboratory.</Text>
        </View>

        {/* Button to open the modal inside the card */}
        <TouchableOpacity style={styles.addButtonInsideCard} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Schedule</Text>
        </TouchableOpacity>
      </Card>

      {/* Modal for adding/updating schedule */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingScheduleId ? 'Update Schedule' : 'Add Schedule'}</Text>

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
            <TextInput
              style={styles.input}
              placeholder="Program"
              value={form.program}
              onChangeText={(value) => handleChange("program", value)}
            />
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
            <TextInput
              style={styles.input}
              placeholder="Start Time"
              value={form.startTime}
              onChangeText={(value) => handleChange("startTime", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="End Time"
              value={form.endTime}
              onChangeText={(value) => handleChange("endTime", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Date"
              value={form.startDate}
              onChangeText={(value) => handleChange("startDate", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="End Date"
              value={form.endDate}
              onChangeText={(value) => handleChange("endDate", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Day"
              value={form.day}
              onChangeText={(value) => handleChange("day", value)}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={editingScheduleId ? updateSchedule : addSchedule}
              >
                <Text style={styles.modalButtonText}>{editingScheduleId ? 'Update' : 'Save'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Display Schedule List */}
      <View style={styles.scheduleList}>
        {scheduleData.map(schedule => (
          <View key={schedule.id} style={styles.scheduleItem}>
            <Text>{schedule.courseName} - {schedule.courseCode}</Text>
            <Text>{schedule.startTime} - {schedule.endTime}</Text>
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
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  addButtonInsideCard: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  sectionContent: {
    marginTop: 1,
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scheduleList: {
    marginTop: 30,
  },
  scheduleItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  deleteText: {
    color: "red",
    marginTop: 10,
  },
  updateText: {
    color: "blue",
    marginTop: 10,
  },
});

export default AccessManagement;
