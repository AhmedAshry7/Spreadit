"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Replies.module.css";
import ProfileInfoModal from "../components/post/ProfileInfoModal";
import SubRedditInfoModal from "../components/post/SubRedditInfoModal";
import parseTime from "../utils/timeDifference";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";
import CommentInput from "../components/UI/CommentInput";
import ReportModal from "../components/UI/ReportModal";
import upvoteIcon from "@/app/assets/post-images/upvote-arrow.svg";
import downvoteIcon from "@/app/assets/post-images/downvote-arrow.svg";
import upvoteFilled from "@/app/assets/post-images/upvote-filled.svg";
import downvoteFilled from "@/app/assets/post-images/downvote-filled.svg";
import upvoteOutlined from "@/app/assets/post-images/upvote-outline.svg";
import downvoteOutlined from "@/app/assets/post-images/downvote-outline.svg";
import upvoteHover from "@/app/assets/post-images/upvote-hover.svg";
import downvoteHover from "@/app/assets/post-images/downvote-hover.svg";
import reportIcon from "../assets/post-images/report.svg";
import commentsIcon from "../assets/post-images/comments.svg";
import blockIcon from "../assets/block.svg";
import unblockIcon from "../assets/unblock.svg";
import unreadIcon from "../assets/envelope.svg";
import readIcon from "../assets/envelope-opened.svg";
import replyIcon from "../assets/reply.svg";

/**
 * Component for displaying a reply to a post.
 * @component
 * @param {string} id - Identifier for the reply.
 * @param {string} user - Username of the user who sent the reply.
 * @param {string} subReddit - Name of the subreddit (community) where the reply was made.
 * @param {string} post - Title of the post the reply is in response to.
 * @param {object} reply - Object containing information about the reply.
 * @returns {JSX.Element} The rendered Reply component.
 *
 * @example
 * // Renders a Reply component displaying a reply to a post.
 * <Reply id="123abc" user="example_user" subReddit="example_subreddit" post="Example Post Content" reply={{ content: { _id: "456def", content: "Reply content", hasUpvoted: false, hasDownvoted: false, media: [] }, time: "2024-04-30T12:00:00Z" }} />
 */

//todo 1-request post id 2-request way to unblock user 3-api call to upvote and down vote

function Reply({
  id,
  user,
  subReddit,
  post,
  postId,
  reply,
  replyMedia,
  replyId,
  isRead,
  voteStatus,
  time,
}) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [showSubRedditModal, setShowSubRedditModal] = useState(false);
  const [subRedditinfo, setSubRedditInfo] = useState(null);
  const [joined, setJoined] = useState(false);
  const [buttonState, setButtonState] = useState({
    type: "neutral",
    upvoteIcon: upvoteIcon,
    downvoteIcon: downvoteIcon,
    upHover: "",
    downHover: "",
  });
  const [replying, setReplying] = useState(false);
  const [read, setRead] = useState(isRead);
  const [blocked, setBlocked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  //const voteStatus = reply.content.hasUpvoted ? "upvoted" : (reply.content.hasDownvoted ? "downvoted" : "neutral")
  let myUserName;

  useEffect(() => {
    async function fetchToken() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
        myUserName = cookies.username;
      } else {
        router.push("/login");
      }
    }
    fetchToken();
  }, []);

  async function onComment(newReply) {
    try {
      const formData = new FormData();

      formData.append("content", newReply.content);

      if (newReply.attachments) {
        formData.append("attachments", newReply.attachments);
      }
      formData.append("fileType", "image");
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${replyId}/reply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      
      setReplying(false);
    } catch (error) {
      console.error("Error adding reply:", error.message);
    }
  }

  async function onReport(mainReason, subReason) {
    try {
      const response = await handler(
        `/comments/${replyId}/report`,
        "POST",
        { reason: mainReason, sureason: subReason },
        token,
      );
      
    } catch (error) {
      console.error("Error Posting data:", error);
    }
  }

  async function onBlock() {
    let response;
    try {
      if (blocked) {
        response = await handler(
          `/users/unblock`,
          "POST",
          { username: user },
          token,
        );
      } else {
        response = await handler(
          `/users/block`,
          "POST",
          { username: user },
          token,
        );
      }
      setBlocked(!blocked);
      
    } catch (error) {
      console.error("Error Posting data:", error);
    }
  }

  async function onRead() {
    try {
      let response;
      if (read) {
        response = await handler(`/message/unreadmsg/${id}`, "POST", "", token);
      } else {
        response = await handler(`/message/readmsg/${id}`, "POST", "", token);
      }
      
      setRead(!read);
    } catch (error) {
      console.error("Error Posting data:", error);
    }
  }

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

  async function handleUpVote(vote) {
    let response;
    try {
      if (vote === 1) {
        response = await handler(
          `/comments/${replyId}/upvote`,
          "POST",
          "",
          token,
        );
      } else {
        response = await handler(
          `/comments/${replyId}/downvote`,
          "POST",
          "",
          token,
        );
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }

    //api call to upvote or down vote
  }

  function highlightMention(bigString, substring) {
    // Create a regular expression with the substring and the 'g' flag for global search
    const regex = new RegExp(substring, "g");

    const highlightedString = bigString.replace(regex, (match) => {
      return `<span onClick="console.log('myUserName')" style="color: rgb(0, 121, 211); cursor: pointer;">${match}</span>`;
    });

    return { __html: highlightedString }; // Wrap in an object to use dangerouslySetInnerHTML
  }

  useEffect(() => {
    setButtonState((prevButtonState) => {
      if (voteStatus === "upvoted") {
        return {
          ...prevButtonState,
          type: "upvoted",
          upvoteIcon: upvoteFilled,
          downvoteIcon: downvoteOutlined,
        };
      } else if (voteStatus === "downvoted") {
        return {
          ...prevButtonState,
          type: "downvoted",
          upvoteIcon: upvoteOutlined,
          downvoteIcon: downvoteFilled,
        };
      } else {
        return {
          ...prevButtonState,
          type: "neutral",
          upvoteIcon: upvoteIcon,
          downvoteIcon: downvoteIcon,
        };
      }
    });
  }, [voteStatus]);

  let timeOut;

  async function handleMouseLeaveSubreddit() {
    timeOut = setTimeout(() => {
      setShowSubRedditModal(false);
    }, 200);
  }

  async function handleMouseLeaveProfile() {
    timeOut = setTimeout(() => {
      setShowProfileModal(false);
    }, 200);
  }

  //api call to get sender info to pass it to ProfileInfoModal
  useEffect(() => {
    async function getInfo() {
      try {
        const response = await handler(
          `/user/profile-info/${user}`,
          "GET",
          "",
          token,
        );
        setProfileInfo(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getInfo();
  }, [token]);

  //api call to get sub info to pass it to subRedditInfOModal
  useEffect(() => {
    if (token === null) return;
    async function getInfo() {
      try {
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getInfo();
  }, [token]);

  return (
    <div className={styles.container}>
      {showReportModal && (
        <ReportModal
          userName={user}
          subRedditPicture={subRedditinfo ? subRedditinfo.image : ""}
          subRedditName={subReddit}
          subRedditRules={subRedditinfo ? subRedditinfo.rules : []}
          onReport={onReport}
          onBlock={onBlock}
          closeModal={() => setShowReportModal(false)}
        />
      )}
      <div className={styles.header}>
        <div className={styles.nameAndSubReddit}>
          <div>From</div>
          <div
            className={styles.name}
            onClick={() => {
              router.push(`/profile/${user}`);
            }}
            onMouseEnter={() => setShowProfileModal(true)}
            onMouseLeave={() => handleMouseLeaveProfile()}
          >
            {" "}
            {`u/${user}`}{" "}
            {showProfileModal && (
              <div
                style={{ width: "360px", position: "absolute", top: "0px" }}
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
          </div>
          <div>Via</div>
          <div
            className={styles.subReddit}
            onClick={() => {
              router.push(`/community/${subReddit}`);
            }}
            onMouseEnter={() => setShowSubRedditModal(true)}
            onMouseLeave={() => handleMouseLeaveSubreddit()}
          >
            {`r/${subReddit}`}
            {showSubRedditModal && (
              <div
                style={{ width: "320px", position: "absolute", top: "0px" }}
                onMouseEnter={() => clearTimeout(timeOut)}
                onMouseLeave={() => setShowSubRedditModal(false)}
              >
                {" "}
                <SubRedditInfoModal
                  subRedditName={subReddit}
                  subRedditPicture={subRedditinfo ? subRedditinfo.image : ""}
                  subRedditBanner={
                    subRedditinfo ? subRedditinfo.communityBanner : ""
                  }
                  subRedditDescription={
                    subRedditinfo ? subRedditinfo.description : ""
                  }
                  isMember={subRedditinfo ? subRedditinfo.subscribed : ""}
                  joined={joined}
                  onJoin={() => handleJoin()}
                />{" "}
              </div>
            )}
          </div>
          <div className={styles.time}>{`sent ${parseTime(time)}`}</div>
        </div>
        <div style={{ display: "flex", columnGap: "0.5rem" }}>
          <div>On</div>
          <div className={styles.post}>{post}</div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.reply}>
            <div className={styles.replyBody}>
              <div className={styles.vote}>
                <button
                  className={`${styles.circle} ${styles.upvotes_button} ${buttonState.type}${buttonState.upHover} }`}
                  onClick={() => {
                    handleUpVote(1);
                    setButtonState((prevButtonState) => {
                      if (prevButtonState.type === "upvoted") {
                        return {
                          ...prevButtonState,
                          type: "neutral",
                          upvoteIcon: upvoteIcon,
                          downvoteIcon: downvoteIcon,
                        };
                      } else {
                        return {
                          ...prevButtonState,
                          type: "upvoted",
                          upvoteIcon: upvoteFilled,
                          downvoteIcon: downvoteOutlined,
                        };
                      }
                    });
                  }}
                  onMouseEnter={() => {
                    setButtonState((prevButtonState) => {
                      return {
                        ...prevButtonState,
                        upvoteIcon:
                          prevButtonState.type === "neutral"
                            ? upvoteHover
                            : prevButtonState.type === "upvoted"
                              ? upvoteFilled
                              : upvoteOutlined,
                        upHover: "-hover",
                        downHover: "",
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    setButtonState((prevButtonState) => {
                      return {
                        ...prevButtonState,
                        upvoteIcon:
                          prevButtonState.type === "neutral"
                            ? upvoteIcon
                            : prevButtonState.type === "upvoted"
                              ? upvoteFilled
                              : upvoteOutlined,
                        upHover: "",
                        downHover: "",
                      };
                    });
                  }}
                >
                  <Image
                    width={16}
                    height={16}
                    src={buttonState.upvoteIcon}
                    alt="Upvote arrow"
                  />
                </button>
                <button
                  className={`${styles.circle} ${styles.downvotes_button} ${buttonState.type}${buttonState.downHover}`}
                  onClick={() => {
                    handleUpVote(-1);
                    setButtonState((prevButtonState) => {
                      if (prevButtonState.type === "downvoted") {
                        return {
                          ...prevButtonState,
                          type: "neutral",
                          upvoteIcon: upvoteIcon,
                          downvoteIcon: downvoteIcon,
                        };
                      }
                      {
                        return {
                          ...prevButtonState,
                          type: "downvoted",
                          upvoteIcon: upvoteOutlined,
                          downvoteIcon: downvoteFilled,
                        };
                      }
                    });
                  }}
                  onMouseEnter={() => {
                    setButtonState((prevButtonState) => {
                      return {
                        ...prevButtonState,
                        downvoteIcon:
                          prevButtonState.type === "neutral"
                            ? downvoteHover
                            : prevButtonState.type === "downvoted"
                              ? downvoteFilled
                              : downvoteOutlined,
                        downHover: "-hover",
                        upHover: "",
                      };
                    });
                  }}
                  onMouseLeave={() => {
                    setButtonState((prevButtonState) => {
                      return {
                        ...prevButtonState,
                        downvoteIcon:
                          prevButtonState.type === "neutral"
                            ? downvoteIcon
                            : prevButtonState.type === "downvoted"
                              ? downvoteFilled
                              : downvoteOutlined,
                        downHover: "",
                        upHover: "",
                      };
                    });
                  }}
                >
                  <Image
                    width={16}
                    height={16}
                    src={buttonState.downvoteIcon}
                    alt="Downvote arrow"
                  />
                </button>
              </div>
              <div>
                <div>
                  <div
                    dangerouslySetInnerHTML={highlightMention(
                      reply,
                      myUserName,
                    )}
                  />
                  {replyMedia.length !== 0 && (
                    <div className={styles.image}>
                      {" "}
                      <Image
                        src={replyMedia[0]}
                        alt="posted image "
                        fill
                        style={{ objectFit: "contain", maxWidth: "100%" }}
                      />{" "}
                    </div>
                  )}
                </div>
                <div className={styles.replyFooter}>
                  <Image
                    onClick={() => {
                      router.push(`/comments/${postId}`);
                    }}
                    width={26}
                    height={26}
                    src={commentsIcon}
                    alt="Comments"
                    title="View Comments"
                  />
                  <Image
                    onClick={() => {
                      setShowReportModal(true);
                    }}
                    width={26}
                    height={26}
                    src={reportIcon}
                    alt="Report"
                    title="Report User"
                  />
                  {!blocked && (
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
                  {blocked && (
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
                  {read && (
                    <Image
                      onClick={() => {
                        onRead();
                      }}
                      width={26}
                      height={26}
                      src={unreadIcon}
                      alt="mark unread"
                      title="Mark Unread"
                    />
                  )}
                  {!read && (
                    <Image
                      onClick={() => {
                        onRead();
                      }}
                      width={26}
                      height={26}
                      src={readIcon}
                      alt="mark read"
                      title="Mark read"
                    />
                  )}
                  <Image
                    onClick={() => {
                      setReplying(true);
                    }}
                    width={26}
                    height={26}
                    src={replyIcon}
                    alt="reply"
                    title="Reply"
                  />
                </div>
              </div>
            </div>
            {replying && (
              <div style={{ width: "100%" }}>
                <CommentInput
                  onComment={onComment}
                  close={() => setReplying(false)}
                  buttonDisplay={"comment"}
                  isPost={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reply;
