"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Notification.module.css";
import parseTime from "../utils/timeDifference";
import replyIcon from "../assets/reply.svg";
import optionsIcon from "../assets/three-dots-menu.svg";
import handler from "../utils/apiHandler";
import getCookies from "../utils/getCookies";
import PostDropDownMenu from "../components/post/PostDropDownMenu";
import PostDropDownItem from "../components/post/PostDropDownItem";

/**
 * Component for displaying a notification.
 * @component
 * @param {string} id - Identifier for the notification.
 * @param {string} type - Type of notification (e.g., "postReply", "commentReply", "mention", "postUpvote", "commentUpvote", "newFollower").
 * @param {object} user - Object containing information about the user who triggered the notification.
 * @param {string} subReddit - Name of the subreddit (community) associated with the notification.
 * @param {string} content - Content of the notification.
 * @param {string} time - Time when the notification was triggered.
 * @param {boolean} unread - Indicates whether the notification is unread.
 * @param {string} postId - Identifier for the post associated with the notification.
 * @returns {JSX.Element} The rendered Notification component.
 *
 * @example
 * // Renders a Notification component displaying a notification about a post reply.
 * <Notification id="123abc" type="postReply" user={{ username: "example_user", avatarUrl: "example_avatar_url" }} subReddit="example_subreddit" content="Example notification content" time="2024-04-30T12:00:00Z" unread={true} postId="456def" />
 */

function Notification({
  id,
  type,
  title,
  user,
  subReddit,
  content,
  time,
  read,
  postId,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  let description = content;
  const notificationTitle = title;
  let destination;

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

  /*     if (type === "Comment") {
        notificationTitle = `u/${user.username} replied to your post in r/${subReddit}`
    } else if (type === "Comment Reply") {
        notificationTitle = `u/${user.username} replied to your comment in r/${subReddit}`
    } else if (type === "Mention") {
        notificationTitle = `u/${user.username} mentioned you in r/${subReddit}`
    } else if (type === "Upvote Posts") {
        notificationTitle = `u/${user.username} upvoted your post in r/${subReddit}`
    } else if (type === "Upvote Comments") {
        notificationTitle = `u/${user.username} upvoted your comment in r/${subReddit}`
    } else if (type === "Follow") {
        notificationTitle = `u/${user.username} is now following you`
    } else if (type === "Invite") {

    } */

  if (type !== "postReply" && type !== "commentReply" && type !== "mention") {
    description = "";
  }

  if (type === "newFollower") {
    destination = `/profile/${user.username}`;
  } else {
    destination = `/comments/${postId}`;
  }

  async function handleRouting() {
    try {
      const response = await handler(
        `/notifications/read-notification/${id}`,
        "PUT",
        "",
        token,
      );
      
    } catch (error) {
      console.error("Error posting data:", error);
    }
    router.push(destination);
  }

  async function disableUpdates() {
    try {
      
      const response = await handler(
        `/community/update/disable/${subReddit}`,
        "POST",
        "",
        token,
      );
      
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  async function hideNotification() {
    try {
      const response = await handler(
        `/notifications/hide/${id}`,
        "POST",
        "",
        token,
      );
      
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  function toggleDropdown() {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  }

  return (
    <div
      className={`${styles.notification} ${!read ? styles.unread : ""}`}
      onClick={() => {
        handleRouting();
      }}
    >
      <div>
        <Image
          className={styles.profilePicture}
          src={user.avatar}
          width={32}
          height={32}
          alt="The Profile picture "
          quality={100}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.notificationTitle}>
          {`${notificationTitle.slice(0, 60)}${notificationTitle.length > 60 ? "..." : ""} • ${parseTime(time)}`}
        </div>
        <div className={styles.notificationDescription}>
          {`${description.slice(0, 80)}${description.length > 80 ? "..." : ""}`}
        </div>
        {type === "Comment Reply" && (
          <div className={styles.reply}>
            <Image width={22} height={22} src={replyIcon} alt="reply" />
            <div>Reply back</div>
          </div>
        )}
      </div>
      {(type === "Upvote Posts" || type === "Upvote Comments") && (
        <button
          type="button"
          className={styles.options}
          onClick={(e) => {
            toggleDropdown();
            e.stopPropagation();
          }}
        >
          <Image
            src={optionsIcon}
            width={16}
            height={16}
            viewBox="0 0 20 20"
            alt="options"
          />
          <PostDropDownMenu
            showDropdown={showDropdown}
            setShowDropDown={setShowDropdown}
          >
            <PostDropDownItem
              description="Hide this notification"
              onClick={() => hideNotification()}
            />
            <PostDropDownItem
              description="Disable updates from this community"
              onClick={() => disableUpdates()}
            />
          </PostDropDownMenu>
        </button>
      )}
    </div>
  );
}

export default Notification;
