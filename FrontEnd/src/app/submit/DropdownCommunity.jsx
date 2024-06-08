import React, { useState, useRef, useEffect } from "react";
import styles from "./DropdownCommunity.module.css";

/**
 * Component for rendering a dropdown menu item representing a community (subreddit) in Reddit.
 * @component
 * @param   {string}  communityName     The name of the community.
 * @param   {string}  communityIcon     The URL of the community icon.
 * @param   {number}  communityMembers  The number of members in the community.
 * @returns {JSX.Element} The rendered DropdownCommunity component.
 *
 * @example
 * // Renders the DropdownCommunity component with communityName, communityIcon, and communityMembers.
 * <DropdownCommunity communityName="announcements" communityIcon="https://..." communityMembers={1000} />;
 */

function DropdownCommunity({
  communityName = "announcements",
  communityIcon = "https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png",
  communityMembers = 0,
  setCommunity,
}) {
  return (
    <div
      className={`${styles.menuCommunityContainer}`}
      onClick={() => setCommunity(communityName)}
      // Adding tabIndex={0} to make the div focusable
      tabIndex={0}
      role="link"
    >
      <div className={`${styles.menuCommunity}`}>
        <img
          alt="Subreddit Icon"
          role="presentation"
          style={{ backgroundColor: "rgb(252, 71, 30)" }}
          className={`${styles.menuCommunityIcon}`}
          src={communityIcon}
        />
        <div className={`${styles.menuCommunityDetailsFlex}`}>
          <span className={`${styles.menuCommunityDetailsTitle}`}>
            r/{communityName}
          </span>
          <span className={`${styles.menuCommunityDetailsMembers}`}>
            {communityMembers} {communityMembers === 1 ? "member" : "members"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DropdownCommunity;
