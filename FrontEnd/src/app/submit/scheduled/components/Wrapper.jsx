import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Wrapper.module.css";
import ScheduledMenu from "./ScheduledMenu";

/**
 * Wrapper for the menu to separate its visibility AND the actual options inside the menu itself
 * @component
 * @param   {boolean} isOpen         Flag indicating whether the menu is open or not
 * @param   {Function} onClose       Function to toggle the menu from inside
 * @param   {Function} addFunc       Passed down function to add scheduled time from inside the menu onto the `page.js`
 * @returns {JSX.Element}            The rendered Wrapper component
 *
 * @example
 * // Example usage of Wrapper (will be permanently on due to `isOpen` being `true`)
 * const isOpen = true;
 * const onClose = () => { console.log("Menu toggle attempt") };
 * const addFunc = () => { console.log("Scheduled add attempt") };
 * <Wrapper isOpen={isOpen} onClose={onClose} addFunc={addFunc} />
 */
function Wrapper({ isOpen, onClose, addFunc }) {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]); // Only re-run the effect if isOpen changes

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent scrolling when the menu is open
      if (isOpen && event.key === "Escape") {
        onClose();
      }
      if (
        isOpen &&
        (event.key === "ArrowUp" ||
          event.key === "ArrowDown" ||
          event.key === "Tab")
      ) {
        event.preventDefault();
        const focusableElements = document.querySelectorAll(".focusable");
        const focusedIndex = Array.from(focusableElements).indexOf(
          document.activeElement,
        );

        let nextIndex = focusedIndex + (event.shiftKey ? -1 : 1);
        if (nextIndex < 0) {
          nextIndex = focusableElements.length - 1; // Wrap around to the end
        } else if (nextIndex >= focusableElements.length) {
          nextIndex = 0; // Wrap around to the beginning
        }

        focusableElements[nextIndex].focus(); // Move focus to the next/previous element
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Use ReactDOM.createPortal to render the menu outside of its parent components
  return ReactDOM.createPortal(
    <ScheduledMenu onClose={onClose} changeTime={addFunc} />,
    document.body, // Render the menu as a direct child of the document body
  );
}

export default Wrapper;
