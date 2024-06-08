"use client";
import "./Queue.css";
import styles from "./QueuedPost.module.css";
import Image from "next/image";
import upvoteIcon from "@/app/assets/post-images/upvote-arrow.svg";
import downvoteIcon from "@/app/assets/post-images/downvote-arrow.svg";
import parseTime from "@/app/utils/timeDifference"
import OutlineButton from "@/app/components/UI/OutlineButton";
import { useEffect, useState } from "react";
import Wrapper from "./QueueWrapper";

/**
 * QueuedPost Component
 *
 * Represents a single post in the moderation queue of a community.
 * Displays information about the post and provides options for moderation.
 *
 * @component
 * @param {string} communityName - The name of the community where the post was submitted.
 * @param {string} username - The username of the user who submitted the post.
 * @param {string} time - The time since the post was submitted.
 * @param {string} title - The title of the post.
 * @param {number} commentCount - The number of comments on the post.
 * @param {number} voteCount - The number of votes received by the post.
 * @param {number} postId - The unique identifier of the post.
 * @param {number} reports - The number of reports received by the post.
 * @param {function} removeFunction - Function to remove the post.
 * @param {function} approveFunction - Function to approve the post.
 * @returns {JSX.Element} The rendered QueuedPost component.
 */
function QueuedPost({
  commentId = "",
  communityName = "announcements",
  username = "TestUser",
  time = "99 hours ago",
  title = "Test Title",
  commentCount = 1,
  voteCount = 43,
  postId = 12,
  reports = 0,
  type = "post",
  comment = "",
  icon = "",
  mediaType = "other",
  mediaLink = "",
  removeFunction = () => {
    
  },
  approveFunction = () => {
    
  },
  spamFunction = () => {
    
  },
  lockFunction = () => {
    
  },
  unlockFunction = () => {
    
  },
  getReasonsFunction = () => {
    
  },
  removeReasons = ["none", "rule1"],
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    
    
    
  }, []);

  const handleOverlay = () => {
    getReasonsFunction();
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.ext}>
      <div className={styles.postArea}>
        <div></div>
        <div
          className={styles.voteFlex}
          style={{ width: "40px", borderLeft: "4px solid transparent" }}
        >
          <button aria-checked="false" className={styles.checkboxFilter}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className={styles.icon}
            >
              <path
                fill="inherit"
                d="M1.66666667,3.34755033 L1.66666667,16.6524497 C1.66666667,17.5781756 2.42112363,18.3333333 3.34755033,18.3333333 L16.6524497,18.3333333 C17.5781756,18.3333333 18.3333333,17.5788764 18.3333333,16.6524497 L18.3333333,3.34755033 C18.3333333,2.42182438 17.5788764,1.66666667 16.6524497,1.66666667 L3.34755033,1.66666667 C2.42182438,1.66666667 1.66666667,2.42112363 1.66666667,3.34755033 Z M0,3.34755033 C0,1.49874933 1.5032506,0 3.34755033,0 L16.6524497,0 C18.5012507,0 20,1.5032506 20,3.34755033 L20,16.6524497 C20,18.5012507 18.4967494,20 16.6524497,20 L3.34755033,20 C1.49874933,20 0,18.4967494 0,16.6524497 L0,3.34755033 Z"
              ></path>
            </svg>
          </button>

          <button
            style={{
              cursor: "not-allowed",
              backgroundColor: "transparent",
              border: "transparent",
            }}
          >
            <Image width={16} height={16} src={upvoteIcon} alt="Upvote arrow" />
          </button>
          <div className={styles.voteText} style={{ color: "rgb(255, 69, 0)" }}>
            {voteCount}
          </div>
          <button
            style={{
              cursor: "not-allowed",
              backgroundColor: "transparent",
              border: "transparent",
            }}
          >
            <Image
              width={16}
              height={16}
              src={downvoteIcon}
              alt="Downvote arrow"
            />
          </button>
        </div>

        <div className={styles.postBody}>
          <div className={styles.postHeaderFlex}>
            <div className={styles.subIcon}>
              <a
                data-click-id="subreddit"
                className={styles.subIconAlign}
                href={`../../../community/${communityName}`}
              >
                {icon !== "" ? (
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "4px",
                      borderRadius: "9999px",
                    }}
                    src={icon}
                  />
                ) : (
                  <span
                    className={styles.subIconPrev}
                    style={{ backgroundColor: "rgb(0, 121, 211)" }}
                  >
                    r/
                  </span>
                )}
              </a>
            </div>
            <div className={styles.subNameFlex}>
              <div className={styles.subNameStyle}>
                <div className={styles.subNameDisplay}>
                  <a
                    data-click-id="subreddit"
                    className={styles.subNameText}
                    href={`../../../community/${communityName}`}
                  >
                    {`${communityName}`}
                  </a>
                  <div id="SubredditInfoTooltip--t3_1cdqlu5--testtesttessttemp"></div>
                </div>
                <span className={styles.dotSpan} role="presentation">
                  •
                </span>
                <span className={styles.spanPostedBy}>
                  {type === "post" ? "Posted" : "Commented"} by
                </span>
                <div className={styles.spanPostedBy}>
                  <div id="UserInfoTooltip--t3_1cdqlu5">
                    <a
                      className={styles.userLink}
                      data-click-id="user"
                      data-testid="post_author_link"
                      href={`../../../profile/${username}`}
                    >
                      <strong>u/{`${username}`}</strong>
                    </a>
                  </div>
                </div>
                <span className={styles.spanPostedBy}>{`${parseTime(time)}`}</span>
              </div>
              <div className={styles.placeholder2}></div>
            </div>
            <div className={styles.placeholder}></div>
          </div>
          <div className={styles.titleMargin} data-adclicklocation="title">
            <div className={styles.titleText}>
              <a
                data-click-id="body"
                style={{ color: "inherit", textDecoration: "none" }}
                href={`../../../comments/${postId}`}
              >
                <div className={styles.titleColor}>{`${title}`}</div>
                {type === "comment" ? (
                  <p className={styles.comment}>{`${comment}`}</p>
                ) : (
                  ""
                )}
                {mediaType === "image" && (
                  <>
                    <br />
                    <img
                      style={{ width: "30%", height: "auto" }}
                      src={mediaLink}
                    />
                  </>
                )}
              </a>
            </div>
          </div>
          <div className={styles.placeholder3}></div>
          {type !== "comment" ? (
            <p style={{ fontWeight: "600" }} className={styles.comment}>
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </p>
          ) : (
            <p style={{ fontWeight: "600" }} className={styles.comment}>
              {commentCount} {commentCount === 1 ? "reply" : "replies"}
            </p>
          )}
          <div className={styles.bottomOptions}>
            <div className={styles.bottomFlex}>
              {reports > 0 ? (
                <div className={styles.reportBanner}>
                  <svg
                    className={`${styles.icon} ${styles.flag}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z"
                    />
                  </svg>

                  <div className={styles.reportFlex}>
                    <div className={styles.reportAlign}>
                      <div className={styles.reportCountFlex}>
                        <p className={styles.reportCount}>
                          {reports} {reports === 1 ? "Report" : "Reports"}
                        </p>
                      </div>
                      <p></p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className={styles.bottomPadFlex}>
                <OutlineButton
                  isInverted={true}
                  btnClick={() => approveFunction(type === "comment" ? commentId: postId, type)}
                >
                  <svg
                    style={{ marginRight: "4px" }}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  Approve
                </OutlineButton>
                <OutlineButton btnClick={handleOverlay}>
                  <svg
                    style={{ marginRight: "4px" }}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                  Remove
                </OutlineButton>
                <Wrapper
                  isOpen={isOpen}
                  onClose={handleOverlay}
                  removeFunction={removeFunction}
                  title={title}
                  postId={type === "comment" ? commentId : postId}
                  communityName={communityName}
                  type={type}
                  removeReasons={removeReasons}
                  getReasonsFunction={getReasonsFunction}
                />
                <OutlineButton btnClick={() => spamFunction(type === "comment" ? commentId: postId, type)}>
                <svg style={{ marginRight: "4px" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>
                  Spam
                </OutlineButton>
                <OutlineButton btnClick={() => lockFunction(postId, type)}>
                  <svg style={{ marginRight: "4px" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/>
</svg>
                  Lock
                </OutlineButton>
                <OutlineButton btnClick={() => unlockFunction(postId, type)}>
                <svg style={{ marginRight: "4px" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14v3m4-6V7a3 3 0 1 1 6 0v4M5 11h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/>
</svg>
                  Unlock
                </OutlineButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueuedPost;
