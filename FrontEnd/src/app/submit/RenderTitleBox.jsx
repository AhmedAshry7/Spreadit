import React, { useState } from "react";
import styles from "./RenderTitleBox.module.css";

/**
 * Component for rendering the title input box with character count in the submit page
 * @component
 * @param   {string} title   The current state of the title input.
 * @param   {function} setTitle   Function to update the title state.
 * @returns {JSX.Element} The rendered RenderTitleBox component.
 *
 * @example
 * // Renders a nonfunctional textbox
 * <RenderTitleBox />;
 * @example
 * // Renders with passed down function (assumed to be the setter) and default value of Custom Title
 * <RenderTitleBox
 *   title="Custom Title"
 *   setTitle={setTitleFunction}
 * />;
 */

function RenderTitleBox({ title, setTitle }) {
  const maxChars = 300;

  function handleInputChange(event) {
    const { value } = event.target;
    const newValue = value.replace(/[\r\n]/g, " "); // Remove line breaks
    if (newValue.length <= maxChars) {
      setTitle(newValue);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  return (
    <div className={`${styles.marginBottom8px}`}>
      <div className={`${styles.relativePosition}`}>
        <textarea
          maxLength="300"
          placeholder="Title"
          className={`${styles.textareaStyle} ${styles.textarea}`}
          rows="1"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          data-tribute="true"
          style={{
            overflowX: "hidden",
            overflowWrap: "break-word",
            height: "38.6px",
          }}
        ></textarea>
        <div className={`${styles.characterCount}`}>
          {title.length}/{maxChars}
        </div>
      </div>
    </div>
  );
}

export default RenderTitleBox;
