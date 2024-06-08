import React, { useState } from "react";
import styles from "./PostItem.module.css";
import Image from "next/image";
import SubRedditInfoModal from "@/app/components/post/SubRedditInfoModal.jsx";

/**
 * Component for displaying a single post item
 * @component
 * @param {Object} props Component props
 * @param {string} props.name Name of the community associated with the post
 * @param {string} props.title Title of the post
 * @param {string} props.url URL of the profile picture of the community
 * @param {string} props.banner URL of the banner image of the community
 * @param {number} props.votes Number of votes the post has received
 * @param {number} props.comments Number of comments the post has received
 * @param {string} props.description Description of the community associated with the post
 * @param {string} props.key Unique key to identify the post item
 * @returns {JSX.Element} JSX element for the post item
 *
 * @example
 * // Renders a post item with given data
 *
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 *
 * <PostsItem
 *   name="aww"
 *   title="This is a cute cat!"
 *   url= {awwpfp}
 *   banner={awwpfp}
 *   votes={10}
 *   comments={5}
 *   description="Post your pets"
 *   key= {1}
 * />
 */

function PostsItem({
  name,
  title,
  url,
  banner,
  votes,
  comments,
  description,
  key,
}) {
  let timeOut;
  const [showSubRedditInfo, setShowSubRedditInfo] = useState(false);
  async function handleMouseLeave() {
    timeOut = setTimeout(() => {
      setShowSubRedditInfo(false);
    }, 200);
  }

  return (
    <div>
      <li key={key} className={`${styles.dropdown} $`}>
        {showSubRedditInfo && (
          <div
            className={styles.subredditinfo}
            onMouseEnter={() => clearTimeout(timeOut)}
            onMouseLeave={() => setShowSubRedditInfo(false)}
          >
            {" "}
            <SubRedditInfoModal
              className="modal"
              subRedditName={name}
              subRedditPicture={url}
              subRedditBanner={banner}
              subRedditDescription={description}
            />{" "}
          </div>
        )}{" "}
        <div className={styles.dropdownrow}>
          <div className={styles.leftcontainer}>
            <div className={styles.account}>
              <Image
                className={`${styles.icon} $`}
                src={url}
                alt="Profile icon"
                width={23}
                height={23}
                layout="fixed"
              />
              <p
                className={styles.community}
                onMouseEnter={() => setShowSubRedditInfo(true)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {"r/" + name}
              </p>
            </div>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>
              {votes + " votes " + "  .  " + comments + " comments"}
            </p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default PostsItem;
