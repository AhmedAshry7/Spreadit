import styles from "./Button.module.css";

/**
 * Component for rendering a button.
 * @component
 * @param {string} name - The text displayed on the button.
 * @param {Function} onClick - The function to be called when the button is clicked.
 * @param {boolean} [active=true] - Determines if the button is active or inactive. Defaults to true.
 * @returns {JSX.Element} - The rendered Button component.
 *
 * @example
 * // Renders an active button with the text "Submit"
 * <Button name="Submit" onClick={() => console.log("Button clicked")} />
 *
 * @example
 * // Renders an inactive button with the text "Cancel"
 * <Button name="Cancel" onClick={() => console.log("Button clicked")} active={false} />
 */

function Button({ name, onClick, active }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={`${styles.button} ${active === false ? styles.inactive : ""}`}
        disabled={active === false}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
