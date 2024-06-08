"use client";
import React, { useState, useEffect } from "react";
import ModBar from "../ModBar";
import styles from "../UserManagement.module.css";
import SearchBar from "../SearchBar";
import UserCard from "../UserCard";
import ApprovedModal from "./ApprovedModal";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler";
import EmptyQueue from "../../queue/EmptyQueue";
import { TailSpin } from "react-loader-spinner";

function Approved({ params: { communityName } }) {
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  // const approved = [{username: "abdullah12", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"},
  // {username: "abdullah1", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"},
  // {username: "abdulla", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"},
  // {username: "abdullahwd12", avatar: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"}]

  useEffect(() => {
    if (isSearch) {
      const tempArr = approved
        .filter((user) =>
          user.username.toLowerCase().includes(keyword.toLowerCase()),
        )
        .map((user) => {
          return (
            <UserCard
              username={user.username}
              avatar={user.avatar}
              type="approved"
              setShowModal={setShowModal}
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
            `/community/moderation/${communityName}/contributors`,
            "GET",
            "",
            cookies.access_token,
          );
          setApproved(response);
          setLoading(false);
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [reload]);

  return (
    <div style={{ width: "100%" }}>
      {showModal ? (
        <ApprovedModal
          communityName={communityName}
          setShowModal={setShowModal}
          setReload={setReload}
        />
      ) : null}
      <h1 className={styles.header_text}>User Management</h1>
      <ModBar communityName={communityName} selected={2} />

      <div className={styles.container}>
        <div className={styles.buttons_container}>
          <button
            className={styles.action_button}
            onClick={() => {
              setShowModal(true);
              
            }}
          >
            Approve user
          </button>
        </div>

        <SearchBar
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          setKeyword={setKeyword}
          isEmpty={searchArray.length === 0}
        />

        {!isSearch && !loading
          ? approved.map((user) => {
              return (
                <UserCard
                  username={user.username}
                  avatar={user.avatar}
                  type="approved"
                  setShowModal={setShowModal}
                  communityName={communityName}
                  setReload={setReload}
                />
              );
            })
          : searchArray.length === 0
            ? null
            : searchArray}
        {!loading && approved.length === 0 ? (
          <EmptyQueue message={"No approved users here"} />
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

export default Approved;
