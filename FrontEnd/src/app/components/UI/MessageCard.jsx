import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import ReportModal from "../UI/ReportModal";
import Image from "next/image";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";
import apiHandler from "../../utils/apiHandler";
import getCookies from "../../utils/getCookies";
import styles from "./MessageCard.module.css";
import remove from "../../assets/post-images/delete.svg";
import report from "../../assets/post-images/report.svg";

/**
 * MessageCard component for displaying individual chat messages.
 * @component
 * @param {Object} message The message object containing its content and metadata
 * @param {Object} message.sender The sender of the message
 * @param {string} message.sender.id The unique identifier of the sender
 * @param {string} message.sender.name The name of the sender
 * @param {string} message.sender.avatarUrl The URL of the sender's profile picture
 * @param {string} message.sender.email The email of the sender
 * @param {Date} message.time The timestamp when the message was sent
 * @param {string} message.content The text content of the message
 * @param {string} message.type The type of the message (text or image)
 * @param {string} message.image The URL of the image attached to the message (if type is image)
 * @param {Object} me The current user
 * @param {Function} onDelete Function to handle deletion of the message
 * @returns {JSX.Element} The rendered MessageCard component.
 *
 * @example
 * const message = {
 *   id: '1',
 *   const sender = {
 *   id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
 *   avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"
 *   email: "hedeya@gmail.com"
 *   name: "abdullah12" }
 *   time: new Date(),
 *   content: 'Hello ',
 *   type: 'text',
 * };
 * const me = {
 *   id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
 *   avatarUrl: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"
 *   email: "hedeya@gmail.com"
 *   name: "abdullah12"
 * };
 * const onDelete = () => {
 *   
 * };
 * <MessageCard message={message} me={me} onDelete={onDelete} />
 */

const MessageCard = ({ message, me, onDelete }) => {
  const [isUser, setIsUser] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [sender, setSender] = useState(message.sender);
  const [temporaryToken, setToken] = useState(null);

  useEffect(() => {
    
    
    setIsUser(message.sender.id === me.id);
  }, [me, message]);

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies && cookies.access_token) {
        setToken(cookies.access_token);
      }
    }
    cookiesfn();
  }, []);

  useEffect(() => {
    const fetchSenderDetails = async () => {
      try {
        const senderDoc = await getDoc(
          doc(firestore, "users", message.sender.id),
        );
        if (senderDoc.exists()) {
          const senderData = senderDoc.data();
          setSender(senderData);
        } else {
          
        }
      } catch (error) {
        console.error("Error fetching sender details:", error.message);
      }
    };

    fetchSenderDetails();
  }, [message.sender.id]);

  const parseTime = (timestamp) => {
    const date = timestamp?.toDate();
    const momentDate = moment(date);
    if (momentDate.fromNow() == "in a few seconds") {
      return "a few seconds ago";
    }
    return momentDate.fromNow();
  };

  const deletemessage = async () => {
    try {
      await deleteDoc(doc(firestore, "messages", message.id));
      onDelete();
      
    } catch (error) {
      console.error("Error deleting message:", error.message);
    }
  };
  async function onReport(mainReason, subReason) {
    try {
      const response = await apiHandler(
        `/users/report`,
        "POST",
        {
          username: message.sender.name,
          reason: mainReason,
          subreason: subReason,
        },
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error Posting data:", error);
    }
  }

  async function onBlock() {
    try {
      const response = await apiHandler(
        `/users/block`,
        "POST",
        { username: message.sender.name },
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div key={message.id} className={isUser ? styles.me : styles.another}>
      {showReportModal && (
        <ReportModal
          userName={message.sender.name}
          subRedditPicture={null}
          subRedditName={null}
          subRedditRules={null}
          onReport={(mainReason, subReason) => onReport(mainReason, subReason)}
          onBlock={() => onBlock()}
          closeModal={() => setShowReportModal(false)}
        />
      )}
      <div className={isUser ? styles.meheader : styles.anotherheader}>
        <div className={styles.msgtitle}>
          <img
            src={sender.avatarUrl}
            alt="profile Picture"
            className={styles.picture}
          />
          <h6>{message.sender.name}</h6>
          <p className={styles.time}>{parseTime(message.time)}</p>
          {isUser && (
            <Image
              src={remove}
              className={styles.icons}
              alt="delete icon"
              onClick={deletemessage}
            />
          )}
          {!isUser && (
            <Image
              src={report}
              className={styles.icons}
              alt="report icon"
              onClick={() => setShowReportModal(true)}
            />
          )}
        </div>
      </div>
      <div className={isUser ? styles.mecontent : styles.anothercontent}>
        {message.type === "text" && <p>{message.content}</p>}
        {message.type !== "text" && (
          <img src={message.image} className={styles.messagepictures} />
        )}
      </div>
    </div>
  );
};

export default MessageCard;
