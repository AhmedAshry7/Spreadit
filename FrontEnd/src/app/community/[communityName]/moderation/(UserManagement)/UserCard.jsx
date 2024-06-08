"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./UserCard.module.css";
import Image from "next/image";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler";
import editPen from "@/app/assets/edit.svg";
import trash from "@/app/assets/trash.svg";
import toast from "react-hot-toast";

/**
 * Display User card in userManagement pages
 * @component
 * @param {string} username The username of the user
 * @param {string}  avatar The link to the user's avatar
 * @param {string}  type which page the component is in
 * @param {string}  duration The duration of the ban or mute
 * @param {string}  modNote The moderator note
 * @param {string}  reason The reason for the ban or mute
 * @param {function}  setModalInfo The function to set the modal info
 * @param {function}  setShowModal The function to set the modal visibility
 * @param {boolean}  canEdit Whether the user can edit the user's permissions
 * @param {boolean}  isInvited Whether the user is invited or not
 * @param {string}  permissions The permissions of the user
 * @param {function}  setEditModalData The function to set the edit modal data
 * @returns {JSX.Element} The rendered UserCard component.
 *
 * @example
 * // Banned user card
 * <UserCard
 *  username={user.username}
 *  avatar={user.avatar}
 *  type="banned"
 *  duration={user.duration}
 *  modNote={user.modNote}
 *  reason={user.reason}
 *  setModalInfo={setModalInfo}
 *  setShowModal={setShowModal} />
 *
 * @example
 * //Muted user card
 * <UserCard
 * username={user.username}
 * avatar={user.avatar}
 * type="muted"
 * reason={user.reason}
 * setShowModal={setShowModal} />
 *
 * @example
 * //Approved User card
 * <UserCard username={user.username}
 *  avatar={user.avatar}
 *  type="approved"
 *  setShowModal={setShowModal} />
 *
 * @example
 * //Moderator User card
 * <UserCard username={user.username}
 *  avatar={user.avatar}
 *  type="moderator"
 *  setShowModal={setShowModal}
 *  permissions={user.permissions}
 *  canEdit={editableUser}
 *  isInvited={false}
 *  setEditModalData={setEditModalData} />
 */

function UserCard({
  username,
  avatar,
  type,
  duration,
  modNote,
  reason,
  setModalInfo,
  setShowModal,
  canEdit,
  isInvited,
  permissions,
  setEditModalData,
  communityName,
  setReload,
}) {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      cookies.username === username ? setIsMe(true) : setIsMe(false);
      setToken(cookies.access_token);
    }
    fetchData();
  }, []);

  function handleEditMute() {
    type === "banned"
      ? setModalInfo({
          username,
          banReason: reason,
          modNote,
          duration,
          isEdit: true,
        })
      : null;
    setShowModal(true);
  }

  async function removeContributor() {
    try {
      const response = await apiHandler(
        `/community/moderation/${communityName}/${username}/remove-contributor`,
        "DELETE",
        "",
        token,
      );
      
      toast.success("User removed successfully");
      setReload((prevReload) => !prevReload);
    } catch (err) {
      toast.error("An error occurred");
    }
  }

  function showMoreDetails() {
    setShowInfo(!showInfo);
  }

  function handleEditModal() {
    let data = {
      username: username,
      everything: true,
      userPermissions: true,
      postPermissions: true,
      settingsPermissions: true,
      isEdit: true,
    };
    permissions === "Everything"
      ? (data.everything = true)
      : (data.everything = false);
    if (permissions === "Everything") {
      data.userPermissions = true;
      data.postPermissions = true;
      data.settingsPermissions = true;
    } else {
      permissions.includes("Manage users")
        ? (data.userPermissions = true)
        : (data.userPermissions = false);
      permissions.includes("Manage posts")
        ? (data.postPermissions = true)
        : (data.postPermissions = false);
      permissions.includes("Manage settings")
        ? (data.settingsPermissions = true)
        : (data.settingsPermissions = false);
    }

    setEditModalData(data);
    setShowModal(true);
  }

  const handleRemoveInvite = async () => {
    try {
      const response = await apiHandler(
        `/community/moderation/${communityName}/${username}/remove-invite`,
        "DELETE",
        "",
        token,
      );
      toast.success("Invite removed successfully");

      setReload((prevReload) => !prevReload);
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.card}>
        <div className={styles.user_info}>
          <div className={styles.profile_picture}>
            <Image
              src={avatar}
              width={40}
              height={40}
              style={{
                overflow: "hidden",
                borderRadius: "624.9375rem",
                borderStyle: "solid",
                borderColor: "#0000001a",
              }}
              alt="profile picture"
            />
          </div>

          <div className={styles.username_container}>
            <span className={styles.username}>{username}</span>
            {type === "banned" ? (
              <div>
                {duration === "Permanent" ? "(permanent)" : "till " + duration}
              </div>
            ) : (
              <div style={{ color: "white" }}>{username}</div>
            )}
          </div>
        </div>

        {type === "banned" || type === "muted" ? (
          <span className={styles.reason}>
            {" "}
            <span className={styles.dot}>•</span> {reason}
          </span>
        ) : null}

        {type === "banned" || type === "muted" ? (
          <div className={styles.btn_container}>
            <button onClick={handleEditMute} className={styles.btn}>
              {type === "banned" ? "Edit" : "Unmute"}
            </button>

            <button onClick={showMoreDetails} className={styles.btn}>
              More Details
            </button>
          </div>
        ) : null}

        {type === "approved" ? (
          <div className={styles.btn_container}>
            {!isMe ? (
              <button
                onClick={() => {
                  router.push("/message/compose");
                }}
                className={styles.btn}
              >
                Send Message
              </button>
            ) : null}

            <button onClick={removeContributor} className={styles.btn}>
              Remove
            </button>
          </div>
        ) : null}

        {type === "moderator" ? (
          <div className={styles.btn_container}>
            <div className={styles.permissions}>
              {permissions}
              {canEdit && isInvited ? (
                <Image
                  onClick={handleRemoveInvite}
                  className={styles.icon}
                  width={16}
                  height={16}
                  src={trash}
                  alt="remove"
                />
              ) : null}
              {canEdit && !isInvited ? (
                <Image
                  onClick={handleEditModal}
                  className={styles.icon}
                  width={16}
                  height={16}
                  src={editPen}
                  alt="edit"
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      {showInfo ? (
        <div className={styles.info_container}>
          {modNote !== "" ? (
            <div className={styles.info}>
              <div className={styles.info_title}>Moderator Note:</div>
              <div className={styles.info_text}>{modNote}</div>
            </div>
          ) : null}
          <div className={styles.info}>
            <div className={styles.info_title}>Reason:</div>
            <div className={styles.info_text}>{reason}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserCard;
