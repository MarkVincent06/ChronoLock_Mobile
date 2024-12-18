import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "@rneui/themed";
import { Link } from "expo-router";

const Access = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Access Control Section */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Access Control</Card.Title>
        <Card.Divider />
        <View style={styles.sectionContent}>
          <Text style={styles.descriptionText}>
            Remotely unlock the ERP laboratory door using internet connection.
            Useful for users without RFID cards or when RFID readers
            malfunction.
          </Text>
          <Link href="/access/control" style={styles.button}>
            <Text style={styles.buttonTitle}>Manage Access Control</Text>
          </Link>
        </View>
      </Card>

      {/* THIS IS FOR ADMIN */}
      {/* Access Management Section */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Access Management</Card.Title>
        <Card.Divider />
        <View style={styles.sectionContent}>
          <Text style={styles.descriptionText}>
            Manage access permissions for users or groups. Set schedules, grant
            temporary access, or revoke privileges as needed.
          </Text>
          <Link href="/access/management" style={styles.button}>
            <Text style={styles.buttonTitle}>Manage Access Permissions</Text>
          </Link>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#6c757d",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    textAlign: "center",
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Access;
