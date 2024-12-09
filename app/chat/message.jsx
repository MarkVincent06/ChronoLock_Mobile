import React, { useState, useEffect, useCallback } from "react";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import API_URL from "../../config/ngrok-api";
import { useUserContext } from "../../context/UserContext";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { group_id: groupId, group_name: groupName } = useLocalSearchParams();
  const { user } = useUserContext();
  const currentIdNumber = user?.idNumber || "unknown_user";
  const navigation = useNavigation();

  useEffect(() => {
    if (groupName) {
      navigation.setOptions({ title: groupName });
    }
  }, [groupName, navigation]);

  // Fetch messages from the server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/messages/group/${groupId}/fetchMessages`
        );
        const formattedMessages = response.data.map((message) => {
          if (message.isSystem === 1) {
            // Format system messages
            return {
              _id: message.id.toString(),
              text: message.text,
              createdAt: new Date(message.created_at),
              system: true,
            };
          } else {
            // Format regular user messages
            return {
              _id: message.id.toString(),
              text: message.text,
              createdAt: new Date(message.created_at),
              user: {
                _id: message.user_id.toString(),
                name: `${message.firstName} ${message.lastName}`,
                avatar: message.user_avatar
                  ? message.user_avatar.startsWith("http")
                    ? message.user_avatar
                    : `${API_URL}${message.user_avatar}`
                  : require("@/assets/images/default_avatar.png"), // Default avatar logic
              },
            };
          }
        });
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000); // Fetch every 3 seconds

    return () => clearInterval(intervalId);
  }, [groupId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );

      const message = newMessages[0];
      try {
        // Post the new message to the server
        await axios.post(`${API_URL}/messages/group/${groupId}/newMessage`, {
          userId: currentIdNumber,
          text: message.text,
        });

        // Mark the message as seen (refetch groups and update UI)
        await axios.post(
          `${API_URL}/messages/group/${groupId}/markMessageAsSeen`
        );
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [currentIdNumber]
  );

  const renderBubble = (props) => {
    const { currentMessage } = props;

    return (
      <View style={{ marginBottom: 10 }}>
        {currentMessage.user && currentMessage.user._id !== currentIdNumber && (
          <Text style={styles.username}>{currentMessage.user.name}</Text>
        )}
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: "#e6e6e6",
            },
            right: {
              backgroundColor: "#007BFF",
            },
          }}
          textStyle={{
            left: {
              color: "#000",
            },
            right: {
              color: "#fff",
            },
          }}
        />
      </View>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={{ alignItems: "center" }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#007BFF" />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: currentIdNumber,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar
          ? user.avatar.startsWith("http")
            ? user.avatar
            : `${API_URL}${user.avatar}`
          : require("@/assets/images/default_avatar.png"),
      }}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
    />
  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingHorizontal: 8,
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 2,
    marginLeft: 5,
  },
});

export default Message;
