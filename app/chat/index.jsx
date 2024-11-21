import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

export default function Chat() {
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const collectionRef = collection(database, "chats");
        const snapshot = await getDocs(collectionRef);

        if (snapshot.empty) {
          console.log("No documents found in chats collection.");
        } else {
          snapshot.forEach((doc) => {
            console.log(`Doc ID: ${doc.id}, Data:`, doc.data());
          });
        }
      } catch (error) {
        console.error("Error fetching chats collection:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <View>
      <Text>Check console for Firestore test results</Text>
    </View>
  );
}
