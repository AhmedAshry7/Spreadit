import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styles from "./RemovalReasonModal.module.css";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler.js";

/**
 * Component for adding a new removal reason
 * @component
 * @param {Object} props Component props
 * @param {Function} props.close Function to close the modal
 * @param {string} props.communityName The name of the community
 * @returns {JSX.Element} JSX element for adding a new removal reason
 *
 * @example
 * <RemovalReasonModal close={console.log("Close modal")} communityName="Community" />
 */

function RemovalReasonModal({ close, communityName }) {
  const [token, setToken] = useState(null);
  const [removalErrors, setRemovalErrors] = useState("");
  const [messageErrors, setMessageErrors] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    reasonMessage: "",
    communityName: communityName,
  });

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  function handleRemovalChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, title: value }));

    if (formData.title.length >= 50) {
      setRemovalErrors(
        "Input length of " +
          (1 + formData.title.length) +
          " exceeds maximum length of 50",
      );
    } else {
      setRemovalErrors("");
    }
  }

  function handleMessageChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, reasonMessage: value }));

    if (formData.reasonMessage.length >= 100000) {
      setMessageErrors(
        "Input length of " +
          (1 + formData.reasonMessage.length) +
          " exceeds maximum length of 10,000",
      );
    } else {
      setMessageErrors("");
    }
  }

  const handleclose = () => {
    close();
  };

  const addRemovalReason = async (values) => {
    try {
      apiHandler("/removal-reason/add", "POST", values, token);
    } catch (error) {
      
    }
    close();
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Add new reason</h1>
          <div className={styles.closebutton} onClick={handleclose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <p className={styles.spliter}>
          ______________________________________________________
        </p>

        <br></br>

        <h2 className={styles.typestitle}>Removal Reason</h2>
        <textarea
          className={styles.namebox}
          type="text"
          placeholder=" Removal reason title "
          value={formData.title}
          onChange={handleRemovalChange}
        ></textarea>
        {removalErrors ? (
          <p className={styles.errorstext}>{removalErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {50 - formData.title.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <h2 className={styles.typestitle}>Reason Message</h2>
        <p className={styles.nameboxtitledesc}>Hi u/username,</p>
        <textarea
          className={styles.namebox}
          type="text"
          placeholder=" Write a message to the user "
          value={formData.reasonMessage}
          onChange={handleMessageChange}
        ></textarea>
        {messageErrors ? (
          <p className={styles.errorstext}>{messageErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {10000 - formData.reasonMessage.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={close}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            disabled={
              !(
                formData.title &&
                formData.reasonMessage &&
                !(removalErrors || messageErrors)
              )
            }
            onClick={() => addRemovalReason(formData)}
          >
            Add new reason
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemovalReasonModal;
