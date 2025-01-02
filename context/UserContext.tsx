import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { locationEmitter } from "@/app/tasks/backgroundLocationTask";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  userType: string;
  avatar: string | null;
  location: Location.LocationObject | null;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  // Request location permissions (both foreground and background)
  // const requestPermissions = async () => {
  //   const { status: foregroundStatus } =
  //     await Location.requestForegroundPermissionsAsync();

  //   if (foregroundStatus === "granted") {
  //     const { status: backgroundStatus } =
  //       await Location.requestBackgroundPermissionsAsync();

  //     if (backgroundStatus === "granted") {
  //       console.log("Background location permissions granted.");
  //     } else {
  //       console.error("Background location permissions denied.");
  //     }
  //   } else {
  //     console.error("Foreground location permissions denied.");
  //   }
  // };

  useEffect(() => {
    // Request location permissions when the app starts
    // requestPermissions();

    const fetchUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage", error);
      }
    };

    fetchUserFromStorage();
  }, []);

  useEffect(() => {
    const saveUserToStorage = async () => {
      if (user) {
        try {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to save user data to AsyncStorage", error);
        }
      } else {
        await AsyncStorage.removeItem("user");
      }
    };

    saveUserToStorage();
  }, [user]);

  // useEffect(() => {
  //   const handleLocationUpdate = (location: Location.LocationObject) => {
  //     console.warn("Received location update from background task:", location);
  //     setUser((prevUser) => (prevUser ? { ...prevUser, location } : prevUser));
  //   };

  //   // Subscribe to location updates
  //   locationEmitter.on("locationUpdate", handleLocationUpdate);

  //   // Clean up the event listener on unmount
  //   return () => {
  //     locationEmitter.off("locationUpdate", handleLocationUpdate);
  //   };
  // }, []);

  // const updateUserLocation = async () => {
  //   try {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status === "granted") {
  //       const location = await Location.getCurrentPositionAsync({
  //         accuracy: Location.Accuracy.High,
  //       });
  //       console.warn(`Fetched location using "updateUserLocation":`, location);
  //       setUser((prevUser) =>
  //         prevUser ? { ...prevUser, location } : prevUser
  //       );
  //     } else {
  //       console.warn("Location permission denied");
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch location:", error);
  //   }
  // };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
