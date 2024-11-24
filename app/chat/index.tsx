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
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/ngrok-api";
import { useFocusEffect } from "@react-navigation/native";

const GroupChatList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch groups from the server
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/groups`);
      setGroups(response.data);
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

  const handleGroupClick = async (
    groupId: string | number,
    groupName: string
  ) => {
    try {
      await axios.post(`${API_URL}/group/${groupId}/markAsSeen`);
      router.push({
        pathname: "/chat/message",
        params: { group_id: groupId, group_name: groupName },
      });
    } catch (error) {
      console.error("Error marking messages as seen:", error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
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
        <Text style={styles.groupName}>{item.group_name}</Text>
        <Text
          style={[
            styles.latestMessage,
            !item.latest_message_isSeen && styles.unseenMessage,
          ]}
        >
          {item.latest_message || "No messages yet"}
        </Text>
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
        <Button
          title="Create Group Chat"
          onPress={() => router.push("/chat/create-group")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Show loading indicator while fetching */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.group_id.toString()}
          renderItem={renderItem}
        />
      )}
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Create Group Chat"
          onPress={() => router.push("/chat/create-group")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
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
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
    marginRight: 15,
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
