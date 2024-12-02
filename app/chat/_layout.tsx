import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ChatLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/(tabs)/home")}
            >
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="message"
        options={{
          title: "Message",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="create-group"
        options={{
          title: "Create Group",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="group-details"
        options={{
          title: "Group Details",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="edit-group"
        options={{
          title: "Edit Group",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 10,
    marginRight: 12,
  },
});

export default ChatLayout;
