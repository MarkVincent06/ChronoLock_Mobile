import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/ngrok-api";
import { useFocusEffect } from "@react-navigation/native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useUserContext } from "../../context/UserContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

// Type assertion to fix TypeScript compatibility issues
const Icon = IonIcons as any;

interface Group {
  group_id: number;
  group_name: string;
  avatar?: string;
  group_key: string;
  sender?: string;
  latest_message?: string;
  latest_message_isSeen?: boolean;
}

const FacultyGroupChat = () => {
  const { user } = useUserContext();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  // Fetch groups from the server
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const apiEndPoint =
        user?.userType === "Faculty" || user?.userType === "Lab-in-Charge"
          ? `${API_URL}/groups/fetchFilteredGroups/${user?.idNumber}`
          : `${API_URL}/groups/fetchAllgroups`;

      const response = await axios.get<Group[]>(apiEndPoint);
      setGroups(response.data);
      setFilteredGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch groups on initial mount and every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  // Handle search input change
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

  const handleGroupClick = async (
    groupId: string | number,
    groupName: string,
    groupKey: string,
    groupAvatar: string
  ) => {
    try {
      await axios.post(
        `${API_URL}/messages/group/${groupId}/markMessageAsSeen`
      );
      router.push({
        pathname: "/chat/message",
        params: {
          group_id: groupId,
          group_name: groupName,
          group_key: groupKey,
          group_avatar: groupAvatar,
        },
      });
    } catch (error) {
      console.error("Error marking messages as seen:", error);
    }
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

  const handleEditGroup = (
    groupId: string | number,
    groupName: string,
    groupKey: string,
    avatar: string
  ) => {
    router.push({
      pathname: "/chat/edit-group",
      params: {
        group_id: groupId,
        group_name: groupName,
        group_key: groupKey,
        group_avatar: avatar,
      },
    });
  };

  const renderFacultyItem = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() =>
        handleGroupClick(
          item.group_id,
          item.group_name,
          item.group_key || "",
          item.avatar || ""
        )
      }
    >
      <Image
        source={
          item.avatar
            ? {
                uri: item.avatar.startsWith("http")
                  ? item.avatar
                  : `${API_URL}${item.avatar}`,
              }
            : require("@/assets/images/default_avatar.png") // Default avatar
        }
        style={styles.groupAvatar}
      />
      <View style={styles.groupDetails}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.groupName}>
          {item.group_name}
        </Text>
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
      </View>
      {/* Dropdown Menu */}
      <Menu>
        <MenuTrigger>
          <View style={styles.dropdownTrigger}>
            <Icon name="ellipsis-horizontal" size={16} color="#777" />
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() =>
              handleGroupDetails(
                item.group_id,
                item.group_name,
                item.avatar || ""
              )
            }
          >
            <Text style={styles.menuOption}>Group Details</Text>
          </MenuOption>
          <MenuOption
            onSelect={() =>
              handleEditGroup(
                item.group_id,
                item.group_name,
                item.group_key || "",
                item.avatar || ""
              )
            }
          >
            <Text style={styles.menuOption}>Edit Group</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  );

  // If no groups, show the 'No Groups' message
  if (groups.length === 0 && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("@/assets/images/no-group.png")}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>No Groups Yet</Text>
        <Text style={styles.emptySubText}>
          Create your first group chat to get started!
        </Text>
        {(user?.userType === "Faculty" ||
          user?.userType === "Lab-in-Charge") && (
          <TouchableOpacity
            style={styles.createGroupButton}
            onPress={() => router.push("/chat/create-group")}
          >
            <Text style={styles.createGroupButtonText}>Create Group Chat</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchInput]}
        placeholder="Search chats..."
        placeholderTextColor="#9CA3AF"
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Show loading indicator while fetching */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          <FlatList
            data={filteredGroups}
            keyExtractor={(item) => item.group_id.toString()}
            renderItem={renderFacultyItem}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>No groups found</Text>
            }
          />
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={styles.createGroupButton}
              onPress={() => router.push("/chat/create-group")}
            >
              <Text style={styles.createGroupButtonText}>
                Create Group Chat
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownTrigger: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#f9f9f9",
  },
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  groupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  latestMessage: {
    fontSize: 12,
    color: "#777",
  },
  unseenMessage: {
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  emptySubText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
  },
  createGroupButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createGroupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FacultyGroupChat;
