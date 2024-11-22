import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { auth } from "../../config/firebase";

const API_URL = "https://1664-139-135-241-135.ngrok-free.app";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const groupId = 1;
  const currentUserId = auth.currentUser?.uid || "unknown_user";

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
  }, []);

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
          userId: currentUserId,
          text: message.text,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [currentUserId]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: currentUserId }}
    />
  );
};

export default Chat;
