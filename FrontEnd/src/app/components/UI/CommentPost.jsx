import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./CommentPost.module.css";
import Image from "next/image";
import Header from "../post/PostHeader";
import Button from "../post/Button";
import Poll from "../post/Poll";
import PostFooter from "../post/PostFooter";
import HiddenPost from "../post/HiddenPost";
import close from "../../assets/close.svg";
import CommentInput from "./CommentInput";
import RemovalReasonModal from "../post/RemovalReasonModal";
import nextImage from "../../assets/right-chevron-svgrepo-com.svg";
import previousImage from "../../assets/left-chevron-svgrepo-com.svg";
import getCookies from "../../utils/getCookies";
import handler from "@/app/utils/apiHandler";

/**
 * Component for displaying the post.
 *
 * @component
 * @param {string} postId - The ID of the post.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the post.
 * @param {string} userName - The username of the post author.
 * @param {string} profilePicture - The profile picture URL of the post author.
 * @param {string} subRedditName - The name of the subreddit.
 * @param {string} subRedditPicture - The picture URL of the subreddit.
 * @param {Array} subRedditRules - The rules of the subreddit.
 * @param {Array} attachments - The attachments (images, videos) of the post.
 * @param {number} upVotes - The number of upvotes for the post.
 * @param {number} comments - The number of comments on the post.
 * @param {string} time - The timestamp of the post.
 * @param {string} banner - The banner image URL of the subreddit.
 * @param {string} subRedditDescription - The description of the subreddit.
 * @param {boolean} upVoteStatus - The upvote status of the post.
 * @param {boolean} isProfile - Indicates if the post is on a profile page.
 * @param {string} cakeDate - The join date of the user to spreadit.
 * @param {boolean} isMember - Indicates if the user is a member of the subreddit.
 * @param {boolean} isJoined - Indicates if the user has joined the subreddit.
 * @param {Function} onJoin - Function to handle the join action.
 * @param {boolean} isSaved - Indicates if the post is saved by the user.
 * @param {boolean} sendReplyNotifications - Indicates if reply notifications are enabled.
 * @param {boolean} isSpoiler - Indicates if the post contains spoilers.
 * @param {boolean} isNSFW - Indicates if the post is NSFW.
 * @param {boolean} pollIsOpen - Indicates if the poll is open.
 * @param {Array} pollOptions - The options for the poll.
 * @param {Date} pollExpiration - The expiration date of the poll.
 * @param {boolean} Editing - Indicates if the post is being edited.
 *
 * *
 * @example
 * const post = {
 *     postId: "1",
 *     title: "Post Title",
 *     description: "This post description.",
 *     userName: "User 1",
 *     profilePicture: "https://example.com/profile.jpg",
 *     subRedditName: "Subreddit 1",
 *     subRedditPicture: "https://example.com/subreddit.jpg",
 *     subRedditRules: [{title: "Rule 1", description: "Description 1", mainReason: "Reason 1"}, {title: "Rule 2", description: "Description 2", , mainReason: "Reason 2"}]
 *     attachments: [
 *         { type: 'image', link: 'https://example.com/image1.jpg' },
 *         { type: 'video', link: 'https://example.com/video1.mp4' }
 *     ],
 *     upVotes: 100,
 *     comments: 20,
 *     time: "2024-04-16",
 *     banner: "https://example.com/banner.jpg",
 *     subRedditDescription: "This is a sample subreddit description.",
 *     upVoteStatus: true,
 *     isProfile: false,
 *     cakeDate: "2020-08-30",
 *     isMember: true,
 *     isJoined: true,
 *     onJoin: () => {  },
 *     isSaved: false,
 *     sendReplyNotifications: true,
 *     isSpoiler: false,
 *     isNSFW: false,
 *     pollIsOpen: true,
 *     pollOptions: ["Option 1", "Option 2", "Option 3"],
 *     pollExpiration: new Date("2024-04-10"),
 *     Editing: false
 * };
 *
 * return (
 *     <CommentPost {...post} />
 * );
 */

function CommentPost({
  postId,
  title,
  description,
  userName,
  profilePicture,
  subRedditName,
  subRedditPicture,
  subRedditRules,
  attachments,
  upVotes,
  comments,
  time,
  banner,
  subRedditDescription,
  upVoteStatus,
  isProfile,
  cakeDate,
  isMember,
  isJoined,
  onJoin,
  pollVote,
  isSaved,
  sendReplyNotifications,
  isSpoiler,
  isNSFW,
  pollIsOpen,
  pollOptions,
  pollExpiration,
  Editing,
  isApproved,
  isRemoved,
  isSpam,
  isCommentsLocked,
}) {
  const { images, video } = attachments.reduce(
    (acc, attachment) => {
      if (attachment.type === "image") {
        acc.images.push(attachment.link);
      } else if (attachment.type === "video") {
        acc.video.push(attachment.link);
      }
      return acc;
    },
    { images: [], video: [] },
  );

  const router = useRouter();
  const [temporaryToken, setToken] = useState(null);
  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        setToken(cookies.access_token);
        if (cookies.username === userName) {
          setMyPost(true);
        }
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);
  const [isEditing, setIsEditing] = useState(Editing);
  const [imageIndex, setImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [view, setView] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const [displayDescription, setDisplayDescription] = useState(description);
  const [votes, setVotes] = useState(upVotes);
  const [NSFW, setNSFW] = useState(isNSFW);
  const [spoiler, setSpoiler] = useState(isSpoiler);
  const [saved, setSaved] = useState(isSaved);
  const [replyNotifications, setReplyNotifications] = useState(
    sendReplyNotifications,
  );
  const [isMod, setIsMod] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modActions, setModActions] = React.useState({
    isRemoved: isRemoved,
    isApproved: isApproved,
    isSpam: isSpam,
    isCommentsLocked: isCommentsLocked,
    isNsfw: isNSFW,
    isSpoiler: isSpoiler,
  });

  useEffect(() => {
    setNSFW(isNSFW);
  }, [isNSFW]);

  useEffect(() => {
    setSpoiler(isSpoiler);
  }, [isSpoiler]);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  useEffect(() => {
    setVotes(upVotes);
  }, [upVotes]);

  useEffect(() => {
    setReplyNotifications(sendReplyNotifications);
  }, [sendReplyNotifications]);

  useEffect(() => {
    async function fetchData() {
      const cookie = await getCookies();
      if (cookie !== null && cookie.access_token && cookie.username) {
        const isModerator = await handler(
          `/community/moderation/${subRedditName}/${cookie.username}/is-moderator`,
          "GET",
          "",
          cookie.access_token,
        );
        setIsMod(isModerator.isModerator);
      } else {
        router.push("/login");
      }
    }
    fetchData();
  }, [temporaryToken]);

  async function handleHide() {
    let response;
    try {
      if (hidden) {
        response = await handler(
          `/posts/${postId}/unhide`,
          "POST",
          "",
          temporaryToken,
        );
        setHidden(false);
      } else {
        response = await handler(
          `/posts/${postId}/hide`,
          "POST",
          "",
          temporaryToken,
        );
        setHidden(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to hide a post
  }

  async function handleDelete() {
    let response;
    try {
      response = await handler(
        `/posts/${postId}`,
        "DELETE",
        "",
        temporaryToken,
      );
      setDeleted(true);
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to delete a post
  }

  async function handleUpVote(vote) {
    let response;
    try {
      if (vote === 1) {
        response = await handler(
          `/posts/${postId}/upvote`,
          "POST",
          "",
          temporaryToken,
        );
      } else {
        response = await handler(
          `/posts/${postId}/downvote`,
          "POST",
          "",
          temporaryToken,
        );
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }

    //api call to upvote or down vote
  }

  async function handlePollVote(choice) {
    let response;
    try {
      response = await handler(
        `/posts/${postId}/poll/vote`,
        "POST",
        { selectedOptions: choice },
        temporaryToken,
      );
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to vote
  }

  async function handleNSFW() {
    let response;
    
    try {
      if (NSFW) {
        response = await handler(
          `/posts/${postId}/unnsfw`,
          "POST",
          "",
          temporaryToken,
        );
        setNSFW(false);
      } else {
        response = await handler(
          `/posts/${postId}/nsfw`,
          "POST",
          "",
          temporaryToken,
        );
        setNSFW(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to invert NSFW
  }

  async function handleSpoiler() {
    let response;
    try {
      if (spoiler) {
        response = await handler(
          `/posts/${postId}/unspoiler`,
          "POST",
          "",
          temporaryToken,
        );
        setSpoiler(false);
      } else {
        response = await handler(
          `/posts/${postId}/spoiler`,
          "POST",
          "",
          temporaryToken,
        );
        setSpoiler(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to invert Spoiler
  }

  async function handleReport(mainReason, subReason) {
    let response;
    try {
      response = await handler(
        `/posts/${postId}/report`,
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
      response = await handler(
        `/users/block`,
        "POST",
        { username: userName },
        temporaryToken,
      );
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to block a user
  }

  async function handleSaved() {
    let response;
    try {
      if (saved) {
        response = await handler(
          `/posts/${postId}/unsave`,
          "POST",
          "",
          temporaryToken,
        );
        setSaved(false);
      } else {
        response = await handler(
          `/posts/${postId}/save`,
          "POST",
          "",
          temporaryToken,
        );
        setSaved(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to save a post
  }

  async function handleReplyNotifications() {
    setReplyNotifications(!sendReplyNotifications);
    //api call to set reply notifications
  }

  const onEdit = async (newcontent) => {
    try {
      
      const response = await handler(
        `/posts/${postId}/edit`,
        "PUT",
        { content: newcontent.content },
        temporaryToken,
      );
      
      setDisplayDescription(newcontent.content);
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing", error.message);
    }
  };

  function convertToEmbedLink(videoLink) {
    // Regular expression to check if the link is a YouTube link
    const youtubeRegex =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

    if (youtubeRegex.test(videoLink)) {
      // If it's a YouTube link, replace "watch" with "embed"
      return videoLink.replace("/watch?v=", "/embed/");
    } else {
      // If it's not a YouTube link, return the original link
      return videoLink;
    }
  }

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

  const formattedDescription = parseAndStyleLinks(displayDescription);

  return (
    <>
      {showModal ? (
        <RemovalReasonModal
          setShowModal={setShowModal}
          communityName={subRedditName}
          postId={postId}
          setModActions={setModActions}
        />
      ) : null}
      <div className={styles.post}>
        {isFullScreen && (
          <div className={styles.fullImage}>
            <button
              type="button"
              className={`${styles.changeImage} ${styles.exitFullScreen}`}
              onClick={() => setIsFullScreen(false)}
            >
              <Image
                style={{ filter: "brightness(100%) saturate(0%) invert(100%)" }}
                src={close}
                width={24}
                height={24}
                viewBox="0 0 20 20"
                alt="exit full screen"
              />
            </button>
            <div className={styles.blurBackground}></div>
            <div
              className={styles.backgroundImage}
              style={{ backgroundImage: `url(${images[imageIndex]})` }}
            ></div>
            <Image
              src={images[imageIndex]}
              alt="posted image "
              fill
              style={{ objectFit: "contain", maxWidth: "100%" }}
            />
            {images.length > imageIndex + 1 && (
              <button
                type="button"
                className={`${styles.changeImage} ${styles.nextImage}`}
                onClick={() => setImageIndex(imageIndex + 1)}
              >
                <Image
                  src={nextImage}
                  width={16}
                  height={16}
                  viewBox="0 0 20 20"
                  alt="next image"
                />
              </button>
            )}
            {imageIndex !== 0 && (
              <button
                type="button"
                className={`${styles.changeImage} ${styles.previousImage}`}
                onClick={() => setImageIndex(imageIndex - 1)}
              >
                <Image
                  src={previousImage}
                  width={16}
                  height={16}
                  viewBox="0 0 20 20"
                  alt="previous image"
                />
              </button>
            )}
          </div>
        )}
        <div className={styles.body}>
          {deleted === true && (
            <div className={styles.deleted}>
              <div className={styles.deletedText}>Post deleted</div>
            </div>
          )}
          {hidden === true && <HiddenPost unHide={handleHide} />}
          {hidden === false && deleted === false && (
            <div>
              <Header
                postId={postId}
                isUser={myPost}
                profilePicture={profilePicture}
                userName={userName}
                showProfilePicture={true}
                subRedditName={subRedditName}
                subRedditPicture={subRedditPicture}
                subRedditRules={subRedditRules}
                time={time}
                banner={banner}
                subRedditDescription={subRedditDescription}
                isProfile={isProfile}
                isInComment={true}
                cakeDate={cakeDate}
                isMember={isMember}
                joined={isJoined}
                onJoin={onJoin}
                myPost={myPost}
                isNSFW={NSFW}
                onNSFW={handleNSFW}
                isSpoiler={spoiler}
                onSpoiler={handleSpoiler}
                isSaved={saved}
                onSave={handleSaved}
                onReport={handleReport}
                onBlock={handleBlock}
                onHide={handleHide}
                onDelete={handleDelete}
                replyNotifications={replyNotifications}
                onReplyNotifications={handleReplyNotifications}
                onEdit={() => setIsEditing(true)}
              />
              <div className={styles.title}>{title}</div>
              <div className={styles.content}>
                {isEditing && (
                  <CommentInput
                    onComment={onEdit}
                    close={() => setIsEditing(false)}
                    commentBody={displayDescription}
                    buttonDisplay={"Save edits"}
                    isPost={true}
                  />
                )}
                <div className={styles.postcontent}>
                  {!view && (isNSFW || isSpoiler) && (
                    <div className={styles.overlay}>
                      <div className={styles.viewButton}>
                        {isNSFW && !isSpoiler && (
                          <Button
                            className={styles.viewButton}
                            name={"View NSFW content"}
                            onClick={() => setView(true)}
                            active={true}
                          />
                        )}
                        {isSpoiler && !isNSFW && (
                          <Button
                            className={styles.viewButton}
                            name={"View spoiler"}
                            onClick={() => setView(true)}
                            active={true}
                          />
                        )}
                        {isSpoiler && isNSFW && (
                          <Button
                            className={styles.viewButton}
                            name={"View NSFW content & spoilers"}
                            onClick={() => setView(true)}
                            active={true}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {!isEditing && (
                    <div
                      className={`${styles.description} ${!view ? styles.view : ""}`}
                      dangerouslySetInnerHTML={{ __html: formattedDescription }}
                    ></div>
                  )}
                  <div className={styles.media}>
                    {images.length !== 0 && (
                      <div
                        className={styles.image}
                        onClick={() => setIsFullScreen(true)}
                      >
                        <div className={styles.blurBackground}></div>
                        <div
                          className={styles.backgroundImage}
                          style={{
                            backgroundImage: `url(${images[imageIndex]})`,
                          }}
                        ></div>
                        <Image
                          src={images[imageIndex]}
                          alt="posted image "
                          fill
                          style={{ objectFit: "contain", maxWidth: "100%" }}
                        />
                        {images.length > imageIndex + 1 && (
                          <button
                            type="button"
                            className={`${styles.changeImage} ${styles.nextImage}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageIndex(imageIndex + 1);
                            }}
                          >
                            <Image
                              src={nextImage}
                              width={16}
                              height={16}
                              viewBox="0 0 20 20"
                              alt="next image"
                            />
                          </button>
                        )}
                        {imageIndex !== 0 && (
                          <button
                            type="button"
                            className={`${styles.changeImage} ${styles.previousImage}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageIndex(imageIndex - 1);
                            }}
                          >
                            <Image
                              src={previousImage}
                              width={16}
                              height={16}
                              viewBox="0 0 20 20"
                              alt="previous image"
                            />
                          </button>
                        )}
                      </div>
                    )}
                    {video.length !== 0 && (
                      <iframe
                        className={styles.video}
                        title="Posted video"
                        allowFullScreen
                        src={convertToEmbedLink(video[0])}
                      />
                    )}
                  </div>
                </div>
                {pollOptions.length !== 0 && (
                  <Poll
                    isOpen={pollIsOpen}
                    options={pollOptions}
                    onVote={handlePollVote}
                    pollExpiration={pollExpiration}
                    myVote={pollVote}
                  />
                )}
                <PostFooter
                  postId={postId}
                  communityName={subRedditName}
                  upvote={() => handleUpVote(1)}
                  downvote={() => handleUpVote(-1)}
                  voteCount={votes}
                  voteStatus={upVoteStatus}
                  commentCount={comments}
                  isMod={isMod}
                  setShowModal={setShowModal}
                  modActions={modActions}
                  setModActions={setModActions}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CommentPost;
