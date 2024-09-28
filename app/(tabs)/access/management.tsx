import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AccessManagement = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Management</Text>
      <Text style={styles.description}>
        Here you can manage user access permissions, set schedules, and more.
      </Text>
      {/* Add further UI components or logic here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6c757d",
  },
});

export default AccessManagement;
