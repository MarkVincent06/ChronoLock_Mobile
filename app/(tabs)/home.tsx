import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Card, ListItem } from "@rneui/themed";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../context/UserContext";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useUserContext();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();

  // Function to handle Google Logout
  const handleGoogleLogout = async () => {
    setIsLoading(true);
    setIsButtonDisabled(true);

    try {
      await GoogleSignin.signOut(); // Sign out from Google
      await signOut(auth); // Sign out from Firebase

      await AsyncStorage.removeItem("user");
      setUser(null);

      Alert.alert("Success", "You have been logged out.");

      router.replace("/(auth)/login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to log out.");
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (!user) {
        // User is logged out, navigate to the login screen
        router.replace("/(auth)/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  //  if (!user) {
  //    return (
  //      <View style={styles.loaderContainer}>
  //        <ActivityIndicator size="large" color="#1A73E8" />
  //      </View>
  //    );
  //  }

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Card containerStyle={styles.welcomeCard}>
        <Card.Title style={styles.welcomeText}>
          Welcome, {user?.firstName} {user?.lastName}!
        </Card.Title>
        <Text style={styles.userTypeText}>{user?.userType}</Text>
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

      {/* Logout Button Section */}
      <View style={styles.logoutButtonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#d9534f" />
        ) : (
          <Button
            title="Logout"
            onPress={handleGoogleLogout}
            color="#d9534f"
            disabled={isButtonDisabled}
          />
        )}
      </View>
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
  scrollContent: {
    paddingBottom: 50,
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
  logoutButtonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 40,
  },
});
