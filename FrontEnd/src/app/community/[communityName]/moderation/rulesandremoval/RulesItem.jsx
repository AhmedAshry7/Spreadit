import React, { useState } from "react";
import styles from "./RulesItem.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EditRuleModal from "./EditRuleModal";

/**
 * Component for displaying a single rule item
 * @component
 * @param {Object} props Component props
 * @param {string} props.title The title of the rule
 * @param {string} props.description The description of the rule
 * @param {string} props.appliesto The scope to which the rule applies
 * @param {string} props.report The reason for reporting the rule
 * @param {number} props.key The unique key for the rule item
 * @param {number} props.count The count of the rule item
 * @param {string} props.communityName The name of the community associated with the rule
 * @returns {JSX.Element} JSX element for the rule item
 *
 * @example
 * <RulesItem
 *   title="No spamming"
 *   description="Spamming is not allowed in this community"
 *   appliesto="Posts & comments"
 *   report="This rule is broken when users post repetitive content"
 *   key={1}
 *   count={1}
 *   communityName="Community"
 * />
 */

function RulesItem({
  title,
  description,
  appliesto,
  report,
  key,
  count,
  communityName,
}) {
  const [showEditRuleModal, setEditRuleModal] = useState(false);
  const [showDescp, setShowDescp] = useState(false);

  function toggleDropdown() {
    setShowDescp((prevShowDescp) => !prevShowDescp);
  }

  function ShowEditRuleModal() {
    setEditRuleModal(true);
  }

  const CloseEditRuleModal = () => {
    setEditRuleModal(false);
  };

  return (
    <div>
      {showEditRuleModal && (
        <EditRuleModal
          close={() => CloseEditRuleModal()}
          rule={title}
          postsandcomments={appliesto == "Posts & comments" ? true : false}
          postsonly={appliesto == "Posts only" ? true : false}
          commentsonly={appliesto == "Comments only" ? true : false}
          reportreason={report}
          description={description}
          communityName={communityName}
        />
      )}
      <div className={`${styles.dropdownmenu} $`}>
        <li key={key} className={`${styles.row} $`}>
          {" "}
          {showDescp ? (
            <>
              <button className={styles.dropdown}>
                <p className={styles.dropdownmaintitle}>{count}</p>

                <p className={styles.dropdownmaintitle}>{title}</p>
                <CreateOutlinedIcon
                  className={styles.editbutton}
                  onClick={() => ShowEditRuleModal()}
                ></CreateOutlinedIcon>
                <KeyboardArrowUpOutlinedIcon
                  className={styles.arrowbutton}
                  onClick={() => toggleDropdown()}
                />
              </button>
              <button className={styles.dropdowndesc}>
                <br></br>

                <div className={styles.dropdowntitle}> report reason</div>
                <div className={styles.dropdowncontent}> {report}</div>
                <br></br>
                <div className={styles.dropdowntitle}> applies to</div>
                <div className={styles.dropdowncontent}> {appliesto}</div>
                <br></br>
                <div className={styles.dropdowntitle}> full description</div>
                <div className={styles.dropdowncontent}> {description}</div>
                <br></br>
              </button>
            </>
          ) : (
            <button className={styles.dropdown}>
              <p className={styles.dropdownmaintitle}>{count}</p>

              <p className={styles.dropdownmaintitle}>{title}</p>
              <CreateOutlinedIcon
                className={styles.editbutton}
                onClick={() => ShowEditRuleModal()}
              ></CreateOutlinedIcon>
              <KeyboardArrowDownIcon
                className={styles.arrowbutton}
                onClick={() => toggleDropdown()}
              />
            </button>
          )}
        </li>
      </div>
    </div>
  );
}

export default RulesItem;
