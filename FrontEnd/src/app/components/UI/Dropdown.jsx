import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import Dropdownmenu from "./Dropdownmenu";
import DropdownItem from "./DropdownItem";

/**
 * Macro component for rendering a dropdown menu.
 *
 * Renders the dropdown box, then the menu when needed
 *
 * Manages the visibility of the menu and selection of dropdown items.
 * @component
 * @param {object} props  The props passed to the Dropdown component
 * @param {number} props.defId  The default selected ID for the dropdown menu (default or preloaded from api)
 * @param {number} props.pId  The parent ID associated with the dropdown
 * @param {Function} props.selectedDropItem The function to be called when a dropdown item is selected
 * @returns {JSX.Element} The rendered Dropdown component.
 *
 * @example
 * <Dropdown defId={1} pId={2} selectedDropItem={handleSelectedDropItem} />
 */

function Dropdown(props) {
  const [defaultOption, setDefaultOption] = useState(1);

  useEffect(() => {
    
    if (props.defId === "Hot") {
      setSelectedId(1);
    } else if (props.defId === "New") setSelectedId(2);
    else if (props.defId === "Top") setSelectedId(3);
    else if (props.defId === "Rising") setSelectedId(4);
    else if (props.defId === "Card") setSelectedId(1);
    else if (props.defId === "Classic") setSelectedId(2);
    else if (props.defId === "Compact") setSelectedId(3);
  }, []);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const [selectedId, setSelectedId] = useState(defaultOption); // Initial selectedId state

  /**
   * Toggle the visibility of the dropdown menu
   */
  const toggleMenuVisibility = () => {
    setIsMenuVisible((prevIsMenuVisible) => !prevIsMenuVisible);
  };

  /**
   * Closes the dropdown menu when clicking outside the dropdown container
   * @param {MouseEvent} event  mouse event
   */
  const closeMenu = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  /**
   * Handles the change of selected dropdown item
   * @param {number} newSelectedId  the ID of the newly selected dropdown item
   *
   * NOTE!! The `setSelectedId` in this component is exclusively for render purposes
   *
   * The actual new `id` is sent back into the `page.js` using the passed down prop function `selectedDropItem`
   */
  const handleSelectedIdChange = (newSelectedId) => {
    // Update the selectedId state with the new value
    setSelectedId(newSelectedId);
    
    props.selectedDropItem(props.pId, newSelectedId);
    setIsMenuVisible(false);
  };

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <DropdownItem
          toggleMenu={toggleMenuVisibility}
          pId={props.pId}
          selectedId={selectedId}
          onSelect={handleSelectedIdChange}
        />
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            marginLeft: "20px",
            //right: "80px", // Align the menu to the right
            display: isMenuVisible ? "block" : "none",
          }}
        >
          <Dropdownmenu
            pId={props.pId}
            selectedId={selectedId}
            onSelect={handleSelectedIdChange}
          />
        </div>
      </div>
    </>
  );
}

export default Dropdown;
