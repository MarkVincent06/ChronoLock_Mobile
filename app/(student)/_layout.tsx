import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Tabs, Redirect } from "expo-router";
import { useRouter } from "expo-router";
import API_URL from "../../config/ngrok-api";

import Ionicon from "react-native-vector-icons/Ionicons";
import chronolockLogo from "../../assets/images/chronolock-logo2a.png";
import { useUserContext } from "@/context/UserContext";

interface TabIconProps {
  icon: string;
  color: string;
  name: string;
  focused: boolean;
}

const Icon = Ionicon as any;

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Icon name={icon} size={24} color={color} />
      <Text
        style={[
          styles.iconText,
          focused && { fontSize: 13, color: color, fontWeight: "bold" },
        ]}
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
      {/* Left side with logo and app name */}
      <View style={styles.headerLeft}>
        <Image
          source={chronolockLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>ChronoLock</Text>
      </View>

      {/* Right side with Date, Chat and Account buttons */}
      <View style={styles.headerRight}>
        {/* Date */}
        <Text style={styles.dateTime}>
          <Text style={styles.timeText}>{time}</Text>
          {"\n"}
          <Text style={styles.dateText}>{date}</Text>
        </Text>

        {/* Chat Button */}
        <TouchableOpacity
          onPress={() => router.push("/chat")}
          style={styles.accountButton}
        >
          <Icon name="chatbubble-ellipses-outline" size={24} color="#000" />
        </TouchableOpacity>

        {/* Account Button */}
        <TouchableOpacity
          onPress={() => {
            router.push("/account");
          }}
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
            height: 45,
          },
          header: () => <CustomHeader />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: true,
            header: () => <CustomHeader />,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="home-outline"
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="course"
          options={{
            title: "Course",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="book-outline"
                color={color}
                name="Course"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="laboratory"
          options={{
            title: "Laboratory",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="desktop-outline"
                color={color}
                name="Laboratory"
                focused={focused}
              />
            ),
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
    minWidth: 100,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
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
    width: 45,
    height: 45,
  },
  appName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 15,
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
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
});
