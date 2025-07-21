import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { format, toZonedTime } from "date-fns-tz";
import { useUserContext } from "@/context/UserContext";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import API_URL from "@/config/ngrok-api";

// API Service Functions
const fetchEquipmentList = async (callback: (data: any) => void) => {
  try {
    const response = await axios.get(`${API_URL}/equipments/`);
    callback(response.data);
  } catch (error) {
    console.error("Error fetching equipment list", error);
    Alert.alert("Error", "Failed to fetch equipment list.");
  }
};

const reportIssue = async (
  data: any,
  onSuccess: () => void,
  onError: () => void
) => {
  try {
    await axios.post(`${API_URL}/equipments/issues`, data);
    onSuccess();
  } catch (error) {
    console.error("Error reporting the issue", error);
    onError();
  }
};

const fetchUserIssues = async (
  userId: string,
  callback: (data: any) => void,
  onError: () => void
) => {
  try {
    const response = await axios.get(
      `${API_URL}/equipments/issues/user/${userId}`
    );
    callback(response.data);
  } catch (error) {
    console.error("Error fetching user's issues", error);
    onError();
  }
};

const ReportIssue = () => {
  const { user } = useUserContext();
  const [equipmentList, setEquipmentList] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Select Priority");
  const [myIssues, setMyIssues] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { refreshing, onRefresh } = usePullToRefresh(() =>
    fetchEquipmentList(setEquipmentList)
  );

  const handleSubmit = () => {
    if (
      !selectedEquipment ||
      !title ||
      !description ||
      priority === "Select Priority"
    ) {
      Alert.alert("Error", "All fields, including priority, are required!");
      return;
    }

    const data = {
      equipment_id: selectedEquipment,
      reported_by: user?.id,
      title,
      description,
      priority,
    };

    reportIssue(
      data,
      () => {
        Alert.alert("Success", "Issue reported successfully");
        setTitle("");
        setDescription("");
        setPriority("Select Priority");
        fetchEquipmentList(setEquipmentList); // Refresh equipment list
      },
      () => Alert.alert("Error", "Failed to report the issue")
    );
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const fetchIssues = () => {
    if (user) {
      setIsLoading(true);
      fetchUserIssues(
        user.id.toString(),
        (data) => {
          setMyIssues(data);
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          Alert.alert("Error", "Failed to fetch your issues.");
        }
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const timeZone = "Asia/Manila";
    const zonedDate = toZonedTime(date, timeZone);

    return format(zonedDate, "MMMM dd, yyyy hh:mm a"); // Example: January 05, 2025 02:30 PM
  };

  useEffect(() => {
    fetchEquipmentList(setEquipmentList); // Initial fetch
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      fetchIssues();
    }
  }, [isModalVisible]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>Report an Equipment Issue</Text>
      <Text style={styles.description}>
        Please provide details about the issue to help us resolve it quickly.
      </Text>

      <Picker
        selectedValue={selectedEquipment}
        dropdownIconColor="#888"
        onValueChange={(itemValue: string) => setSelectedEquipment(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Equipment" value="" />
        {equipmentList.map((equipment) => (
          <Picker.Item
            key={equipment.id}
            label={equipment.name}
            value={equipment.id}
          />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Issue Title"
        placeholderTextColor="#b2b2b2"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Issue Description"
        placeholderTextColor="#b2b2b2"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Picker
        selectedValue={priority}
        onValueChange={(itemValue) => setPriority(itemValue)}
        style={styles.input}
        dropdownIconColor="#888"
      >
        <Picker.Item label="Select Priority" value="Select Priority" />
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Report Issue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ff9800" }]}
        onPress={toggleModal}
      >
        <Text style={styles.buttonText}>My Issues</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>My Reported Issues</Text>

          {isLoading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <ScrollView style={styles.scrollContainer}>
              {myIssues.length > 0 ? (
                myIssues.map((issue, index) => {
                  const statusColor =
                    issue.status === "Pending"
                      ? "gray"
                      : issue.status === "Fixing"
                      ? "orange"
                      : issue.status === "Resolved"
                      ? "green"
                      : "blue"; // For 'Closed'

                  const priorityColor =
                    issue.priority === "Low"
                      ? "green"
                      : issue.priority === "Medium"
                      ? "orange"
                      : "red"; // For 'High'

                  return (
                    <View key={issue.id} style={styles.issueCard}>
                      <Text style={styles.issueTitle}>
                        #{index + 1} - {issue.title}
                      </Text>
                      <Text
                        style={[styles.issueDescription, { color: "#000" }]}
                      >
                        {issue.description}
                      </Text>
                      <Text style={{ color: statusColor }}>
                        Status: {issue.status}
                      </Text>
                      <Text style={{ color: priorityColor }}>
                        Priority: {issue.priority}
                      </Text>
                      <Text style={{ color: "#888" }}>
                        Date Issued: {formatDate(issue.created_at)}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text>No issues reported yet.</Text>
              )}
            </ScrollView>
          )}

          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    height: 55,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "#000",
    elevation: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  issueCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    width: "100%",
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  issueDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ReportIssue;
