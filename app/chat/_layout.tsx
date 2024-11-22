import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import axios from "axios";
import API_URL from "@/config/ngrok-api";

const ChatLayout = () => {
  const [groupExists, setGroupExists] = useState(false);

  useEffect(() => {
    const checkGroupExists = async () => {
      try {
        const response = await axios.get(`${API_URL}/groups`);
        setGroupExists(response.data > 0);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    checkGroupExists();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {groupExists ? (
        <Stack.Screen
          name="index"
          options={{ title: "Chat List", headerShown: true }}
        />
      ) : (
        <Stack.Screen
          name="create-group"
          options={{ title: "Create Group", headerShown: true }}
        />
      )}
      {/* <Stack.Screen name="[id]" options={{ title: "Chat" }} /> */}
    </Stack>
  );
};

export default ChatLayout;
