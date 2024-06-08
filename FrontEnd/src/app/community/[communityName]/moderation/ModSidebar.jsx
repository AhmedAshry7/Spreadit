import React, { useState, useEffect } from "react";
import styles from "./ModSidebar.module.css";
import { OverviewSidebarData } from "./OverviewSidebarData";
import { ModerationData } from "./ModerationData";
import { SettingsData } from "./SettingsData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

/**
 * Component for displaying the moderation sidebar for a community.
 * @component
 * @param {Object} props Component props
 * @param {string} props.communityName Name of the community
 * @returns {JSX.Element} JSX element for the moderation sidebar
 *
 * @example
 * <ModSidebar communityName="aww" />
 */

function ModSidebar({ communityName }) {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarlist}>
        <li
          className={styles.row}
          onClick={() => router.push(`/community/${communityName}`)}
        >
          <div id={styles.icon}>{<ArrowBackIcon />}</div>{" "}
          <div id={styles.title}>Exit mod tools</div>
        </li>

        <br></br>

        <div className={styles.maintitle}>OVERVIEW</div>

        {OverviewSidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={styles.row}
              onClick={() =>
                router.push(
                  `/community/${communityName}/moderation/${val.link}`,
                )
              }
            >
              <div id={styles.icon}>{val.icon}</div>{" "}
              <div id={styles.title}>{val.title}</div>
            </li>
          );
        })}

        <br></br>

        <div className={styles.maintitle}>MODERATION</div>

        <br></br>
        {ModerationData.map((val, key) => {
          return (
            <li
              key={key}
              className={styles.row}
              onClick={() =>
                router.push(
                  `/community/${communityName}/moderation/${val.link}`,
                )
              }
            >
              <div id={styles.icon}>{val.icon}</div>{" "}
              <div id={styles.title}>{val.title}</div>
            </li>
          );
        })}

        <br></br>
        <div className={styles.maintitle}>SETTINGS</div>

        {SettingsData.map((val, key) => {
          return (
            <li
              key={key}
              className={styles.row}
              onClick={() =>
                router.push(
                  `/community/${communityName}/moderation/${val.link}`,
                )
              }
            >
              <div id={styles.icon}>{val.icon}</div>{" "}
              <div id={styles.title}>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ModSidebar;
