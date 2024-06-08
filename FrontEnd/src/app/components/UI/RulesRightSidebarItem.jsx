import React, { useState } from "react";
import styles from "./CommunityRightSidebar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

/**
 * A component for displaying a collapsible item in a sidebar that shows a rule or guideline
 * for a community. This item shows a brief title and a number, and allows expanding to show
 * a more detailed description.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title The title of the rule
 * @param {string} props.description The detailed description of the rule
 * @param {number} props.key Unique key for React list rendering optimization
 * @param {number} props.count A number or index associated with the rule
 * @returns {JSX.Element} The JSX code for a collapsible sidebar item
 *
 * @example
 *
 * <RulesRightSidebarItem
 *   key={1}
 *   count={1}
 *   title="No Personal Attacks"
 *   description="Personal attacks, insults, and bad faith criticism of other users are not tolerated."
 * />
 */

function RulesRightSidebarItem({ title, description, key, count }) {
  const [showDescp, setShowDescp] = useState(false);

  function toggleDropdown() {
    setShowDescp((prevShowDescp) => !prevShowDescp);
  }

  return (
    <div className={`${styles.dropdownmenu} $`}>
      <li
        key={key}
        onClick={() => toggleDropdown()}
        className={`${styles.row} $`}
      >
        {" "}
        {showDescp ? (
          <>
            <div className={styles.dropdown}>
              <p className={styles.dropdowntitle}>{count}</p>

              <p className={styles.dropdowntitle}>{title}</p>
              <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
            </div>
            <p className={styles.dropdowndesc}>{description}</p>
          </>
        ) : (
          <div className={styles.dropdown}>
            <p className={styles.dropdowntitle}>{count}</p>

            <p className={styles.dropdowntitle}>{title}</p>
            <KeyboardArrowDownIcon className={styles.arrowbutton} />
          </div>
        )}
      </li>
    </div>
  );
}

export default RulesRightSidebarItem;
