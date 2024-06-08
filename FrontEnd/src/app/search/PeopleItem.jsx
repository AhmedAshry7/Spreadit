import React, { useState } from "react";
import styles from "./PeopleItem.module.css";
import Image from "next/image";

/**
 * Component representing an item in the people list
 * @component
 * @param {Object} props Component props
 * @param {string} props.name The name of the person
 * @param {number} props.members The number of followers of the person
 * @param {string} props.url The URL of the profile icon associated with the person
 * @param {string} props.description The description of the person
 * @param {string} props.key The unique key for the item
 * @returns {JSX.Element} JSX element representing the people item
 *
 * @example
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 * <PeopleItem
 *   name="User"
 *   members={100}
 *   url={awwpfp}
 *   description="This is a description of the person"
 *   key="1"
 * />
 */

function PeopleItem({ name, members, url, description, key }) {
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
            <p className={styles.name}>{"u/" + name}</p>
            <p className={styles.members}>{members + " Followers"}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default PeopleItem;
