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
import settings from "../../assets/icons/gear.png";
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
  const router = useRouter();
  const navigation = useNavigation(); // Hook to navigate between screens

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

      {/* Right side with Chat and Settings buttons */}
      <View style={styles.headerRight}>
        {/* Chat Button */}
        <TouchableOpacity
          onPress={() => router.push("/chat")}
          style={styles.headerButton}
        >
          <Image
            source={messages}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          onPress={() => {
            console.log("Settings Button Pressed"); // Debugging Log
            // navigation.navigate("settings");
          }}
          style={styles.headerButton}
        >
          <Image
            source={settings}
            style={styles.headerIcon}
            resizeMode="contain"
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
  headerButton: {
    marginHorizontal: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
});
