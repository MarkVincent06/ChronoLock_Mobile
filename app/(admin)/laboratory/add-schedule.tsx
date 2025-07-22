import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const Icon = Ionicon as any;

const AddSchedule = () => {
  const router = useRouter();
  type FormDataType = {
    courseCode: string;
    courseName: string;
    userID: string;
    instFirstName: string;
    instLastName: string;
    program: string;
    section: string;
    year: string;
    semester: string;
    schoolYear: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    day: string;
    scheduleStatus: string;
    scheduleType: string;
    [key: string]: string;
  };
  const [formData, setFormData] = React.useState<FormDataType>({
    courseCode: "",
    courseName: "",
    userID: "",
    instFirstName: "",
    instLastName: "",
    program: "",
    section: "",
    year: "",
    semester: "",
    schoolYear: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    day: "",
    scheduleStatus: "",
    scheduleType: "",
  });
  const [showPicker, setShowPicker] = React.useState<{
    type: "startTime" | "endTime" | "startDate" | "endDate" | null;
    show: boolean;
    mode: "date" | "time";
  }>({
    type: null,
    show: false,
    mode: "date",
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const dummyInstructors = [
    {
      idNumber: "2024001",
      userType: "Faculty",
      firstName: "Alice",
      lastName: "Smith",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      idNumber: "2024002",
      userType: "Lab-in-Charge",
      firstName: "Bob",
      lastName: "Johnson",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      idNumber: "2024003",
      userType: "Technician",
      firstName: "Carol",
      lastName: "Williams",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];
  const filteredInstructors = dummyInstructors.filter(
    (inst) =>
      inst.idNumber.includes(searchText) ||
      inst.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      inst.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDateTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (event.type === "dismissed") {
      setShowPicker({ type: null, show: false, mode: "date" });
      return;
    }
    if (showPicker.type && selectedDate) {
      let value = "";
      if (showPicker.mode === "date") {
        value = selectedDate.toISOString().split("T")[0];
      } else {
        // Format time as HH:mm
        const hours = selectedDate.getHours().toString().padStart(2, "0");
        const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
        value = `${hours}:${minutes}`;
      }
      setFormData({ ...formData, [showPicker.type]: value });
      setShowPicker({ type: null, show: false, mode: "date" });
    }
  };

  const handleCreateSchedule = () => {
    // List of required fields (excluding idNumber, instructorFirstName, instructorLastName)
    const requiredFields = [
      "courseCode",
      "courseName",
      "userID",
      "instFirstName",
      "instLastName",
      "program",
      "section",
      "year",
      "semester",
      "schoolYear",
      "startTime",
      "endTime",
      "startDate",
      "endDate",
      "day",
      "scheduleStatus",
      "scheduleType",
    ];
    const emptyField = requiredFields.find((field) => !formData[field]);
    if (emptyField) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Schedule Data:", formData);
    alert("Schedule created! (Check console for data)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backArrow}
        >
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Schedule</Text>
      </View>

      {/* FORM INPUTS */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={true}
      >
        {/* Course Code */}
        <Text style={styles.label}>Course Code</Text>
        <TextInput
          style={styles.input}
          value={formData.courseCode}
          onChangeText={(v) => setFormData({ ...formData, courseCode: v })}
          placeholder="eg. CCIS 102"
          placeholderTextColor="#b2b2b2"
        />
        {/* Course Name */}
        <Text style={styles.label}>Course Name</Text>
        <TextInput
          style={styles.input}
          value={formData.courseName}
          onChangeText={(v) => setFormData({ ...formData, courseName: v })}
          placeholder="eg. Computer Programming 1"
          placeholderTextColor="#b2b2b2"
        />
        {/* ID Number */}
        <Text style={styles.label}>ID Number</Text>
        <View style={styles.rowGroup}>
          <TouchableOpacity
            style={[styles.chooseButton, { flex: 0.6, marginRight: 8 }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.chooseButtonText}>Choose ID Number</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { flex: 0.4, backgroundColor: "#f0f0f0" }]}
            value={formData.userID}
            placeholder="ID Number"
            placeholderTextColor="#b2b2b2"
            editable={false}
          />
        </View>
        {/* Choose ID Number Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Choose Id number</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={22} color="#333" />
                </TouchableOpacity>
              </View>
              {/* Search Input */}
              <TextInput
                style={styles.modalSearchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search Id number..."
                placeholderTextColor="#b2b2b2"
              />
              {/* List */}
              <FlatList
                data={filteredInstructors}
                keyExtractor={(item) => item.idNumber}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.instructorItem}
                    onPress={() => {
                      setFormData({
                        ...formData,
                        userID: item.idNumber,
                        instFirstName: item.firstName,
                        instLastName: item.lastName,
                      });
                      setModalVisible(false);
                    }}
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.instructorAvatar}
                    />
                    <View style={styles.instructorInfo}>
                      <Text style={styles.instructorIdType}>
                        {item.idNumber} - {item.userType}
                      </Text>
                      <Text style={styles.instructorName}>
                        {item.firstName} {item.lastName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                style={{ flexGrow: 0, maxHeight: 250 }}
              />
            </View>
          </View>
        </Modal>
        {/* Instructor Name (disabled, grouped) */}
        <Text style={styles.label}>Instructor Name</Text>
        <View style={styles.rowGroup}>
          <TextInput
            style={[
              styles.input,
              styles.inputHalf,
              { marginRight: 8, backgroundColor: "#f0f0f0" },
            ]}
            value={formData.instFirstName}
            placeholder="First Name"
            placeholderTextColor="#b2b2b2"
            editable={false}
          />
          <TextInput
            style={[
              styles.input,
              styles.inputHalf,
              { backgroundColor: "#f0f0f0" },
            ]}
            value={formData.instLastName}
            placeholder="Last Name"
            placeholderTextColor="#b2b2b2"
            editable={false}
          />
        </View>
        {/* Program, Year, Section (grouped) */}
        <Text style={styles.label}>Program, Year, Section</Text>
        <View style={styles.rowGroup}>
          <TextInput
            style={[styles.input, styles.inputThird, { marginRight: 8 }]}
            value={formData.program}
            onChangeText={(v) => setFormData({ ...formData, program: v })}
            placeholder="eg. BSIT"
            placeholderTextColor="#b2b2b2"
          />
          <TextInput
            style={[styles.input, styles.inputThird, { marginRight: 8 }]}
            value={formData.year}
            onChangeText={(v) => setFormData({ ...formData, year: v })}
            placeholder="eg. 4"
            placeholderTextColor="#b2b2b2"
          />
          <TextInput
            style={[styles.input, styles.inputThird]}
            value={formData.section}
            onChangeText={(v) => setFormData({ ...formData, section: v })}
            placeholder="eg. F"
            placeholderTextColor="#b2b2b2"
          />
        </View>
        {/* Semester */}
        <Text style={styles.label}>Semester</Text>
        <View style={[styles.input, { padding: 0, justifyContent: "center" }]}>
          <Picker
            selectedValue={formData.semester}
            style={{ flex: 1, height: 55, color: "#000" }}
            dropdownIconColor="#000"
            onValueChange={(itemValue) =>
              setFormData({ ...formData, semester: itemValue })
            }
          >
            <Picker.Item label="Choose semester" value="" />
            <Picker.Item label="1st Semester" value="1st Semester" />
            <Picker.Item label="2nd Semester" value="2nd Semester" />
          </Picker>
        </View>
        {/* School Year */}
        <Text style={styles.label}>School Year</Text>
        <TextInput
          style={styles.input}
          value={formData.schoolYear}
          onChangeText={(v) => setFormData({ ...formData, schoolYear: v })}
          placeholder="eg. 2024-2025"
          placeholderTextColor="#b2b2b2"
        />
        {/* Start Time, End Time (grouped) */}
        <Text style={styles.label}>Start Time, End Time</Text>
        <View style={styles.rowGroup}>
          <View
            style={[
              styles.input,
              styles.inputHalf,
              { marginRight: 8, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <TextInput
              style={{ flex: 1, backgroundColor: "#fff" }}
              value={formData.startTime}
              placeholder="Select start time"
              placeholderTextColor="#b2b2b2"
              editable={false}
            />
            <TouchableOpacity
              onPress={() =>
                setShowPicker({ type: "startTime", show: true, mode: "time" })
              }
            >
              <Icon
                name="clock-o"
                size={20}
                color="#007bff"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.input,
              styles.inputHalf,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <TextInput
              style={{ flex: 1, backgroundColor: "#fff" }}
              value={formData.endTime}
              placeholder="Select end time"
              placeholderTextColor="#b2b2b2"
              editable={false}
            />
            <TouchableOpacity
              onPress={() =>
                setShowPicker({ type: "endTime", show: true, mode: "time" })
              }
            >
              <Icon
                name="clock-o"
                size={20}
                color="#007bff"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Start Date, End Date (grouped) */}
        <Text style={styles.label}>Start Date, End Date</Text>
        <View style={styles.rowGroup}>
          <View
            style={[
              styles.input,
              styles.inputHalf,
              { marginRight: 8, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <TextInput
              style={{ flex: 1, backgroundColor: "#fff" }}
              value={formData.startDate}
              placeholder="Select start date"
              placeholderTextColor="#b2b2b2"
              editable={false}
            />
            <TouchableOpacity
              onPress={() =>
                setShowPicker({ type: "startDate", show: true, mode: "date" })
              }
            >
              <Icon
                name="calendar"
                size={18}
                color="#007bff"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.input,
              styles.inputHalf,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <TextInput
              style={{ flex: 1, backgroundColor: "#fff" }}
              value={formData.endDate}
              placeholder="Select end date"
              placeholderTextColor="#b2b2b2"
              editable={false}
            />
            <TouchableOpacity
              onPress={() =>
                setShowPicker({ type: "endDate", show: true, mode: "date" })
              }
            >
              <Icon
                name="calendar"
                size={18}
                color="#007bff"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {showPicker.show && (
          <DateTimePicker
            value={new Date()}
            mode={showPicker.mode}
            is24Hour={true}
            display="default"
            onChange={handleDateTimeChange}
          />
        )}
        {/* Day Picker */}
        <Text style={styles.label}>Day</Text>
        <View style={[styles.input, { padding: 0, justifyContent: "center" }]}>
          <Picker
            selectedValue={formData.day}
            style={{ flex: 1, height: 55, color: "#000" }}
            dropdownIconColor="#000"
            onValueChange={(itemValue) =>
              setFormData({ ...formData, day: itemValue })
            }
          >
            <Picker.Item label="Choose day" value="" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </View>
        {/* Schedule Status */}
        <Text style={styles.label}>Schedule Status</Text>
        <View style={[styles.input, { padding: 0, justifyContent: "center" }]}>
          <Picker
            selectedValue={formData.scheduleStatus}
            style={{ flex: 1, height: 55, color: "#000" }}
            dropdownIconColor="#000"
            onValueChange={(itemValue) =>
              setFormData({ ...formData, scheduleStatus: itemValue })
            }
          >
            <Picker.Item label="Choose status" value="" />
            <Picker.Item label="Unscheduled" value="unscheduled" />
            <Picker.Item label="With Class" value="With Class" />
          </Picker>
        </View>
        {/* Schedule Type */}
        <Text style={styles.label}>Schedule Type</Text>
        <View style={[styles.input, { padding: 0, justifyContent: "center" }]}>
          <Picker
            selectedValue={formData.scheduleType}
            style={{ flex: 1, height: 55, color: "#000" }}
            dropdownIconColor="#000"
            onValueChange={(itemValue) =>
              setFormData({ ...formData, scheduleType: itemValue })
            }
          >
            <Picker.Item label="Choose type" value="" />
            <Picker.Item label="Regular" value="regularSchedule" />
            <Picker.Item label="Make-up class" value="makeUpSchedule" />
          </Picker>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateSchedule}
      >
        <Text style={styles.createButtonText}>Create Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSchedule;

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
  formContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  chooseButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  chooseButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  rowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputHalf: {
    flex: 1,
  },
  inputThird: {
    flex: 1,
  },
  createButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
    marginBottom: 10,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  modalSearchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  instructorItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: "#e0e0e0",
  },
  instructorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  instructorIdType: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  instructorName: {
    fontSize: 14,
    color: "#666",
  },
});
