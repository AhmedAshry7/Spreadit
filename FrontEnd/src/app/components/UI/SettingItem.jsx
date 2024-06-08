import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./SettingItem.module.css";
import Switch from "./Switch";
import Dropdown from "./Dropdown";
import OutlineButton from "./OutlineButton";

/**
 * Component for rendering SettingItem (a repeated `<div>` throughout the feed and profile settings pages)
 * Manages different types of settings such as switches, dropdowns, and buttons.
 * @component
 * @param {object} props  The props passed to the SettingItem component
 * @param {object} props.option  The setting option object containing title, description, type, and other details
 * @param {boolean} props.isLocked  Whether the setting item is locked or not (currently only used for `id` 2 (NSFW Blur option) )
 * @param {boolean} props.isToggled  The state of the switch (on or off)
 * @param {number} props.defaultDropdown  The default selected ID for the dropdown menu
 * @param {Function} props.onItemClick  The function to be called upon clicking the setting item
 * @param {Function} props.dropDownClick  The function to be called upon selecting an item from the dropdown
 * @returns {JSX.Element} The rendered SettingItem component.
 *
 * @example
 * // Example usage of SettingItem component for a switch
 * <SettingItem
 *   option={{
 *     id: 1,
 *     title: "Switch Setting",
 *     description: "Description of the switch setting",
 *     type: "switch",
 *     subOptions: []
 *   }}
 *   isLocked={false}
 *   isToggled={true}
 *   onItemClick={handleItemClick}
 * />
 * @example
 * // Example usage of SettingItem component for a dropdown
 * <SettingItem
 *   option={{
 *     id: 2,
 *     title: "Dropdown Setting",
 *     description: "Description of the dropdown setting",
 *     type: "dropdown",
 *     subOptions: [],
 *   }}
 *   defaultDropdown={1}
 *   onItemClick={handleItemClick}
 *   dropDownClick={handleDrop}
 * />
 * @example
 * // Example usage of SettingItem component for a button
 * <SettingItem
 *   option={{
 *     id: 3,
 *     title: "Button Setting",
 *     description: "Description of the button setting",
 *     type: "button",
 *     buttontext: "Click Me"
 *   }}
 *   onItemClick={handleItemClick}
 * />
 */
export default function SettingItem(props) {
  const [isSwitchToggled, setIsSwitchToggled] = useState(props.isToggled);
  const [previousSwitchState, setPreviousSwitchState] = useState(
    props.prevBlur,
  );

  /**
   * Redundant function intended for switch component. Now unneeded
   */
  const handleClick = () => {
    // Call the callback function if exists provided by the parent
    if (props.onItemClick) {
      props.onItemClick(props.option.id);
    }
  };

  /**
   * Handles the click event of the switch component.
   * Contains debug line
   * Toggles the switch state and triggers the parent callback with the updated state.
   */
  const handleSwitchToggle = () => {
    setIsSwitchToggled((prevState) => !prevState);
    
    props.onItemClick(props.option.id, !isSwitchToggled);
  };

  /**
   * Handles the selection of an item from the dropdown menu.
   * contains debug line
   * calls the parent callback with the selected `id`.
   * @param   {number} id          The ID of the parent option
   * @param   {number} selectedId  The ID of the selected sub-option
   */
  const handleDrop = (id, selectedId) => {
    
    props.dropDownClick(id, selectedId);
  };

  useEffect(() => {
    if (props.isLocked) {
      // If the component is being locked, store the current state of the switch toggle
      setPreviousSwitchState(isSwitchToggled);
      setIsSwitchToggled(false); // Set the switch toggle off when component is locked
    } else if (!props.isLocked && previousSwitchState !== undefined) {
      // If the component is being unlocked and there's a previous state recorded,
      // restore the switch toggle to its previous state
      setIsSwitchToggled(previousSwitchState);
    }
  }, [props.isLocked]); // Trigger effect when props.isLocked changes

  return (
    <div>
      <div className={styles.settingOption}>
        <div className={styles.settingOptionLeft}>
          <h3
            className={`settings--h3 ${props.isLocked ? styles.grayedOut : ""}`}
          >
            {props.option.title}
          </h3>
          <p
            className={`settings--p ${props.isLocked ? styles.grayedOut : ""}`}
          >
            {props.option.description}
          </p>
        </div>
        <div className={styles.settingOptionRight}>
          <div className={styles.settingOptionRightButtonFloat}>
            {props.option.type === "switch" && (
              <Switch
                isToggled={isSwitchToggled}
                onToggle={handleSwitchToggle}
                disabled={props.isLocked}
              />
            )}
            {props.option.type === "dropdown" && (
              <Dropdown
                pId={props.option.id}
                defId={props.defaultDropdown}
                selectedDropItem={handleDrop}
              />
            )}
            {props.option.type === "button" && (
              <OutlineButton btnClick={handleClick}>
                {" "}
                {props.option.buttontext}{" "}
              </OutlineButton>
            )}
          </div>
        </div>
      </div>

      {props.option.subOptions &&
        props.option.subOptions.map((subOption) => (
          <div className={styles.settingSuboption}>
            <SettingItem
              key={subOption.id}
              option={subOption}
              onItemClick={props.onItemClick}
              dropDownClick={props.dropDownClick}
            />
          </div>
        ))}
    </div>
  );
}
