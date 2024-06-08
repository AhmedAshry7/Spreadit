import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./MyProfileInfo.module.css";
import PillButton from "../components/UI/PillButton";
import ProfileSettingItem from "./ProfileSettingItem";
import getCookies from "../utils/getCookies";
import apiHandler from "../utils/apiHandler";
import Link from "next/link";
import linkIcon from "@/app/assets/link.svg";

import shareIcon from "@/app/assets/post-images/mod-icons/share.svg";
import shieldIcon from "@/app/assets/post-images/shield.svg";
import styleIcon from "@/app/assets/post-images/mod-icons/style.svg";
import plusIcon from "@/app/assets/post-images/mod-icons/plus.svg";
import profilepicture from "@/app/assets/PP1.png";
import addPhotoIcon from "@/app/assets/add-photo.svg";
import { set } from "date-fns";
import Community from "../community/Community";

/**
 * Component for Displaying a profile the user.
 * @component
 * @param   {string} username   The username of the profile being viewed [Required]
 * @returns {JSX.Element} The component for the profile info.
 *
 * @example
 *
 * <MyProfileInfo username="Mahmoud"/>
 *
 */

function MyProfileInfo({ username }) {
  const router = useRouter();
  const baseURL = "http://localhost:3000";
  const [token, setToken] = useState(null);
  const [background, setBackground] = useState(profilepicture);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modCommunities, setModCommunities] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
        setBackground(cookies.background);
        const userInfo = await apiHandler(
          `/user/profile-info/${username}`,
          "GET",
          "",
          cookies.access_token,
        );
        const modCommunities = await apiHandler(
          `/community/moderation/user/${username}`,
          "GET",
          "",
          cookies.access_token,
        );
        
        
        setUserInfo(userInfo);
        setSocialLinks(userInfo.socialLinks);
        setModCommunities(modCommunities);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function shareProfile() {
    navigator.clipboard
      .writeText(`${baseURL}/profile/${username}`)
      .then(() => {
        alert("Profile Link Copied!");
      })
      .catch(() => {
        alert("Failed to copy link");
      });
  }

  function toProfile() {
    router.push("/settings/profile");
  }

  return !loading ? (
    <div className={styles.info}>
      <div className={styles.banner}>
        <Image
          src={background}
          layout="fill"
          objectFit="cover"
          alt="Banner Image"
        />

        <div className={styles.circle} onClick={toProfile}>
          <Image src={addPhotoIcon} width={16} height={16} alt="Post Options" />
        </div>
      </div>

      <div className={styles.main_body}>
        <div className="username">
          <h2 className={styles.username}>{username}</h2>
        </div>

        <PillButton text="Share" image={shareIcon} onClick={shareProfile} />

        <hr className={styles.divider} />

        <h2 className={styles.section_header}>Settings</h2>
        <ul className={styles.settings_list} role="list">
          <ProfileSettingItem
            title="Profile"
            description={"Customize your profile"}
            isSvg={false}
            image={userInfo.avatar}
            buttonText={"Edit Profile"}
            onClick={toProfile}
          />
          <ProfileSettingItem
            title="Avatar"
            description={"Customize and Style"}
            isSvg={true}
            image={styleIcon}
            buttonText={"Style Avatar"}
            onClick={toProfile}
          />
        </ul>
        <hr className={styles.divider} />

        <h2 className={styles.section_header}>Links</h2>
        <div className={styles.social_links}>
          {socialLinks.map((link) => {
            return (
              <Link
                data-testid="button-test"
                className={styles.btn}
                href={link.url}
              >
                <Image src={linkIcon} alt="link image" width={12} height={12} />
                <span>{link.platform}</span>
              </Link>
            );
          })}
          <PillButton
            text="Add Social Link"
            image={plusIcon}
            onClick={toProfile}
          />
        </div>
        <hr className={styles.divider} />

        <h2 className={styles.section_header}>
          YOU'RE A MODERATOR OF THESE COMMUNITIES
        </h2>
        <ul className={styles.settings_list} role="list">
          {modCommunities.map((community) => {
            return (
              <ProfileSettingItem
                title={community.name}
                description={`${community.membersCount} Members`}
                isSvg={false}
                image={community.image}
                buttonText={"Joined"}
                onClick={() => router.push(`/community/${community.name}`)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  ) : null;
}

export default MyProfileInfo;
