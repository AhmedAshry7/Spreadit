"use client";
import React, { useState, useEffect } from "react";
import ModBar from "../ModBar";
import styles from "../UserManagement.module.css";
import SearchBar from "../SearchBar";
import NoResults from "../NoResults";
import UserCard from "../UserCard";
import BanModal from "./BanModal";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler";
import EmptyQueue from "../../queue/EmptyQueue";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

function Banned({ params: { communityName } }) {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    username: "",
    banReason: "",
    modNote: "",
    duration: 0,
    isEdit: false,
  });
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [banned, setBanned] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  // const banned = [{username: "Abdull", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "Basma ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "Basma1 ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "Ahmed ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "Ahmed1 ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "Mahmoud ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "Abdulla ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "poop ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"},
  // {username : "pipo ", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png", duration: "1", modNote: "ay 7aga", reason: "Other"}]

  useEffect(() => {
    if (isSearch) {
      const tempArr = banned
        .filter((user) =>
          user.username.toLowerCase().includes(keyword.toLowerCase()),
        )
        .map((user) => {
          return (
            <UserCard
              username={user.username}
              avatar={user.userProfilePic}
              type="banned"
              duration={user.banPeriod}
              modNote={user.modNote}
              reason={user.reasonForBan}
              setModalInfo={setModalInfo}
              setShowModal={setShowModal}
              setReload={setReload}
            />
          );
        });
      setSearchArray(tempArr);
    }
  }, [isSearch, keyword]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cookies = await getCookies();
        if (cookies !== null && cookies.access_token && cookies.username) {
          const response = await apiHandler(
            `/community/moderation/${communityName}/banned-users`,
            "GET",
            "",
            cookies.access_token,
          );
          
          setBanned(
            response.map((user) => {
              return user;
            }),
          );
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [reload]);

  useEffect(() => {
    if (banned.length > 0) {
      setLoading(false);
    }
  }, [banned]);

  console.log(
    `isSearch: ${isSearch} keyword: ${keyword} searchArray length : ${searchArray.length}`,
  );
  
  return (
    <div style={{ width: "100%" }}>
      {showModal ? (
        <BanModal
          username={modalInfo.username}
          banReason={modalInfo.banReason}
          duration={modalInfo.duration}
          modNote={modalInfo.modNote}
          isEdit={modalInfo.isEdit}
          setShowModal={setShowModal}
          communityName={communityName}
        />
      ) : null}
      <h1 className={styles.header_text}>User Management</h1>
      <ModBar communityName={communityName} selected={0} />

      <div className={styles.container}>
        <div className={styles.buttons_container}>
          <button
            className={styles.action_button}
            onClick={() => {
              setModalInfo({
                username: "",
                banReason: "",
                modNote: "",
                duration: 0,
                isEdit: false,
              });
              setShowModal(true);
              
            }}
          >
            Ban user
          </button>
        </div>

        <SearchBar
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          setKeyword={setKeyword}
          isEmpty={searchArray.length === 0}
        />

        {!isSearch && !loading
          ? banned.map((user) => {
              return (
                <UserCard
                  username={user.username}
                  avatar={user.userProfilePic}
                  type="banned"
                  duration={user.banPeriod}
                  modNote={user.modNote}
                  reason={user.reasonForBan}
                  setModalInfo={setModalInfo}
                  setShowModal={setShowModal}
                  setReload={setReload}
                />
              );
            })
          : searchArray.length === 0
            ? null
            : searchArray}
        {!loading && banned.length === 0 ? (
          <EmptyQueue message={"No banned users here"} />
        ) : null}

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
      </div>
    </div>
  );
}

export default Banned;
