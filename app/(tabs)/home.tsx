import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "@rneui/themed";
import { useUserContext } from "../../context/UserContext";
import API_URL from "../../config/ngrok-api"; // Adjust the path as needed

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [subjects, setSubjects] = useState([]);
  const [events, setEvents] = useState([]);

  // Update time every minute
  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch data for subjects and events
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch both subjects and events concurrently using Promise.all
        const [subjectsResponse, eventsResponse] = await Promise.all([
          fetch(`${API_URL}/subjects`),
          fetch(`${API_URL}/events`),
        ]);

        // Check if responses are okay, otherwise throw error
        if (!subjectsResponse.ok) {
          throw new Error("Failed to fetch subjects");
        }
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }

        const subjectsData = await subjectsResponse.json();
        const eventsData = await eventsResponse.json();

        setSubjects(subjectsData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter for ongoing subjects
  const matchingSubjects = subjects.filter(subject => {
    const isToday = subject.day === currentTime.toLocaleDateString("en-US", { weekday: "long" });
    const currentTimeMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startHour, startMinute] = subject.start_time.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const [endHour, endMinute] = subject.end_time.split(":").map(Number);
    const endMinutes = endHour * 60 + endMinute;

    return isToday && currentTimeMinutes >= startMinutes && currentTimeMinutes < endMinutes;
  });

  // Filter and sort upcoming events
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= currentTime)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Card containerStyle={styles.welcomeCard}>
        <Card.Title style={styles.welcomeText}>
          Welcome, {user?.firstName}!
        </Card.Title>
        <Text style={styles.userTypeText}>{user?.userType}</Text>
        <Text style={styles.statusText}>
          You have {matchingSubjects.length} ongoing classes.
        </Text>
      </Card>

      {/* Ongoing Classes Section */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#3d85c6" />
      ) : matchingSubjects.length > 0 ? (
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Ongoing Classes</Card.Title>
          <Card.Divider />
          {matchingSubjects.map(subject => (
            <View key={subject.id} style={styles.occupiedCard}>
              <Text style={styles.occupiedText}>OCCUPIED</Text>
              <Text style={styles.subjectTitle}>{subject.name}</Text>
              <Text style={styles.subjectTime}>
                {subject.start_time} - {subject.end_time}
              </Text>
            </View>
          ))}
        </Card>
      ) : (
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>No Ongoing Classes</Card.Title>
          <Card.Divider />
          <Text style={styles.noDataText}>No subjects are ongoing right now.</Text>
        </Card>
      )}

      {/* Upcoming Events Section */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Upcoming Events</Card.Title>
        <Card.Divider />
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.name}</Text>
              <Text style={styles.eventTime}>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No upcoming events.</Text>
        )}
      </Card>

      {/* My Schedule Section */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>My Schedule</Card.Title>
        <Card.Divider />
        {subjects.length > 0 ? (
          subjects
            .filter(subject => subject.day === currentTime.toLocaleDateString("en-US", { weekday: "long" }))
            .sort((a, b) => {
              const [aHour, aMinute] = a.start_time.split(":").map(Number);
              const [bHour, bMinute] = b.start_time.split(":").map(Number);
              return aHour * 60 + aMinute - (bHour * 60 + bMinute);
            })
            .map(subject => (
              <View key={subject.id} style={styles.scheduleCard}>
                <Text style={styles.subjectTitle}>{subject.name}</Text>
                <Text style={styles.subjectTime}>
                  {subject.start_time} - {subject.end_time}
                </Text>
                <Text style={styles.subjectDetails}>Section: {subject.section}</Text>
              </View>
            ))
        ) : (
          <Text style={styles.noDataText}>No schedule available for today.</Text>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
    paddingBottom: 100,
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
  occupiedCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8d7da",
    borderRadius: 5,
  },
  occupiedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 5,
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subjectTime: {
    fontSize: 14,
    color: "#6c757d",
  },
  subjectDetails: {
    fontSize: 14,
    color: "#6c757d",
  },
  noDataText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
  scheduleCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
  },
  eventCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#d9edf7",
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventTime: {
    fontSize: 14,
    color: "#6c757d",
  },
});
