import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const AttendanceLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="section"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="student-list"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="attendances"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="record-attendance"
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
