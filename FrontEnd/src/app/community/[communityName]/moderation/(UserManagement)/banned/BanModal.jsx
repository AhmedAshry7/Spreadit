import React, { useState, useEffect } from "react";
import styles from "./BanModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import apiHandler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { redirect } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toast from "react-hot-toast";

/**
 * Modal to add a user to the Banned list
 * @component
 * @param {function} setShowModal The function to set the modal visibility
 * @param {string} username The username of the banned user
 * @param {string} banReason The reason for the ban
 * @param {string} modNote The moderator note
 * @param {string} duration The duration of the ban
 * @returns {JSX.Element} The rendered BanModal component.
 *
 * @example
 * <BanModal setShowModal={setShowModal} username={username} banReason={banReason} modNote={modNote} duration={duration}/>
 */

function BanModal({
  username = "",
  banReason = "",
  modNote = "",
  duration = 0,
  isEdit = false,
  setShowModal,
  setReload,
  communityName,
}) {
  const [reason, setReason] = useState(banReason);
  const [formData, setFormData] = useState({
    username: username,
    banReason: banReason,
    modNote: modNote,
    duration: duration,
    isPermanent: false,
  });
  const [banMessage, setBanMessage] = useState("");
  const [token, setToken] = useState(null);

  function handleClose() {
    setShowModal(false);
  }

  const handleChange = (event) => {
    if (event.target.name === "permanent") {
      setFormData({
        ...formData,
        duration: event.target.checked ? "Permanent" : 0,
        isPermanent: event.target.checked,
      });
    } else if (event.target.name === "banMessage") {
      event.target.value.length <= 5000
        ? setBanMessage(event.target.value)
        : null;
    } else if (event.target.name === "modNote") {
      event.target.value.length <= 300
        ? setFormData({ ...formData, [event.target.name]: event.target.value })
        : null;
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  async function handleBan() {
    const currentDate = new Date();
    const banDate = new Date(
      currentDate.getTime() + parseInt(formData.duration) * 24 * 60 * 60 * 1000,
    );

    const requestBody = {
      banDuration: formData.isPermanent ? "9999" : banDate,
      reason: formData.banReason,
      isPermanent: formData.isPermanent,
      communityName: communityName,
      modNote: formData.modNote,
      banMessage: banMessage,
    };
    const method = isEdit ? "PATCH" : "POST";
    const response = await apiHandler(
      `/community/moderation/${communityName}/${formData.username}/ban`,
      method,
      requestBody,
      token,
    );
    if (response.message.includes("successfully")) {
      isEdit
        ? toast.success("User Ban has been updated")
        : toast.success("User has been banned");
      setReload((prevReload) => !prevReload);
      setShowModal(false);
    } else {
      toast.error("User not banned!");
      setShowModal(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
      } else {
        redirect("/login");
      }
    }
    fetchData();
  }, []);

  const reasons = [
    "Spam",
    "Personal and confidential information",
    "Threatening, harassing, or inciting violence",
    "Other",
  ];

  
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Ban a User</h1>
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

        <p className={styles.label}>Reason For Ban</p>
        <TextField
          id="outlined-select-currency"
          name="banReason"
          select
          value={formData.banReason}
          onChange={handleChange}
          className={styles.full_width}
        >
          {reasons.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <p className={styles.label}>Mod Note</p>
        <TextField
          data-testid="Reason"
          name="modNote"
          id="outlined-basic"
          label="Note"
          onChange={handleChange}
          value={formData.modNote}
          variant="outlined"
          className={styles.mod_note}
        />
        <div className={styles.characters_left}>
          {300 - formData.modNote.length} characters remaining
        </div>

        <p className={styles.label}>How Long?</p>
        <div className={styles.duration_container}>
          <div className={styles.count_container}>
            <input
              data-testid="count"
              type="number"
              onChange={handleChange}
              disabled={formData.duration === "permanent"}
              name="duration"
              tabIndex={0}
              min={0}
              value={formData.duration}
              className={styles.count}
            />
            <p className={styles.count}>Days</p>
          </div>
          <div className={styles.permanent_container}>
            <input
              data-testid="permanent"
              type="checkbox"
              id="permanent"
              name="permanent"
              onChange={handleChange}
              checked={formData.duration === "Permanent"}
              className={styles.permanent}
            />
            <div className={styles.permanent_label}>Permanent</div>
          </div>
        </div>

        <div className={styles.ban_note}>
          Note to include in ban message{" "}
          <span style={{ color: "#0079D3", margin: "0 2px" }}>•</span>
        </div>
        <textarea
          className={styles.textarea}
          name="banMessage"
          onChange={handleChange}
          value={banMessage}
          maxLength={5000}
          placeholder="Reason they were banned"
        ></textarea>
        <div className={styles.characters_left}>
          {5000 - banMessage.length} characters remaining
        </div>

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={handleClose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            disabled={false}
            onClick={handleBan}
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
}

export default BanModal;
