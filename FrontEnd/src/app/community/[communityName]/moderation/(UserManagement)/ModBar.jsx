"use client";
import React from "react";
import styles from "./ModBar.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Component for Displaying a Mod bar.
 *
 * @component
 * @param   {number} selected   The selected tab [Required]
 * @param   {string} communityName   The username of the profile being viewed [Required]
 * @returns {JSX.Element} The component for the Mod bar.
 *
 * @example
 *
 * <ModBar selected={0} isMe={true} setSelected={setSelected} username="Ahmed"/> // This will display the Mod bar with the Banned tab selected
 */

function ModBar({ selected, communityName }) {
  const router = useRouter();
  return (
    <div className={styles.tabs}>
      <Link
        data-testid="Banned"
        href={`/community/${communityName}/moderation/banned`}
        className={`${styles.link} ${selected === 0 ? styles.selected : ""}`}
      >
        <h1>Banned</h1>
      </Link>

      <Link
        data-testid="Approved"
        href={`/community/${communityName}/moderation/approved`}
        className={`${styles.link} ${selected === 2 ? styles.selected : ""}`}
      >
        <h1>Approved</h1>
      </Link>

      <Link
        data-testid="Moderators"
        href={`/community/${communityName}/moderation/moderators`}
        className={`${styles.link} ${selected === 3 ? styles.selected : ""}`}
      >
        <h1>Moderators</h1>
      </Link>
    </div>
  );
}

export default ModBar;
