import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import plusicon from "../../assets/plus-circle.svg";
import dashicon from "../../assets/dash-circle.svg";
import chaticon from "../../assets/chat-dots.svg";
import cakeicon from "../../assets/cake.svg";
import styles from "./ProfileInfoModal.module.css";
import getCookies from "@/app/utils/getCookies";
import handler from "@/app/utils/apiHandler";
import { useRouter } from "next/navigation";

/**
 * ProfileInfoModal component for displaying user profile information and actions
 * @component
 * @param {string} userName The username of the profile
 * @param {boolean} isUser Indicates if the profile modal belongs to the current user
 * @param {string} profilePicture The URL of the profile picture
 * @param {string} cakeDate The date of the user joining spreadit
 * @returns {JSX.Element} The rendered ProfileInfoModal component.
 *
 * @example
 * const userName = "User 1"
 * const isUser = false
 * const profilePicture = "https://example.com/profile.jpg"
 * const cakeDate = "2022-04-12"
 * <ProfileInfoModal
 *   userName={userName}
 *   isUser={isUser}
 *   profilePicture={profilePicture}
 *   cakeDate={cakeDate}
 * />
 *
 * @example
 * const userName = "currentUser"
 * const isUser = true
 * const profilePicture = "https://example.com/profile.jpg"
 * const cakeDate = "2023-12-21"
 * <ProfileInfoModal
 *   userName={userName}
 *   isUser={isUser}
 *   profilePicture={profilePicture}
 *   cakeDate={cakeDate}
 * />
 */

function ProfileInfoModal({ userName, isUser, profilePicture, cakeDate }) {
  const router = useRouter();
  const [temporaryToken, setToken] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies && cookies.username && cookies.access_token) {
        setToken(cookies.access_token);
        if (cookies.username !== userName) {
          setLoading(true);
          const response = await handler(
            `/users/isfollowed/${userName}`,
            "GET",
            "",
            cookies.access_token,
          );
          setIsFollowed(response.isFollowed);
          setLoading(false);
        }
      } else {
        // router.push("/login")
      }
    }
    cookiesfn();
  }, []);

  const handleFollow = async () => {
    try {
      if (!isFollowed) {
        const response = await handler(
          `/users/follow`,
          "POST",
          { username: userName },
          temporaryToken,
        );
        
      } else {
        const response = await handler(
          `/users/unfollow`,
          "POST",
          { username: userName },
          temporaryToken,
        );
        
      }
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error("Error toggling follow :", error);
    }
  };

  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!loading && (
        <div>
          <div
            className={styles.nameAndPicture}
            onClick={() => {
              router.push(`/profile/${userName}`);
            }}
          >
            <img
              className={styles.profilePicture}
              src={profilePicture}
              width={256}
              height={256}
              alt="The profile picture "
              quality={100}
            />
            <div className={styles.userinfo}>
              <div className={styles.userName}>{userName}</div>
              <div className={styles.Description}>u/{userName}</div>
              <div className={styles.date}>
                <Image
                  src={cakeicon}
                  alt="cake icon"
                  className={styles.icons}
                />
                {cakeDate}
              </div>
            </div>
          </div>
          {!isUser && (
            <div className={styles.buttons}>
              {!isFollowed && (
                <div className={styles.followButton} onClick={handleFollow}>
                  <Image
                    src={plusicon}
                    alt="plus icon"
                    className={styles.icons}
                  />
                  <p className={styles.buttondescription}>Follow</p>
                </div>
              )}
              {isFollowed && (
                <div className={styles.followButton} onClick={handleFollow}>
                  <Image
                    src={dashicon}
                    alt="dash icon"
                    className={styles.icons}
                  />
                  <p className={styles.buttondescription}>Unfollow</p>
                </div>
              )}
              <div
                className={styles.followButton}
                onClick={() => {
                  router.push(`/chats/createusername/${userName}`);
                }}
              >
                <Image
                  src={chaticon}
                  alt="chat icon"
                  className={styles.icons}
                />
                <p className={styles.buttondescription}>Chat</p>
              </div>
            </div>
          )}
        </div>
      )}
      {loading && <p className={styles.loading}>loading</p>}
    </div>
  );
}

export default ProfileInfoModal;
