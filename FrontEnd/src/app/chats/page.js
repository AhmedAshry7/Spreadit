"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import apiHandler from "../utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { useRouter } from "next/navigation";
import chaticon from "../assets/chat-dots.svg";
import switchIcon from "../assets/toggles2.svg";
import ChatUsers from "../components/UI/ChatUsers";
import { app, firestore } from "../../../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

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

  const onSelect = (data) => {
    setSelectedChatroom(data);
    router.push(`/chats/${data.id}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftbar}>
        <ChatUsers
          selectedChatroom={selectedChatroom}
          onSelect={onSelect}
          userData={user}
        />
      </div>
      <div className={styles.mainbar}>
        {/* <ChatRoom selectedChatroom={selectedChatroom} user={user} /> */}
      </div>
    </div>
  );
};

export default Home;
