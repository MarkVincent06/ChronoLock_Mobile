import React, { useCallback, useState } from "react";
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
import Icon from "react-native-vector-icons/Ionicons";
import { useUserContext } from "../../context/UserContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

interface Group {
  group_id: number;
  group_name: string;
  avatar?: string;
  group_key: string;
  sender?: string;
  latest_message?: string;
  latest_message_isSeen?: boolean;
}

const GroupChatList = () => {
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
        user?.userType === "Faculty"
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
      setFilteredGroups(groups); // Reset to all groups if search is empty
    } else {
      const filtered = groups.filter((group) =>
        group.group_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  };

  const handleGroupClick = async (
    groupId: string | number,
    groupName: string
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

  const handleJoinGroup = (groupId: number) => {
    // router.push({
    //   pathname: "/chat/join-group",
    //   params: { group_id: groupId },
    // });
  };

  const renderInstructorItem = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => handleGroupClick(item.group_id, item.group_name)}
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
            <Icon name="ellipsis-horizontal" size={24} color="#777" />
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

  const renderStudentItem = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => handleJoinGroup(item.group_id)}
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
        <Text style={styles.groupName}>{item.group_name}</Text>
      </View>
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
        {user?.userType === "Faculty" && (
          <Button
            title="Create Group Chat"
            onPress={() => router.push("/chat/create-group")}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search chats..."
        value={searchText}
        onChangeText={handleSearch}
      />
      {user?.userType !== "Faculty" && (
        <Text style={styles.titleText}>Choose a chat to join</Text>
      )}

      {/* Show loading indicator while fetching */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : user?.userType === "Faculty" ? (
        <>
          <FlatList
            data={filteredGroups}
            keyExtractor={(item) => item.group_id.toString()}
            renderItem={renderInstructorItem}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>No groups found</Text>
            }
          />
          <View style={{ marginBottom: 10 }}>
            <Button
              title="Create Group Chat"
              onPress={() => router.push("/chat/create-group")}
            />
          </View>
        </>
      ) : (
        <FlatList
          data={filteredGroups}
          keyExtractor={(item) => item.group_id.toString()}
          renderItem={renderStudentItem}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No groups found</Text>
          }
        />
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
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
  studentGroupItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    margin: 8,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: "30%",
  },
  groupAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
    marginRight: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  groupDetails: {
    marginLeft: 12,
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  latestMessage: {
    fontSize: 14,
    color: "#777",
  },
  unseenMessage: {
    fontWeight: "bold",
    color: "#000",
  },
  settingsIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },
  emptySubText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default GroupChatList;
