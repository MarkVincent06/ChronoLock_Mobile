import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const AttendanceLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="class"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="attendance-view"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AttendanceLayout;

const styles = StyleSheet.create({});
