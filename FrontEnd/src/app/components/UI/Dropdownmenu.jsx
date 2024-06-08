import React, { useState } from "react";
import "./dropdown.css";
import dropdownOptions from "./dropdownOptions"; // Ensure this import matches the export

/**
 * Component for rendering the expanded dropdown menu with selectable items.
 * @component
 * @param {object} props The props passed to the Dropdownmenu component
 * @param {Function} props.closeMenu Function to close the dropdown menu
 * @param {number} props.pId The parent ID associated with the dropdown menu
 * @param {Function} props.onSelect Function to handle the selection of dropdown items
 * @param {number} props.selectedId The initially selected ID for the dropdown menu
 * @returns {JSX.Element} The rendered Dropdownmenu component.
 *
 * @example
 * <Dropdownmenu closeMenu={closeDropdown} pId={1} onSelect={handleSelect} selectedId={2} />
 */
function Dropdownmenu({
  closeMenu,
  pId,
  onSelect,
  selectedId: initialSelectedId,
}) {
  const [selectedId, setSelectedId] = useState(initialSelectedId); // State to track the selected ID

  /**
   * Handles the click event on a dropdown item. Both sets the default selected item in the menu and sends back that value to `page.js`
   *
   * Has a leftover debug console log
   * @param {number} selectedItemId The ID of the selected dropdown item
   */
  const handleItemClick = (selectedItemId) => {
     // Debugging
    setSelectedId(selectedItemId);
    onSelect(selectedItemId);
  };

  /**
   * Renders the dropdown sub-items based on the dropdownOptions data file (will be updated later to the API counterpart)
   * @returns {JSX.Element[]} Array of JSX elements representing dropdown items.
   */
  const renderDropdownItems = () => {
    // Find the object with the matching parentId
    const parentObject = dropdownOptions.find(
      (option) => option.parentId === pId,
    );

    // Map over the choices array of the found object
    return (
      parentObject &&
      parentObject.choices.map((option) => (
        <button
          key={option.dropId}
          role="menuitem"
          className="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _1oYEKCssGFjqxQ9jJMNj5G"
          onClick={() => handleItemClick(option.dropId)}
        >
          <span className="pthKOcceozMuXLYrLlbL1">{option.icon}</span>
          <span
            className={`${option.dropId === selectedId ? "blue" : "_2-cXnP74241WI7fpcpfPmg"}`}
          >
            {option.desc}
          </span>
        </button>
      ))
    );
  };

  return (
    <div className="_1VhYfuKTAdUU_3j4cMjkr5">
      <div className="menuFormat">{renderDropdownItems()}</div>
    </div>
  );
}

export default Dropdownmenu;
