import React, { useState } from "react";
import styles from "./CommunityItem.module.css";
import Image from "next/image";

/**
 * Component representing an item in the community list
 * @component
 * @param {Object} props Component props
 * @param {string} props.name The name of the community
 * @param {number} props.members The number of members in the community
 * @param {string} props.url The URL of the profile icon associated with the community
 * @param {string} props.description The description of the community
 * @param {string} props.key The unique key for the item
 * @returns {JSX.Element} JSX element representing the community item
 *
 * @example
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 * <CommunityItem
 *   name="Community"
 *   members={1000}
 *   url= awwpfp
 *   description="This is a description of the community."
 *   key="1"
 * />
 */

function CommunityItem({ name, members, url, description, key }) {
  return (
    <div>
      <li key={key} className={`${styles.dropdown} $`}>
        {" "}
        <div className={styles.dropdownrow}>
          <div className={`${styles.icon} $`}>
            <Image
              className={`${styles.icon} $`}
              src={url}
              alt="profile icon"
              width={50}
              height={50}
              layout="fixed"
            />
          </div>

          <div className={styles.info}>
            <p className={styles.name}>{"r/" + name}</p>
            <p className={styles.members}>{members + " members"}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default CommunityItem;
