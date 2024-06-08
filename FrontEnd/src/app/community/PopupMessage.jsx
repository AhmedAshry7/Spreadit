import React, { useState, useEffect } from "react";
import "./PopupMessage.css";

/**
 * Displays a popup message that automatically hides after 3 seconds
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display in the popup
 * @returns {JSX.Element} A styled popup message component that shows and then hides
 *
 * @example
 * <PopupMessage message="Hello, World!" />
 */

const PopupMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the pop-up message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`popup-message ${isVisible ? "show" : "hide"}`}>
      {message}
    </div>
  );
};

export default PopupMessage;
