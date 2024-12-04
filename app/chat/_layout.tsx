import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useUserContext } from "../../context/UserContext";

const ChatLayout = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!hasNavigated) {
      if (user?.userType === "Faculty") {
        router.replace("/chat");
      } else if (user?.userType === "Student") {
        router.replace("/chat/student-chat");
      }
      setHasNavigated(true);
    }
  }, [user, router, hasNavigated]);

  return (
    <Stack>
      {/* FACULTY GROUP CHAT */}
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
      {/* STUDENT GROUP CHAT */}
      <Stack.Screen
        name="student-chat"
        options={{
          title: "Chats",
          headerShown: false,
        }}
      />

      {/* Additional Screens */}
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
