import React, { useState, useEffect } from "react";
import Chat from "@codsod/react-native-chat";
import axios from "axios";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import API_URL from "../../config/ngrok-api";
import { useUserContext } from "../../context/UserContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const {
    group_id: groupId,
    group_name: groupName,
    group_avatar: groupAvatar,
    group_key: groupKey,
  } = useLocalSearchParams();
  const { user } = useUserContext();
  const currentIdNumber = user?.idNumber || "unknown_user";
  const currentUserType = user?.userType || "unknown_user";
  const navigation = useNavigation();
  const router = useRouter();

  const handleGroupDetails = () => {
    router.push({
      pathname: "/chat/group-details",
      params: {
        group_id: groupId,
        group_name: groupName,
        group_avatar: groupAvatar,
      },
    });
  };

  const handleEditGroup = () => {
    router.push({
      pathname: "/chat/edit-group",
      params: {
        group_id: groupId,
        group_name: groupName,
        group_key: groupKey,
        group_avatar: groupAvatar,
      },
    });
  };

  useEffect(() => {
    if (groupName) {
      navigation.setOptions({
        header: () => (
          <View style={styles.headerContainer}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Group Info */}
            <View style={styles.groupInfoContainer}>
              {groupAvatar ? (
                <Image
                  source={
                    groupAvatar.startsWith("http")
                      ? { uri: groupAvatar }
                      : { uri: `${API_URL}${groupAvatar}` }
                  }
                  style={styles.groupAvatar}
                />
              ) : (
                <View style={styles.defaultAvatar}>
                  <Ionicon name="people" size={18} color="#666" />
                </View>
              )}

              <View style={styles.groupTextInfo}>
                <Text style={styles.groupName} numberOfLines={1}>
                  {groupName}
                </Text>
              </View>
            </View>

            {/* Group Menu */}
            <View style={styles.rightActions}>
              {currentUserType === "Student" ? (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleGroupDetails}
                >
                  <Ionicon
                    name="information-circle-outline"
                    size={25}
                    color="#000"
                  />
                </TouchableOpacity>
              ) : (
                <Menu>
                  <MenuTrigger>
                    <View style={styles.dropdownTrigger}>
                      <Ionicon
                        name="ellipsis-vertical"
                        size={20}
                        color="#000"
                      />
                    </View>
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={handleGroupDetails}>
                      <Text style={styles.menuOption}>Group Details</Text>
                    </MenuOption>
                    <MenuOption onSelect={handleEditGroup}>
                      <Text style={styles.menuOption}>Edit Group</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              )}
            </View>
          </View>
        ),
      });
    }
  }, [groupName, groupAvatar, navigation, router]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/messages/group/${groupId}/fetchMessages`
        );
        const formattedMessages = response.data.map((message) => ({
          _id: message.id.toString(),
          text: message.text,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.user_id?.toString() || "system",
            name:
              message.firstName && message.lastName
                ? `${message.firstName} ${message.lastName}`
                : "System",
            avatar: message.user_avatar
              ? message.user_avatar.startsWith("http")
                ? message.user_avatar
                : `${API_URL}${message.user_avatar}`
              : undefined,
          },
          system: message.isSystem === 1,
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000);
    return () => clearInterval(intervalId);
  }, [groupId]);

  const onSendMessage = async (text) => {
    const newMessage = {
      _id: Date.now().toString(), // Use timestamp for unique ID
      text,
      createdAt: new Date(),
      user: {
        _id: currentIdNumber,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
          ? user.avatar.startsWith("http")
            ? user.avatar
            : `${API_URL}${user.avatar}`
          : undefined,
      },
      system: false,
    };

    // Add the new message to the end of the array (bottom)
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await axios.post(`${API_URL}/messages/group/${groupId}/newMessage`, {
        userId: currentIdNumber,
        text,
      });
      await axios.post(
        `${API_URL}/messages/group/${groupId}/markMessageAsSeen`
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Chat
        messages={messages}
        setMessages={onSendMessage}
        themeColor="#007BFF"
        themeTextColor="#fff"
        showSenderAvatar={true}
        showReceiverAvatar={true}
        inputBorderColor="#007BFF"
        user={{
          _id: currentIdNumber,
          name: `${user.firstName} ${user.lastName}`,
        }}
        backgroundColor="#fff"
        inputBackgroundColor="#fff"
        placeholder="Type a message..."
        placeholderColor="gray"
        showEmoji={true}
        onPressEmoji={() => console.log("Emoji Button Pressed..")}
        showAttachment={true}
        onPressAttachment={() => console.log("Attachment Button Pressed..")}
        timeContainerColor="#007BFF"
        timeContainerTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    paddingRight: 16,
    paddingVertical: 4,
  },
  groupInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  groupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  defaultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  groupTextInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownTrigger: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 50,
  },
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  actionButton: {
    padding: 8,
    borderRadius: 50,
  },
});

export default Message;
