import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  userType: string;
  avatar: string | null;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  // Retrieve user data from AsyncStorage when the app loads
  useEffect(() => {
    const fetchUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData)); // Set the user state with data from AsyncStorage
        }
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage", error);
      }
    };

    fetchUserFromStorage();
  }, []);

  // Save user data to AsyncStorage when it changes
  useEffect(() => {
    const saveUserToStorage = async () => {
      if (user) {
        try {
          await AsyncStorage.setItem("user", JSON.stringify(user)); // Save the user data
        } catch (error) {
          console.error("Failed to save user data to AsyncStorage", error);
        }
      } else {
        await AsyncStorage.removeItem("user"); // Remove the user data if logged out
      }
    };

    saveUserToStorage();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
