import React from "react";
import styles from "./BlueButton.module.css";

/**
 * Component for displaying info about the form.
 * @component
 * @param   {any} children   The content of the button.
 * @param   {Function} onClick   The callback function to be called upon clicking on the button.
 * @returns {JSX.Element} The rendered Info component.
 *
 * @example
 * //renders a BlueButton component with an onClick function
 * const handleClick = () => console.log("Button Clicked")
 * <BlueButton onClick={handleClick}>Click Me</BlueButton>
 */

function BlueButton({ children, onClick }) {
  return (
    <div>
      <button onClick={onClick} className={styles.blue_button}>
        {children}
      </button>
    </div>
  );
}

export default BlueButton;
