import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: true,
            title: "Forgot Password",
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
