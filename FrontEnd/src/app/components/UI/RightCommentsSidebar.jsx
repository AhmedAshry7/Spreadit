import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import messageicon from "../../assets/envelope.svg";
import Changebutton from "./Changebutton";
import handler from "@/app/utils/apiHandler";
import styles from "./RightCommentsSidebar.module.css";
import { useRouter } from "next/navigation";

/**
 * Right Comments Sidebar component to display community information and moderators
 * @component
 * @param {string} name The name of the community
 * @param {string} description The description of the community
 * @param {number} members The number of community members
 * @param {Array<Object>} rules The array of community rules
 * @param {boolean} isJoined Indicates whether the user has joined the community or not
 * @param {Function} onJoin The function to be called when the join button is activated
 * @param {Array<Object>} moderators The array of community moderators
 * @returns {JSX.Element} The rendered rightCommentsSidebar component.
 *
 * @example
 * const name = "Community Name"
 * const description = "Description"
 * const members = 100
 * const rules = [{title: "Rule 1", description: "Description 1", mainReason: "Reason 1"}, {title: "Rule 2", description: "Description 2", , mainReason: "Reason 2"}]
 * const isJoined = false
 * const onJoin = () => {}
 * const moderators = [{userName: "User 1", profilePicture: "path/to/image"}]
 * <rightCommentsSidebar
 *   name={name}
 *   description={description}
 *   members={members}
 *   rules={rules}
 *   isJoined={isJoined}
 *   onJoin={onJoin}
 *   moderators={moderators}
 * />
 *
 * @example
 * const name = "Community"
 * const description = "Description"
 * const members = 200
 * const rules = [{title: "Rule 1", description: "Description 1", mainReason: "Reason 1"}, {title: "Rule 2", description: "Description 2", , mainReason: "Reason 2"}]
 * const isJoined = true
 * const onJoin = () => {}
 * const moderators = [{userName: "User 1", profilePicture: "path/to/image"}]
 * <rightCommentsSidebar
 *   name={name}
 *   description={description}
 *   members={members}
 *   rules={rules}
 *   isJoined={isJoined}
 *   onJoin={onJoin}
 *   moderators={moderators}
 * />
 */

const rightCommentsSidebar = ({
  name,
  description,
  members,
  rules,
  isJoined,
  onJoin,
  moderators,
}) => {
  const router = useRouter();
  return (
    <div className={styles.rightsidebar}>
      <div className={styles.sectioninfo}>
        {!isJoined && (
          <Changebutton
            type={name}
            description=""
            display="join"
            activate={onJoin}
          />
        )}
        {isJoined && (
          <Changebutton
            type={name}
            description=""
            display="joined"
            activate={onJoin}
          />
        )}
        <h1
          className={styles.title}
          onClick={() => {
            router.push(`/community/${name}`);
          }}
        >
          {name}
        </h1>
        <p className={styles.description}>{description}</p>
        <h1 className={styles.title}>{members}</h1>
        <p className={styles.description}>Members</p>
      </div>
      <div className={styles.sectioninfo}>
        <p className={styles.description}>RULES</p>
        <ol className={styles.orderedlist}>
          {rules.map((rule, index) => (
            <li className={styles.listitem} key={index}>
              {rule.title}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.sectioninfo}>
        <p className={styles.description}>MODERATORS</p>
        {moderators.map((moderator, index) => (
          <div
            className={styles.moderatorinfo}
            key={index}
            onClick={() => {
              router.push(`/profile/${moderator.username}`);
            }}
          >
            <img
              className={styles.profilePicture}
              alt="Profile Picture"
              src={moderator.avatar}
            />
            <span>{moderator.username}</span>
          </div>
        ))}
        <Link className={styles.link} href="/sendmessages">
          <div className={styles.messagebutton}>
            <Image
              src={messageicon}
              alt="message icon"
              className={styles.icons}
            />
            <p className={styles.buttontext}>Message the Mods</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default rightCommentsSidebar;
