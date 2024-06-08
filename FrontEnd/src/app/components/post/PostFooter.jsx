import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./PostFooter.module.css";

import upvoteIcon from "@/app/assets/post-images/upvote-arrow.svg";
import downvoteIcon from "@/app/assets/post-images/downvote-arrow.svg";
import upvoteFilled from "@/app/assets/post-images/upvote-filled.svg";
import downvoteFilled from "@/app/assets/post-images/downvote-filled.svg";
import upvoteOutlined from "@/app/assets/post-images/upvote-outline.svg";
import downvoteOutlined from "@/app/assets/post-images/downvote-outline.svg";
import upvoteHover from "@/app/assets/post-images/upvote-hover.svg";
import downvoteHover from "@/app/assets/post-images/downvote-hover.svg";
import commentIcon from "@/app/assets/post-images/comments.svg";
import shareIcon from "@/app/assets/post-images/share.svg";
import shieldIcon from "@/app/assets/post-images/shield.svg";

import cross from "@/app/assets/post-images/mod-icons/cross.svg";
import spam from "@/app/assets/post-images/mod-icons/spam.svg";
import check from "@/app/assets/check2.svg";
import star from "@/app/assets/post-images/mod-icons/star.svg";
import starFilled from "@/app/assets/post-images/mod-icons/star-filled.svg";
import pin from "@/app/assets/post-images/mod-icons/pin.svg";
import pinFilled from "@/app/assets/post-images/mod-icons/pin-filled.svg";
import lock from "@/app/assets/post-images/mod-icons/lock.svg";
import lockFilled from "@/app/assets/post-images/mod-icons/lock-filled.svg";
import flair from "@/app/assets/post-images/mod-icons/flair.svg";
import nsfw from "@/app/assets/post-images/mod-icons/nsfw.svg";
import nsfwFilled from "@/app/assets/post-images/mod-icons/nsfw-filled.svg";
import spoiler from "@/app/assets/post-images/mod-icons/spoiler.svg";
import spoilerFilled from "@/app/assets/post-images/mod-icons/spoiler-filled.svg";
import croudControl from "@/app/assets/post-images/mod-icons/croudcontrol.svg";

import PostDropDownItem from "./PostDropDownItem";
import PostDropDownMenu from "./PostDropDownMenu";
import RemovalReasonModal from "./RemovalReasonModal";

import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler";

/**
 * Component for Displaying the footer of a post.
 * @component
 * @param   {function} upvote   The function to upvote the post [Required]
 * @param   {function} downvote   The function to downvote the post [Required]
 * @param   {number} voteCount   The number of votes the post has [Required]
 * @param   {number} commentCount   The number of comments the post has [Required]
 * @param   {boolean} isMod   If the user is a mod [Required]
 * @returns {JSX.Element} The component for the profile info.
 *
 * @example
 *
 * <PostFooter upvote={upvote} downvote={downvote} voteCount={voteCount} commentCount={commentCount} isMod={isMod}/>
 *
 */
function PostFooter({
  postId,
  communityName,
  upvote,
  downvote,
  voteCount,
  commentCount,
  isMod,
  voteStatus,
  modActions,
  setShowModal,
  setModActions,
}) {
  const [buttonState, setButtonState] = React.useState({
    type: "neutral",
    upvoteIcon: upvoteIcon,
    downvoteIcon: downvoteIcon,
    upHover: "",
    downHover: "",
    votes: voteCount,
  }); // state of "neutral" for neutral, upvoted for upvote, downvoted for downvote
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [token, setToken] = useState(null);

  React.useEffect(() => {
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

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
      }
    }
    fetchData();
  }, []);

  function toggleDropdown() {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  }

  function sharePost() {
    navigator.clipboard
      .writeText(`/comments/${postId}`)
      .then(() => {
        alert("Profile Link Copied!");
      })
      .catch(() => {
        alert("Failed to copy link");
      });
  }

  //Todo? propably will make a function here for each mod action in the future
  async function onRemove() {
    //get removal reason first
    const response = await apiHandler(
      `/community/moderation/${communityName}/${postId}/remove-post`,
      "POST",
      "",
      token,
    );
    
    setModActions((prevModActions) => {
      return { ...prevModActions, isRemoved: true };
    });
  }

  async function onApprove() {}

  async function onSpam() {
    const response = await apiHandler(
      `/community/moderation/${communityName}/spam-post/${postId}`,
      "POST",
      "",
      token,
    );
    
  }

  async function onLock() {
    const response = modActions.isCommentsLocked
      ? await apiHandler(`/posts/${postId}/unlock`, "POST", "", token)
      : await apiHandler(`/posts/${postId}/lock`, "POST", "", token);
    
    setModActions((prevModActions) => {
      return {
        ...prevModActions,
        isCommentsLocked: !prevModActions.isCommentsLocked,
      };
    });
  }

  async function onNsfw() {
    const response = modActions.isNsfw
      ? await apiHandler(`/posts/${postId}/unnsfw`, "POST", "", token)
      : await apiHandler(`/posts/${postId}/nsfw`, "POST", "", token);
    
    setModActions((prevModActions) => {
      return { ...prevModActions, isNsfw: !prevModActions.isNsfw };
    });
  }

  async function onSpoiler() {
    const response = modActions.isSpoiler
      ? await apiHandler(`/posts/${postId}/unspoiler`, "POST", "", token)
      : await apiHandler(`/posts/${postId}/spoiler`, "POST", "", token);
    
    setModActions((prevModActions) => {
      return { ...prevModActions, isSpoiler: !prevModActions.isSpoiler };
    });
  }

  return (
    <div className={styles.post_footer}>
      <div
        className={styles.post_interactions}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.upvotes_container}>
          <button
            className={`${styles.circle} ${styles.upvotes_button} ${buttonState.type}${buttonState.upHover} }`}
            onClick={() => {
              upvote();
              setButtonState((prevButtonState) => {
                if (prevButtonState.type === "upvoted") {
                  return {
                    ...prevButtonState,
                    type: "neutral",
                    upvoteIcon: upvoteIcon,
                    downvoteIcon: downvoteIcon,
                    votes: prevButtonState.votes - 1,
                  };
                } else if (prevButtonState.type === "neutral") {
                  return {
                    ...prevButtonState,
                    type: "upvoted",
                    upvoteIcon: upvoteFilled,
                    downvoteIcon: downvoteOutlined,
                    votes: prevButtonState.votes + 1,
                  };
                } else {
                  return {
                    ...prevButtonState,
                    type: "upvoted",
                    upvoteIcon: upvoteFilled,
                    downvoteIcon: downvoteOutlined,
                    votes: prevButtonState.votes + 2,
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
          <span className={`${styles.count} ${buttonState.type}`}>
            {buttonState.votes}
          </span>
          <button
            className={`${styles.circle} ${styles.downvotes_button} ${buttonState.type}${buttonState.downHover}`}
            onClick={() => {
              downvote();
              setButtonState((prevButtonState) => {
                if (prevButtonState.type === "downvoted") {
                  return {
                    ...prevButtonState,
                    type: "neutral",
                    upvoteIcon: upvoteIcon,
                    downvoteIcon: downvoteIcon,
                    votes: prevButtonState.votes + 1,
                  };
                } else if (prevButtonState.type === "neutral") {
                  return {
                    ...prevButtonState,
                    type: "downvoted",
                    upvoteIcon: upvoteOutlined,
                    downvoteIcon: downvoteFilled,
                    votes: prevButtonState.votes - 1,
                  };
                } else {
                  return {
                    ...prevButtonState,
                    type: "downvoted",
                    upvoteIcon: upvoteOutlined,
                    downvoteIcon: downvoteFilled,
                    votes: prevButtonState.votes - 2,
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

        <button className={styles.btn}>
          <Image width={16} height={16} src={commentIcon} alt="Comments Icon" />
          <span>{commentCount}</span>
        </button>

        <button className={styles.btn} onClick={sharePost}>
          <Image width={16} height={16} src={shareIcon} alt="Share Icon" />
          <span>Share</span>
        </button>
      </div>
      {isMod ? (
        <button
          className={styles.mod_interactions}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          <Image
            width={22}
            height={22}
            src={shieldIcon}
            alt="mod shield Icon"
          />
          <PostDropDownMenu
            showDropdown={showDropdown}
            setShowDropDown={setShowDropdown}
          >
            {!modActions.isRemoved && (
              <PostDropDownItem
                icon={cross}
                iconAlt="Cross Icon"
                description="Remove Post"
                onClick={() => {
                  setShowModal(true);
                }}
              />
            )}
            {!modActions.isApproved && (
              <PostDropDownItem
                icon={check}
                iconAlt="Right Icon"
                description="Approve Post"
                onClick={onApprove}
              />
            )}
            <PostDropDownItem
              icon={spam}
              iconAlt="Spam Icon"
              description="Mark as Spam"
              onClick={onSpam}
            />
            {modActions.isCommentsLocked && (
              <PostDropDownItem
                icon={lockFilled}
                iconAlt="Lock Icon"
                description="Unlock Post"
                onClick={onLock}
              />
            )}
            {!modActions.isCommentsLocked && (
              <PostDropDownItem
                icon={lock}
                iconAlt="Lock Icon"
                description="Lock Post"
                onClick={onLock}
              />
            )}
            {!modActions.isNsfw && (
              <PostDropDownItem
                icon={nsfw}
                iconAlt="NSFW Icon"
                description="Mark as NSFW"
                onClick={onNsfw}
              />
            )}
            {modActions.isNsfw && (
              <PostDropDownItem
                icon={nsfwFilled}
                iconAlt="NSFW Icon"
                description="Remove NSFW"
                onClick={onNsfw}
              />
            )}
            {!modActions.isSpoiler && (
              <PostDropDownItem
                icon={spoiler}
                iconAlt="Spoiler Icon"
                description="Mark as Spoiler"
                onClick={onSpoiler}
              />
            )}
            {modActions.isSpoiler && (
              <PostDropDownItem
                icon={spoilerFilled}
                iconAlt="Spoiler Icon"
                description="Remove Spoiler"
                onClick={onSpoiler}
              />
            )}
          </PostDropDownMenu>
        </button>
      ) : null}
    </div>
  );
}

export default PostFooter;
