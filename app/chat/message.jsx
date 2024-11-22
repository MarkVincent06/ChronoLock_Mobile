import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import API_URL from "../../config/ngrok-api";
import { useUserContext } from "../../context/UserContext";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { group_id: groupId, group_name: groupName } = useLocalSearchParams();
  const { user } = useUserContext();
  const currentStudentNumber = user?.idNumber || "unknown_user";
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
          `${API_URL}/group/${groupId}/messages`
        );
        const formattedMessages = response.data.map((message) => ({
          _id: message.id.toString(),
          text: message.text,
          createdAt: new Date(message.timestamp),
          user: {
            _id: message.user_id.toString(),
            name: message.user_id,
          },
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000); // Fetch every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [groupId]);

  // Send a message to the server
  const onSend = useCallback(
    async (newMessages = []) => {
      // Append the new message to the current messages state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );

      const message = newMessages[0];
      try {
        // Post the new message to the server
        await axios.post(`${API_URL}/group/${groupId}/messages`, {
          userId: currentStudentNumber,
          text: message.text,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [currentStudentNumber]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: currentStudentNumber }}
    />
  );
};

export default Message;
