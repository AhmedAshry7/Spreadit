"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ToolBar from "../components/UI/Toolbar";
import styles from "./MessageLayout.module.css";
import compose from "../assets/plus-circle.svg";

const Layout = ({ index }) => {
  const router = useRouter();

  const layout = useMemo(
    () => (
      <>
        <ToolBar loggedin={true} page={"Spreadit"} />
        <div className={styles.bar}>
          <div className={styles.pages}>
            <div
              className={`${styles.inbox} ${index === 0 ? styles.selected : ""}`}
              onClick={() => {
                router.push("/message/inbox");
              }}
            >
              Inbox
            </div>
            <div
              className={`${styles.sent} ${index === 1 ? styles.selected : ""}`}
              onClick={() => {
                router.push("/message/sent");
              }}
            >
              Sent
            </div>
            <div
              className={`${styles.sendMessage} ${index === 2 ? styles.selected : ""}`}
              onClick={() => {
                router.push("/message/compose");
              }}
            >
              Send A Message
              <button type="button" className={styles.send}>
                <Image
                  style={
                    index === 2
                      ? {
                          filter:
                            "invert(58%) sepia(93%) saturate(7487%) hue-rotate(358deg) brightness(99%) contrast(119%)",
                        }
                      : ""
                  }
                  src={compose}
                  width={22}
                  height={22}
                  viewBox="0 0 20 20"
                  alt="Compose"
                />
              </button>
            </div>
          </div>
        </div>
      </>
    ),
    [index],
  );

  return layout;
};

export default Layout;
