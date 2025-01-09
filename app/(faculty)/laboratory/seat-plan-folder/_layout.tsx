import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const SeatPlanLayout = () => {
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
          name="seat-plan"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default SeatPlanLayout;

const styles = StyleSheet.create({});
