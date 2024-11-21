import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");

    // const q = query(collectionRef, orderBy("createdAt", "desc"));

    // return onSnapshot(q, (querySnapshot) => {
    //   const messagesFirestore = querySnapshot.docs.map((doc) => {
    //     const message = doc.data();
    //     return {
    //       _id: doc.id,
    //       text: message.text,
    //       createdAt: message.createdAt.toDate(),
    //       user: {
    //         _id: message.user._id,
    //         name: message.user.name,
    //       },
    //     };
    //   });

    //   setMessages(messagesFirestore);
    // });
  }, [database]);

  // Fallback user ID to handle undefined case
  const currentUserId = auth.currentUser?.uid || "unknown_user"; // or any other fallback value

  return (
    <GiftedChat
      messages={messages}
      // onSend={(messages) => addMessage(messages)}
      user={{ _id: currentUserId }} // Ensure _id is always a string
    />
  );
};

// Function to add message to Firestore
const addMessage = async (messages: any[]) => {
  try {
    const { text, user } = messages[0]; // Assuming single message send
    await addDoc(collection(database, "chats"), {
      text,
      user,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding message: ", error);
  }
};

export default Chat;

const styles = StyleSheet.create({});
