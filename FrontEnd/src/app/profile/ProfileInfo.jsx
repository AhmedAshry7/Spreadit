import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ProfileInfo.module.css";
import PostDropDownMenu from "../components/post/PostDropDownMenu";
import PostDropDownItem from "../components/post/PostDropDownItem";
import { useRouter } from "next/navigation";
import apiHandler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import ReportModal from "../components/UI/ReportModal";

import PostOptionsImage from "@/app/assets/three-dots-menu.svg";
import follow from "@/app/assets/follow.svg";
import unfollow from "@/app/assets/unfollow.svg";
import comments from "@/app/assets/post-images/comments.svg";
import shareArrow from "@/app/assets/shareArrow.svg";
import blockIcon from "@/app/assets/block.svg";
import reportIcon from "@/app/assets/post-images/report.svg";
import toast from "react-hot-toast";

/**
 * Component for Displaying a profile info of another user.
 * @component
 * @param   {string} username   The username of the profile being viewed [Required]
 * @returns {JSX.Element} The component for the profile info.
 *
 * @example
 *
 * <ProfileInfo username="Ahmed"/>
 *
 */

function ProfileInfo({ username }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  function toggleDropdown() {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  }

  async function toggleFollow() {
    setIsFollowed((prevIsFollowed) => !prevIsFollowed);
    const respone = isFollowed
      ? await apiHandler(
          `/users/unfollow`,
          "POST",
          { username: username },
          token,
        )
      : await apiHandler(
          `/users/follow/`,
          "POST",
          { username: username },
          token,
        );
    
  }

  function share() {
    navigator.clipboard.writeText(`/profile/${username}`);
  }

  function message() {
    router.push(`/chats/createusername/${username}`);
  }

  async function onReport(mainReason, subReason) {
    try {
      
      const response = await apiHandler(
        `/users/report`,
        "POST",
        { username: username, reason: mainReason, subreason: subReason },
        token,
      );
      toast.success("User Reported Successfully");
    } catch (error) {
      toast.error("Error Reporting User");
    }
  }

  async function onBlock() {
    try {
      const response = await apiHandler(
        `/users/block`,
        "POST",
        { username: username },
        token,
      );
      toast.success("User Blocked Successfully");
    } catch (error) {
      toast.error("Error Blocking User");
    }
  }

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
        const response = await apiHandler(
          `/users/isfollowed/${username}`,
          "GET",
          "",
          cookies.access_token,
        );
        
        setIsFollowed(response.isFollowed ? true : false);
      } else {
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.info}>
      {showReportModal && (
        <ReportModal
          userName={username}
          subRedditPicture={null}
          subRedditName={null}
          subRedditRules={null}
          onReport={(mainReason, subReason) => onReport(mainReason, subReason)}
          onBlock={() => onBlock()}
          closeModal={() => setShowReportModal(false)}
        />
      )}
      <div className={styles.username_container}>
        <h2>{username}</h2>
        <div
          data-testid="dropdown"
          className={styles.circle}
          onClick={toggleDropdown}
        >
          <Image
            src={PostOptionsImage}
            width={12}
            height={12}
            alt="Post Options"
          />

          <PostDropDownMenu
            showDropdown={showDropdown}
            setShowDropDown={setShowDropdown}
          >
            <PostDropDownItem
              icon={shareArrow}
              iconAlt="Share Icon"
              description="Share"
              onClick={share}
            />
            <PostDropDownItem
              icon={comments}
              iconAlt="Message Icon"
              description="Send a Message"
              onClick={message}
            />
            <PostDropDownItem
              icon={blockIcon}
              iconAlt="Block Icon"
              description="Block Account"
              onClick={onBlock}
            />
            <PostDropDownItem
              icon={reportIcon}
              iconAlt="Report Icon"
              description="Report Account"
              onClick={() => {
                setShowReportModal(true);
              }}
            />
          </PostDropDownMenu>
        </div>
      </div>

      <div className={styles.action_buttons}>
        <button
          disabled={token === null}
          data-testid="follow-btn"
          className={isFollowed ? styles.btn : styles.blue}
          onClick={toggleFollow}
        >
          <Image
            src={isFollowed ? unfollow : follow}
            alt="Follow/Unfollow image"
            width={16}
            height={16}
          />
          <span>{isFollowed ? "Unfollow" : "Follow"}</span>
        </button>

        <button onClick={message} className={styles.btn}>
          <Image src={comments} alt="comments image" width={16} height={16} />
          <span>Chat</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
