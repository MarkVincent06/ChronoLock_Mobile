import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/ngrok-api";
import { useFocusEffect } from "@react-navigation/native";
import { useUserContext } from "../../context/UserContext";

const Tab = createBottomTabNavigator();

interface Group {
  group_id: number;
  group_name: string;
  avatar?: string;
  sender?: string;
  latest_message?: string;
  latest_message_isSeen?: boolean;
}

const GroupList = ({
  fetchGroupsApi,
  emptyMessage,
  onGroupPress,
  showLatestMessage,
  showGroupDetailsButton,
  onGroupDetails,
}: {
  fetchGroupsApi: () => Promise<Group[]>;
  emptyMessage: string;
  onGroupPress: (group: Group) => void;
  showLatestMessage?: boolean;
  showGroupDetailsButton?: boolean;
  onGroupDetails?: (groupId: number, groupName: string, avatar: string) => void;
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchGroups = async () => {
        setLoading(true);
        try {
          const response = await fetchGroupsApi();
          setGroups(response);
          setFilteredGroups(response);
        } catch (error) {
          console.error("Error fetching groups:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchGroups();
    }, [fetchGroupsApi])
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) =>
        group.group_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  };

  const renderGroupItem = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => onGroupPress(item)}
    >
      <Image
        source={
          item.avatar
            ? {
                uri: item.avatar.startsWith("http")
                  ? item.avatar
                  : `${API_URL}${item.avatar}`,
              }
            : require("@/assets/images/default_avatar.png")
        }
        style={styles.groupAvatar}
      />
      <View style={styles.groupDetails}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.groupName}>
          {item.group_name}
        </Text>
        {showLatestMessage && (
          <Text
            style={[
              styles.latestMessage,
              !item.latest_message_isSeen && styles.unseenMessage,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.sender && item.latest_message
              ? `${item.sender}: ${item.latest_message}`
              : "No messages yet"}
          </Text>
        )}
      </View>
      {showGroupDetailsButton && onGroupDetails && (
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() =>
            onGroupDetails(item.group_id, item.group_name, item.avatar || "")
          }
        >
          <Icon name="information-circle-outline" size={24} color="#555" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search chats..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.group_id.toString()}
        renderItem={renderGroupItem}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>{emptyMessage}</Text>
        }
      />
    </View>
  );
};

const MyChats = () => {
  const router = useRouter();
  const { user } = useUserContext();

  const fetchMyGroups = async () => {
    const response = await axios.get<Group[]>(
      `${API_URL}/groups/fetchFilteredGroups/${user?.idNumber}`
    );
    return response.data;
  };

  const openChat = async (groupId: number, groupName: string) => {
    try {
      await axios.post(
        `${API_URL}/messages/group/${groupId}/markMessageAsSeen`
      );
      router.push({
        pathname: "/chat/message",
        params: {
          group_id: groupId,
          group_name: groupName,
        },
      });
    } catch (error) {
      console.error("Error marking messages as seen:", error);
    }
  };

  const handleGroupPress = (group: Group) => {
    openChat(group.group_id, group.group_name);
  };

  const handleGroupDetails = (
    groupId: number,
    groupName: string,
    avatar: string
  ) => {
    router.push({
      pathname: "/chat/group-details",
      params: {
        group_id: groupId,
        group_name: groupName,
        group_avatar: avatar,
      },
    });
  };

  return (
    <GroupList
      fetchGroupsApi={fetchMyGroups}
      emptyMessage="No Chats Found"
      onGroupPress={handleGroupPress}
      onGroupDetails={handleGroupDetails}
      showLatestMessage={true}
      showGroupDetailsButton={true}
    />
  );
};

const JoinChats = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [groupKey, setGroupKey] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAvailableGroups = async () => {
    const response = await axios.get<Group[]>(
      `${API_URL}/groups/fetchAvailableGroups/${user?.idNumber}`
    );
    return response.data;
  };

  const handleGroupPress = (group: Group) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const handleSubmitGroupKey = async () => {
    if (!groupKey.trim()) {
      Alert.alert("Error", "Please enter a valid group key.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/group-members/insertMemberByGroupKey`,
        {
          userIdNumber: user?.idNumber,
          groupKey,
        }
      );

      if (response.data.success) {
        // Post a system message
        const joinMessage = `${user?.firstName} ${user?.lastName} has joined the group ${selectedGroup?.group_name}. Welcome!`;
        await axios.post(
          `${API_URL}/messages/group/${selectedGroup?.group_id}/newSystemMessage`,
          {
            userId: user?.idNumber,
            text: joinMessage,
          }
        );

        Alert.alert("Success", "You have joined the group!");
        try {
          await axios.post(
            `${API_URL}/messages/group/${selectedGroup?.group_id}/markMessageAsSeen`
          );
          router.push({
            pathname: "/chat/message",
            params: {
              group_id: selectedGroup?.group_id,
              group_name: selectedGroup?.group_name,
            },
          });
        } catch (innerError) {
          console.error("Error marking messages as seen:", innerError);
        }
      } else {
        Alert.alert("Error", response.data.error || "Invalid group key.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data?.error || "Network error occurred."
        );
        console.error("Axios error:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        Alert.alert("Error", error.message || "An unknown error occurred.");
        console.error("Error message:", error.message);
      } else {
        Alert.alert("Error", "Failed to join the group. Please try again.");
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false);
      setModalVisible(false);
      setGroupKey("");
    }
  };

  return (
    <>
      <GroupList
        fetchGroupsApi={fetchAvailableGroups}
        emptyMessage="No Chats Available"
        onGroupPress={handleGroupPress}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Join {selectedGroup?.group_name}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Group Key"
              value={groupKey}
              onChangeText={setGroupKey}
              secureTextEntry
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#28a745" }]}
                onPress={handleSubmitGroupKey}
                disabled={loading}
              >
                <Text style={styles.modalButtonText}>
                  {loading ? "Joining..." : "Submit"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#dc3545" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const StudentGroupChat = () => {
  const router = useRouter();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "information-circle-outline";
          if (route.name === "My Chats") {
            iconName = "chatbubbles-outline";
          } else if (route.name === "Join Chats") {
            iconName = "add-circle-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerLeft: () => (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      })}
    >
      <Tab.Screen name="My Chats" component={MyChats} />
      <Tab.Screen name="Join Chats" component={JoinChats} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    marginVertical: 10,
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    elevation: 2,
  },
  groupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  latestMessage: {
    fontSize: 14,
    color: "#777",
  },
  detailsButton: {
    padding: 8,
  },
  unseenMessage: {
    fontWeight: "bold",
    color: "#000",
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  backButton: {
    paddingHorizontal: 10,
    marginRight: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StudentGroupChat;
