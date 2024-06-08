import React from "react";
import styles from "./InboxBar.module.css";
import Link from "next/link";

/**
 * Component for displaying the tab bar.
 * @component
 * @param   {int} selected   Index of currently selected tab
 * @returns {JSX.Element} The rendered bar component.
 *
 * @example
 * //renders a bar with the tab with index number 5 selected
 * const index = 5
 * <Bar selected={index} />
 */

function InboxBar({ selected }) {
  return (
    <div className={styles.tabs}>
      <Link className={styles.link} href="/message/inbox">
        <h1 className={selected === 0 ? styles.selected : ""}>All</h1>
      </Link>
      <Link className={styles.link} href="/message/unread">
        <h1 className={selected === 1 ? styles.selected : ""}>Unread</h1>
      </Link>
      <Link className={styles.link} href="/message/messages">
        <h1 className={selected === 2 ? styles.selected : ""}>Messages</h1>
      </Link>
      <Link className={styles.link} href="/message/postreplies">
        <h1 className={selected === 3 ? styles.selected : ""}>Post Replies</h1>
      </Link>
      <Link className={styles.link} href="/message/mentions">
        <h1 className={selected === 4 ? styles.selected : ""}>
          Username Mentions
        </h1>
      </Link>
    </div>
  );
}

export default InboxBar;
