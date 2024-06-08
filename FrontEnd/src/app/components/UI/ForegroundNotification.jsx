import styles from "./ForegroundNotification.module.css";
import Image from "next/image";
import logo from "../../assets/logoSpreadIt.svg";

/**
 * foreground notification pop up.
 * @compoenent
 * @param   {string} message   The text to be displayed in the notifiction [Required]
 * @param   {function} onClick   The function to be called when the notification is clicked [Required]
 * @returns {JSX.Element} The component of the for foreground notification pop up.
 *
 * @example
 * //renders a notification pop up component with text and onClick function
 * const text = "Click Me"
 * const onClick = () => console.log("Notification Clicked")
 * <ForegroundNotification text={text} onClick={onClick}/>
 *
 */

function ForegroundNotification({ message }) {
  return (
    <div className={styles.notification}>
      <div className={styles.body}>
        <Image src={logo} alt="button image" width={32} height={32} />
        <div className={styles.text}>{message}</div>
      </div>
    </div>
  );
}

export default ForegroundNotification;
