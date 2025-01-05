import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
import API_URL from "../../config/ngrok-api";
import chronolockLogo from "@/assets/images/chronolock-logo2a.png";
import { useUserContext } from "@/context/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";

interface TabIconProps {
  icon: React.ReactNode;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      {icon}
      <Text
        style={{
          color: color,
          fontSize: 13,
          fontWeight: focused ? "bold" : "normal",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const CustomHeader = () => {
  const { user } = useUserContext();
  const router = useRouter();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      const day = now.toLocaleString("en-US", { weekday: "short" });
      const month = now.toLocaleString("en-US", { month: "short" });
      const dayDate = now.getDate();

      setTime(`${hours}:${minutes} ${ampm}`);
      setDate(`${day}, ${month} ${dayDate}`);
    };

    updateDateTime(); // Update immediately on mount
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const avatarSource =
    user?.avatar && user.avatar !== ""
      ? {
          uri:
            user.avatar.startsWith("http") || user.avatar.startsWith("file")
              ? user.avatar
              : `${API_URL}${user.avatar}`,
        }
      : require("@/assets/images/default_avatar.png"); // Fallback to default avatar

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image
          source={chronolockLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>ChronoLock</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.dateTime}>
          <Text style={styles.timeText}>{time}</Text>
          {"\n"}
          <Text style={styles.dateText}>{date}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/account")}
          style={styles.accountButton}
        >
          <Image
            source={avatarSource}
            style={styles.avatar}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 47,
            paddingTop: 8,
          },
          header: () => <CustomHeader />,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<Icon name="dashboard" size={24} color={color} />}
                color={color}
                name="Dashboard"
                focused={focused}
              />
            ),
            tabBarStyle: { paddingBottom: 0 },
          }}
        />
        <Tabs.Screen
          name="access"
          options={{
            title: "Access",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<Icon name="key" size={24} color={color} />}
                color={color}
                name="Access"
                focused={focused}
              />
            ),
            tabBarStyle: { paddingBottom: 0 },
          }}
        />
        <Tabs.Screen
          name="laboratory"
          options={{
            title: "Laboratory",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<Icon name="desktop" size={24} color={color} />}
                color={color}
                name="Laboratory"
                focused={focused}
              />
            ),
            tabBarStyle: { paddingBottom: 0 },
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: "Chats",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <Ionicon name="chatbubbles-outline" size={24} color={color} />
                }
                color={color}
                name="Chats"
                focused={focused}
              />
            ),
            tabBarStyle: { paddingBottom: 0 },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 12,
    color: "#000",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 80,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTime: {
    textAlign: "right",
    marginRight: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f0f0f0",
  },
  accountButton: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
