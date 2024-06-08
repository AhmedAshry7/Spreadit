import React from "react";
import styles from "./GrayButton.module.css";

/**
 * Component for social links section in the profile settings page.
 * @component
 * @param   {boolean} isDisabled         Boolean to set the button to be disabled (used mainly when social links count is 5)
 * @param   {Function} wasClicked   The function to be called when button is clicked
 * @param   {string} children    The title of the button
 * @returns {JSX.Element} The rendered GrayButton component.
 *
 * @example
 * //Renders the button in a static manner where it is non functional
 * <GrayButton />;
 * @example
 * //Same but given a title
 * <GrayButton children={"This button doesnt work"}/>;
 * //Console log when clicked
 * <GrayButton children={"Click"} wasClicked={console.log(`Clicked`)}/>;
 * //Permanently set the button to be disabled (under normal circumstances, a state should be passed down)
 * <GrayButton children={"Disabled"} wasClicked={console.log(`You are not supposed to see this`)} isDisabled={true}/>;
 */
function GrayButton({ children, wasClicked, isDisabled }) {
  return (
    <>
      {isDisabled && (
        <li class={styles.buttonroundd} tabIndex="0" role="button">
          <i className="icon">&#43;</i>
          {children}
        </li>
      )}

      {!isDisabled && (
        <li
          class={styles.buttonround}
          onClick={wasClicked}
          tabIndex="0"
          role="button"
        >
          <i className="icon">&#43;</i>
          {children}
        </li>
      )}
    </>
  );
}

export default GrayButton;
