"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Layout from "../MessageLayout";
import Bar from "../InboxBar";
import styles from "../InboxPages.module.css";
import Message from "../Message";
import handler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";

function Sent() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    if (token === null) return;
    async function getMessages() {
      setLoading(true);
      try {
        const messages = await handler(`/message/sent/`, "GET", "", token);
        const conversations = messages.reduce((acc, message) => {
          // If the conversation ID already exists in the accumulator, push the message to its array
          if (acc[message.conversationId]) {
            acc[message.conversationId].push(message);
          } else {
            // Otherwise, create a new array for the conversation ID
            acc[message.conversationId] = [message];
          }
          return acc;
        }, {});

        // Now the 'conversations' object contains conversations grouped by conversation ID
        
        setMessageArray(conversations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, [token]);

  return (
    <div className={styles.page}>
      <Layout index={1} />
      <div className={styles.body}>
        <div className={styles.messageFeed}>
          {!loading &&
            Object.entries(messageArray)
              .reverse()
              .map(([conversationId, conversation], index) => (
                <div className={styles.conversation} key={index}>
                  <Message
                    user={
                      conversation[0].senderType === "user"
                        ? conversation[0].relatedUserOrCommunity
                        : ""
                    }
                    subReddit={
                      conversation[0].senderType === "community"
                        ? conversation[0].relatedUserOrCommunity
                        : ""
                    }
                    subject={conversation[0].subject}
                    messages={conversation}
                    id={conversationId}
                    isRead={conversation[0].isRead}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Sent;
