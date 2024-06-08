import React, { useState } from "react";
import styles from "./CommentsItem.module.css";
import Image from "next/image";
import ProfileInfoModal from "@/app/components/post/ProfileInfoModal.jsx";
import SubRedditInfoModal from "@/app/components/post/SubRedditInfoModal.jsx";

/**
 * Component for displaying a single comment item.
 * @component
 * @param {Object} props Component props
 * @param {string} props.nameone Name of the community associated with the comment
 * @param {string} props.communitybanner URL of the banner image of the community
 * @param {string} props.description Description of the community associated with the comment
 * @param {string} props.nametwo Name of the user who made the comment
 * @param {string} props.commentoncomment Content of the comment on another comment
 * @param {string} props.comment Content of the comment
 * @param {string} props.urlone URL of the profile picture of the community
 * @param {string} props.urltwo URL of the profile picture of the user who made the comment
 * @param {number} props.commentvotes Number of votes the comment has received
 * @param {number} props.commentoncommentvotes Number of votes the comment on another comment has received
 * @param {number} props.coccomment Number of comments the comment on another comment has received
 * @param {string} props.key Unique key to identify the comment item
 * @returns {JSX.Element} JSX element for the comment item
 *
 * @example
 *
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 *
 * <CommentsItem
 *   nameone="Community"
 *   communitybanner={awwpfp}
 *   description="Description of the Community"
 *   nametwo="johnwilliam"
 *   commentoncomment="You should join my community!"
 *   comment="What community should i join?"
 *   urlone= {awwpfp}
 *   urltwo= {awwpfp}
 *   commentvotes={10}
 *   commentoncommentvotes={5}
 *   coccomment={3}
 *   key= {1}
 * />
 */

function CommentsItem({
  nameone,
  communitybanner,
  description,
  nametwo,
  commentoncomment,
  comment,
  urlone,
  urltwo,
  commentvotes,
  commentoncommentvotes,
  coccomment,
  key,
}) {
  let timeOut;
  const [showSubRedditInfo, setShowSubRedditInfo] = useState(false);
  const [showSubRedditInfoperson, setShowSubRedditInfoperson] = useState(false);
  async function handleMouseLeaveperson() {
    timeOut = setTimeout(() => {
      setShowSubRedditInfoperson(false);
    }, 200);
  }
  async function handleMouseLeave() {
    timeOut = setTimeout(() => {
      setShowSubRedditInfo(false);
    }, 200);
  }

  return (
    <div>
      <li key={key} className={`${styles.dropdown} $`}>
        {showSubRedditInfoperson && (
          <div
            className={styles.subredditinfo}
            onMouseEnter={() => clearTimeout(timeOut)}
            onMouseLeave={() => setShowSubRedditInfoperson(false)}
          >
            {" "}
            <ProfileInfoModal
              userName={nametwo}
              isUser={true}
              profilePicture={urltwo}
              cakeDate={""}
            />{" "}
          </div>
        )}
        {showSubRedditInfo && (
          <div
            className={styles.subredditinfo}
            onMouseEnter={() => clearTimeout(timeOut)}
            onMouseLeave={() => setShowSubRedditInfo(false)}
          >
            {" "}
            <SubRedditInfoModal
              className="modal"
              subRedditName={nameone}
              subRedditPicture={urlone}
              subRedditBanner={communitybanner}
              subRedditDescription={description}
            />{" "}
          </div>
        )}{" "}
        {nameone ? (
          <div className={styles.dropdownrow}>
            <div className={styles.iconcontainer}>
              <Image
                className={`${styles.icon} $`}
                src={urlone}
                alt="profile icon"
                width={25}
                height={25}
                layout="fixed"
              />
              <p
                className={styles.name}
                onMouseEnter={() => setShowSubRedditInfo(true)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {"r/" + nameone}
              </p>
            </div>

            <p className={styles.commentoncomment}>{commentoncomment}</p>

            <div className={styles.comment}>
              <div className={styles.iconcontainer}>
                <Image
                  className={`${styles.icon} $`}
                  src={urltwo}
                  alt="profile icon"
                  width={25}
                  height={25}
                  layout="fixed"
                />
                <p
                  className={styles.name}
                  onMouseEnter={() => setShowSubRedditInfoperson(true)}
                  onMouseLeaveperson={() => handleMouseLeaveperson()}
                >
                  {nametwo}
                </p>
              </div>
              <p className={styles.commentcontent}>{comment}</p>
              <p className={styles.commentvotes}>{commentvotes + " votes"}</p>
            </div>
            <p className={styles.commentandvotes}>
              {commentoncommentvotes +
                " votes" +
                " . " +
                coccomment +
                " comments"}
            </p>
          </div>
        ) : (
          <div className={styles.dropdownrow}>
            <div className={styles.iconcontainer}>
              <Image
                className={`${styles.icon} $`}
                src={urltwo}
                alt="profile icon"
                width={25}
                height={25}
                layout="fixed"
              />
              <p
                className={styles.name}
                onMouseEnter={() => setShowSubRedditInfo(true)}
                onMouseLeave={() => handleMouseLeave()}
              >
                {"u/" + nametwo}
              </p>
            </div>
            <p className={styles.commentoncomment}>{commentoncomment}</p>
            <p className={styles.commentandvotes}>
              {commentoncommentvotes +
                " votes" +
                " . " +
                coccomment +
                " comments"}
            </p>
          </div>
        )}
      </li>
    </div>
  );
}

export default CommentsItem;
