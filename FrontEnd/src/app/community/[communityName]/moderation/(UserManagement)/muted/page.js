"use client";
import React, { useState } from "react";
import ModBar from "../ModBar";
import styles from "../UserManagement.module.css";
import SearchBar from "../SearchBar";
import UserCard from "../UserCard";
import MuteModal from "./MuteModal";

function Muted({ params: { communityName } }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {showModal ? <MuteModal setShowModal={setShowModal} /> : null}
      <h1 className={styles.header_text}>User Management</h1>
      <ModBar communityName={communityName} selected={1} />

      <div className={styles.container}>
        <div className={styles.buttons_container}>
          <button
            className={styles.action_button}
            onClick={() => {
              setShowModal(true);
              
            }}
          >
            Mute user
          </button>
        </div>

        <div className={styles.search_container}>
          <SearchBar />
        </div>
        <UserCard
          username="user1"
          avatar="https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png"
          type="muted"
          reason={"Other"}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
}

export default Muted;
