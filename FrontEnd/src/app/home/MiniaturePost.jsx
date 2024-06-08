import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./MiniaturePost.module.css";
import SubRedditInfoModal from "../components/post/SubRedditInfoModal";
import spoilerIcon from "../assets/post-images/mod-icons/spoiler.svg";
import nsfwIcon from "../assets/post-images/mod-icons/nsfw.svg";
import { abortRequests } from "../utils/apiHandler";

/**
 * Component for displaying a post.
 * @component
 * @param {string} postId - The unique identifier of the post.
 * @param {string} title - The title of the post.
 * @param {string} subRedditName - The name of the subreddit where the post was made.
 * @param {string} subRedditPicture - The picture of the subreddit.
 * @param {Array<{ type: string, link: string }>} attachments - The attachments (images/videos) associated with the post.
 * @param {number} upVotes - The total number of upvotes on the post (upvotes - downvotes).
 * @param {number} comments - The number of comments on the post.
 * @param {string} banner - The banner of the subreddit.
 * @param {string} subRedditDescription - The description of the subreddit.
 * @param {boolean} isMember - Indicates if the user is already a member of the subreddit.
 * @param {boolean} isSpoiler - Indicates if the post contains a spoiler.
 * @param {boolean} isNSFW - Indicates if the post contains NSFW content.
 * @returns {JSX.Element} The rendered Post component.
 *
 * @example
 * // Renders a post with no attachments
 * <Post postId="123" title="No Attachments Post" subRedditName="example" subRedditPicture="/example.jpg" attachments={[]} upVotes={10} comments={5} banner="/banner.jpg" subRedditDescription="Example subreddit" isMember={true} isSpoiler={false} isNSFW={false} />
 * @example
 * // Renders a post with only a video attachment
 * <Post postId="456" title="Video Post" subRedditName="example" subRedditPicture="/example.jpg" attachments={[{ type: "video", link: "https://example.com/video.mp4" }]} upVotes={15} comments={7} banner="/banner.jpg" subRedditDescription="Example subreddit" isMember={true} isSpoiler={false} isNSFW={false} />
 * @example
 * // Renders a post with only an image attachment
 * <Post postId="789" title="Image Post" subRedditName="example" subRedditPicture="/example.jpg" attachments={[{ type: "image", link: "/image.jpg" }]} upVotes={20} comments={10} banner="/banner.jpg" subRedditDescription="Example subreddit" isMember={true} isSpoiler={false} isNSFW={false} />
 * @example
 * // Renders a post with NSFW content
 * <Post postId="101" title="NSFW Post" subRedditName="example" subRedditPicture="/example.jpg" attachments={[]} upVotes={25} comments={15} banner="/banner.jpg" subRedditDescription="Example subreddit" isMember={true} isSpoiler={false} isNSFW={true} />
 */

function MiniaturePost({
  postId,
  subRedditName,
  subRedditPicture,
  subRedditDescription,
  subRedditBanner,
  postTitle,
  attachments,
  upVotes,
  comments,
  isNSFW,
  isSpoiler,
  isMember,
}) {
  const router = useRouter();
  const [showSubRedditInfo, setShowSubRedditInfo] = useState(false);
  const [joined, setJoined] = useState(false);
  let timeOut;

  const { postPictures, videos } = attachments.reduce(
    (acc, attachment) => {
      if (attachment.type === "image") {
        acc.postPictures.push(attachment.link);
      } else if (attachment.type === "video") {
        acc.videos.push(attachment.link);
      }
      return acc;
    },
    { postPictures: [], videos: [] },
  );

  function convertToEmbedLink(videosLink) {
    // Regular expression to check if the link is a YouTube link
    const youtubeRegex =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

    if (youtubeRegex.test(videosLink)) {
      // If it's a YouTube link, replace "watch" with "embed"
      return videosLink.replace("/watch?v=", "/embed/");
    } else {
      // If it's not a YouTube link, return the original link
      return videosLink;
    }
  }

  function handleJoin() {
    setJoined(!joined);
    //api call to join subreddit
  }

  async function handleMouseLeave() {
    timeOut = setTimeout(() => {
      setShowSubRedditInfo(false);
    }, 200);
  }

  return (
    <div
      className={styles.post}
      onClick={() => {
        //abortRequests();
        router.push(`/comments/${postId}`);
      }}
    >
      <div className={styles.content}>
        <div className={styles.body}>
          <div className={styles.header}>
            <div
              className={styles.subRedditNameAndPicture}
              onMouseEnter={() => setShowSubRedditInfo(true)}
              onMouseLeave={() => handleMouseLeave()}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/community/${subRedditName}`);
              }}
            >
              {showSubRedditInfo && (
                <div
                  className={styles.subInfo}
                  onMouseEnter={() => clearTimeout(timeOut)}
                  onMouseLeave={() => setShowSubRedditInfo(false)}
                >
                  <SubRedditInfoModal
                    subRedditName={subRedditName}
                    subRedditPicture={subRedditPicture}
                    subRedditBanner={subRedditBanner}
                    subRedditDescription={subRedditDescription}
                    isMember={isMember}
                    joined={joined}
                    onJoin={handleJoin}
                  />
                </div>
              )}
              <Image
                className={styles.subRedditPicture}
                src={subRedditPicture}
                width={256}
                height={256}
                alt="The subReddit picture "
                quality={100}
              />
              <div className={styles.subRedditName}>{`r/${subRedditName}`}</div>
            </div>
          </div>
          <div className={styles.title}>{postTitle}</div>
        </div>
        {(postPictures.length !== 0 || videos.length !== 0) && (
          <div
            className={styles.media}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {(isSpoiler || isNSFW) && (
              <div
                className={styles.overlay}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              ></div>
            )}
            <div
              className={styles.warningIcon}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {isNSFW && (
                <Image
                  src={nsfwIcon}
                  width={36}
                  height={36}
                  viewBox="0 0 20 20"
                  alt="NSFW"
                />
              )}
              {isSpoiler && !isNSFW && (
                <Image
                  src={spoilerIcon}
                  width={36}
                  height={36}
                  viewBox="0 0 20 20"
                  alt="Spoiler"
                />
              )}
            </div>
            <div>
              {videos.length === 0 && (
                <Image
                  src={postPictures[0]}
                  alt="posted image "
                  fill
                  style={{ objectFit: "cover", maxWidth: "100%" }}
                />
              )}
              {videos.length !== 0 && (
                <video
                  className={styles.video}
                  title="Posted videos"
                  src={convertToEmbedLink(videos[0])}
                ></video>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        {upVotes !== 0 && (
          <div className={styles.upvotes}> {`${upVotes} upvotes`} </div>
        )}
        {upVotes !== 0 && comments !== 0 && <div>•</div>}
        {comments !== 0 && (
          <div className={styles.comments}>{`${comments} comments`}</div>
        )}
      </div>
    </div>
  );
}

export default MiniaturePost;
