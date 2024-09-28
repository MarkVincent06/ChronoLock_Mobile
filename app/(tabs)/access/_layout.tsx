import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const AccessLayout = () => {
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
          name="control"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="management"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AccessLayout;

const styles = StyleSheet.create({});
