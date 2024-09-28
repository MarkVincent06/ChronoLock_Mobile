import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, ListItem, Icon } from "@rneui/themed";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Card containerStyle={styles.welcomeCard}>
        <Card.Title style={styles.welcomeText}>Welcome, Mark!</Card.Title>
        <Text style={styles.userTypeText}>Instructor</Text>
        <Text style={styles.statusText}>
          You have 2 scheduled classes today.
        </Text>
      </Card>

      {/* Upcoming Events Section */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Upcoming Events</Card.Title>
        <Card.Divider />
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Faculty Meeting: 3 PM</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Lab Maintenance: Tomorrow, 10 AM</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Card>

      {/* Latest Updates Section */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Latest Updates</Card.Title>
        <Card.Divider />
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              New Announcement: Exam Schedule Released
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Lab is currently locked</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  welcomeCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#3d85c6",
    elevation: 3,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  userTypeText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 16,
    color: "#e0f7fa",
    textAlign: "center",
  },
  card: {
    borderRadius: 10,
    padding: 0,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  listItem: {
    backgroundColor: "#e9ecef",
  },
});
