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
  group_key: string;
  sender?: string;
  latest_message?: string;
  latest_message_isSeen?: boolean;
}

const GroupList = ({
  fetchGroupsApi,
  emptyMessage,
}: {
  fetchGroupsApi: () => Promise<Group[]>;
  emptyMessage: string;
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
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.groupName}>
          {item.group_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search groups..."
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

const handleJoinGroup = (groupId: number) => {
  console.warn(groupId);
};

const MyChats = () => {
  const { user } = useUserContext();

  const fetchMyGroups = async () => {
    const response = await axios.get<Group[]>(
      `${API_URL}/groups/fetchFilteredGroups/${user?.idNumber}`
    );
    return response.data;
  };

  return (
    <GroupList fetchGroupsApi={fetchMyGroups} emptyMessage="No Chats Found" />
  );
};

const JoinChats = () => {
  const fetchAllGroups = async () => {
    const response = await axios.get<Group[]>(
      `${API_URL}/groups/fetchAllGroups`
    );
    return response.data;
  };

  return (
    <GroupList
      fetchGroupsApi={fetchAllGroups}
      emptyMessage="No Chats Available"
    />
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
            onPress={() => router.push("/(tabs)/home")}
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
});

export default StudentGroupChat;
