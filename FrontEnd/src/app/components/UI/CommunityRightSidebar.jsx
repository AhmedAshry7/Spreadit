import React, { useState } from "react";
import styles from "./CommunityRightSidebar.module.css";
import RulesRightSidebarItem from "./RulesRightSidebarItem";
import ModeratorsItem from "./ModeratorsItem";
import ProfileIcon from "./ProfileIcon.jsx";

/**
 * Component that displays the right sidebar for a community page.
 * The sidebar includes multiple sections such as community description, community statistics,
 * links to rules, community-related links, and moderator links.
 *
 * @component
 * @param {Object} props - The props of the component.
 * @param {Object} props.communityData - Data related to the community.
 * @param {string} props.communityData.category - The category of the community.
 * @param {string} props.communityData.description - The description of the community.
 * @param {number} props.communityData.membersCount - The number of members in the community.
 * @param {Array<Object>} props.communityData.rules - The rules of the community.
 * @returns {JSX.Element} The sidebar component with structured sections including community info, rules, and links.
 *
 * @example
 * // Example usage of CommunityRightSidebar
 * const communityData = {
 *   category: 'cute animals and pets',
 *   description: 'share your pet',
 *   membersCount: 100,
 *   rules: [
 *     { title: 'dont hate', description: 'dont hate on others' },
 *     { title: 'be nice', description: 'be nice to others' }
 *   ]
 * };
 * <CommunityRightSidebar communityData={communityData} />
 */

function CommunityRightSidebar({ communityData, moderators }) {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.communitytype}>{communityData.category}</h1>
      <p className={styles.description}>{communityData.description}</p>

      <div className={styles.communityinfo}>
        <div className={styles.communityinfo1}>
          <h1 className={styles.nums}>{communityData.membersCount}</h1>
          <p className={styles.numstitle}>Members</p>
        </div>
      </div>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>COMMUNITY BOOKMARKS</h1>
      <button className={styles.bookmarksbuttons}>Rules</button>
      <button className={styles.bookmarksbuttons}> Related Subspreadits</button>
      <button className={styles.bookmarksbuttons}>Discord</button>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>RULES</h1>
      <br></br>
      <div>
        <ul className={styles.sidebarlist}>
          {communityData.rules.map((val, key) => {
            return (
              <RulesRightSidebarItem
                title={val.title}
                description={val.description}
                key={key}
                count={key + 1}
              />
            );
          })}
        </ul>
      </div>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>SUBSPREADIT LINKS</h1>
      <br></br>
      <button className={styles.bookmarksbuttons}>Full list of rules</button>
      <button className={styles.bookmarksbuttons}>
        {" "}
        Our related subspreadits
      </button>
      <button className={styles.bookmarksbuttons}>Subspreadits Discord</button>
      <button className={styles.bookmarksbuttons}>
        Subspreadits of the week
      </button>
      <button className={styles.bookmarksbuttons}>Contact Moderators</button>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>MODERATORS</h1>
      <br></br>

      <ul className={styles.sidebarlist}>
        {moderators.map((val, key) => (
          <li key={key}>
            <ModeratorsItem
              title={val.username}
              icon={<ProfileIcon url={val.avatar} />}
            />
          </li>
        ))}
      </ul>

      <button className={styles.bookmarksbuttons}>Message the mods</button>
      <button className={styles.bookmarksbuttons}>View all moderators</button>

      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default CommunityRightSidebar;
