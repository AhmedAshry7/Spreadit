import React from "react";
import Image from "next/image";
import PillButton from "../components/UI/PillButton";
import styles from "./ProfileSettingItem.module.css";
import { useRouter } from "next/navigation";

/**
 * Component for Displaying a profile setting item in User Info Component.
 * @component
 * @param   {string} title   The title of the setting item [Required]
 * @param   {string} description   The description of the setting item [Required]
 * @param   {string} image   The path to the image for the setting item [Required]
 * @param   {boolean} isSvg   If the image is an svg [Required]
 * @param   {function} onClick   The function to be called when the button is clicked [Required]
 * @param   {string} buttonText   The text to be displayed on the button [Required]
 * @returns {JSX.Element} The component for the ProfileSettingItem.
 *
 * @example
 *
 * <ProfileSettingItem
 *  title="Avatar"
 *  description={"Customize and Style"}
 *  isSvg={true}
 *  image={styleIcon}
 *  buttonText={"Style Avatar"}
 * />
 *
 * @example
 * <ProfileSettingItem
 *  title="Profile"
 *  description={"Customize your profile"}
 *  isSvg={false}
 *  image={profileIcon}
 *  buttonText={"Edit Profile"}
 * />
 */
function ProfileSettingItem({
  title,
  description,
  image,
  isSvg,
  onClick,
  buttonText,
}) {
  const router = useRouter();

  return (
    <li
      onClick={onClick}
      className={styles.settings_item_container}
      role="presentation"
    >
      <div className={styles.settings_item}>
        <span className={styles.settings_item_info}>
          {isSvg ? (
            <Image src={image} alt="setting icon" width={24} height={24} />
          ) : (
            <Image
              src={image}
              alt="profile picture"
              width={32}
              height={32}
              className={styles.icons}
            />
          )}
          <span className={styles.title_container}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
          </span>
        </span>

        <PillButton text={buttonText} onClick={onClick} />
      </div>
    </li>
  );
}

export default ProfileSettingItem;
