import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg";
import "./Create.css";
import styles from "./CommunityInfoBox.module.css";

/**
 * Component for displaying community information.
 * @component
 * @param {string} title - The title of the community.
 * @param {string} description - The description of the community.
 * @param {string} iconurl - The URL of the community icon.
 * @param {string} bannerurl - The URL of the community banner.
 * @param {number} membercount - The count of community members.
 * @param {string} datecreated - The creation date of the community.
 * @returns {JSX.Element} The rendered CommunityInfoBox component.
 *
 * @example
 * // Renders the CommunityInfoBox component with specified props.
 * <CommunityInfoBox
 *   title="testCom"
 *   description="testDesc"
 *   iconurl="icon-url"
 *   bannerurl="banner-url"
 *   membercount={100}
 *   datecreated="2024-04-15"
 * />
 */

export default function CommunityInfoBox({
  title = "testCom",
  description = "testDesc",
  iconurl = "",
  bannerurl = "",
  membercount = 0,
  datecreated = "testDate",
}) {
  return (
    <div className={styles.boxSize}>
      <div className={styles.boxStyling}>
        <div className={styles.boxPadding} style={{ maxHeight: "none" }}>
          <div
            className={styles.boxBanner}
            style={{ backgroundImage: `url(${bannerurl})` }}
          ></div>
          <div className={styles.boxTitle}>
            <img
              alt="Subreddit Icon"
              role="presentation"
              src={iconurl}
              className={`${styles.boxIcon} ${styles.boxIconBorder}`}
              style={{ backgroundColor: "rgb(0, 121, 211)" }}
            />

            <div className={styles.boxTitleText}>
              <a
                className={styles.boxTitleTextLink}
                target="_blank"
                rel="noopener noreferrer"
                href={`/community/${title}/`}
                style={{ color: "#1c1c1c" }}
              >
                <span className={styles.boxTitleTextStyle}>{title}</span>
              </a>
            </div>
          </div>
          <div
            data-redditstyle="true"
            data-testid="no-edit-description-block"
            className={styles.boxDescription}
            style={{ color: "#1c1c1c" }}
          >
            <div className={styles.boxDescriptionStyle}>{description}</div>
          </div>

          <div className={styles.boxCreated}>
            <div
              className={styles.boxCreatedText}
              id="IdCard--CakeDay--undefined--t5_93lki0"
            >
              <span
                className={`${styles.boxCreated} ${styles.icon} ${styles.iconMargin}`}
              >
                🎂
              </span>
              <span className={styles.boxCreatedTextColor}>
                Created {datecreated}
              </span>
            </div>
          </div>
          <div className={styles.spacingDiv}></div>
          <hr className={styles.middleHr}></hr>
          <div className={styles.boxOnline}>
            <div>
              <div
                className={styles.boxOnlineFont}
                style={{ color: "#1c1c1c" }}
              >
                {membercount}
              </div>
              <p className={styles.boxOnlineText}>Members</p>
            </div>
            <div>
              <div
                className={styles.boxOnlineFont}
                style={{ color: "#1c1c1c" }}
              >
                <span style={{ color: "#46d160", marginRight: "4px" }}>●</span>
                24
              </div>
              <p className={styles.boxOnlineText}>Online</p>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
