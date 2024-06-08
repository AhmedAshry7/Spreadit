import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import CommentInput from "./CommentInput";
import plusicon from "../../assets/plus-circle.svg";
import dashicon from "../../assets/dash-circle.svg";
import PP1 from "../../assets/PP1.png";
import CommentFooter from "./CommentFooter";
import PostHeader from "../post/PostHeader";
import apiHandler from "../../utils/apiHandler";
import styles from "./Comment.module.css";
import parseTime from "@/app/utils/timeDifference";
import getCookies from "../../utils/getCookies";
import { redirect, useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import handler from "../../utils/apiHandler";

/**
 * Comment component for displaying and managing individual comments
 * @component
 * @param {string} postId The ID of the post to which the comment belongs
 * @param {Object} comment The comment object containing its content
 * @param {string} comment.id The unique identifier of the comment
 * @param {string} comment.content The text content of the comment
 * @param {Object} comment.user An object containing details about the user who posted the comment
 * @param {string} comment.user.username The username of the commenter
 * @param {string} comment.user.avatar_url The URL of the commenter's profile picture
 * @param {string} comment.user.created_at The timestamp when the commenter's account was created
 * @param {Array} comment.replies An array of reply comments to the current comment
 * @param {boolean} comment.is_hidden A boolean indicating whether the comment is hidden
 * @param {boolean} comment.is_saved A boolean indicating whether the comment is saved by the user
 * @param {boolean} comment.is_upvoted A boolean indicating whether the comment is upvoted by the user
 * @param {boolean} comment.is_downvoted A boolean indicating whether the comment is downvoted by the user
 * @param {Array} comment.media An array containing any media attachments associated with the comment
 * @param {string} subRedditName The name of the subreddit associated with the comment
 * @param {string} subRedditPicture The URL of the subreddit's profile picture
 * @param {string} subRedditRules The rules of the subreddit associated with the comment
 * @param {boolean} showProfilePicture Indicates whether to show the profile picture in the comment
 * @returns {JSX.Element} The rendered Comment component.
 * 
 * @example
 * const postId = "1"
 * const comment = {
        id: '1',
        user: {
            username: 'User 1',
            avatar_url: '../../assets/PP1.png',
            created_at: '2022-10-12',
        },
        content: 'Test Comment',
        replies: [],
        is_hidden: false,
        is_saved: false,
        is_upvoted: false,
        is_downvoted: false,
        likes_count: 0,
        media: [{
            link: '../../assets/PP1.png',
        }],
        created_at: '2024-05-12',
 * }
 * const subRedditName = "Subreddit"
 * const subRedditPicture = "https://example.com/subreddit.jpg"
 * const subRedditRules = "No spamming, be respectful..."
 * const showProfilePicture = true
 * <Comment 
 *   postId={postId} 
 *   comment={comment} 
 *   subRedditName={subRedditName} 
 *   subRedditPicture={subRedditPicture} 
 *   subRedditRules={subRedditRules} 
 *   showProfilePicture={showProfilePicture} 
 * />
 */

const Comment = ({
  postId,
  comment,
  subRedditName,
  subRedditPicture,
  subRedditRules,
  showProfilePicture,
  isModerator,
  postLocked,
}) => {
  const [temporaryToken, setToken] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReply, setShowReply] = useState(true);
  const [replies, setReplies] = useState(comment.replies);
  const [hidden, setHidden] = useState(comment.is_hidden);
  const [saved, setSaved] = useState(comment.is_saved);
  const [locked, setLocked] = useState(comment.is_locked);
  const [approved, setApproved] = useState(comment.is_approved);
  const [showModal, setShowModal] = useState(false);
  const [removed, setRemoved] = useState(comment.is_removed);
  const [upVoteStatus, setupVoteStatus] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [reason, setReason] = useState("");
  const [reasons, setReasons] = useState([]);
  const [removalReason, setRemovalReason] = useState("");
  const router = useRouter();
  const isRemoval = comment.is_removal;
  const modName = subRedditName + "-ModTeam";

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies && cookies.username && cookies.access_token) {
        setToken(cookies.access_token);
        const response = await apiHandler(
          `/community/${subRedditName}/removal-reasons`,
          "GET",
          "",
          cookies.access_token,
        );
        
        setReasons(response);
        setReason(response[0].title);
        if (cookies.username === comment.user.username) {
          setIsUser(true);
        }
      } else {
        router.push("/login");
      }
      if (comment.is_upvoted) {
        setupVoteStatus("upvoted");
      } else if (comment.is_downvoted) {
        setupVoteStatus("downvoted");
      } else {
        setupVoteStatus("neutral");
      }
    }
    cookiesfn();
  }, []);

  const onDelete = async () => {
    try {
      const response = await apiHandler(
        `/posts/comment/delete/${comment.id}`,
        "DELETE",
        "",
        temporaryToken,
      );
      
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleteing comment :", error);
    }
  };

  const onComment = async (newReply) => {
    try {
      const formData = new FormData();

      formData.append("content", newReply.content);

      if (newReply.attachments) {
        formData.append("attachments", newReply.attachments);
      }
      formData.append("fileType", "image");
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${comment.id}/reply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${temporaryToken}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      
      setIsReplying(false);
      setReplies((prev) => [...prev, responseData.reply]);
    } catch (error) {
      console.error("Error adding reply:", error.message);
    }
  };
  const onEdit = async (newComment) => {
    try {
      const response = await apiHandler(
        `/comments/${comment.id}/edit`,
        "POST",
        newComment,
        temporaryToken,
      );
      
      comment.content = newComment.content;
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing", error.message);
    }
  };

  const onHide = async () => {
    try {
      const response = await apiHandler(
        `/comments/${comment.id}/hide`,
        "POST",
        "",
        temporaryToken,
      );
      
      setHidden(!hidden);
    } catch (error) {
      console.error("Error hiding or unhiding", error.message);
    }
  };

  const onUpVote = async () => {
    try {
      const response = await apiHandler(
        `/comments/${comment.id}/upvote`,
        "POST",
        "",
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error upvoting", error.message);
    }
  };

  const onDownVote = async () => {
    try {
      const response = await apiHandler(
        `/comments/${comment.id}/downvote`,
        "POST",
        "",
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error downvoting", error.message);
    }
  };

  const onSave = async () => {
    try {
      const response = await apiHandler(
        `/comments/${comment.id}/save`,
        "POST",
        "",
        temporaryToken,
      );
      
      setSaved(!saved);
    } catch (error) {
      console.error("Error saving or unsaving", error.message);
    }
  };

  const parseAndStyleLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedText = text.replace(
      urlRegex,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
    );

    // Highlight usernames and redirect to profile page
    const usernameRegex = /u\/(\w+)/g;
    const highlightedText = formattedText.replace(
      usernameRegex,
      '<a href="#" class="username-link" data-username="$1">$&</a>',
    );

    return highlightedText;
  };

  const onClickUsername = (username) => {
    router.push(`/profile/${username}`);
  };

  useEffect(() => {
    const handleUsernameClick = (event) => {
      const clickedElement = event.target;
      if (clickedElement.classList.contains("username-link")) {
        const username = clickedElement.dataset.username;
        onClickUsername(username);
      }
    };

    document.addEventListener("click", handleUsernameClick);

    return () => {
      document.removeEventListener("click", handleUsernameClick);
    };
  }, []);

  const onClickEdit = () => {
    if (showProfilePicture) {
      setIsEditing(true);
    } else {
      redirect(`/comments/${postId}`);
    }
  };

  async function handleReport(mainReason, subReason) {
    let response;
    try {
      response = await apiHandler(
        `/comments/${comment.id}/report`,
        "POST",
        { reason: mainReason, sureason: subReason },
        temporaryToken,
      );
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to report a post
  }

  async function handleBlock() {
    let response;
    try {
      response = await apiHandler(
        `/users/block`,
        "POST",
        { username: comment.user.username },
        temporaryToken,
      );
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to block a user
  }

  const onLock = async () => {
    try {
      const response = await apiHandler(
        `/community/moderation/${subRedditName}/${comment.id}/lock-comment`,
        "POST",
        "",
        temporaryToken,
      );
      
      setLocked(!locked);
    } catch (error) {
      console.error("Error locking or unlocking", error.message);
    }
  };

  const onUnlock = async () => {
    try {
      const response = await apiHandler(
        `/community/moderation/${subRedditName}/${comment.id}/unlock-comment`,
        "POST",
        "",
        temporaryToken,
      );
      
      setLocked(!locked);
    } catch (error) {
      console.error("Error unlocking", error.message);
    }
  };

  const onApprove = async () => {
    try {
      const response = await apiHandler(
        `/community/moderation/${subRedditName}/${comment.id}/approve-comment`,
        "POST",
        "",
        temporaryToken,
      );
      
      setApproved(!approved);
    } catch (error) {
      console.error("Error approving", error.message);
    }
  };

  function handleChange(event) {
    
    setReason(event.target.value);
  }

  const onRemove = async () => {
    try {
      const response = await apiHandler(
        `/community/moderation/${subRedditName}/${comment.id}/remove-comment`,
        "POST",
        { removalReason: reason },
        temporaryToken,
      );
      
      setRemoved(!removed);
    } catch (error) {
      console.error("Error removing", error.message);
    }
  };

  const onSpam = async () => {
    try {
      const response = await apiHandler(
        `/community/moderation/${subRedditName}/spam-comment/${comment.id}`,
        "POST",
        "",
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error spamed", error.message);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDiscard = () => {
    onRemove();
  };

  const formattedDescription = parseAndStyleLinks(comment.content);

  return (
    <div className={styles.commentcontainer}>
      {!hidden && !isDeleted && (
        <div
          className={
            showProfilePicture ? styles.commentbody : styles.soloComment
          }
        >
          {!isRemoval && (
            <PostHeader
              isUser={isUser}
              isProfile={true}
              isInComment={false}
              showProfilePicture={showProfilePicture}
              userName={comment.user.username}
              profilePicture={comment.user.avatar_url}
              time={parseTime(comment.created_at)}
              cakeDate={comment.user.created_at}
              isLocked={locked}
            />
          )}
          {isRemoval && (
            <PostHeader
              isUser={isUser}
              isProfile={false}
              isInComment={false}
              showProfilePicture={showProfilePicture}
              subRedditName={modName}
              subRedditPicture={subRedditPicture}
              time={parseTime(comment.created_at)}
              cakeDate={comment.user.created_at}
              isLocked={locked}
            />
          )}
          {isEditing && (
            <CommentInput
              onComment={onEdit}
              close={() => setIsEditing(false)}
              commentBody={comment.content}
              commentImage={
                comment.media.length !== 0 ? comment.media[0].link : []
              }
              buttonDisplay={"Save edits"}
              isPost={false}
            />
          )}
          {!isEditing && (
            <div className={styles.commentcontent}>
              {comment.media.length !== 0 && (
                <img
                  src={comment.media[0].link}
                  alt="Comment Image"
                  className={styles.commentimage}
                />
              )}
              <span
                className={styles.commenttext}
                dangerouslySetInnerHTML={{ __html: formattedDescription }}
              ></span>
            </div>
          )}
          {!isEditing && (
            <CommentFooter
              upvote={onUpVote}
              downvote={onDownVote}
              voteCount={comment.likes_count}
              voteStatus={upVoteStatus}
              isSaved={saved}
              onSave={onSave}
              onHide={onHide}
              isUser={isUser}
              onEdit={onClickEdit}
              onReply={() => setIsReplying(true)}
              onDelete={onDelete}
              userName={comment.user.username}
              subRedditName={subRedditName}
              subRedditPicture={subRedditPicture}
              subRedditRules={subRedditRules}
              onReport={handleReport}
              onBlock={handleBlock}
              isRemoved={removed}
              isApproved={approved}
              isLocked={locked}
              postLocked={postLocked}
              isModerator={isModerator}
              onApprove={onApprove}
              onLock={onLock}
              onUnlock={onUnlock}
              onSpam={onSpam}
              onRemove={() => {
                setShowModal(true);
              }}
              postId={postId}
            />
          )}
          {isReplying && (
            <CommentInput
              onComment={onComment}
              close={() => setIsReplying(false)}
              buttonDisplay={"comment"}
              isPost={false}
            />
          )}
          {showProfilePicture && replies.length !== 0 && (
            <div>
              {showReply && (
                <div>
                  <Image
                    src={dashicon}
                    alt="dash icon"
                    className={styles.icons}
                    onClick={() => setShowReply(false)}
                  />
                  {replies.map((comment) => (
                    <Comment
                      comment={comment}
                      subRedditName={subRedditName}
                      showProfilePicture={showProfilePicture}
                      subRedditPicture={subRedditPicture}
                      subRedditRules={subRedditRules}
                      isModerator={isModerator}
                      postLocked={postLocked}
                      postId={postId}
                    />
                  ))}
                </div>
              )}
              {!showReply && (
                <Image
                  src={plusicon}
                  alt="plus icon"
                  className={styles.icons}
                  onClick={() => setShowReply(true)}
                />
              )}
            </div>
          )}
        </div>
      )}
      {hidden && (
        <div className={styles.hiddencomment}>
          <p>This comment is hidden</p>
          <button className={styles.undobutton} onClick={onHide}>
            undo
          </button>
        </div>
      )}
      {isDeleted && (
        <div className={styles.hiddencomment}>
          <p>This comment is deleted</p>
        </div>
      )}
      {showModal && (
        <div className={styles.modaloverlay}>
          <div className={styles.modal}>
            <button className={styles.Xbutton} onClick={handleCancel}>
              X
            </button>
            <h2>Remove comment?</h2>
            <p>Please enter the removal reason</p>
            <div className={styles.reasonarea}>
              <TextField
                id="outlined-select-currency"
                name="banReason"
                select
                value={reason}
                onChange={handleChange}
                className={styles.full_width}
              >
                {reasons.map((reason) => (
                  <MenuItem key={reason.title} value={reason.title}>
                    {reason.title}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={styles.modalbuttons}>
              <button
                className={styles.cancelButton}
                data-testid="cancelmodal"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className={styles.discardButton} onClick={handleDiscard}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
