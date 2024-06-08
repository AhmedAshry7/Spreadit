"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";
import Sidebar from "../components/UI/Sidebar";
import ToolBar from "../components/UI/Toolbar";
import Notification from "./Notification";
import styles from "./page.module.css";
import settingsIcon from "../assets/settings-wheel.svg";
import { TailSpin } from "react-loader-spinner";

function notifications() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [token, setToken] = useState(null);
  const [notificationArray, setNotificationArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesNumber, setMessagesNumber] = useState(0);

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
        setNotificationArray(notifications);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 0);
    };

    // Subscribe to window resize event
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className={styles.page}>
      <ToolBar loggedin={true} page={"Spreadit"} />
      {windowWidth > 1050 && (
        <div className={styles.sideBar}>
          {" "}
          <Sidebar />
        </div>
      )}
      <div className={styles.pageContent}>
        <div className={styles.pageTitle}>Notifications</div>
        <div className={styles.bar}>
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
            Mark all as read
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
        <div className={styles.notificationsFeed}>
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
          {!loading &&
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
      </div>
    </div>
  );
}

export default notifications;
