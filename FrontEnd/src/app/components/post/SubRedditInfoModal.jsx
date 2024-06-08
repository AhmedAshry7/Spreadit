import Link from "next/link";
import Image from "next/image";
import styles from "./SubRedditInfoModal.module.css";
import Button from "./Button";
import { TailSpin } from "react-loader-spinner";

/**
 * Component for displaying subreddit information in a modal.
 * @component
 * @param {string} subRedditBanner - The URL of the subreddit banner image (optional).
 * @param {string} subRedditPicture - The URL of the subreddit profile picture.
 * @param {string} subRedditName - The name of the subreddit.
 * @param {string} subRedditDescription - The description of the subreddit.
 * @param {boolean} isMember - Indicates whether the user is a member of the subreddit (if true the join button won't appear).
 * @param {boolean} joined - Indicates whether the user has joined the subreddit (optional if isMember is true).
 * @param {Function} onJoin - The function to be called when the user joins or leaves the subreddit (optional if isMember is true).
 * @returns {JSX.Element} The rendered SubRedditInfoModal component.
 *
 * @example
 * // Renders a modal with subreddit information. here joined and unjoined not used as isMember is true
 * <SubRedditInfoModal subRedditBanner={/banner.jpg} subRedditPicture={/picture.jpg} subRedditName={example} subRedditDescription={Example subreddit description} isMember={true} />
 * @example
 * Render a modal with subReddit information but join and on join are needed and functional as isMember is false
 * <SubRedditInfoModal subRedditBanner={/banner.jpg} subRedditPicture={/picture.jpg} subRedditName={example} subRedditDescription={Example subreddit description} isMember={false} joined={false} onJoin={() => {console.log("join")}} />
 */

function SubRedditInfoModal({
  subRedditBanner,
  subRedditPicture,
  subRedditName,
  subRedditDescription,
  isMember,
  joined,
  onJoin,
}) {
  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {subRedditDescription.length === 0 && (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#FF4500"
          ariaLabel="tail-spin-loading"
          radius="0.5"
          wrapperStyle={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          wrapperClass=""
        />
      )}
      {subRedditDescription.length !== 0 && (
        <div>
          {subRedditBanner && (
            <div className={styles.banner}>
              <Image
                src={subRedditBanner}
                fill
                style={{ objectFit: "cover", maxWidth: "100%" }}
                alt="The subReddit banner "
                quality={100}
              />
            </div>
          )}
          <div className={styles.subRedditNameAndPicture}>
            <Image
              className={styles.subRedditPicture}
              src={subRedditPicture}
              width={256}
              height={256}
              alt="The subReddit picture "
              quality={100}
            />
            <Link
              className={styles.subRedditName}
              href={{ pathname: `/community/${subRedditName}` }}
            >{`r/${subRedditName}`}</Link>
            {!isMember && (
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
          </div>
          <div className={styles.subRedditDescription}>
            {subRedditDescription}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubRedditInfoModal;
