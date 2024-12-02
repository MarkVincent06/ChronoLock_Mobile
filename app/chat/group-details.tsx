import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import API_URL from "@/config/ngrok-api";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Member {
  idNumber: string;
  firstName: string;
  lastName: string;
  userType: string;
  avatar?: string;
}

const GroupDetails = () => {
  const {
    group_id: groupId,
    group_name: groupName,
    group_avatar: rawAvatar,
  } = useLocalSearchParams();

  const avatar = Array.isArray(rawAvatar) ? rawAvatar[0] : rawAvatar;
  const [members, setMembers] = useState<Member[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch member count
  const fetchMemberCount = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/group-members/fetchMemberCount`,
        { params: { groupId } }
      );
      setMemberCount(response.data.count);
    } catch (error) {
      console.error("Error fetching member count:", error);
    }
  };

  // Fetch members
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/group-members/fetchMembers`,
        { params: { groupId } }
      );
      setMembers(response.data.results);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle member removal
  const handleRemoveMember = async (memberId: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/group-members/deleteMember`,
        { data: { groupId, memberId } }
      );
      if (response.data.success) {
        Alert.alert("Success", "Member removed successfully.");
        // Refresh member list and count
        fetchMembers();
        fetchMemberCount();
      }
    } catch (error) {
      console.error("Error removing member:", error);
      Alert.alert("Error", "Failed to remove the member.");
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchMemberCount();
      fetchMembers();
    }
  }, [groupId]);

  // Render each member item
  const renderMember = ({ item }: { item: Member }) => (
    <View style={styles.memberItem}>
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
        style={styles.memberAvatar}
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.memberType}>{item.userType}</Text>
      </View>
      <TouchableOpacity
        style={styles.kickButton}
        onPress={() =>
          Alert.alert(
            "Remove Member",
            `Are you sure you want to remove ${item.firstName} ${item.lastName}?`,
            [
              { text: "Cancel", style: "cancel" },
              { text: "Yes", onPress: () => handleRemoveMember(item.idNumber) },
            ]
          )
        }
      >
        <Icon name="remove-circle" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={
          avatar
            ? {
                uri: avatar.startsWith("http") ? avatar : `${API_URL}${avatar}`,
              }
            : require("@/assets/images/default_avatar.png")
        }
        style={styles.avatar}
      />
      <Text style={styles.groupName}>{groupName}</Text>
      <Text style={styles.membersTitle}>Members ({memberCount})</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMember}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No members found</Text>
          }
        />
      )}
    </View>
  );
};

export default GroupDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  groupName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  membersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  loader: {
    marginTop: 20,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  memberType: {
    fontSize: 14,
    color: "#555",
  },
  kickButton: {
    backgroundColor: "#ff4d4d",
    padding: 6,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});
