import React, { useState, useEffect } from "react";
import styles from "../banned/BanModal.module.css";
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
 * Modal to add a user to the approved list
 * @component
 * @param {function} setShowModal The function to set the modal visibility
 * @returns {JSX.Element} The rendered Approved component.
 *
 * @example
 * <Approved setShowModal={setShowModal}/>
 */

function ApproveModal({ setShowModal, communityName, setReload }) {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);

  function handleClose() {
    setShowModal(false);
  }

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleApprove = async () => {
    try {
      setReload((prevReload) => !prevReload);
      const response = await apiHandler(
        `/community/moderation/${communityName}/${username}/add-contributor`,
        "POST",
        "",
        token,
      );
      toast.success(response.message);
    } catch (err) {
      toast.error("User not added!");
    } finally {
      setShowModal(false);
    }
  };

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

  
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Approve User</h1>
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
          value={username}
          variant="outlined"
          className={styles.full_width}
        />

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={handleClose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            disabled={username.length < 4}
            onClick={handleApprove}
          >
            Approve User
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApproveModal;
