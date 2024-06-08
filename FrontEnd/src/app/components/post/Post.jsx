import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Post.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "./PostHeader";
import Button from "./Button";
import Poll from "./Poll";
import nextImage from "../../assets/right-chevron-svgrepo-com.svg";
import previousImage from "../../assets/left-chevron-svgrepo-com.svg";
import PostFooter from "./PostFooter";
import HiddenPost from "./HiddenPost";
import getCookies from "../../utils/getCookies";
import close from "../../assets/close.svg";
import handler from "@/app/utils/apiHandler";
import RemovalReasonModal from "./RemovalReasonModal";
import { abortRequests } from "../../utils/apiHandler";
import { fetchData } from "next-auth/client/_utils";
import { set } from "lodash";

/**
 * Component for displaying a post.
 * @component
 * @param {string} type - The type of the post.
 * @param {string} postId - The unique identifier of the post.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the post.
 * @param {string} userName - The username of the post author.
 * @param {string} subRedditName - The name of the subreddit where the post was made.
 * @param {string} subRedditPicture - The picture of the subreddit.
 * @param {Array<{ type: string, link: string }>} attachments - The attachments (images/videos) associated with the post.
 * @param {number} upVotes - The total number of upvotes on the post (upvotes - downvotes).
 * @param {number} upVoteStatus - Has the user already upvoted or downvoted the post, options("upvoted","dowvoted","neutral").
 * @param {number} comments - The number of comments on the post.
 * @param {string} time - How much time since the post was made.
 * @param {boolean} isProfile - Indicates if the post header is for a user profile.
 * @param {string} cakeDate - The day when the user joined Reddit.
 * @param {boolean} isFollowed - Indicates if the post author is followed by the user.
 * @param {boolean} isMember - Indicates if the user is already a member of the subreddit.
 * @param {boolean} isSpoiler - Indicates if the post contains a spoiler.
 * @param {boolean} isNSFW - Indicates if the post contains NSFW content.
 * @param {boolean} isSaved - Indicates if the post is saved by the user.
 * @param {boolean} sendReplyNotifications - Indicates if reply notifications are enabled (my post only).
 * @param {boolean} pollIsOpen - Indicates if the poll associated with the post is still open.
 * @param {Array<{ option: string, votes: number }>} pollOptions - The options available in the poll.
 * @param {string} pollExpiration - The expiration time of the poll.
 * @param {string} pollVote - The vote cast by the user in the poll if any, if user hasn't voted pass "".
 * @returns {JSX.Element} The rendered Post component.
 *
 * @example
 * // Renders a post with no attachments
 * <Post type="post" postId="123" title="No Attachments Post" description="This post contains no attachments" userName="user123" subRedditName="example" subRedditPicture="/example.jpg"  attachments={[]} upVotes={10} upVoteStatus={1} comments={5} time="2024-04-15T12:00:00Z" isProfile={false} cakeDate="2024-01-01T12:00:00Z" isFollowed={true} isMember={true} isSpoiler={false} isNSFW={false} isSaved={false} sendReplyNotifications={true} pollIsOpen={false} pollOptions={[]} pollExpiration="" pollVote="" />
 * @example
 * // Renders a post with only a video attachment
 * <Post type="video" postId="456" title="Video Post" description="This post contains a video attachment" userName="user456" subRedditName="example" subRedditPicture="/example.jpg"  attachments={[{ type: "video", link: "https://example.com/video.mp4" }]} upVotes={15} upVoteStatus={1} comments={7} time="2024-04-16T12:00:00Z" isProfile={false} cakeDate="2024-01-01T12:00:00Z" isFollowed={true} isMember={true} isSpoiler={false} isNSFW={false} isSaved={false} sendReplyNotifications={true} pollIsOpen={false} pollOptions={[]} pollExpiration="" pollVote="" />
 * @example
 * // Renders a post with only an image attachment
 * <Post type="image" postId="789" title="Image Post" description="This post contains an image attachment" userName="user789" subRedditName="example" subRedditPicture="/example.jpg"  attachments={[{ type: "image", link: "/image.jpg" }]} upVotes={20} upVoteStatus={1} comments={10} time="2024-04-17T12:00:00Z" isProfile={false} cakeDate="2024-01-01T12:00:00Z" isFollowed={true} isMember={true} isSpoiler={false} isNSFW={false} isSaved={false} sendReplyNotifications={true} pollIsOpen={false} pollOptions={[]} pollExpiration="" pollVote="" />
 * @example
 * // Renders a post with NSFW content
 * <Post type="post" postId="101" title="NSFW Post" description="This post contains NSFW content" userName="user101" subRedditName="example" subRedditPicture="/example.jpg"  attachments={[]} upVotes={25} upVoteStatus={1} comments={15} time="2024-04-18T12:00:00Z" isProfile={false} cakeDate="2024-01-01T12:00:00Z" isFollowed={true} isMember={true} isSpoiler={false} isNSFW={true} isSaved={false} sendReplyNotifications={true} pollIsOpen={false} pollOptions={[]} pollExpiration="" pollVote="" />
 * @example
 * // Renders a post with a poll
 * <Post type="poll" postId="202" title="Poll Post" description="This post contains a poll" userName="user202" subRedditName="example" subRedditPicture="/example.jpg"  attachments={[]} upVotes={30} upVoteStatus={1} comments={20} time="2024-04-19T12:00:00Z" isProfile={false} cakeDate="2024-01-01T12:00:00Z" isFollowed={true} isMember={true} isSpoiler={false} isNSFW={false} isSaved={false} sendReplyNotifications={true} pollIsOpen={true} pollOptions={[{ option: "Option A", votes: 10 }, { option: "Option B", votes: 15 }]} pollExpiration="2024-04-25T12:00:00Z" pollVote="" />
 */
function Post({
  type,
  postId,
  title,
  description,
  userName,
  subRedditName,
  subRedditPicture,
  attachments,
  upVotes,
  upVoteStatus,
  comments,
  time,
  isProfile,
  cakeDate,
  isFollowed,
  isMember,
  isSpoiler,
  isNSFW,
  isSaved,
  sendReplyNotifications,
  pollIsOpen,
  pollOptions,
  pollExpiration,
  pollVote,
  isApproved,
  isRemoved,
  isSpam,
  isCommentsLocked,
}) {
  let token = "";
  const router = useRouter();
  const { images, videos } = attachments.reduce(
    (acc, attachment) => {
      if (attachment.type === "image") {
        acc.images.push(attachment.link);
      } else if (attachment.type === "video") {
        acc.videos.push(attachment.link);
      }
      return acc;
    },
    { images: [], videos: [] },
  );

  const displayDescription =
    videos.length === 0 && images.length === 0 ? true : false;
  const [imageIndex, setImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [view, setView] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [NSFW, setNSFW] = useState(isNSFW);
  const [spoiler, setSpoiler] = useState(isSpoiler);
  const [saved, setSaved] = useState(isSaved);
  const [followed, setFollowed] = useState(isFollowed);
  const [replyNotifications, setReplyNotifications] = useState(
    sendReplyNotifications,
  );
  const [myPost, setMyPost] = useState(null);
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
    async function fetchData() {
      const cookie = await getCookies();

      if (cookie.username === userName) {
        setMyPost(true);
      } else if (cookie.username !== userName) {
        setMyPost(false);
      }
    }
    fetchData();
  }, [token]);

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
    setReplyNotifications(sendReplyNotifications);
  }, [sendReplyNotifications]);

  useEffect(() => {
    async function fetchData() {
      const cookie = await getCookies();
      if (cookie !== null && cookie.access_token && cookie.username) {
        token = cookie.access_token;
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
  }, [token]);

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

  const formattedDescription = parseAndStyleLinks(description);

  async function handleJoin() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      if (joined) {
        response = await handler(
          "/community/unsubscribe",
          "POST",
          { communityName: subRedditName },
          token,
        );
        setJoined(false);
      } else {
        response = await handler(
          "/community/subscribe",
          "POST",
          { communityName: subRedditName },
          token,
        );
        setJoined(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to join subreddit
  }

  async function handleHide() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      if (hidden) {
        response = await handler(`/posts/${postId}/unhide`, "POST", "", token);
        setHidden(false);
      } else {
        response = await handler(`/posts/${postId}/hide`, "POST", "", token);
        setHidden(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to hide a post
  }

  async function handleDelete() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      response = await handler(`/posts/${postId}`, "DELETE", "", token);
      setDeleted(true);
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to delete a post
  }

  async function handleUpVote(vote) {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      if (vote === 1) {
        response = await handler(`/posts/${postId}/upvote`, "POST", "", token);
      } else {
        response = await handler(
          `/posts/${postId}/downvote`,
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

  async function handlePollVote(choice) {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      response = await handler(
        `/posts/${postId}/poll/vote`,
        "POST",
        { selectedOption: choice.option },
        token,
      );
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to vote
  }

  async function handleNSFW() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      if (NSFW) {
        response = await handler(`/posts/${postId}/unnsfw`, "POST", "", token);
        setNSFW(false);
      } else {
        response = await handler(`/posts/${postId}/nsfw`, "POST", "", token);
        setNSFW(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to invert NSFW
  }

  async function handleSpoiler() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      if (spoiler) {
        response = await handler(
          `/posts/${postId}/unspoiler`,
          "POST",
          "",
          token,
        );
        setSpoiler(false);
      } else {
        response = await handler(`/posts/${postId}/spoiler`, "POST", "", token);
        setSpoiler(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to invert Spoiler
  }

  async function handleFollow() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      if (followed) {
        response = await handler(
          `/users/unfollow`,
          "POST",
          { username: userName },
          token,
        );
        setFollowed(false);
      } else {
        response = await handler(
          `/users/follow`,
          "POST",
          { username: userName },
          token,
        );
        setFollowed(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to follow or unfollow a user
  }

  async function handleReport(mainReason, subReason) {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      response = await handler(
        `/posts/${postId}/report`,
        "POST",
        { reason: mainReason, sureason: subReason },
        token,
      );
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to report a post
  }

  async function handleBlock() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      response = await handler(
        `/users/block`,
        "POST",
        { username: userName },
        token,
      );
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
    //api call to block a user
  }

  async function handleSaved() {
    const cookie = await getCookies();
    if (cookie !== null && cookie.access_token && cookie.username) {
      token = cookie.access_token;
    } else {
      router.push("/login");
    }
    let response;
    try {
      if (saved) {
        response = await handler(`/posts/${postId}/unsave`, "POST", "", token);
        setSaved(false);
      } else {
        response = await handler(`/posts/${postId}/save`, "POST", "", token);
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
      <div
        className={styles.post}
        onClick={() => {
          if (!deleted) {
            //abortRequests();
            router.push(`/comments/${postId}`);
          }
        }}
      >
        {isFullScreen && (
          <div
            className={styles.fullImage}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              className={`${styles.changeImage} ${styles.exitFullScreen}`}
              onClick={() => {
                setIsFullScreen(false);
              }}
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
                onClick={() => {
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
                onClick={() => {
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
                subRedditName={subRedditName}
                userName={userName}
                subRedditPicture={subRedditPicture}
                showProfilePicture={true}
                time={time}
                isProfile={isProfile}
                cakeDate={cakeDate}
                isFollowed={isFollowed}
                onFollow={handleFollow}
                isMember={isMember}
                joined={joined}
                onJoin={handleJoin}
                myPost={myPost}
                isNSFW={NSFW}
                onNSFW={handleNSFW}
                isSpoiler={spoiler}
                onSpoiler={handleSpoiler}
                isSaved={saved}
                onSave={handleSaved}
                replyNotifications={replyNotifications}
                onReplyNotifications={handleReplyNotifications}
                onReport={handleReport}
                onBlock={handleBlock}
                onHide={handleHide}
                onDelete={handleDelete}
              />
              <div className={styles.title}>{title}</div>
              <div className={styles.content}>
                {!view && (isNSFW || isSpoiler) && (
                  <div
                    className={styles.overlay}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                )}
                {!view && (isNSFW || isSpoiler) && (
                  <div
                    className={styles.viewButton}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
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
                )}
                {displayDescription && (
                  <div
                    className={`${styles.description} ${!view && (isNSFW || isSpoiler) ? styles.view : ""}`}
                    dangerouslySetInnerHTML={{ __html: formattedDescription }}
                  ></div>
                )}
                {!displayDescription && (
                  <div
                    className={styles.media}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {videos.length !== 0 && (
                      <iframe
                        className={styles.video}
                        title="Posted videos"
                        allowFullScreen
                        src={convertToEmbedLink(videos[0])}
                      />
                    )}
                    {videos.length === 0 && images.length !== 0 && (
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
                  </div>
                )}
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
                voteCount={upVotes}
                commentCount={comments}
                voteStatus={upVoteStatus}
                isMod={isMod}
                setShowModal={setShowModal}
                modActions={modActions}
                setModActions={setModActions}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
