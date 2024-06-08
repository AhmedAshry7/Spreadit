import React, { useState } from "react";
import styles from "./RulesModal.module.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EditRemovalReasonModal from "./EditRemovalReasonModal";

/**
 * Component representing a single removal reason item
 *
 * @component
 * @param {Object} props Component props
 * @param {string} props.title The title of the removal reason
 * @param {string} props.message The message of the removal reason
 * @param {number} props.key The unique key of the removal reason
 * @param {number} props.count The count of the removal reason
 * @param {string} props.communityName The name of the community
 * @param {string} props.id The ID of the removal reason
 * @returns {JSX.Element} JSX element representing a single removal reason item
 *
 * @example
 * <RemovalReasonItem
 *   title="Spam"
 *   message="Your post has been removed because it violates our community guidelines"
 *   key={1}
 *   count={1}
 *   communityName="Community"
 *   id={2}
 * />
 */

function RemovalReasonItem({ title, message, key, count, communityName, id }) {
  const [showEditRemovalReasonModal, setEditRemovalReasonModal] =
    useState(false);

  function ShowEditRemovalReasonModal() {
    setEditRemovalReasonModal(true);
  }

  const CloseEditRemovalReasonModal = () => {
    setEditRemovalReasonModal(false);
  };

  return (
    <div>
      {showEditRemovalReasonModal && (
        <EditRemovalReasonModal
          close={() => CloseEditRemovalReasonModal()}
          title={title}
          message={message}
          communityName={communityName}
          id={id}
        />
      )}
      <div className={`${styles.dropdownmenu} $`}>
        <li key={key} className="row">
          {" "}
          <button className="dropdown">
            <p className="dropdownmaintitle">{count}</p>
            <p className="dropdownmaintitle">{title}</p>
            <CreateOutlinedIcon
              className="editbutton"
              onClick={() => ShowEditRemovalReasonModal()}
            ></CreateOutlinedIcon>
          </button>
        </li>
      </div>
    </div>
  );
}

export default RemovalReasonItem;
