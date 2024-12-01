import { StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

import React from "react";

const AccountLayout = () => {
  const router = useRouter();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Account Settings",
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push("/(tabs)/home")}
              >
                <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="change-password"
          options={{
            title: "Change Password",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
};

export default AccountLayout;

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 10,
    marginRight: 12,
  },
});
