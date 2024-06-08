import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./GrayOutMenu.module.css";
import SocialLink from "./SocialLink";
import OutlineButton from "@/app/components/UI/OutlineButton";
import social from "../../social";

/**
 * Component for rendering the grayed-out modal menu for adding social links
 * @component
 * @param   {Function} onClose       Function to toggle the menu
 * @param   {Function} onSelectGray  Function passed down from the wrapper onto the component itself (unnecessary and unused)
 * @param   {Function} addSocial     Function to add a new social link
 * @returns {JSX.Element}            The rendered GrayOutMenuWrapper component.
 *
 * @example
 * // Note: This component relies on its wrapper to set it to be visible
 * // Therefore, if you somehow set the menu to be visible but set the passed down functions as such
 * // You wont be able to exit the menu
 * const onClose = () => { console.log("Menu toggle attempt") };
 * const addSocial = () => { console.log("Social link add attempt") };
 * <GrayOutMenu onClose={onClose} addSocial={addSocial} />
 */
function GrayOutMenu({ onClose, onSelectGray, addSocial }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isChoicesOpen, setChoicesOpen] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [platform, setPlatform] = useState("Platform");
  const [socialUrl, setUrl] = useState("");
  const [selectedLinkId, setSelectedLinkId] = useState(-1);

  function handleDispInputChange(event) {
    const { value } = event.target;
    setDisplayName(value);
  }

  function handleUrlInputChange(event) {
    const { value } = event.target;
    setUrl(value);
  }

  const handleToggleStates = () => {
    setDialogOpen((prevState) => !prevState);
    setChoicesOpen((prevState) => !prevState);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    if (displayName.trim() !== "" && socialUrl.trim() !== "") {
      // Check if displayName is not empty
      addSocial(platform, socialUrl, displayName, socialUrl); // Pass an object with displayName to addSocial function
      onClose();
    }
  };

  //Prevent menu from being closed
  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleLinkClick = (id) => {
    handleToggleStates();
    setSelectedLinkId(id);
    const matchingSocial = social.find(
      (optionSocial) => optionSocial.id === id,
    );
    if (matchingSocial) {
      setPlatform(matchingSocial.platform);
    }
  };

  const renderDialog = () => {
    return (
      <>
        {social.map(
          (optionSocial, index) =>
            optionSocial.id === selectedLinkId && (
              <SocialLink
                key={index}
                id={index}
                displayName={optionSocial.name}
                platform={optionSocial.platform}
                wasClicked={(id) => {}} //Does nothing, just to stop errors from popping up
              />
            ),
        )}
        <div>
          <input
            placeholder="Display text"
            className={`${styles.txtBox} focusable`}
            value={displayName}
            data-tribute="true"
            onKeyDown={handleKeyPress}
            onChange={handleDispInputChange}
          />
          <input
            placeholder="insert url"
            onChange={handleUrlInputChange}
            className={`${styles.txtBox} focusable`}
            value={socialUrl}
            data-tribute="true"
            onKeyDown={handleKeyPress}
          />
        </div>
      </>
    );
  };

  const renderChoices = () => {
    return (
      <>
        {social.map((optionSocial, index) => (
          <SocialLink
            className
            isFocusable={true}
            platform={optionSocial.platform}
            key={index}
            index={index}
            displayName={optionSocial.name}
            wasClicked={handleLinkClick}
          />
        ))}
      </>
    );
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
                {isDialogOpen && (
                  <div
                    className={styles.backArrow}
                    style={{ flexBasis: "16px" }}
                  >
                    <button className="focusable" onClick={handleToggleStates}>
                      <div className="color-X icon">&larr;</div>
                    </button>
                  </div>
                )}
                <div className={styles.flexHeaderText}>
                  <div className={styles.textHeader}>Add Social Link</div>
                </div>
                {isChoicesOpen && (
                  <div
                    className={`${styles.flexX}`}
                    style={{ flexBasis: "16px" }}
                  >
                    <button className="focusable" onClick={onClose}>
                      <div className="color-X icon">&#10006;</div>
                    </button>
                  </div>
                )}
                {isDialogOpen && (
                  <div
                    className={`${styles.flexX}`}
                    style={{ flexBasis: "16px" }}
                  >
                    <OutlineButton
                      children={"Save"}
                      isDisabled={displayName === "" || socialUrl === ""}
                      isFocusable={true}
                      btnClick={handleSave}
                      isInverted={true}
                    />
                  </div>
                )}
              </div>
            </header>
            <div className={`${styles.menuBody} ${styles.padding}`}>
              {isChoicesOpen && renderChoices()}
              {isDialogOpen && renderDialog()}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default GrayOutMenu;
