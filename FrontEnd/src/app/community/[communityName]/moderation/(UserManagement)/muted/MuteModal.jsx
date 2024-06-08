import React, { useState } from "react";
import styles from "../banned/BanModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import apiHandler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { redirect } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/**
 * Modal to add a user to the muted list
 * @component
 * @param {function} setShowModal The function to set the modal visibility
 * @returns {JSX.Element} The rendered MuteModal component.
 *
 * @example
 * <MuteModal setShowModal={setShowModal}/>
 */

function MuteModal({ setShowModal }) {
  const [formData, setFormData] = useState({ username: "", muteReason: "" });

  function handleClose() {
    setShowModal(false);
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Mute User</h1>
          <div className={styles.closebutton} onClick={handleClose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <p className={styles.label}>Enter Username</p>
        <TextField
          name="username"
          id="outlined-basic"
          label="Username"
          onChange={handleChange}
          value={formData.username}
          variant="outlined"
          className={styles.full_width}
        />

        <div className={styles.ban_note}>
          Note about why they were muted{" "}
          <span style={{ color: "#0079D3", margin: "0 2px" }}>•</span>
        </div>
        <textarea
          className={styles.textarea}
          name="muteReason"
          onChange={handleChange}
          value={formData.muteReason}
          maxLength={5000}
          placeholder="Reason they were muted"
        ></textarea>
        <div className={styles.characters_left}>
          {300 - formData.muteReason.length} characters remaining
        </div>

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={handleClose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            disabled={false}
            onClick={() => {
              
            }}
          >
            Mute User
          </button>
        </div>
      </div>
    </div>
  );
}

export default MuteModal;
