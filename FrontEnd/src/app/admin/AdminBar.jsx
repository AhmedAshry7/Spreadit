"use client";
import React from "react";
import styles from "../community/[communityName]/moderation/(UserManagement)/ModBar.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Component for Displaying a Mod bar.
 *
 * @component
 * @param   {number} selected   The selected tab [Required]
 * @param   {function} setSelected The selected tab [Required]
 * @returns {JSX.Element} The component for the Admin bar.
 *
 * @example
 *
 * <Admin selected={0} setSelected={setSelected} /> // This will display the Admin Bar with the Posts tab selected
 */

function AdminBar({ selected, setSelected }) {
  return (
    <div className={styles.tabs}>
      <button
        data-testid="Banned"
        onClick={() => {
          setSelected(0);
        }}
        className={`${styles.link} ${selected === 0 ? styles.selected : ""}`}
      >
        <h1>Posts</h1>
      </button>

      <button
        data-testid="Muted"
        onClick={() => {
          setSelected(1);
        }}
        className={`${styles.link} ${selected === 1 ? styles.selected : ""}`}
      >
        <h1>Comments</h1>
      </button>
    </div>
  );
}

export default AdminBar;
