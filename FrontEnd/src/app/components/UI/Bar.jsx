import React from "react";
import styles from "./Bar.module.css";
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

function Bar({ selected }) {
  return (
    <div className={styles.tabs}>
      <Link className={styles.link} href="/settings/account">
        <h1 className={selected === 0 ? styles.selected : ""}>Account</h1>
      </Link>
      <Link className={styles.link} href="/settings/profile">
        <h1 className={selected === 1 ? styles.selected : ""}>Profile</h1>
      </Link>
      <Link className={styles.link} href="/settings/privacy">
        <h1 className={selected === 2 ? styles.selected : ""}>
          Safety & Privacy
        </h1>
      </Link>
      <Link className={styles.link} href="/settings/feed">
        <h1 className={selected === 3 ? styles.selected : ""}>Feed settings</h1>
      </Link>
      <Link className={styles.link} href="/settings/notifications">
        <h1 className={selected === 4 ? styles.selected : ""}>Notifications</h1>
      </Link>
      <Link className={styles.link} href="/settings/emails">
        <h1 className={selected === 5 ? styles.selected : ""}>Emails</h1>
      </Link>
      <Link className={styles.link} href="/settings/premium">
        <h1 className={selected === 6 ? styles.selected : ""}>Subscriptions</h1>
      </Link>
      <Link className={styles.link} href="/settings/messaging">
        <h1 className={selected === 7 ? styles.selected : ""}>
          Chat & Messaging
        </h1>
      </Link>
    </div>
  );
}

export default Bar;
