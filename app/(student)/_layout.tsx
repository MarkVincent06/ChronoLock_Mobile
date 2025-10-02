import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Tabs, Redirect } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import API_URL from "../../config/ngrok-api";
import axios from "axios";
import Ionicon from "react-native-vector-icons/Ionicons";
import chronolockLogo from "../../assets/images/chronolock-logo2a.png";
import { useUserContext } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

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

const NotificationBadge: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {count > 99 ? "99+" : count.toString()}
      </Text>
    </View>
  );
};

const NotificationMenuBadge: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) return null;

  return (
    <View style={styles.menuBadge}>
      <Text style={styles.badgeText}>
        {count > 99 ? "99+" : count.toString()}
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
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    if (!user?.idNumber) return;

    try {
      const response = await axios.get(
        `${API_URL}/notifications/unread-count/${user.idNumber}`
      );

      if (response.data.success) {
        setUnreadCount(response.data.data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching unread notification count:", error);
    }
  };

  // Refetch unread count whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUnreadCount();
    }, [user?.idNumber])
  );

  const handleGoogleLogout = async () => {
    setIsLoading(true);
    try {
      // First, fetch and delete all notification tokens for this user
      if (user?.idNumber) {
        try {
          // Fetch user's notification tokens
          const tokensResponse = await axios.get(
            `${API_URL}/notifications/tokens/${user.idNumber}`
          );

          if (
            tokensResponse.data.success &&
            tokensResponse.data.data.length > 0
          ) {
            // Delete each token
            const deletePromises = tokensResponse.data.data.map(
              async (tokenData: any) => {
                try {
                  await axios.delete(
                    `${API_URL}/notifications/tokens/${user.idNumber}/${tokenData.token}`
                  );
                  console.log(`Deleted token: ${tokenData.token}`);
                } catch (deleteError) {
                  console.error(
                    `Failed to delete token ${tokenData.token}:`,
                    deleteError
                  );
                }
              }
            );

            // Wait for all token deletions to complete
            await Promise.all(deletePromises);
            console.log("All notification tokens deleted successfully");
          } else {
            console.log("No notification tokens found for user");
          }
        } catch (tokenError) {
          console.error("Error managing notification tokens:", tokenError);
          // Continue with logout even if token deletion fails
        }
      }

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
    fetchUnreadCount(); // Fetch unread count immediately on mount

    const dateTimeInterval = setInterval(updateDateTime, 60000);
    const notificationInterval = setInterval(fetchUnreadCount, 30000); // Refresh every 30sec

    return () => {
      clearInterval(dateTimeInterval);
      clearInterval(notificationInterval);
    };
  }, [user?.idNumber]);

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
          onPress={() => setMenuVisible((v: boolean) => !v)}
          style={styles.accountButton}
          accessibilityLabel="Open profile menu"
          accessibilityRole="button"
        >
          <View style={styles.avatarContainer}>
            <Image
              source={avatarSource}
              style={styles.avatar}
              resizeMode="cover"
            />
            <NotificationBadge count={unreadCount} />
          </View>
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {menuVisible && (
          <View style={styles.menuContainer}>
            <View style={styles.menuArrow} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push("/notifications");
              }}
            >
              <Icon name="notifications-outline" size={18} color="#333" />
              <Text style={styles.menuItemText}>Notifications</Text>
              <NotificationMenuBadge count={unreadCount} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.push("/account");
              }}
            >
              <Icon name="settings-outline" size={18} color="#333" />
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
              <Icon name="log-out-outline" size={18} color="#d32f2f" />
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
  avatarContainer: {
    position: "relative",
  },
  accountButton: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ff4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  menuBadge: {
    backgroundColor: "#ff4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
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
