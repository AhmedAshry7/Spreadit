import React from "react";
import styles from "./ProfileIcon.module.css";
import Image from "next/image";

/**
 * Component that renders a profile icon. This component is primarily used
 * to display a user profile picture using a provided image URL.
 *
 * @component
 * @param {Object} props
 * @param {string} props.url  URL of the profile image to be displayed
 * @returns {JSX.Element} The JSX code for the profile icon
 *
 * @example
 * // Usage example of ProfileIcon
 *
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 *
 * <ProfileIcon
 *   url={awwpfp}
 * />
 */

function ProfileIcon({ url }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.icon}
        src={url}
        alt="Profile icon"
        width={35} // Set the width of the icon
        height={35} // Set the height of the icon
        layout="fixed"
      />
    </div>
  );
}

export default ProfileIcon;
