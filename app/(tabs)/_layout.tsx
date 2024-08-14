import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

import home from "../../assets/icons/home.png";
import access from "../../assets/icons/access.png";
import attendance from "../../assets/icons/attendance.png";
import laboratory from "../../assets/icons/laboratory.png";

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

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 55,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
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
});
