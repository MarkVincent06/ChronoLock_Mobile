import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AttendanceLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="instructor"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="student"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AttendanceLayout;
