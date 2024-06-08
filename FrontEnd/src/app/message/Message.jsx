"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Message.module.css";
import parseTime from "../utils/timeDifference";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";
import ProfileInfoModal from "../components/post/ProfileInfoModal";
import SubRedditInfoModal from "../components/post/SubRedditInfoModal";
import ReportModal from "../components/UI/ReportModal";
import DeleteModal from "../components/post/DeletePostModal";
import reportIcon from "../assets/post-images/report.svg";
import removeIcon from "../assets/post-images/delete.svg";
import blockIcon from "../assets/block.svg";
import unblockIcon from "../assets/unblock.svg";
import unreadIcon from "../assets/envelope.svg";
import readIcon from "../assets/envelope-opened.svg";
import replyIcon from "../assets/reply.svg";
import CommentInput from "../components/UI/CommentInput";
import { useRouter } from "next/navigation";

/**
 * Component for displaying messages in a conversation thread.
 * @component
 * @param {string} user - Username of the sender of the message.
 * @param {string} subject - Subject of the message.
 * @param {Array<{ content: string, incoming: boolean, time: string, messageId: string }>} messages - An array of objects representing individual messages in the conversation thread.
 * @param {string} id - Identifier for the message thread.
 * @returns {JSX.Element} The rendered Message component.
 *
 * @example
 * // Renders a Message component displaying messages in a conversation thread.
 * <Message user="example_user" subject="Example Subject" messages={[{ content: "Hello!", incoming: true, time: "2024-04-30T12:00:00Z", messageId: "123456" }]} id="789abc" />
 */

//todo 1-what is meant by deleting a message by changing its view in the user view
function Message({ user, subReddit, subject, messages, id, isRead }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSubRedditModal, setShowSubRedditModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [subRedditInfo, setSubRedditInfo] = useState(null);
  const [joined, setJoined] = useState(false);
  const [collapsed, setCollapsed] = useState(Array(messages.length).fill(true));
  const [replying, setReplying] = useState(Array(messages.length).fill(false));
  const [showReportModal, setShowReportModal] = useState(
    Array(messages.length).fill(false),
  );
  const [showDeleteModal, setShowDeleteModal] = useState(
    Array(messages.length).fill(false),
  );
  const [read, setRead] = useState(Array(messages.length).fill(isRead));
  const [blocked, setBlocked] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

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

  async function onReply(index, newcontent) {
    try {
      const response = await handler(
        `/message/reply/${messages[index]._id}`,
        "POST",
        { content: newcontent.content },
        token,
      );
      
      //setDisplayDescription(newcontent.content);
      setReplying((prevReplying) => {
        const updatedReplying = [...prevReplying];
        updatedReplying[index] = false;
        return updatedReplying;
      });
    } catch (error) {
      console.error("Error editing", error.message);
    }
  }

  async function onReport(index, mainReason, subReason) {
    
    
    
    try {
      const response = await handler(
        `/message/reportmsg/${messages[index]._id}`,
        "POST",
        { reason: mainReason, sureason: subReason },
        token,
      );
      
    } catch (error) {
      console.error("Error Posting data:", error);
    }
  }

  async function onBlock() {
    try {
      const response = await handler(
        `/users/block`,
        "POST",
        { username: user },
        token,
      );
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setBlocked(!blocked);
  }

  async function onDelete(index) {
    try {
      const response = await handler(
        `/message/deletemsg/${messages[index]._id}`,
        "DELETE",
        "",
        token,
      );
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function onRead(index) {
    try {
      let response;
      if (read[index]) {
        response = await handler(
          `/message/unreadmsg/${messages[index]._id}`,
          "POST",
          "",
          token,
        );
      } else {
        response = await handler(
          `/message/readmsg/${messages[index]._id}`,
          "POST",
          "",
          token,
        );
      }
      
      setRead((prevRead) => {
        const updatedRead = [...prevRead];
        updatedRead[index] = !prevRead[index];
        return updatedRead;
      });
    } catch (error) {
      console.error("Error Posting data:", error);
    }
  }

  let timeOut;

  async function handleMouseLeaveModal() {
    timeOut = setTimeout(() => {
      if (subReddit.length === 0) setShowProfileModal(false);
      else setShowSubRedditModal(false);
    }, 200);
  }

  //api call to get sender info to pass it to ProfileInfoModal
  useEffect(() => {
    async function getInfo() {
      try {
        if (subReddit.length === 0) {
          const response = await handler(
            `/user/profile-info/${user}`,
            "GET",
            "",
            token,
          );
          setProfileInfo(response);
        } else {
          const response = await handler(
            `/community/${subReddit}/get-info`,
            "GET",
            "",
            token,
          );
          const subscribed = await handler(
            `/community/is-subscribed?communityName=${subReddit}`,
            "GET",
            "",
            token,
          );
          setSubRedditInfo({ ...response, subscribed });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getInfo();
  }, [token]);

  async function handleJoin() {
    let response;
    try {
      if (joined) {
        response = await handler(
          "/community/unsubscribe",
          "POST",
          { communityName: subReddit },
          token,
        );
        setJoined(false);
      } else {
        response = await handler(
          "/community/subscribe",
          "POST",
          { communityName: subReddit },
          token,
        );
        setJoined(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to join subreddit
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.name}
          onClick={() => {
            router.push(
              subReddit ? `/community/${subReddit}` : `/profile/${user}`,
            );
          }}
          onMouseEnter={() =>
            subReddit.length === 0
              ? setShowProfileModal(true)
              : setShowSubRedditModal(true)
          }
          onMouseLeave={() => handleMouseLeaveModal()}
        >
          {user && `u/${user}`}
          {user && showProfileModal && (
            <div
              style={{ width: "360px", position: "absolute", top: "20px" }}
              onMouseEnter={() => clearTimeout(timeOut)}
              onMouseLeave={() => setShowProfileModal(false)}
            >
              {" "}
              <ProfileInfoModal
                isUser={false}
                userName={user}
                profilePicture={profileInfo.avatar}
                cakeDate={profileInfo.createdAt}
              />{" "}
            </div>
          )}
          {subReddit && `r/${subReddit}`}
          {subReddit && showSubRedditModal && (
            <div
              style={{ width: "320px", position: "absolute", top: "20px" }}
              onMouseEnter={() => clearTimeout(timeOut)}
              onMouseLeave={() => setShowSubRedditModal(false)}
            >
              {" "}
              <SubRedditInfoModal
                subRedditName={subReddit}
                subRedditPicture={subRedditInfo ? subRedditInfo.image : ""}
                subRedditBanner={
                  subRedditInfo ? subRedditInfo.communityBanner : ""
                }
                subRedditDescription={
                  subRedditInfo ? subRedditInfo.description : ""
                }
                isMember={subRedditInfo ? subRedditInfo.subscribed : ""}
                joined={joined}
                onJoin={() => handleJoin()}
              />{" "}
            </div>
          )}
        </div>
        <div className={styles.subject}>{subject}</div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={() => {
              setCollapsed(Array(collapsed.length).fill(false));
            }}
          >
            +
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => {
              setCollapsed(Array(collapsed.length).fill(true));
            }}
          >
            -
          </button>
        </div>
      </div>
      <div className={styles.body}>
        {messages.map((message, index) => (
          <div
            className={styles.message}
            key={index}
            style={
              message.direction === "incoming"
                ? { alignItems: "flex-start" }
                : { marginLeft: "auto" }
            }
          >
            {showReportModal[index] && (
              <ReportModal
                userName={user}
                subRedditPicture={null}
                subRedditName={null}
                subRedditRules={null}
                onReport={(mainReason, subReason) =>
                  onReport(index, mainReason, subReason)
                }
                onBlock={() => onBlock}
                closeModal={() =>
                  setShowReportModal((prevShowReport) => {
                    const updatedShowReport = [...prevShowReport];
                    updatedShowReport[index] = false;
                    return updatedShowReport;
                  })
                }
              />
            )}
            {showDeleteModal[index] && (
              <DeleteModal
                modalTitle={"Delete message?"}
                modalDescription={
                  "Once you delete this message, it can’t be restored."
                }
                onDelete={() => onDelete(index)}
                closeModal={() =>
                  setShowDeleteModal((prevShowDelete) => {
                    const updatedShowDelete = [...prevShowDelete];
                    updatedShowDelete[index] = false;
                    return updatedShowDelete;
                  })
                }
              />
            )}
            <div className={styles.messageHeader}>
              <div
                className={styles.messageTime}
              >{`sent ${parseTime(message.time)}`}</div>
              <button
                type="button"
                className={styles.control}
                onClick={() =>
                  setCollapsed((prevCollapsed) => {
                    const updatedCollapsed = [...prevCollapsed];
                    updatedCollapsed[index] = !prevCollapsed[index];
                    return updatedCollapsed;
                  })
                }
              >
                {collapsed[index] && (
                  <div style={{ fontSize: "1.75rem" }}>+</div>
                )}
                {!collapsed[index] && (
                  <div style={{ fontSize: "1.75rem" }}>-</div>
                )}
              </button>
            </div>
            {!collapsed[index] && (
              <div className={styles.messageContent}>{message.content}</div>
            )}
            {!collapsed[index] && message.direction === "incoming" && (
              <div className={styles.messageFooter}>
                <Image
                  onClick={() =>
                    setShowDeleteModal((prevShowDelete) => {
                      const updatedShowDelete = [...prevShowDelete];
                      updatedShowDelete[index] = true;
                      return updatedShowDelete;
                    })
                  }
                  width={26}
                  height={26}
                  src={removeIcon}
                  alt="Delete"
                  title="Delete Message"
                />
                {user && (
                  <Image
                    onClick={() =>
                      setShowReportModal((prevShowReport) => {
                        const updatedShowReport = [...prevShowReport];
                        updatedShowReport[index] = true;
                        return updatedShowReport;
                      })
                    }
                    width={26}
                    height={26}
                    src={reportIcon}
                    alt="Report"
                    title="Report Message"
                  />
                )}
                {user && !blocked && (
                  <Image
                    onClick={() => {
                      onBlock();
                    }}
                    width={26}
                    height={26}
                    src={blockIcon}
                    alt="Block"
                    title="Block User"
                  />
                )}
                {user && blocked && (
                  <Image
                    onClick={() => {
                      onBlock();
                    }}
                    width={26}
                    height={26}
                    src={unblockIcon}
                    alt="Unblock"
                    title="UnBlock User"
                  />
                )}
                {read[index] && (
                  <Image
                    onClick={() => {
                      onRead(index);
                    }}
                    width={26}
                    height={26}
                    src={unreadIcon}
                    alt="mark unread"
                    title="Mark Unread"
                  />
                )}
                {!read[index] && (
                  <Image
                    onClick={() => {
                      onRead(index);
                    }}
                    width={26}
                    height={26}
                    src={readIcon}
                    alt="mark read"
                    title="Mark read"
                  />
                )}
                {user && (
                  <Image
                    onClick={() =>
                      setReplying((prevReplying) => {
                        const updatedReplying = [...prevReplying];
                        updatedReplying[index] = true;
                        return updatedReplying;
                      })
                    }
                    width={26}
                    height={26}
                    src={replyIcon}
                    alt="reply"
                    title="Reply"
                  />
                )}
              </div>
            )}
            {user && !collapsed[index] && replying[index] && (
              <div style={{ width: "100%" }}>
                <CommentInput
                  onComment={(newContent) => onReply(index, newContent)}
                  close={() =>
                    setReplying((prevReplying) => {
                      const updatedReplying = [...prevReplying];
                      updatedReplying[index] = false;
                      return updatedReplying;
                    })
                  }
                  buttonDisplay={"Reply"}
                  isPost={true}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Message;
