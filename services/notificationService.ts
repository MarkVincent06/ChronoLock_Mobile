import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import axios from "axios";
import API_URL from "../config/ngrok-api";
import { useUserContext } from "../context/UserContext";

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    if (!Device.isDevice) {
      console.log("Must use physical device for push notifications");
      return false;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // Check if we already have permission
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // If we don't have permission, request it
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error requesting notification permissions:", error);
    return false;
  }
};

export const getExpoPushToken = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      return null;
    }

    const projectId = "a601ec96-9028-42ff-a265-9cfec7ca0f2b";
    if (!projectId) {
      throw new Error("Project ID not found");
    }

    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  } catch (error) {
    console.error("Error getting Expo push token:", error);
    return null;
  }
};

export const sendTokenToBackend = async (
  token: string,
  userId: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${API_URL}/notifications/register-token`,
      {
        token,
        userId,
        platform: Platform.OS,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return true;
    } else {
      console.log("Failed to send token to backend:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error sending token to backend:", error);
    return false;
  }
};

export const setupNotificationListeners = () => {
  // Listener for notifications received while app is running
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Notification received:", notification);
    }
  );

  // Listener for when user taps on a notification
  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification response:", response);
      // Handle navigation based on notification data
      const data = response.notification.request.content.data;
      if (data?.screen) {
        // Navigate to specific screen based on notification data
        // You'll need to implement navigation logic here
      }
    });

  return () => {
    notificationListener.remove();
    responseListener.remove();
  };
};

export const scheduleTestNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test Notification",
      body: "This is a test notification from ChronoLock!",
      data: { screen: "home" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
};
