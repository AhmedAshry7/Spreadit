import React from "react";
import styles from "./UserCard.module.css";
import peopleIcon from "../../assets/people.svg";
import Image from "next/image";

/**
 * UserCard component for displaying user information.
 * @component
 * @param {string} name The name of the user
 * @param {string} profilePicture The URL of the user's profile picture
 * @param {string} latestMeassageText The text of the latest message or photo if it is an image
 * @param {boolean} isSelected Indicates if the user card is selected
 * @param {boolean} display Indicates whether to display the user card
 * @returns {JSX.Element} The rendered UserCard component.
 *
 * @example
 * const name = "abdullah12";
 * const profilePicture = "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png";
 * const latestMeassageText = "Hello!";
 * const isSelected = true;
 * const display = true;
 * <UserCard name={name} profilePicture={profilePicture} latestMeassageText={latestMeassageText} isSelected={isSelected} display={display} />
 */

const UserCard = ({
  name,
  profilePicture,
  latestMeassageText,
  isSelected,
  display,
}) => {
  return (
    <div
      className={
        display
          ? isSelected
            ? styles.cardholderselected
            : styles.cardholder
          : styles.none
      }
      data-testid="card-holder"
    >
      {!profilePicture && (
        <Image
          src={peopleIcon}
          alt="profile picture"
          className={styles.picture}
        />
      )}
      {profilePicture && (
        <img
          src={profilePicture}
          alt="profile picture"
          className={styles.picture}
        />
      )}
      <div className={styles.cardtext}>
        <div className={styles.title}>
          <p className={styles.description}>{name}</p>
        </div>
        <p className={styles.description}>{latestMeassageText}</p>
      </div>
    </div>
  );
};

export default UserCard;
