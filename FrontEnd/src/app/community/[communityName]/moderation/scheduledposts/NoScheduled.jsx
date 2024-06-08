import React from "react";
import styles from "./NoScheduled.module.css";

/**
 * Component for displaying a message when there are no scheduled posts for a community.
 * @component
 * @param   {string} communityName - The name of the community for which there are no scheduled posts.
 * @returns {JSX.Element} The rendered NoScheduled component.
 *
 * @example
 * // Renders a message indicating no scheduled posts in the "announcements" community
 * <NoScheduled communityName="announcements" />
 */
function NoScheduled({ communityName = "announcements" }) {
  return (
    <div className={`${styles.box} ${styles.flex}`}>
      <div className={`${styles.text}`}>
        No scheduled posts in {communityName}
      </div>
      <svg
        className={styles.icon}
        style={{
          marginRight: "8px",
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 11 11"
      >
        <g>
          <path
            d="M5 3.75C5 3.47388 5.22363 3.25 5.5 3.25C5.77637 3.25 6 3.47388 6 3.75V5.53735L7.81689 6.58643C8.05615 6.72449 8.13818 7.03027 8 7.26941C7.86182 7.50861 7.55615 7.59052 7.31689 7.45245L5.25049 6.25934C5.07861 6.16028 4.98779 5.97504 5.00146 5.78992L5 5.75V3.75Z"
            fill="inherit"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 5.5C11 8.53754 8.5376 11 5.5 11C2.4624 11 0 8.53754 0 5.5C0 2.46246 2.4624 0 5.5 0C8.5376 0 11 2.46246 11 5.5ZM10 5.5C10 7.98529 7.98535 10 5.5 10C3.01465 10 1 7.98529 1 5.5C1 3.01471 3.01465 1 5.5 1C7.98535 1 10 3.01471 10 5.5Z"
            fill="inherit"
          ></path>
        </g>
      </svg>
      <a className={`${styles.schedulelink}`} href={`../submit`}>
        Schedule post
      </a>
    </div>
  );
}

export default NoScheduled;
