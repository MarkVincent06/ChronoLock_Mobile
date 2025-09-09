import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";
import API_URL from "../../config/ngrok-api";
import chronolockLogo from "@/assets/images/chronolock-logo2a.png";
import { useUserContext } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

// Type assertion to fix TypeScript compatibility issues
const Icon = FontAwesome as any;
const Ionicon = Ionicons as any;

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
        style={[
          styles.tabLabel,
          {
            color: color,
            fontWeight: focused ? "bold" : "normal",
          },
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

const CustomHeader = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogout = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.signOut(); // Sign out from Google
      await signOut(auth); // Sign out from Firebase
      await AsyncStorage.removeItem("user");
      setUser(null);

      Alert.alert("Success", "You have been logged out.");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to log out.");
    } finally {
      setIsLoading(false);
    }
  };

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
          onPress={() => setMenuVisible((v: boolean) => !v)}
          style={styles.accountButton}
          accessibilityLabel="Open profile menu"
          accessibilityRole="button"
        >
          <Image
            source={avatarSource}
            style={styles.avatar}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {menuVisible && (
          <View style={styles.menuContainer}>
            <View style={styles.menuArrow} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                Alert.alert("Notifications", "This feature is coming soon.");
              }}
            >
              <Ionicon name="notifications-outline" size={18} color="#333" />
              <Text style={styles.menuItemText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push("/account");
              }}
            >
              <Ionicon name="settings-outline" size={18} color="#333" />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={[styles.menuItem, styles.menuDanger]}
              onPress={() => {
                setMenuVisible(false);
                Alert.alert("Logout", "Are you sure you want to logout?", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                      handleGoogleLogout();
                    },
                  },
                ]);
              }}
            >
              <Ionicon name="log-out-outline" size={18} color="#d32f2f" />
              <Text style={[styles.menuItemText, { color: "#d32f2f" }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
            height: 70,
            paddingTop: 15,
            paddingHorizontal: 0,
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
                icon={<Icon name="dashboard" size={20} color={color} />}
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
                icon={<Icon name="key" size={20} color={color} />}
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
                icon={<Icon name="desktop" size={20} color={color} />}
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
                  <Ionicon name="chatbubbles-outline" size={20} color={color} />
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
    minWidth: 80,
    paddingHorizontal: 5,
    marginTop: 8,
  },
  iconText: {
    fontSize: 12,
    color: "#000",
  },
  tabLabel: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
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
  menuContainer: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    width: 200,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  menuArrow: {
    position: "absolute",
    top: -8,
    right: 16,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10,
  },
  menuItemText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 4,
  },
  menuDanger: {
    backgroundColor: "#fff5f5",
    borderTopWidth: 1,
    borderTopColor: "#fde0e0",
  },
});
