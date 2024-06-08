import React, { useState } from "react";
import styles from "./CommunityBoxItem.module.css";
import SubRedditInfoModal from "@/app/components/post/SubRedditInfoModal.jsx";

/**
 * Component that represents an item in a community box, typically used for displaying
 * a subreddit or a similar community entity. It displays basic community information
 * and shows additional details on hover.
 *
 * @component
 * @param {Object} props
 * @param {number} props.count  A number associated with the community, like a ranking or index
 * @param {string} props.name  The name of the community
 * @param {string} props.category  The category or type of the community
 * @param {string} props.members  Description or count of members in the community
 * @param {JSX.Element} props.icon  JSX element representing the icon of the community
 * @param {string} props.iconurl  URL for the community icon used in the modal
 * @param {string} props.description  A short description of the community
 * @param {string} props.key  A unique key used to optimize React lists
 * @returns {JSX.Element} The JSX code for community box item
 *
 * @example
 * // Usage example of CommunityBoxItem
 *
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 *
 * <CommunityBoxItem
 *   count={1}
 *   name="aww"
 *   category="Cute pets"
 *   members="20M"
 *   icon={<img src={awwpfp} alt="Subspreaditreddit Icon" />}
 *   iconurl={awwpfp}
 *   description="A community for posting cute and adorable pets"
 *   key={1}
 * />
 *
 */

function CommunityBoxItem({
  count,
  name,
  category,
  members,
  icon,
  iconurl,
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
    <li key={key} className={styles.box}>
      <p>{count}</p>
      <div className={styles.icon}>
        {icon}
        {showSubRedditInfo && (
          <div
            onMouseEnter={() => clearTimeout(timeOut)}
            onMouseLeave={() => setShowSubRedditInfo(false)}
          >
            {" "}
            <SubRedditInfoModal
              className="modal"
              subRedditName={name}
              subRedditPicture={iconurl}
              subRedditBanner={iconurl}
              subRedditDescription={description}
            />{" "}
          </div>
        )}
      </div>{" "}
      <div>
        <div
          className={styles.name}
          onMouseEnter={() => setShowSubRedditInfo(true)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {name}
        </div>
        <div className={styles.category}>{category}</div>
        <div className={styles.members}>{members}</div>
      </div>
    </li>
  );
}

export default CommunityBoxItem;
