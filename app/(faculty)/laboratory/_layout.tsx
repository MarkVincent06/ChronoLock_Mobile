import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const LaboratoryLayout = () => {
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
          name="occupancy"
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
          name="schedule"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="seat-plan"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default LaboratoryLayout;

const styles = StyleSheet.create({});
