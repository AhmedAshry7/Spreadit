import React, { useState, useEffect } from "react";
import styles from "./EditCommunityModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler.js";

/**
 * A modal component for editing details of an existing community. It allows users
 * to edit the nickname for community members and the community description.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.close Function to close the modal
 * @returns {JSX.Element} The JSX code for the edit community modal
 *
 * @example
 *
 * const handleclose = () => {
 * console.log("close")
 * }
 * <EditCommunityModal close={handleClose} />
 */

function EditCommunityModal({ close, communityData, communityName }) {
  const [nameErrors, setNameErrors] = useState("");
  const [descErrors, setDescErrors] = useState("");
  const [token, setToken] = useState(null);

  const [formData, setFormData] = useState({
    membersname: "Members",
    communitydesc: communityData.description,
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

  function handleDescInputChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, communitydesc: value }));

    if (formData.communitydesc.length > 500) {
      setDescErrors("Description is too long.");
    } else {
      setDescErrors("");
    }
  }

  

  const handleclose = () => {
    close();
  };

  const handlesave = async (values) => {
    try {
      apiHandler(
        `/community/${communityName}/edit-info`,
        "POST",
        values,
        token,
      );
    } catch (error) {
      
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      communitydesc: values.description,
    }));
    close();
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Edit community details widget</h1>
          <div className={styles.closebutton} onClick={handleclose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <p className={styles.titledesc}>
          Briefly describes your community and members. Always appears at the
          top of the sidebar.
        </p>

        <textarea
          className={styles.namebox}
          type="text"
          placeholder=" Community description"
          value={formData.communitydesc}
          onChange={handleDescInputChange}
        ></textarea>
        {descErrors ? (
          <p className={styles.errorstext}>{descErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            Describe your community to visitors.
          </p>
        )}

        <div className={styles.buttonsbox}>
          <button className={styles.cancelbuttons} onClick={handleclose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            onClick={() =>
              handlesave({
                name: communityName,
                is18plus: true,
                communityType: communityData.communityType,
                description: formData.communitydesc,
                membersNickname: "Members",
              })
            }
            disabled={
              !(
                (formData.communitydesc || formData.membersname) &&
                !(descErrors || nameErrors)
              )
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCommunityModal;
