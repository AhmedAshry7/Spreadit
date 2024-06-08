import React, { useState, useEffect, useRef, useMemo } from "react";
import UserCard from "./UserCard";
import { firestore, app } from "../../../../lib/firebase";
import styles from "./ChatUsers.module.css";
import Image from "next/image";
import chaticon from "../../assets/chat-dots.svg";
import switchIcon from "../../assets/toggles2.svg";
import Link from "next/link";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * ChatUsers component for displaying and managing chat users and chat rooms.
 * @component
 * @param {Object} selectedChatroom The selected chat room object containing details about the currently selected chat room
 * @param {Function} onSelect Function to handle selection of a chat room
 * @param {Object} userData The user data object containing details about the current user
 * @param {string} userData.id The unique identifier of the user
 * @param {string} userData.name The name of the user
 * @param {string} userData.avatarUrl The URL of the user
 * @param {string} userData.email The email of the user
 * @returns {JSX.Element} The rendered ChatUsers component.
 *
 * @example
 * const selectedChatroom = {
 *   id: "aH0j4ZX260DIECF2apgc",
 *   groupname: "",
 *   myData: { id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
 *   avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"
 *   email: "hedeya@gmail.com"
 *   name: "abdullah12",  },
 *   usersData: {
 *     userId1: { name: "User 1", avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png" },
 *     userId2: { name: "User 2", avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png" },
 *   },
 *   lastMessage: "Hello there!",
 * };
 * const onSelect = (chatroom) => {
 *   
 * };
 * const userData = {
 * id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
 * avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
 * email: "hedeya@gmail.com",
 * name: "abdullah12", };
 * <ChatUsers selectedChatroom={selectedChatroom} onSelect={onSelect} userData={userData} />
 */

const ChatUsers = ({ selectedChatroom, onSelect, userData }) => {
  const [loading, setLoading] = useState(false);
  const [userChatrooms, setUserChatrooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  const localStorageKey = "ChatUsers_chatFilters";
  const [showDirectChats, setShowDirectChats] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if window object exists (indicating browser environment)
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        try {
          return JSON.parse(storedValue).showDirectChats;
        } catch (error) {
          console.error("Error parsing stored chat filters:", error);
        }
      }
    }
    return true; // Default value (true)
  });
  const [showGroupChats, setShowGroupChats] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if window object exists (indicating browser environment)
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        try {
          return JSON.parse(storedValue).showGroupChats;
        } catch (error) {
          console.error("Error parsing stored chat filters:", error);
        }
      }
    }
    return true; // Default value (true)
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem(localStorageKey);
      if (storedValue !== null) {
        try {
          const parsedValue = JSON.parse(storedValue);
          setShowDirectChats(parsedValue.showDirectChats);
          setShowGroupChats(parsedValue.showGroupChats);
        } catch (error) {
          console.error("Error parsing stored chat filters:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ showDirectChats, showGroupChats }),
    );
  }, [showDirectChats, showGroupChats]);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setShowModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  useEffect(() => {
    if (!userData?.id) return;
    setLoading(true);
    const chatroomsQuery = query(
      collection(firestore, "chatrooms"),
      where("users", "array-contains", userData.id),
    );
    const unsubscribeChatrooms = onSnapshot(chatroomsQuery, (snapshot) => {
      const chatrooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserChatrooms(chatrooms);
      setLoading(false);
    });

    return () => unsubscribeChatrooms();
  }, [userData]);

  const openChat = async (chatroom) => {
    const data = {
      id: chatroom.id,
      myData: userData,
      otherData:
        chatroom.usersData[chatroom.users.find((id) => id !== userData.id)],
    };
    onSelect(data);
  };

  const handleDirectChatsChange = () => {
    setShowDirectChats(!showDirectChats);
    
  };

  const handleGroupChatsChange = () => {
    setShowGroupChats(!showGroupChats);
    
  };

  if (loading) {
    return <p>...loading</p>;
  }

  return (
    <div>
      <div className={styles.headbar}>
        <h5>Chats</h5>
        <div>
          <Image
            src={switchIcon}
            className={styles.icons}
            onClick={() => {
              setShowModal(!showModal);
            }}
            alt="switch icon"
          />
          <Link className={styles.link} href="/chats/create">
            <Image src={chaticon} alt="chat icon" className={styles.icons} />
          </Link>
        </div>
        {showModal && (
          <div className={styles.modal} ref={ref}>
            <div className={styles.listcontainer}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={showDirectChats}
                onClick={handleDirectChatsChange}
              ></input>
              <label className={styles.dlabel} for="checkbox">
                Direct Chats
              </label>
            </div>
            <div className={styles.listcontainer}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={showGroupChats}
                onClick={handleGroupChatsChange}
              ></input>
              <label className={styles.dlabel} for="checkbox">
                Group Chats
              </label>
            </div>
          </div>
        )}
      </div>
      <div>
        {userChatrooms.map((chatroom) => (
          <div
            key={chatroom.id}
            onClick={() => {
              openChat(chatroom);
            }}
          >
            <UserCard
              name={
                chatroom.groupname !== ""
                  ? chatroom.groupname
                  : chatroom.usersData[
                      chatroom.users.find((id) => id !== userData?.id)
                    ].name
              }
              profilePicture={
                chatroom.groupname !== ""
                  ? ""
                  : chatroom.usersData[
                      chatroom.users.find((id) => id !== userData?.id)
                    ].avatarUrl
              }
              latestMeassageText={chatroom.lastMessage}
              isSelected={
                selectedChatroom ? selectedChatroom.id === chatroom.id : false
              }
              display={
                chatroom.groupname !== "" ? showGroupChats : showDirectChats
              }
              type={"chat"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUsers;
