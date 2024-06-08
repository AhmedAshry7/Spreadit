import React, { useState } from "react";
import styles from "./TrendingTodayItem.module.css";
import Image from "next/image";

/**
 * Component representing an item in the trending today list
 * @component
 * @param {Object} props Component props
 * @param {string} props.title The title of the trending item
 * @param {string} props.url The URL of the profile icon associated with the item
 * @param {string} props.image The URL of the image associated with the item
 * @param {string} props.description The description of the trending item
 * @param {string} props.community The name of the community associated with the item
 * @param {string} props.key The unique key for the item
 * @returns {JSX.Element} JSX element representing the trending item
 *
 * @example
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 * <TrendingTodayItem
 *   title="Post Title"
 *   url={awwpfp}
 *   image={awwpfp}
 *   description="This is a description of the post."
 *   community="community1"
 *   key="1"
 * />
 */

function TrendingTodayItem({ title, url, image, description, community, key }) {
  return (
    <div>
      <li key={key} className={`${styles.dropdown} $`}>
        {" "}
        <div className={styles.dropdownrow}>
          <div className={styles.leftcontainer}>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.account}>
              <Image
                className={`${styles.icon} $`}
                src={url}
                alt="Profile icon"
                width={23}
                height={23}
                layout="fixed"
              />
              <p className={styles.community}>{"r/" + community}</p>
            </div>
          </div>

          {image ? (
            <Image
              className={`${styles.rightcontainer} $`}
              src={image}
              alt="Post image"
              width={100}
              height={80}
              layout="fixed"
            />
          ) : (
            ""
          )}
        </div>
      </li>
    </div>
  );
}

export default TrendingTodayItem;
