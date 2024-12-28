import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
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
        style={[styles.iconText, focused && { fontSize: 13, color: color }]}
      >
        {name}
      </Text>
    </View>
  );
};

const CustomHeader = () => {
  const { user } = useUserContext();
  const router = useRouter();

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
            paddingTop: 3,
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
          }}
        />

        <Tabs.Screen
          name="groups"
          options={{
            title: "Group Chats",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={
                  <Ionicon name="chatbubbles-outline" size={24} color={color} />
                }
                color={color}
                name="Group Chats"
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
    width: 55,
    height: 55,
  },
  appName: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
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
