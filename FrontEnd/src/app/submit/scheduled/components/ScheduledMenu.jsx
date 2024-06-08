import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ScheduledMenu.module.css";
import OutlineButton from "@/app/components/UI/OutlineButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Component for rendering the grayed-out modal menu for adding time
 * @component
 * @param   {Function} onClose       Function to toggle the menu
 * @param   {Function} changeTime     Function to save the time
 * @returns {JSX.Element}            The rendered GrayOutMenuWrapper component.
 *
 * @example
 * // Note: This component relies on its wrapper to set it to be visible
 * // Therefore, if you somehow set the menu to be visible but set the passed down functions as such
 * // You wont be able to exit the menu
 * const onClose = () => { console.log("Menu toggle attempt") };
 * const changeTime = () => { console.log("scheduled attempt from inside the menu") };
 * <GrayOutMenu onClose={onClose} changeTime={changeTime} />
 */
function ScheduledMenu({ onClose, changeTime }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [error, setError] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date && date < new Date()) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return null; // Return null if no date is selected
    return date.toISOString(); // Convert date to ISO string format
  };

  // Update formatted date when selected date changes
  useEffect(() => {
    setFormattedDate(formatDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    
  }, [formattedDate]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    // Check if displayName is not empty
    changeTime(formattedDate); // Pass an object with displayName to changeTime function
    onClose();
  };

  //Prevent menu from being closed
  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={`${styles.grayOut} `}>
      <div className={` ${styles.menuPosition}`}>
        <div
          aria-modal="true"
          className={styles.menuBox}
          role="dialog"
          tabIndex="-1"
          onClick={handleClick} // Prevent clicks from propagating to elements underneath the menu
        >
          <section className={styles.sectionSize}>
            <header className={styles.menuHeader}>
              <div className={styles.flexHeader}>
                <div className={styles.flexHeaderText}>
                  <div className={styles.textHeader}>Schedule this post</div>
                </div>
                <div
                  className={`${styles.flexX}`}
                  style={{ flexBasis: "16px" }}
                >
                  <button
                    data-testid="close-button"
                    className="focusable"
                    onClick={onClose}
                  >
                    <div className="color-X icon">&#10006;</div>
                  </button>
                </div>
              </div>
            </header>
            <div className={`${styles.menuBody} ${styles.padding}`}>
              <DatePicker
                data-testid="calendar"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
              />
            </div>
          </section>
          <footer
            className={styles.footer}
            style={{ display: "flex", alignItems: "center" }}
          >
            {error && (
              <p
                style={{ color: "red", fontSize: "12px", marginRight: "auto" }}
              >
                Selected date must be in the future
              </p>
            )}
            <OutlineButton
              children={"Save"}
              isFocusable={true}
              isDisabled={error}
              btnClick={handleSave}
              isInverted={true}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ScheduledMenu;
