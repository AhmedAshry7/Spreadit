import React, { useState, useEffect, useRef } from "react";
import { firestore } from "../../../../lib/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import styles from "./ChatRoom.module.css";
import MessageCard from "./MessageCard";
import debounce from "lodash/debounce";
import MessageInput from "./MessageInput";
import toast from "react-hot-toast";

/**
 * ChatRoom component for displaying and managing chat messages within a specific chat room.
 * @component
 * @param {Object} user The user data object containing details about the current user
 * @param {string} user.id The unique identifier of the user
 * @param {string} user.name The name of the user
 * @param {string} user.avatarUrl The URL of the user
 * @param {string} user.email The email of the user
 * @param {Object} selectedChatroom The selected chat room object containing details about the chat room
 * @returns {JSX.Element} The rendered ChatRoom component.
 *
 * @example
 * const user = {
 * id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
 * avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"
 * email: "hedeya@gmail.com"
 * name: "abdullah12" };
 * const selectedChatroom = {
 *   id: "aH0j4ZX260DIECF2apgc",
 *   groupname: "",
 *   myData: { id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
 *   avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"
 *   email: "hedeya@gmail.com"
 *   name: "abdullah12"  },
 *   usersData: {
 *     userId1: { name: "User 1", avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png" },
 *     userId2: { name: "User 2", avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png" },
 *   },
 *   lastMessage: "Hello there!",
 * };
 * <ChatRoom user={user} selectedChatroom={selectedChatroom} />
 */

const ChatRoom = ({ user, selectedChatroom }) => {
  const [me, setMe] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatroomname, setChatroomname] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState("");
  const messagesContainerRef = useRef(null);

  const debouncedScroll = debounce(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, 700); // Debounce for 100 milliseconds

  useEffect(() => {
    
    setMe(selectedChatroom?.myData);
    setChatRoomId(selectedChatroom?.id);
    setChatroomname(
      selectedChatroom?.groupname !== ""
        ? selectedChatroom?.groupname
        : selectedChatroom?.usersData[
            selectedChatroom?.users.find((id) => id !== user?.id)
          ].name,
    );
  }, [selectedChatroom, user]);

  useEffect(() => {
    debouncedScroll();
  }, [messages]);

  //get messages
  useEffect(() => {
    if (!chatRoomId) return;
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "messages"),
        where("chatRoomId", "==", chatRoomId),
        orderBy("time", "asc"),
      ),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
        
        
      },
    );

    return unsubscribe;
  }, [chatRoomId]);

  //put messages in db
  const onSend = async () => {
    const messagesCollection = collection(firestore, "messages");
    // Check if the message is not empty
    if (message == "" && image == "") {
      return;
    }

    try {
      // Add a new message to the Firestore collection
      
      
      const newMessage = {
        chatRoomId: chatRoomId,
        sender: me,
        content: message,
        time: serverTimestamp(),
        image: image,
        type: image !== "" ? "image" : "text",
      };
      if (image !== "") {
        toast.success("uploading image");
      }

      await addDoc(messagesCollection, newMessage);
      setMessage("");
      setImage("");
      //send to chatroom by chatroom id and update last message
      const chatroomRef = doc(firestore, "chatrooms", chatRoomId);
      await updateDoc(chatroomRef, {
        lastMessage: message ? message : "Image",
      });

      // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message:", error.message);
    }

    // Scroll to the bottom after sending a message
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    onSend();
  }, [image]);

  const changeMessage = (newMessage) => {
    setMessage(newMessage);
  };

  const changeImage = (newImage) => {
    setImage(newImage);
  };

  const deleteMessage = async () => {
    try {
      // Get the latest message after deletion
      
      const latestMessage = messages[messages.length - 2]; // Get the second last message

      // Update the lastMessage of the chat room
      const chatroomRef = doc(firestore, "chatrooms", chatRoomId);
      await updateDoc(chatroomRef, {
        lastMessage: latestMessage ? latestMessage.content : "",
      });
    } catch (error) {
      console.error("Error deleting message:", error.message);
    }
  };

  return (
    <div className={styles.room}>
      <div ref={messagesContainerRef} className={styles.messages}>
        {messages?.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            me={me}
            onDelete={deleteMessage}
          />
        ))}
      </div>
      <div className={styles.messageinput}>
        <MessageInput
          message={message}
          setmessage={(newMessage) => {
            changeMessage(newMessage);
          }}
          onSend={onSend}
          image={image}
          setimage={(newImage) => {
            changeImage(newImage);
          }}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
