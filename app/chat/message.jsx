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
          `${API_URL}/group/${groupId}/messages`
        );
        const formattedMessages = response.data.map((message) => ({
          _id: message.id.toString(),
          text: message.text,
          createdAt: new Date(message.created_at),
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
        await axios.post(`${API_URL}/group/${groupId}/messages`, {
          userId: currentIdNumber,
          text: message.text,
        });

        // Mark the message as seen (refetch groups and update UI)
        await axios.post(`${API_URL}/group/${groupId}/markAsSeen`);

        // Optionally, fetch groups to update the seen status
        // fetchGroups(); // This will refresh the group list and ensure that the latest message status is updated.
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [currentIdNumber]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: currentIdNumber }}
    />
  );
};

export default Message;
