import React, { useState } from "react";
import styles from "./AdminModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import apiHandler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { redirect } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/**
 * Modal to add a user to the approved list
 * @component
 * @param {function} setShowModal The function to set the modal visibility
 * @returns {JSX.Element} The rendered Approved component.
 *
 * @example
 * <Approved setShowModal={setShowModal}/>
 */

function ApproveModal({
  setShowModal,
  username,
  type,
  id,
  index,
  reports,
  token,
  handleRemove,
}) {
  const [reason, setReason] = useState("");
  const [writtenReason, setWrittenReason] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function handleClose() {
    setShowModal(false);
  }

  function handleSelect(index, reason) {
    index === selectedIndex ? setSelectedIndex(-1) : setSelectedIndex(index);
    setReason(reason);
    setWrittenReason("");
  }

  function handleChange(event) {
    setWrittenReason(event.target.value);
    setSelectedIndex(-1);
  }

  

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Reports {`(${reports.length})`}</h1>
          <div className={styles.closebutton} onClick={handleClose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <div className={styles.report_box}>
          {reports.map((report, index) => {
            return (
              <div
                onClick={() => {
                  handleSelect(index, report.reason);
                }}
                key={index}
                className={
                  selectedIndex === -1 || selectedIndex !== index
                    ? styles.report
                    : styles.selected_report
                }
              >
                <h2 className={styles.report_title}>{report.username}</h2>
                <p className={styles.report_reason}>{report.reason}</p>
                {report.subreason ? (
                  <p className={styles.report_subreason}>{report.subreason}</p>
                ) : null}
              </div>
            );
          })}
        </div>

        <TextField
          name="reason"
          id="outlined-basic"
          label="Write your own reason"
          onChange={handleChange}
          value={writtenReason}
          variant="outlined"
          className={styles.full_width}
        />

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={handleClose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            onClick={() => {
              handleRemove(id, type, index);
            }}
          >
            Remove {` ${type}`}
          </button>

          <button
            className={styles.buttons}
            onClick={async () => {
              const response = await apiHandler(
                `/dashboard/ban`,
                "POST",
                {
                  username: username,
                  reason: writtenReason === "" ? reason : writtenReason,
                  isPermanent: true,
                },
                token,
              );
              
            }}
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApproveModal;
