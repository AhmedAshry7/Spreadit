import React, { useState, useEffect } from "react";
import styles from "./ModeratorsItem.module.css";
import { useRouter } from "next/navigation";

/**
 * Component representing an item in the list of moderators
 * @component
 * @param {Object} props Component props
 * @param {string} props.title The username of the moderator
 * @param {JSX.Element} props.icon The icon representing the moderator
 * @param {string} props.key The unique key for the item
 * @returns {JSX.Element} JSX element representing the moderator item
 *
 * @example
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 * <ModeratorsItem
 *   title="moderator1"
 *   icon={<Image src= {awwpfp} alt="Moderator avatar" width={35} height={35}/>}
 *   key="1"
 * />
 */

function ModeratorsItem({ title, icon, key }) {
  const router = useRouter();
  const handleItemClick = () => {
    router.push(`/profile/${title}`);
  };

  return (
    <div className={styles.click} onClick={handleItemClick}>
      <li key={key} className={styles.row}>
        <div id={styles.icon}>{icon}</div>{" "}
        <div id={styles.title}>{"u/" + title}</div>
      </li>
    </div>
  );
}

export default ModeratorsItem;
