import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native"; // Import to use navigation hook

import home from "../../assets/icons/home.png";
import access from "../../assets/icons/access.png";
import attendance from "../../assets/icons/attendance.png";
import laboratory from "../../assets/icons/laboratory.png";
import chronolockLogo from "../../assets/images/chronolock-logo2a.png";
import { useUserContext } from "@/context/UserContext";

import messages from "../../assets/icons/message-circle.png";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
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
  const navigation = useNavigation();

  const avatarSource =
    user?.avatar && user.avatar !== ""
      ? { uri: user.avatar }
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

      {/* Right side with Chat and Account buttons */}
      <View style={styles.headerRight}>
        {/* Chat Button */}
        <TouchableOpacity
          onPress={() => router.push("/chat")}
          style={styles.accountButton}
        >
          <Image
            source={messages}
            style={styles.headerIcon}
            resizeMode="contain"
          />
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
                icon={home}
                color={color}
                name="Home"
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
                icon={access}
                color={color}
                name="Access"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="attendance"
          options={{
            title: "Attendance",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={attendance}
                color={color}
                name="Attendance"
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
                icon={laboratory}
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
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
});
