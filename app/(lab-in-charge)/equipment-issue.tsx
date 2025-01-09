import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import API_URL from "@/config/ngrok-api";
import { useRouter } from "expo-router";
import { useUserContext } from "@/context/UserContext";

const fetchAllIssues = async (
  callback: React.Dispatch<
    React.SetStateAction<
      { id: number; title: string; status: string; equipment_name: string }[]
    >
  >,
  onError: () => void
) => {
  try {
    const response = await axios.get(`${API_URL}/equipments/issues/all`);
    callback(response.data);
  } catch (error) {
    console.error("Error fetching issues", error);
    onError();
  }
};

const fetchIssueDetails = async (
  id: number,
  callback: React.Dispatch<
    React.SetStateAction<{ title: string; description: string; status: string }>
  >,
  onError: () => void
) => {
  try {
    const response = await axios.get(`${API_URL}/equipments/issues/${id}`);
    callback(response.data);
  } catch (error) {
    console.error("Error fetching issue details", error);
    onError();
  }
};

const EquipmentIssue = () => {
  const [issues, setIssues] = useState<
    { id: number; title: string; status: string; equipment_name: string }[]
  >([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [status, setStatus] = useState("Pending");
  const [comment, setComment] = useState("");
  const [updating, setUpdating] = useState(false);

  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    fetchAllIssues(
      (data) => {
        setIssues(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  const filteredIssues = issues.filter(
    (issue) => statusFilter === "All" || issue.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return { color: "orange" };
      case "Fixing":
        return { color: "blue" };
      case "Resolved":
        return { color: "green" };
      case "Closed":
        return { color: "gray" };
      default:
        return { color: "#000" };
    }
  };

  const handleIssueClick = (id: number) => {
    fetchIssueDetails(
      id,
      (data) => {
        setSelectedIssue(data);
        setStatus(data.status);
        setComment("");
        setModalVisible(true);
      },
      () => {
        console.error("Error fetching issue details");
      }
    );
  };

  const handleStatusUpdate = async () => {
    if (updating) return; // Prevent multiple submissions
    setUpdating(true);

    try {
      const response = await axios.patch(
        `${API_URL}/equipments/issues/${selectedIssue.id}/status`,
        {
          userId: user?.id,
          oldStatus: selectedIssue.status,
          status,
          comment,
        }
      );

      // Ensure response indicates success before proceeding
      if (!response.data.success) {
        throw new Error(response.data.message || "Update failed.");
      }

      // Close modal after successful update
      setModalVisible(false);

      // Refresh the issues list
      await fetchAllIssues(
        (data) => setIssues(data),
        () => {
          console.error("Error refreshing issues");
        }
      );
    } catch (error) {
      console.error(
        "Error updating issue status:",
        (error as any).message || error
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#007BFF" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Equipment Issues</Text>
      </View>

      <Picker
        selectedValue={statusFilter}
        onValueChange={(itemValue) => setStatusFilter(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="Fixing" value="Fixing" />
        <Picker.Item label="Resolved" value="Resolved" />
        <Picker.Item label="Closed" value="Closed" />
      </Picker>

      {filteredIssues.length === 0 ? (
        <Text style={styles.noIssuesText}>No issues found.</Text>
      ) : (
        <FlatList
          data={filteredIssues}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.issueItem,
                { borderColor: getStatusColor(item.status).color },
              ]}
              onPress={() => handleIssueClick(item.id)}
            >
              <View style={styles.issueHeader}>
                <Text style={styles.issueNumber}>{index + 1}.</Text>
                <Text style={styles.issueTitle}>
                  {item.title}{" "}
                  <Text style={styles.equipmentName}>
                    ({item.equipment_name})
                  </Text>
                </Text>
              </View>
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(item.status).color },
                ]}
              >
                Status: {item.status}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Modal for displaying and updating issue status */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {selectedIssue ? (
            <>
              <Text style={styles.modalTitle}>{selectedIssue.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedIssue.description}
              </Text>
              <Text
                style={[
                  styles.modalStatus,
                  getStatusColor(selectedIssue.status),
                ]}
              >
                Current Status: {selectedIssue.status}
              </Text>
              <Text style={styles.modalPriority}>
                Priority: {selectedIssue.priority}
              </Text>
              <Text style={styles.modalDate}>
                Date Issued:{" "}
                {new Date(selectedIssue.created_at).toLocaleString()}
              </Text>

              {/* Picker for status */}
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Fixing" value="Fixing" />
                <Picker.Item label="Resolved" value="Resolved" />
                <Picker.Item label="Closed" value="Closed" />
              </Picker>

              {/* TextInput for adding comment */}
              <TextInput
                style={styles.input}
                value={comment}
                onChangeText={setComment}
                placeholder="Add comment"
              />

              {/* Button to update the issue status */}
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleStatusUpdate}
                disabled={updating}
              >
                <Text style={styles.buttonText}>
                  {updating ? "Updating..." : "Update Status"}
                </Text>
              </TouchableOpacity>

              {/* Close button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },
  picker: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  issueItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  issueHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  issueNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#333",
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  equipmentName: {
    fontSize: 16,
    color: "gray",
    fontStyle: "italic",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "normal",
  },
  noIssuesText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalDescription: {
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  modalStatus: {
    fontSize: 16,
    color: "#000",
  },
  modalPriority: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
  modalDate: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  updateButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EquipmentIssue;
