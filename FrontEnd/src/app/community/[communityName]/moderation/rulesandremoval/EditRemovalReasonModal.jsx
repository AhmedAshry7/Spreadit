import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styles from "./EditRemovalReasonModal.module.css";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler.js";

/**
 * Component representing a modal for editing a removal reason
 * @component
 * @param {Object} props Component props
 * @param {Function} props.close Function to close the modal
 * @param {string} props.title The title of the removal reason being edited
 * @param {string} props.message The message of the removal reason being edited
 * @param {string} props.communityName The name of the community
 * @param {string} props.id The ID of the removal reason being edited
 * @returns {JSX.Element} JSX element representing a modal for editing a removal reason
 *
 * @example
 * <EditRemovalReasonModal
 *   close={console.log("Close modal")}
 *   title="Inappropriate Content"
 *   message="Your post has been removed because it contains inappropriate content."
 *   communityName="Community"
 *   id={2}
 * />
 */

function EditRemovalReasonModal({ close, title, message, communityName, id }) {
  const [removalErrors, setRemovalErrors] = useState("");
  const [messageErrors, setMessageErrors] = useState("");
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    communityName: communityName,
    rId: id,
    newRemovalReason: {
      title: title,
      reasonMessage: message,
    },
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRemovalReason: { ...prevFormData.newRemovalReason, title: value },
    }));

    if (formData.newRemovalReason.title.length >= 50) {
      setRemovalErrors(
        "Input length of " +
          (1 + formData.newRemovalReason.title.length) +
          " exceeds maximum length of 50",
      );
    } else {
      setRemovalErrors("");
    }
  }

  function handleMessageChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRemovalReason: {
        ...prevFormData.newRemovalReason,
        reasonMessage: value,
      },
    }));

    if (formData.newRemovalReason.reasonMessage.length >= 100000) {
      setMessageErrors(
        "Input length of " +
          (1 + formData.newRemovalReason.reasonMessage.length) +
          " exceeds maximum length of 10,000",
      );
    } else {
      setMessageErrors("");
    }
  }

  const handleclose = () => {
    close();
  };

  const editRemovalReason = async (values) => {
    try {
      await apiHandler("/removal-reason/edit", "PUT", values, token);
    } catch (error) {
      
    }
    close();
  };

  const deleteRemovalReason = async (values) => {
    try {
      await apiHandler(
        "/removal-reason/remove",
        "POST",
        { communityName: values.communityName, rId: values.rId },
        token,
      );
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
          value={formData.newRemovalReason.title}
          onChange={handleRemovalChange}
        ></textarea>
        {removalErrors ? (
          <p className={styles.errorstext}>{removalErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {50 - formData.newRemovalReason.title.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <h2 className={styles.typestitle}>Reason Message</h2>
        <p className={styles.nameboxtitledesc}>Hi u/username,</p>
        <textarea
          className={styles.namebox}
          type="text"
          placeholder=" Write a message to the user "
          value={formData.newRemovalReason.reasonMessage}
          onChange={handleMessageChange}
        ></textarea>
        {messageErrors ? (
          <p className={styles.errorstext}>{messageErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {10000 - formData.newRemovalReason.reasonMessage.length} Charcters
            remaining{" "}
          </p>
        )}

        <br></br>

        <div className={styles.buttonsbox}>
          <button
            className={styles.deletebutton}
            onClick={() => deleteRemovalReason(formData)}
          >
            Delete
          </button>
          <button className={styles.buttons} onClick={close}>
            Cancel
          </button>
          <button
            className={styles.updatebuttons}
            disabled={
              !(
                formData.newRemovalReason.reasonMessage &&
                formData.newRemovalReason.title &&
                !(removalErrors || messageErrors)
              )
            }
            onClick={() => editRemovalReason(formData)}
          >
            Update reason
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRemovalReasonModal;
