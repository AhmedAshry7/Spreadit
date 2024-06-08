import React from "react";
import styles from "./OutlineButton.module.css";

/**
 * Component for rendering outline button (round white background button)
 * @component
 * @param {object} props  The props passed to the OutlineButton component
 * @param {boolean} props.isDisabled  Whether the button is disabled or not
 * @param {string} props.children Text inside button
 * @param {Function} props.btnClick The function to be called upon clicking the button
 * @returns {JSX.Element} The rendered OutlineButton component.
 *
 * @example
 * <OutlineButton isDisabled={false} btnClick={handleClick}>Click Me</OutlineButton>
 */
function OutlineButton(props) {
  /**
   * Leftover debug function
   */
  const handleClick = () => {
    
  };

  return (
    <div>
      <button
        role="button"
        tabIndex={props.isDisabled ? -1 : 0}
        className={`${styles.buttonBorder} ${styles.buttonText} ${props.isInverted ? styles.buttonColorInverted : styles.buttonColor} ${!props.isDisabled && props.isFocusable ? "focusable" : ""}`}
        onClick={props.btnClick}
        disabled={props.isDisabled}
      >
        {props.children}
      </button>
    </div>
  );
}

// Set a default value for colorInverted if not provided
OutlineButton.defaultProps = {
  isInverted: false,
};

export default OutlineButton;
