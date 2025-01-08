import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import API_URL from "@/config/ngrok-api";

interface Group {
  group_id: number;
  group_name: string;
  group_key: string;
  avatar?: string;
  memberCount?: number;
}

interface RenderGroupItemProps {
  item: Group;
  index: number;
}

const GroupChats = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [groupKey, setGroupKey] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [showGroupKey, setShowGroupKey] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get<Group[]>(
          `${API_URL}/groups/fetchAllgroups`
        );
        const groupsWithCount = await Promise.all(
          response.data.map(async (group) => {
            const memberCountResponse = await axios.get<{ count: number }>(
              `${API_URL}/group-members/fetchMemberCount?groupId=${group.group_id}`
            );
            return {
              ...group,
              memberCount: memberCountResponse.data.count,
            };
          })
        );
        setGroups(groupsWithCount);
        setFilteredGroups(groupsWithCount);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const openModal = (group: Group) => {
    setSelectedGroup(group);
    setGroupName(group.group_name);
    setGroupKey(group.group_key);
    setNewAvatar(group.avatar || null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGroup(null);
    setEditable(false);
    setShowGroupKey(false);
  };

  const toggleEditSave = () => {
    if (editable) {
      handleSave();
    }
    setEditable(!editable);
  };

  const handleSave = async () => {
    if (!groupName.trim() || !groupKey.trim()) {
      Alert.alert(
        "Validation Error",
        "Group Name and Group Key cannot be empty."
      );
      return;
    }

    if (selectedGroup) {
      try {
        setUpdating(true); // Show loader
        const formData = new FormData();
        formData.append("name", groupName);
        formData.append("groupKey", groupKey);

        if (newAvatar && newAvatar !== selectedGroup.avatar) {
          const avatarUri = newAvatar.startsWith("file:")
            ? newAvatar
            : "file://" + newAvatar;
          formData.append("avatar", {
            uri: avatarUri,
            type: "image/jpeg",
            name: "avatar.jpg",
          });
        }

        await axios.put(
          `${API_URL}/groups/updateGroup/${selectedGroup.group_id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const updatedGroups = groups.map((group) =>
          group.group_id === selectedGroup.group_id
            ? {
                ...group,
                group_name: groupName,
                group_key: groupKey,
                avatar: newAvatar || selectedGroup.avatar,
              }
            : group
        );

        setGroups(updatedGroups as Group[]);
        setFilteredGroups(updatedGroups as Group[]);

        Alert.alert("Success", "Group updated successfully!");
        closeModal();
      } catch (error) {
        console.error("Error updating group:", error);
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group chat? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (selectedGroup) {
              try {
                await axios.delete(
                  `${API_URL}/groups/deleteGroup/${selectedGroup.group_id}`
                );
                const updatedGroups = groups.filter(
                  (group) => group.group_id !== selectedGroup.group_id
                );
                setGroups(updatedGroups);
                setFilteredGroups(updatedGroups);
                closeModal();
              } catch (error) {
                console.error("Error deleting group:", error);
              }
            }
          },
        },
      ]
    );
  };

  const handleAvatarChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewAvatar(result.assets[0].uri);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = groups.filter((group) =>
      group.group_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGroups(filtered);
  };

  const renderGroupItem = ({ item, index }: RenderGroupItemProps) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.tableIndex]}>{index + 1}</Text>
      <Text style={[styles.tableCell, styles.groupName]}>
        {item.group_name}
      </Text>
      <Text style={[styles.tableCell, styles.members]}>
        {item.memberCount !== undefined ? item.memberCount : "N/A"}
      </Text>
      <TouchableOpacity
        key={item.group_id}
        onPress={() => openModal(item)}
        style={styles.manageButton}
      >
        <Text style={styles.manageButtonText}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search and List */}
      <Text style={styles.title}>Manage Group Chats</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search group chats..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, styles.tableIndex]}>#</Text>
        <Text style={[styles.tableHeaderCell, styles.groupName]}>
          Group Name
        </Text>
        <Text style={[styles.tableHeaderCell, styles.members]}>Members</Text>
        <Text style={[styles.tableHeaderCell, styles.manage]}>Actions</Text>
      </View>
      <FlatList
        data={filteredGroups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.group_id.toString()}
        contentContainerStyle={styles.table}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            {updating ? (
              <ActivityIndicator
                size="large"
                color="#007bff"
                style={{ marginVertical: 20 }}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={editable ? handleAvatarChange : undefined}
                  style={styles.avatarContainer}
                >
                  <Image
                    source={
                      newAvatar
                        ? {
                            uri:
                              newAvatar.startsWith("http") ||
                              newAvatar.startsWith("file")
                                ? newAvatar
                                : `${API_URL}${newAvatar}`,
                          }
                        : require("@/assets/images/default_avatar.png")
                    }
                    style={styles.avatar}
                  />
                  {editable && (
                    <View style={styles.editIconContainer}>
                      <Text style={styles.editIconText}>✎</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <Text style={styles.label}>Group Name</Text>
                <TextInput
                  style={styles.input}
                  value={groupName}
                  onChangeText={setGroupName}
                  editable={editable}
                  placeholder="Group Name"
                />
                <Text style={styles.label}>Group Key</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputWithIcon}
                    value={groupKey}
                    onChangeText={setGroupKey}
                    editable={editable}
                    secureTextEntry={!showGroupKey}
                    placeholder="Group Key"
                  />
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => editable && setShowGroupKey((prev) => !prev)}
                    disabled={!editable}
                  >
                    <Ionicons
                      name={showGroupKey ? "eye-off" : "eye"}
                      size={24}
                      color={editable ? "black" : "gray"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={handleDelete}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      editable ? styles.saveButton : styles.editButton,
                    ]}
                    onPress={toggleEditSave}
                  >
                    <Text style={styles.buttonText}>
                      {editable ? "Save" : "Edit"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GroupChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  tableIndex: {
    flex: 0.5,
  },
  groupName: {
    flex: 2,
  },
  members: {
    flex: 1,
  },
  manage: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  manageButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  manageButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  closeButton: { position: "absolute", top: 10, right: 10 },
  avatarContainer: { alignSelf: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  label: { alignSelf: "flex-start", marginVertical: 5 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  iconContainer: {
    paddingLeft: 5,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    padding: 5,
  },
  editIconText: {
    color: "white",
    fontSize: 12,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
  },
  editButton: {
    backgroundColor: "#007bff",
  },
  saveButton: {
    backgroundColor: "#4caf50",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
