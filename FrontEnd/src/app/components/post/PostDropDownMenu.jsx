import React, { useRef, useEffect } from "react";
import styles from "./PostDropDownMenu.module.css";

/**
 * Component For Displaying a post dropdown menu.
 * @component
 * @param   {JSX.Element} children   The children to be displayed in the dropdown menu [Required]
 * @param   {boolean} showDropdown   If the dropdown menu is shown [Required]
 * @param   {function} setShowDropDown   The function to set the dropdown menu [Required]
 * @returns {JSX.Element} The component for the PostDropDownMenu.
 *
 * @example
 *
 * <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropDown}>
 *  <PostDropDownItem description="Follow" icon={follow} iconAlt={"Follow Icon"} onClick={toggleFollow}/>
 * <PostDropDownItem description="Comments" icon={comments} iconAlt={"Comments Icon"} onClick={message}/>
 * <PostDropDownItem description="Report" icon={reportIcon} iconAlt={"Report Icon"} onClick={report}/>
 * </PostDropDownMenu>
 *
 */

function PostDropDownMenu({ children, showDropdown, setShowDropDown }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div
      className={`${styles.dropdown_menu} ${showDropdown ? styles.active : styles.inactive}`}
    >
      <ul className={styles.no_style} ref={ref}>
        {children}
      </ul>
    </div>
  );
}

export default PostDropDownMenu;
