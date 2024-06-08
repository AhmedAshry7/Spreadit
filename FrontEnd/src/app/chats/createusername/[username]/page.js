"use client";
import { useState, useEffect } from "react";
import React from "react";
import { app, firestore } from "../../../../../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Home = ({ params: { username } }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  useEffect(() => {
    const tasksQuery = query(collection(firestore, "users"));

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(users);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = { id: userSnap.id, ...userSnap.data() };
        setUser(userData);
        
      } else {
        setUser(null);
        
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    async function addNewChatRoom() {
      const sortedAddedUserIds = [
        user.id,
        ...addedUsers.map((user) => user.id),
      ].sort();

      const existingChatroom = query(
        collection(firestore, "chatrooms"),
        where("users", "==", sortedAddedUserIds),
      );

      try {
        const existingChatroomSnapshot = await getDocs(existingChatroom);

        if (existingChatroomSnapshot.docs.length > 0) {
          
          router.push(`/chats/${existingChatroomSnapshot.docs[0].id}`);
          return;
        }

        const usersData = addedUsers.reduce((acc, newuser) => {
          acc[newuser.id] = newuser;
          return acc;
        }, {});

        usersData[user.id] = {
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl,
          email: user.email,
        };

        const chatroomData = {
          users: [user.id, ...addedUsers.map((user) => user.id)],
          usersData,
          timestamp: serverTimestamp(),
          groupname: "",
          lastMessage: null,
        };

        const chatroomRef = await addDoc(
          collection(firestore, "chatrooms"),
          chatroomData,
        );
        
        router.push(`/chats/${chatroomRef.id}`);
      } catch (error) {
        
      }
    }
    addNewChatRoom();
  }, [addedUsers]);

  useEffect(() => {
    async function addProfile(username) {
      if (!users || !user) {
        return;
      }
      const newAddedUsers = [
        ...addedUsers,
        users.find((user) => user.name === username),
      ].filter(Boolean);
      setAddedUsers(newAddedUsers);
    }
    addProfile(username);
  }, [user, users]);

  return <div>...routing</div>;
};

export default Home;
