import React, { useState } from "react";
import styles from "./Checkbox.module.css";

/**
 * Checkbox component for toggling a boolean value.
 * @component
 * @param {string} label - The label text for the checkbox.
 * @param {boolean} isChecked - The initial checked state of the checkbox.
 * @param {Function} onToggle - The function to call when the checkbox is toggled.
 * @param {boolean} isDisabled - Indicates if the checkbox is disabled.
 * @returns {JSX.Element} The rendered Checkbox component.
 *
 * @example
 * // Renders a Checkbox component with a label and initial checked state.
 * <Checkbox
 *   label="Enable Notifications"
 *   isChecked={true}
 *   onToggle={(isChecked) => console.log('Checkbox toggled:', isChecked)}
 *   isDisabled={false}
 * />
 */

const Checkbox = ({
  label,
  isChecked = false,
  onToggle,
  isDisabled = false,
}) => {
  const [status, setStatus] = useState(isChecked);

  const toggleCheckbox = () => {
    setStatus(!status);
    onToggle(!isChecked);
  };

  return (
    <div
      data-testid="checkbox"
      className={`${styles.checkboxWrapper}`}
      onClick={toggleCheckbox}
    >
      <div
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        aria-labelledby="send-replies"
        role="checkbox"
        tabIndex="0"
        className={`${styles.checkbox}`}
      >
        <input
          type="hidden"
          value={status}
          disabled={isDisabled}
          data-testid="checkbox-input"
        />
        {!isChecked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className={`${styles.unchecked}`}
          >
            <path
              fill="inherit"
              d="M1.66666667,3.34755033 L1.66666667,16.6524497 C1.66666667,17.5781756 2.42112363,18.3333333 3.34755033,18.3333333 L16.6524497,18.3333333 C17.5781756,18.3333333 18.3333333,17.5788764 18.3333333,16.6524497 L18.3333333,3.34755033 C18.3333333,2.42182438 17.5788764,1.66666667 16.6524497,1.66666667 L3.34755033,1.66666667 C2.42182438,1.66666667 1.66666667,2.42112363 1.66666667,3.34755033 Z M0,3.34755033 C0,1.49874933 1.5032506,0 3.34755033,0 L16.6524497,0 C18.5012507,0 20,1.5032506 20,3.34755033 L20,16.6524497 C20,18.5012507 18.4967494,20 16.6524497,20 L3.34755033,20 C1.49874933,20 0,18.4967494 0,16.6524497 L0,3.34755033 Z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className={`${styles.checkboxIcon}`}
          >
            <path
              fill="inherit"
              d="M0,3.34755033 C0,1.49874933 1.5032506,0 3.34755033,0 L16.6524497,0 C18.5012507,0 20,1.5032506 20,3.34755033 L20,16.6524497 C20,18.5012507 18.4967494,20 16.6524497,20 L3.34755033,20 C1.49874933,20 0,18.4967494 0,16.6524497 L0,3.34755033 Z M8.50575,15.1995 L15.797625,7.907625 C16.25325,7.452625 16.25325,6.71325 15.797625,6.25825 C15.342,5.802625 14.602625,5.802625 14.147625,6.25825 L7.7295,12.676375 L5.635125,10.327625 C5.20575,9.846375 4.46825,9.805125 3.987625,10.23325 C3.506375,10.662625 3.4645,11.400125 3.89325,11.88075 L6.810125,15.151375 C7.023875,15.39075 7.327,15.531375 7.647625,15.54075 C7.658875,15.54075 7.6695,15.541375 7.68075,15.541375 C7.990125,15.541375 8.287,15.41825 8.50575,15.1995 Z"
            ></path>
          </svg>
        )}
        <div className={`${styles.notificationLabel}`}>{label}</div>
      </div>
    </div>
  );
};

export default Checkbox;
