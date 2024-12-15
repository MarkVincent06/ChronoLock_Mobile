import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AccessControl = () => {
  const [connectionStatus, setConnectionStatus] = useState("Idle");
  const [isLoading, setIsLoading] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const RASPBERRY_PI_URL = "http://192.168.1.38:5000";

  const sendCommand = async (command: number) => {
    setIsLoading(true);
    setConnectionStatus("Sending command...");

    try {
      const response = await axios.post(`${RASPBERRY_PI_URL}/control`, {
        command, // 1 for unlock
      });

      if (response.status === 200) {
        Alert.alert("Success", "Door unlocked successfully!");
        setConnectionStatus("Door unlocked successfully!");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error sending command:", error);

      let errorMessage = "An unknown error occurred.";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert("Failed to send command", errorMessage);
      setConnectionStatus("Failed to send command.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        })
      ).start();
    } else {
      animatedValue.stopAnimation();
      animatedValue.setValue(0);
    }
  }, [isLoading]);

  const borderColorAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#28a745", "#1e90ff"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Control</Text>
      <Text style={styles.description}>
        Remotely unlock the ERP laboratory door by clicking the big green
        button.
      </Text>

      <Animated.View
        style={[
          styles.unlockButton,
          { borderColor: isLoading ? borderColorAnimation : "#28a745" },
        ]}
      >
        <TouchableOpacity
          onPress={() => sendCommand(1)}
          disabled={isLoading}
          style={styles.innerButton}
        >
          <Icon name="lock-open" size={50} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
        {connectionStatus}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 40,
    textAlign: "center",
  },
  unlockButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  innerButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccessControl;
