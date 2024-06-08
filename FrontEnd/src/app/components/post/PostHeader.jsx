import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./PostHeader.module.css";
import SubRedditInfoModal from "./SubRedditInfoModal";
import ProfileInfoModal from "./ProfileInfoModal";
import ReportModal from "../UI/ReportModal";
import DeletePost from "./DeletePostModal";
import PostOptionsImage from "../../assets/three-dots-menu.svg";
import PostDropDownMenu from "./PostDropDownMenu";
import PostDropDownItem from "./PostDropDownItem";
import save from "../../assets/post-images/save.svg";
import unsave from "../../assets/post-images/unsave.svg";
import report from "../../assets/post-images/report.svg";
import hide from "../../assets/post-images/hide.svg";
import edit from "../../assets/post-images/edit.svg";
import remove from "../../assets/post-images/delete.svg";
import spoilerIcon from "../../assets/post-images/mod-icons/spoiler.svg";
import removeSpoiler from "../../assets/post-images/mod-icons/spoiler-filled.svg";
import nsfwIcon from "../../assets/post-images/mod-icons/nsfw.svg";
import removeNSFW from "../../assets/post-images/mod-icons/nsfw-filled.svg";
import bell from "../../assets/post-images/bell.svg";
import removeBell from "../../assets/post-images/bell-filled.svg";
import lock from "../../assets/lock-fill.svg";
import Button from "./Button";
import handler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";

/**
 * Component for displaying the header of a post.
 * @component
 * @param {string} postId - The ID of the post.
 * @param {string} subRedditName - The name of the subreddit where the post was made.
 * @param {string} userName - The username of the author of the post.
 * @param {string} subRedditPicture - The URL of the subreddit profile picture.
 * @param {boolean} showProfilePicture - Indicates whether to show the user's profile picture.
 * @param {string} time - How much time since the post was made..
 * @param {string} banner - The URL of the subreddit banner image.
 * @param {string} subRedditDescription - The description of the subreddit.
 * @param {array} subRedditRules - An array of subreddit rules each object must include a reportReason.
 * @param {boolean} isProfile - Indicates if the post header is for a user profile.
 * @param {string} cakeDate - The day when the user joined Reddit.
 * @param {boolean} isFollowed - Indicates whether the user is following the the post's author.
 * @param {Function} onFollow - The function to be called when the user follows or unfollows the post's author.
 * @param {boolean} isMember - Indicates whether the user is already a member of the subreddit.
 * @param {boolean} joined - Indicates whether the user has joined the subreddit.
 * @param {Function} onJoin - The function to be called when the user joins or leaves the subreddit.
 * @param {boolean} myPost - Indicates whether the post belongs to the logged-in user.
 * @param {boolean} isNSFW - Indicates whether the post contains NSFW content.
 * @param {Function} onNSFW - The function to be called when the user toggles NSFW status (my post only).
 * @param {boolean} isSpoiler - Indicates whether the post contains spoilers.
 * @param {Function} onSpoiler - The function to be called when the user toggles spoiler status (my post only).
 * @param {boolean} isSaved - Indicates whether the post is saved by the user.
 * @param {Function} onSave - The function to be called when the user saves or unsaves the post.
 * @param {boolean} replyNotifications - Indicates whether the user receives reply notifications (my post only).
 * @param {Function} onReplyNotifications - The function to be called when the user toggles reply notifications (my post only).
 * @param {Function} onReport - The function to be called when the user reports the post (other user's post only).
 * @param {Function} onBlock - The function to be called when the user blocks the post's author at the end of the reporting process.
 * @param {Function} onHide - The function to be called when the user hides the post.
 * @param {Function} onDelete - The function to be called when the user deletes the post (my post only).
 * @returns {JSX.Element} The rendered PostHeader component.
 *
 * @example
 * // Renders the header of a post
 * const postId = "abc123";
 * const subRedditName = "example";
 * const userName = "user123";
 * const subRedditPicture = "/picture.jpg";
 * const showProfilePicture = true;
 * const time = "2024-04-16T10:30:00Z";
 * const banner = "/banner.jpg";
 * const subRedditDescription = "Example subreddit description";
 * const subRedditRules = [{Rule : "Be nice", reportReason: "was not nice"}, {Rule : "No spam",  reportReason: "spam"}];
 * const isProfile = false;
 * const cakeDate = "2022-01-01T00:00:00Z";
 * const isFollowed = true;
 * const isMember = true;
 * const joined = true;
 * const myPost = true;
 * const isNSFW = false;
 * const isSpoiler = false;
 * const isSaved = false;
 * const replyNotifications = true;
 * function handleFollow() {  }
 * function handleNSFW() {  }
 * function handleSpoiler() {  }
 * function handleSave() {  }
 * function handleReplyNotifications() {  }
 * function handleReport() {  }
 * function handleBlock() {  }
 * function handleHide() {  }
 * function handleDelete() {  }
 * <PostHeader postId={postId} subRedditName={subRedditName} userName={userName} subRedditPicture={subRedditPicture} showProfilePicture={showProfilePicture} time={time} banner={banner} subRedditDescription={subRedditDescription} subRedditRules={subRedditRules} isProfile={isProfile} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={handleFollow} isMember={isMember} joined={joined} myPost={myPost} isNSFW={isNSFW} onNSFW={handleNSFW} isSpoiler={isSpoiler} onSpoiler={handleSpoiler} isSaved={isSaved} onSave={handleSave} replyNotifications={replyNotifications} onReplyNotifications={handleReplyNotifications} onReport={handleReport} onBlock={handleBlock} onHide={handleHide} onDelete={handleDelete} />
 */

function PostHeader({
  postId,
  isUser,
  userName,
  showProfilePicture,
  profilePicture,
  subRedditName,
  subRedditPicture,
  time,
  isProfile,
  isInComment,
  cakeDate,
  isMember,
  joined,
  onJoin,
  isSaved,
  onSave,
  onDelete,
  myPost,
  onHide,
  onReport,
  onBlock,
  isSpoiler,
  onSpoiler,
  isNSFW,
  onNSFW,
  replyNotifications,
  onReplyNotifications,
  onEdit,
  isLocked,
}) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubRedditInfo, setShowSubRedditInfo] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subRedditDescription, setSubRedditDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [subRedditRules, setSubRedditRules] = useState([]);
  const [token, setToken] = useState(null);

  let timeOut;

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getSubData() {
      if (
        subRedditDescription !== "" ||
        (!showSubRedditInfo && !showReportModal)
      )
        return;
      try {
        const subData = await handler(
          `/community/${subRedditName}/get-info`,
          "GET",
          "",
          token,
        );
        setSubRedditDescription(subData.description);
        setBanner(subData.communityBanner);
        setSubRedditRules(subData.rules);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getSubData();
  }, [showSubRedditInfo, showReportModal]);

  function toggleDropdown() {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  }

  async function handleMouseLeaveSubreddit() {
    timeOut = setTimeout(() => {
      setShowSubRedditInfo(false);
    }, 200);
  }

  async function handleMouseLeaveProfile() {
    timeOut = setTimeout(() => {
      setShowProfileInfo(false);
    }, 200);
  }
  return (
    <div className={styles.header}>
      {showReportModal && console.log(subRedditRules)}
      {showReportModal && (
        <ReportModal
          userName={userName}
          subRedditPicture={subRedditPicture}
          subRedditName={subRedditName}
          subRedditRules={subRedditRules}
          onReport={onReport}
          onBlock={onBlock}
          closeModal={() => setShowReportModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeletePost
          modalTitle={"Delete post?"}
          modalDescription={"Once you delete this post, it can’t be restored."}
          onDelete={() => onDelete}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}

      <div
        className={styles.postHeaderInfo}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!isInComment && (
          <div
            className={styles.subRedditNameAndPicture}
            onMouseEnter={() => setShowSubRedditInfo(true)}
            onMouseLeave={() => handleMouseLeaveSubreddit()}
          >
            {showSubRedditInfo && (
              <div
                onMouseEnter={() => clearTimeout(timeOut)}
                onMouseLeave={() => setShowSubRedditInfo(false)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {isProfile && (
                  <ProfileInfoModal
                    isUser={isUser}
                    userName={userName}
                    profilePicture={profilePicture}
                    cakeDate={cakeDate}
                  />
                )}
                {!isProfile && (
                  <SubRedditInfoModal
                    subRedditName={subRedditName}
                    subRedditPicture={subRedditPicture}
                    subRedditBanner={banner}
                    subRedditDescription={subRedditDescription}
                    isMember={isMember}
                    joined={joined}
                    onJoin={onJoin}
                  />
                )}
              </div>
            )}
            {showProfilePicture && (
              <img
                className={styles.subRedditPicture}
                src={subRedditPicture || profilePicture}
                width={256}
                height={256}
                alt="The subReddit picture "
                quality={100}
                onClick={() => {
                  router.push(`/community/${subRedditName}`);
                }}
              />
            )}

            <div className={styles.subredditandusername}>
              <div className={styles.postInfo}>
                <div
                  className={styles.subRedditName}
                  onClick={() => {
                    router.push(
                      subRedditName
                        ? `/community/${subRedditName}`
                        : `/profile/${userName}`,
                    );
                  }}
                >
                  {subRedditName ? `r/${subRedditName}` : `u/${userName}`}
                </div>
                <div>•</div>
              </div>
            </div>
          </div>
        )}
        {isInComment && (
          <div className={styles.subRedditNameAndPicture}>
            {showSubRedditInfo && (
              <div
                className={styles.showmodalarea}
                onMouseEnter={() => clearTimeout(timeOut)}
                onMouseLeave={() => setShowSubRedditInfo(false)}
                onClick={() => {
                  router.push(`/community/${subRedditName}`);
                }}
              >
                <SubRedditInfoModal
                  subRedditName={subRedditName}
                  subRedditPicture={subRedditPicture}
                  subRedditBanner={banner}
                  subRedditDescription={subRedditDescription}
                  isMember={isMember}
                  joined={joined}
                  onJoin={onJoin}
                />
              </div>
            )}
            {showProfileInfo && (
              <div
                onMouseEnter={() => clearTimeout(timeOut)}
                onMouseLeave={() => setShowProfileInfo(false)}
              >
                <ProfileInfoModal
                  isUser={isUser}
                  userName={userName}
                  profilePicture={profilePicture}
                  cakeDate={cakeDate}
                />
              </div>
            )}
            <img
              className={styles.subRedditPicture}
              src={subRedditPicture}
              width={256}
              height={256}
              alt="The subReddit picture "
              quality={100}
            />
            <div className={styles.subredditandusername}>
              <div className={styles.postInfo}>
                <div
                  className={styles.subRedditName}
                  onMouseEnter={() => setShowSubRedditInfo(true)}
                  onMouseLeave={() => handleMouseLeaveSubreddit()}
                  onClick={() => {
                    router.push(`/community/${subRedditName}`);
                  }}
                >
                  {subRedditName}
                </div>
                <div>•</div>
                <div className={styles.time}>{time}</div>
              </div>
              <div
                className={styles.userName}
                onMouseEnter={() => setShowProfileInfo(true)}
                onMouseLeave={() => handleMouseLeaveProfile()}
                onClick={() => {
                  router.push(`/profile/${userName}`);
                }}
              >
                {userName}
              </div>
            </div>
          </div>
        )}
        {!isInComment && <div className={styles.time}>{time}</div>}
        {isProfile && isLocked && (
          <Image src={lock} alt="lock icon" width={15} height={15} />
        )}
      </div>
      {!isProfile && (
        <div
          className={styles.joinAndOptions}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {!isMember && !isInComment && (
            <div className={styles.joinButton}>
              {!joined && (
                <Button
                  className={styles.joinButton}
                  name={"Join"}
                  onClick={() => onJoin()}
                  active={true}
                />
              )}
              {joined && (
                <Button
                  className={styles.joinButton}
                  name={"Leave"}
                  onClick={() => onJoin()}
                  active={true}
                />
              )}
            </div>
          )}
          {myPost !== null && (
            <button
              type="button"
              className={styles.options}
              onClick={toggleDropdown}
            >
              <Image
                src={PostOptionsImage}
                width={16}
                height={16}
                viewBox="0 0 20 20"
                alt="options"
              />
              {myPost === false && (
                <PostDropDownMenu
                  showDropdown={showDropdown}
                  setShowDropDown={setShowDropdown}
                >
                  {!isSaved && (
                    <PostDropDownItem
                      icon={save}
                      iconAlt="Save Icon"
                      description="Save"
                      onClick={() => onSave()}
                    />
                  )}
                  {isSaved && (
                    <PostDropDownItem
                      icon={unsave}
                      iconAlt="Unsave Icon"
                      description="Remove from saved"
                      onClick={() => onSave()}
                    />
                  )}
                  <PostDropDownItem
                    icon={hide}
                    iconAlt="Hide Icon"
                    description="Hide"
                    onClick={() => onHide()}
                  />
                  <PostDropDownItem
                    icon={report}
                    iconAlt="Report Icon"
                    description="Report"
                    onClick={() => setShowReportModal(true)}
                  />
                </PostDropDownMenu>
              )}
              {myPost === true && (
                <PostDropDownMenu
                  showDropdown={showDropdown}
                  setShowDropDown={setShowDropdown}
                >
                  {isInComment && (
                    <PostDropDownItem
                      icon={edit}
                      iconAlt="Edit Icon"
                      description="Edit post"
                      onClick={onEdit}
                    />
                  )}
                  {!isInComment && (
                    <PostDropDownItem
                      icon={edit}
                      iconAlt="Edit Icon"
                      description="Edit post"
                      onClick={() => {
                        router.push(`/comments/${postId}?isEditing=${true}`);
                      }}
                    />
                  )}
                  {!isSaved && (
                    <PostDropDownItem
                      icon={save}
                      iconAlt="Save Icon"
                      description="Save"
                      onClick={() => onSave()}
                    />
                  )}
                  {isSaved && (
                    <PostDropDownItem
                      icon={unsave}
                      iconAlt="Unsave Icon"
                      description="Remove from saved"
                      onClick={() => onSave()}
                    />
                  )}
                  <PostDropDownItem
                    icon={hide}
                    iconAlt="Hide Icon"
                    description="Hide"
                    onClick={() => onHide()}
                  />
                  <PostDropDownItem
                    icon={remove}
                    iconAlt="Delete Icon"
                    description="Delete"
                    onClick={() => setShowDeleteModal(true)}
                  />
                  {!isSpoiler && (
                    <PostDropDownItem
                      icon={spoilerIcon}
                      iconAlt="Turn on Spoilers Icon"
                      description="Add spoiler tag"
                      onClick={() => onSpoiler()}
                    />
                  )}
                  {isSpoiler && (
                    <PostDropDownItem
                      icon={removeSpoiler}
                      iconAlt="Turn off Spoilers Icon"
                      description="Remove spoiler tag"
                      onClick={() => onSpoiler()}
                    />
                  )}
                  {!isNSFW && (
                    <PostDropDownItem
                      icon={nsfwIcon}
                      iconAlt="Turn on NSFW Icon"
                      description="Add NSFW tag"
                      onClick={() => onNSFW()}
                    />
                  )}
                  {isNSFW && (
                    <PostDropDownItem
                      icon={removeNSFW}
                      iconAlt="Turn off NSFW Icon"
                      description="Remove NSFW tag"
                      onClick={() => onNSFW()}
                    />
                  )}
                  {!replyNotifications && (
                    <PostDropDownItem
                      icon={bell}
                      iconAlt="Turn on reply notifications Icon"
                      description="Turn on reply notification"
                      onClick={() => onReplyNotifications()}
                    />
                  )}
                  {replyNotifications && (
                    <PostDropDownItem
                      icon={removeBell}
                      iconAlt="Turn off reply notifications Icon"
                      description="Turn off reply notification"
                      onClick={() => onReplyNotifications()}
                    />
                  )}
                </PostDropDownMenu>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PostHeader;
