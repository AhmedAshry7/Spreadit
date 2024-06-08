"use client";
import Image from "next/image";
import styles from "../page.module.css";
import React from "react";
import { useState, useEffect } from "react";
import apiHandler from "../../utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { useRouter } from "next/navigation";
import ChatUsers from "@/app/components/UI/ChatUsers";
import chaticon from "../../assets/chat-dots.svg";
import { app, firestore } from "../../../../lib/firebase";
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
import toast from "react-hot-toast";
import Blockmute from "@/app/components/UI/Blockmute";
import Blockedmuted from "@/app/components/UI/Blockedmuted";

const Home = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [groupname, setGroupname] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setUsername(cookies.username);
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);

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

  const clearInput = () => {
    setInputValue("");
  };

  const handlenameChange = (event) => {
    setInputValue(event.target.value);
    setGroupname(event.target.value);
  };

  const addNewChatRoom = async () => {
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
        toast.error("Chatroom already exists");
        
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
        groupname: groupname || "",
        lastMessage: null,
      };

      const chatroomRef = await addDoc(
        collection(firestore, "chatrooms"),
        chatroomData,
      );
      
      router.push(`/chats/${chatroomRef.id}`);
    } catch (error) {
      
      //toast.error(error.message)
    }
  };
  const handleStart = (event) => {
    event.preventDefault();
    clearInput();
    if (addedUsers.length !== 0) {
      if (addedUsers.length == 1) {
        addNewChatRoom();
      } else if (groupname !== "") {
        addNewChatRoom();
        setGroupname("");
      }
    }
  };

  const addProfile = (newName) => {
    if (newName === username) {
      toast.error("this is your acount");
      return;
    }

    const newAddedUsers = [
      ...addedUsers,
      users.find((user) => user.name === newName),
    ].filter(Boolean);
    setAddedUsers(newAddedUsers);
  };

  const removeProfile = async (nameToRemove) => {
    const newAddedUsers = addedUsers.filter(
      (user) => user.name !== nameToRemove,
    );
    setAddedUsers(newAddedUsers);
  };

  const onSelect = (data) => {
    setSelectedChatroom(data);
    router.push(`/chats/${data.id}`);
  };
  const isButtonDisabled =
    (groupname === "" && addedUsers.length > 1) || addedUsers.length == 0;
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
        <div className={styles.pagerowflex}>
          <div className={styles.pageheader}>
            <h5>New Chat</h5>
            {addedUsers.length > 1 && (
              <div className={styles.inputwrap}>
                <input
                  className={styles.inputusers}
                  required
                  value={inputValue}
                  placeholder=" "
                  onChange={handlenameChange}
                ></input>
                <label for="">Group name</label>
              </div>
            )}
            <Blockmute
              type=""
              description=""
              onAdd={(newName) => addProfile(newName)}
              inputmsg="Type username(s)"
            />
            {addedUsers.map((profile, index) => (
              <Blockedmuted
                key={index}
                profilename={profile.name}
                path={2}
                onRemove={removeProfile}
              />
            ))}
          </div>
          <button
            className={styles.addbutton}
            disabled={isButtonDisabled}
            onClick={handleStart}
          >
            Start chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
