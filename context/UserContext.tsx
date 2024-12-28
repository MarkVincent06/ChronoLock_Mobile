import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

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

  useEffect(() => {
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

  // Log user changes
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  const updateUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        console.warn(
          `Fetched location using "updateUserLocation" function:`,
          location
        );
        setUser((prevUser) =>
          prevUser ? { ...prevUser, location } : prevUser
        );
      } else {
        console.warn("Location permission denied");
      }
    } catch (error) {
      console.error("Failed to fetch location:", error);
    }
  };

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
