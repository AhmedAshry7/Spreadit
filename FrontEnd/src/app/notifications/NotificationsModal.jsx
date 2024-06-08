"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Notification from "./Notification";
import styles from "./NotificationsModal.module.css";
import settingsIcon from "../assets/settings-wheel.svg";
import markallasreadIcon from "../assets/mark-all-as-read.svg";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";
import { TailSpin } from "react-loader-spinner";
import notifications from "./page";

function NotificationsModal() {
  const router = useRouter();
  const [messagesNumber, setMessagesNumber] = useState(0);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationArray, setNotificationArray] = useState([]);
  const [suggestedCommunity, setSuggestedComunity] = useState("");

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
    async function getMessagesNumber() {
      try {
        const count = await handler(`/message/unreadcount/`, "GET", "", token);
        setMessagesNumber(count.unreadMessageCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getMessagesNumber();
  }, [token]);

  useEffect(() => {
    if (token === null) return;
    async function getNotifications() {
      setLoading(true);
      try {
        const notifications = await handler(`/notifications`, "GET", "", token);
        if (notifications.length === 0) {
          const suggested = await handler(
            `/community/suggest`,
            "GET",
            "",
            token,
          );
          setSuggestedComunity(suggested.communityname);
        }
        setNotificationArray(notifications);
      } catch (error) {
        console.error("Error fetching data:", error);
        const suggested = await handler(`/community/suggest`, "GET", "", token);
        
        setSuggestedComunity(suggested.communityname);
      } finally {
        setLoading(false);
      }
    }
    getNotifications();
  }, [token]);

  async function markAllAsRead() {
    try {
      const response = await handler(
        `/notifications/mark-all-as-read`,
        "PUT",
        "",
        token,
      );
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const parseAndStyleLinks = (text) => {
    const subRedditRegex = /r\/(\w+)/g;
    const highlightedText = text.replace(
      subRedditRegex,
      `<a href="/community/${suggestedCommunity}" class="subReddit-link" data-subReddit="$1">$&</a>`,
    );

    return highlightedText;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <div className={styles.notifications}>Notifications</div>
        <div
          className={styles.messages}
          onClick={() => {
            router.push(`/message/messages`);
          }}
        >
          Messages
          {messagesNumber !== 0 && (
            <div
              style={{
                width: `${10 + messagesNumber.toString().length * 6}px`,
                height: `${10 + messagesNumber.toString().length * 6}px`,
              }}
              className={styles.messagesNumber}
            >
              {messagesNumber}
            </div>
          )}
        </div>
        <div
          className={styles.markRead}
          onClick={() => {
            markAllAsRead();
          }}
        >
          <Image
            src={markallasreadIcon}
            width={20}
            height={20}
            viewBox="0 0 20 20"
            alt="mark read"
            title="Mark all as read"
          />
        </div>
        <div
          className={styles.settings}
          onClick={() => {
            router.push(`/settings/notifications`);
          }}
        >
          <Image
            src={settingsIcon}
            width={20}
            height={20}
            viewBox="0 0 20 20"
            alt="settings"
            title="Notifications settings"
          />
        </div>
      </div>
      <div className={styles.modalBody}>
        {loading && (
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#FF4500"
            ariaLabel="tail-spin-loading"
            radius="0.5"
            wrapperStyle={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
            wrapperClass=""
          />
        )}
        {!loading && (
          <div>
            {suggestedCommunity !== "" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  alignItems: "center",
                  paddingBottom: "0px",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "600" }}>
                  You don’t have any activity yet
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: parseAndStyleLinks(
                      `That’s ok, maybe you just need the right inspiration. Try posting in r/${suggestedCommunity} , a popular community for discussion.`,
                    ),
                  }}
                ></div>
              </div>
            )}
            {suggestedCommunity === "" &&
              notificationArray.map((notification, index) => (
                <div className={styles.notification} key={index}>
                  <Notification
                    id={notification._id}
                    type={notification.notification_type}
                    title={notification.content}
                    user={notification.related_user}
                    subReddit={
                      notification.post
                        ? notification.post.community
                        : notification.comment
                          ? notification.comment.communityTitle
                          : ""
                    }
                    content={
                      notification.comment ? notification.comment.content : ""
                    }
                    time={notification.created_at}
                    read={notification.is_read}
                    postId={notification.postId}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
      {!loading && (
        <div className={styles.modalFooter}>
          {suggestedCommunity === "" && (
            <button
              type="button"
              className={styles.seeAll}
              onClick={() => {
                router.push(`/notifications`);
              }}
            >
              See All
            </button>
          )}
          {suggestedCommunity !== "" && (
            <button
              type="button"
              className={styles.seeAll}
              onClick={() => {
                router.push(`/community/${suggestedCommunity}`);
              }}
            >
              {`Visit r/${suggestedCommunity}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationsModal;
