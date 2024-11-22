import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/ngrok-api";

const GroupChatList = () => {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  // Fetch groups from the server
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${API_URL}/groups`);
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => {
        router.push({
          pathname: "/chat/message",
          params: { group_id: item.group_id },
        });
      }}
    >
      <Text style={styles.groupName}>{item.group_name}</Text>
    </TouchableOpacity>
  );

  if (groups.length === 0) {
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
      <FlatList
        data={groups}
        keyExtractor={(item) => item.group_id.toString()}
        renderItem={renderItem}
      />
      <Button
        title="Create Group Chat"
        onPress={() => router.push("/chat/create-group")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  groupItem: { padding: 16, borderBottomWidth: 1, borderColor: "#ccc" },
  groupName: { fontSize: 18, fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyImage: {
    width: 300,
    height: 200,
    marginBottom: 2,
    resizeMode: "contain",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default GroupChatList;
