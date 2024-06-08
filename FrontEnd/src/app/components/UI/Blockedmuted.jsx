import React from "react";
import Image from "next/image";
import pathPP2 from "../../assets/PP2.png";
import styles from "./Blockedmuted.module.css";
import { useRouter } from "next/navigation";

/**
 * component for showing and removing from a list of users or communities
 * @component
 * @param {string} profilename The profile name of the user or the community
 * @param {int} path Which path of the profile picture
 * @param {function} onRemove Function to be called when remove button is clicked
 * @returns {JSX.Element} The rendered Blockedmuted component.
 *
 * @example
 * const userName = "Name"
 * const pathNumber = 1
 * function print() {console.log("Removed")}
 * <Blockedmuted profilename={userName} path= {pathNumber} onRemove={print()}/>
 */

const Blockedmuted = (props) => {
  const router = useRouter();
  const removeProfile = () => {
    
    props.onRemove(props.profilename); // Call the function passed from the parent component
  };
  return (
    <div className={styles.smallcontainer}>
      <div className={styles.removecontainer}>
        <div
          className={styles.smallprofile}
          onClick={() => {
            router.push(`/profile/${props.profilename}`);
          }}
        >
          <Image
            className={styles.smallprofilepicture}
            width={30}
            height={30}
            src={props.avatar !== undefined ? props.avatar : pathPP2}
            alt={props.profilename}
          />
          <p className={styles.profilename}>{props.profilename}</p>
        </div>
        <button className={styles.removebutton} onClick={removeProfile}>
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default Blockedmuted;
