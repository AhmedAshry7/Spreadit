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
import { set } from "date-fns";
import toast from "react-hot-toast";

/**
 * Modal to Invite a user to be a moderator or to edit the permissions of a moderator
 * @component
 * @param {function} setShowModal The function to set the modal visibility
 * @param {string} usernameProp The username of the user
 * @param {boolean} everythingProp Whether the user has full access or not
 * @param {boolean} userPermissionsProp Whether the user has user permissions or not
 * @param {boolean} postPermissionsProp Whether the user has post permissions or not
 * @param {boolean} settingsPermissionsProp Whether the user has settings permissions or not
 * @param {boolean} isEdit Whether the user is editing the permissions of a moderator or not
 * @returns {JSX.Element} The rendered InviteModal component.
 *
 * @example
 * <InviteModal setShowModal={setShowModal} usernameProp={username} everythingProp={everything} userPermissionsProp={userPermissions} postPermissionsProp={postPermissions} settingsPermissionsProp={settingsPermissions} isEdit={isEdit}/>
 */

function InviteModal({
  setShowModal,
  usernameProp = "",
  everythingProp = true,
  userPermissionsProp = true,
  postPermissionsProp = true,
  settingsPermissionsProp = true,
  isEdit = false,
  setReload,
  communityName,
}) {
  const [username, setUsername] = useState(usernameProp);
  const [everything, setEverything] = useState(everythingProp);
  const [permissions, setPermissions] = useState({
    userPermissions: userPermissionsProp,
    postPermissions: postPermissionsProp,
    settingsPermissions: settingsPermissionsProp,
  });

  function handleClose() {
    setShowModal(false);
  }

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  function handleEverything() {
    everything
      ? setPermissions({
          userPermissions: false,
          postPermissions: false,
          settingsPermissions: false,
        })
      : setPermissions({
          userPermissions: true,
          postPermissions: true,
          settingsPermissions: true,
        });
    setEverything(!everything);
  }

  const handlePermissions = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInvite = async () => {
    try {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        const response = await apiHandler(
          `/community/moderation/${communityName}/${username}/invite`,
          "POST",
          {
            moderationDate: new Date(),
            managePostsAndComments: permissions.postPermissions,
            manageUsers: permissions.userPermissions,
            manageSettings: permissions.settingsPermissions,
          },
          cookies.access_token,
        );

        if (response.message.includes("successfully")) {
          toast.success(response.message);
          setReload((prevReload) => !prevReload);
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      toast.error("An error occured, please try again later");
    } finally {
      setShowModal(false);
    }
  };

  const handleRemove = async () => {
    try {
      const cookies = await getCookies();
      const response = await apiHandler(
        `/community/moderation/${communityName}/${username}/leave`,
        "POST",
        "",
        cookies.access_token,
      );

      if (response.message.includes("successfully")) {
        toast.success("Removed Moderator successfully");
        setReload((prevReload) => !prevReload);
      } else {
        toast.error("An error occured, please try again later");
      }
    } catch (err) {
      toast.error("An error occured, please try again later");
    } finally {
      setShowModal(false);
    }
  };

  const handleSave = async () => {
    try {
      const cookies = await getCookies();
      const response = await apiHandler(
        `/community/moderation/${communityName}/${username}/permissions`,
        "PUT",
        {
          managePostsAndComments: permissions.postPermissions,
          manageUsers: permissions.userPermissions,
          manageSettings: permissions.settingsPermissions,
        },
        cookies.access_token,
      );

      if (response.message.includes("successfully")) {
        toast.success("Permissions updated successfully");
        setReload((prevReload) => !prevReload);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("An error occured, please try again later");
    } finally {
      setShowModal(false);
    }
  };

  
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>
            {isEdit ? `Edit:${usernameProp}` : "Invite User"}
          </h1>
          <div className={styles.closebutton} onClick={handleClose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        {!isEdit ? (
          <>
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
          </>
        ) : null}

        <div className={styles.permanent_container}>
          <input
            data-testid="everything"
            type="checkbox"
            id="everything"
            name="everything"
            onChange={handleEverything}
            checked={everything}
            className={styles.permanent}
          />
          <div className={styles.permanent_label}>Everything</div>
        </div>
        <div className={styles.description}>
          Full access including the ability to manage moderator access and
          permissions.
        </div>

        <hr className={styles.seperator} />

        <div className={styles.permanent_container}>
          <input
            data-testid="users"
            disabled={everything}
            type="checkbox"
            id="userPermissions"
            name="userPermissions"
            onChange={handlePermissions}
            checked={permissions.userPermissions}
            className={styles.permanent}
          />
          <div className={styles.permanent_label}>Manage Users</div>
        </div>
        <div className={styles.description}>
          Access mod notes, ban and mute users, and approve submitters*.
        </div>

        <div className={styles.permanent_container}>
          <input
            data-testid="settings"
            disabled={everything}
            type="checkbox"
            id="settingsPermissions"
            name="settingsPermissions"
            onChange={handlePermissions}
            checked={permissions.settingsPermissions}
            className={styles.permanent}
          />
          <div className={styles.permanent_label}>Manage Settings</div>
        </div>
        <div className={styles.description}>
          Manage community settings, appearance, and rules.
        </div>

        <div className={styles.permanent_container}>
          <input
            data-testid="posts"
            disabled={everything}
            type="checkbox"
            id="postPermissions"
            name="postPermissions"
            onChange={handlePermissions}
            checked={permissions.postPermissions}
            className={styles.permanent}
          />
          <div className={styles.permanent_label}>Manage Posts & Comments</div>
        </div>
        <div className={styles.description}>
          Access queues, take action on content etc...
        </div>

        <div className={styles.buttonsbox}>
          {isEdit ? (
            <button className={styles.remove_btn} onClick={handleRemove}>
              Remove
            </button>
          ) : null}

          <button className={styles.buttons} onClick={handleClose}>
            Cancel
          </button>
          {!isEdit ? (
            <button
              className={styles.buttons}
              disabled={
                (!permissions.userPermissions &&
                  !permissions.postPermissions &&
                  !permissions.settingsPermissions) ||
                username.length < 4
              }
              onClick={handleInvite}
            >
              Invite User
            </button>
          ) : (
            <button
              className={styles.buttons}
              disabled={
                (!permissions.userPermissions &&
                  !permissions.postPermissions &&
                  !permissions.settingsPermissions) ||
                username.length < 4
              }
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InviteModal;
