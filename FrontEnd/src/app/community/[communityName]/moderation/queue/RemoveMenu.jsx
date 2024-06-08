import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RemoveMenu.module.css";
import OutlineButton from "@/app/components/UI/OutlineButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import List from "@/app/components/UI/Listbutton";
import handler from "@/app/utils/apiHandler.js";
import getCookies from "@/app/utils/getCookies";

/**
 * Component for rendering the grayed-out modal menu for adding removal reason
 * @component
 * @param   {Function} onClose       Function to toggle the menu
 * @param   {Function} removeFunction     Function to remove post
 * @param   {string} title     Post title
 * @param   {string} postId     Post id
 * @param   {string} communityName     Community Name
 * @returns {JSX.Element}            The rendered RemoveMenu component.
 *
 * @example
 * // Note: This component relies on its wrapper to set it to be visible
 * // Therefore, if you somehow set the menu to be visible but set the passed down functions as such
 * // You wont be able to exit the menu
 * const onClose = () => { console.log("Menu toggle attempt") };
 * const removeFunction = () => { console.log("Remove attempt") };
 * <RemoveMenu  onClose={onClose} removeFunction={changeTime} />
 */
function RemoveMenu({
  onClose,
  removeFunction,
  title,
  postId,
  communityName,
  type,
  removalList = ["None"],
}) {
  const [token, setToken] = useState(null);
  const [reason, setReason] = useState("None");

  function handleDispInputChange(event) {
    const { value } = event.target;
    setReason(value);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    removeFunction(title, reason, postId, type);
    onClose();
  };

  //Prevent menu from being closed
  const handleClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    
  }, []);

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
                  <div className={styles.textHeader}>Add Removal Reason</div>
                </div>
                <div
                  className={`${styles.flexX}`}
                  style={{ flexBasis: "16px" }}
                >
                  <button
                    className="focusable"
                    onClick={onClose}
                    style={{ backgroundColor: "transparent", border: "0px" }}
                  >
                    <div className={`${styles.colorX} ${styles.icon}`}>
                      &#10006;
                    </div>
                  </button>
                </div>
              </div>
            </header>
            <div className={`${styles.menuBody} ${styles.padding}`}>
              <List
                type={"Removal Reason"}
                list={removalList}
                initialv={"None"}
                displayedColor={"grey"}
                choose={(item) => {
                  setReason(item);
                }}
              />
              {/*<textarea
            placeholder="(Optional)"
            className={`${styles.txtBox} focusable`}
            value={reason}
            data-tribute="true"
            onKeyDown={handleKeyPress}
            onChange={handleDispInputChange}
          />*/}
            </div>
          </section>
          <footer
            className={styles.footer}
            style={{ display: "flex", alignItems: "center" }}
          >
            <OutlineButton
              children={"Confirm"}
              isFocusable={true}
              btnClick={handleSave}
              isInverted={true}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default RemoveMenu;
