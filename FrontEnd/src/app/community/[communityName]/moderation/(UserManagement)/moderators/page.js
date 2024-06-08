"use client";
import React, { useState, useEffect } from "react";
import ModBar from "../ModBar";
import styles from "../UserManagement.module.css";
import SearchBar from "../SearchBar";
import UserCard from "../UserCard";
import InviteModeratorModal from "./InviteModeratorModal";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler";
import EmptyQueue from "../../queue/EmptyQueue";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { set } from "date-fns";

function Moderators({ params: { communityName } }) {
  const [showModal, setShowModal] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [moderators, setModerators] = useState([]);
  const [invited, setInvited] = useState([]);
  const [editable, setEditable] = useState([]);

  const [editModalData, setEditModalData] = useState({
    username: "",
    everything: true,
    userPermissions: true,
    postPermissions: true,
    settingsPermissions: true,
    isEdit: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const cookies = await getCookies();
        if (cookies !== null && cookies.access_token && cookies.username) {
          const moderatorsData = await apiHandler(
            `/community/moderation/${communityName}/moderators`,
            "GET",
            "",
            cookies.access_token,
          );
          setModerators(moderatorsData);
          const editableData = await apiHandler(
            `/community/moderation/${communityName}/moderators/editable`,
            "GET",
            "",
            cookies.access_token,
          );
          setEditable(editableData);
          const invitedData = await apiHandler(
            `/community/moderation/${communityName}/invited-moderators`,
            "GET",
            "",
            cookies.access_token,
          );
          setInvited(invitedData);
          setLoading(false);
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [reload]);

  // const moderators = [{username: "abdullah12", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Everything", isInvited: false},
  // {username: "abdul2", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Manage Users, Manage Settings", isInvited: false},
  // {username: "abdul222323", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Manage Users, Manage Settings", isInvited: false}]

  // const invited = [{username: "BoogyBooga", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Everything", isInvited: true},
  // {username: "Alii", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Everything", isInvited: true},
  // {username: "Wowzar", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Everything", isInvited: true}]

  // const editable = [{username: "abdullah12", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Everything", isInvited: false},
  // {username: "abdul2", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", permissions: "Manage Users, Manage Settings", isInvited: false}]

  function isEditable(username) {
    return editable.some((moderator) => moderator.username === username);
  }

  useEffect(() => {
    if (isSearch) {
      const tempArr = moderators
        .filter((user) =>
          user.username.toLowerCase().includes(keyword.toLowerCase()),
        )
        .map((user) => {
          const editableUser = isEditable(user.username);
          return (
            <UserCard
              username={user.username}
              communityName={communityName}
              avatar={user.avatar}
              type="moderator"
              setShowModal={setShowModal}
              permissions={generateString({
                posts: user.managePostsAndComments,
                settings: user.manageSettings,
                users: user.manageUsers,
              })}
              canEdit={editableUser}
              isInvited={false}
              setEditModalData={setEditModalData}
              setReload={setReload}
            />
          );
        });
      setSearchArray(tempArr);
    }
  }, [isSearch, keyword]);

  function generateString(obj) {
    const values = Object.values(obj);
    const trueCount = values.filter((value) => value === true).length;

    if (trueCount === 3) {
      return "Everything";
    } else if (trueCount === 2) {
      const trueKeys = Object.keys(obj).filter((key) => obj[key] === true);
      const formattedKeys = trueKeys.map((key) => `Manage ${key}`);
      return formattedKeys.join(", ");
    } else {
      const trueKeys = Object.keys(obj).filter((key) => obj[key] === true);
      const formattedKeys = trueKeys.map((key) => `Manage ${key}`);
      return formattedKeys[0];
    }
  }

  async function handleLeave() {
    const cookies = await getCookies();
    const response = await apiHandler(
      `/community/moderation/${communityName}/${cookies.username}/leave`,
      "DELETE",
      "",
      cookies.access_token,
    );
    
  }

  return (
    <div style={{ width: "100%" }}>
      {showModal ? (
        <InviteModeratorModal
          setShowModal={setShowModal}
          usernameProp={editModalData.username}
          everythingProp={editModalData.everything}
          userPermissionsProp={editModalData.userPermissions}
          postPermissionsProp={editModalData.postPermissions}
          settingsPermissionsProp={editModalData.settingsPermissions}
          isEdit={editModalData.isEdit}
          setReload={setReload}
          communityName={communityName}
        />
      ) : null}
      <h1 className={styles.header_text}>User Management</h1>
      <ModBar communityName={communityName} selected={3} />

      <div className={styles.container}>
        <div className={styles.buttons_container}>
          <button className={styles.action_button2} onClick={handleLeave}>
            Leave as mod
          </button>
          {canEdit ? (
            <button
              className={styles.action_button}
              onClick={() => {
                setEditModalData({
                  username: "",
                  everything: true,
                  userPermissions: true,
                  postPermissions: true,
                  settingsPermissions: true,
                  isEdit: false,
                });
                setShowModal(true);
                
              }}
            >
              Invite user
            </button>
          ) : null}
        </div>

        <SearchBar
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          setKeyword={setKeyword}
          isEmpty={searchArray.length === 0}
        />
        {!isSearch && !loading
          ? moderators.map((moderator) => {
              return (
                <UserCard
                  username={moderator.username}
                  communityName={communityName}
                  avatar={moderator.avatar}
                  type="moderator"
                  setShowModal={setShowModal}
                  permissions={generateString({
                    posts: moderator.managePostsAndComments,
                    settings: moderator.manageSettings,
                    users: moderator.manageUsers,
                  })}
                  canEdit={false}
                  isInvited={false}
                />
              );
            })
          : searchArray.length === 0 && !loading
            ? null
            : searchArray}

        {loading && (
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#FF4500"
            ariaLabel="tail-spin-loading"
            radius="0.5"
            wrapperStyle={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "70px",
            }}
            wrapperClass=""
          />
        )}

        {canEdit && !loading ? (
          <>
            {" "}
            {!isSearch ? (
              <>
                <div className={styles.invited}>
                  {editable.length > 0 ? (
                    <p className={styles.invited_header}>
                      You can edit these moderators
                    </p>
                  ) : null}
                  {editable.map((moderator) => {
                    return (
                      <UserCard
                        username={moderator.username}
                        communityName={communityName}
                        avatar={moderator.avatar}
                        type="moderator"
                        setShowModal={setShowModal}
                        permissions={generateString({
                          posts: moderator.managePostsAndComments,
                          settings: moderator.manageSettings,
                          users: moderator.manageUsers,
                        })}
                        canEdit={true}
                        isInvited={false}
                        setEditModalData={setEditModalData}
                        setReload={setReload}
                      />
                    );
                  })}
                </div>
                <div className={styles.invited}>
                  {invited.length > 0 ? (
                    <p className={styles.invited_header}>Invited moderators</p>
                  ) : null}
                  {invited.map((moderator) => {
                    return (
                      <UserCard
                        username={moderator.username}
                        communityName={communityName}
                        avatar={moderator.avatar}
                        type="moderator"
                        setShowModal={setShowModal}
                        permissions={generateString({
                          posts: moderator.managePostsAndComments,
                          settings: moderator.manageSettings,
                          users: moderator.manageUsers,
                        })}
                        canEdit={true}
                        isInvited={true}
                        setReload={setReload}
                      />
                    );
                  })}
                </div>{" "}
              </>
            ) : null}{" "}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Moderators;
