import React, { useState, useEffect } from "react";
import styles from "../../community/[communityName]/moderation/(UserManagement)/banned/BanModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import apiHandler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { redirect } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { set } from "lodash";

/**
 * Modal to add a user to the approved list
 * @component
 * @param {function} setShowModal The function to set the modal visibility
 * @returns {JSX.Element} The rendered Approved component.
 *
 * @example
 * <Approved setShowModal={setShowModal}/>
 */

function RemovalReasonsModal({
  setShowModal,
  communityName,
  postId,
  setModActions,
}) {
  const [username, setUsername] = useState("");
  const [reasons, setReasons] = useState([]);
  const [removalReason, setRemovalReason] = useState("");
  const [token, setToken] = useState(null);

  function handleClose() {
    setShowModal(false);
  }

  function handleChange(event) {
    setRemovalReason(event.target.value);
  }

  const handleRemove = async () => {
    const response = await apiHandler(
      `/community/moderation/${communityName}/${postId}/remove-post`,
      "POST",
      { removalReason: removalReason },
      token,
    );
    
    setModActions((prevModActions) => {
      return { ...prevModActions, isRemoved: true };
    });
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
        const response = await apiHandler(
          `/community/${communityName}/removal-reasons`,
          "GET",
          "",
          cookies.access_token,
        );
        
        setReasons(response);
        setRemovalReason(response[0]);
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
          <h1 className={styles.title}>Remove Post</h1>
          <div className={styles.closebutton} onClick={handleClose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <p className={styles.label}>Reason For Ban</p>
        <TextField
          id="outlined-select-currency"
          name="banReason"
          select
          value={removalReason}
          onChange={handleChange}
          className={styles.full_width}
        >
          {reasons.map((reason) => (
            <MenuItem key={reason.title} value={reason.title}>
              {reason.title}
            </MenuItem>
          ))}
        </TextField>

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.buttons} onClick={handleRemove}>
            Remove Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemovalReasonsModal;
