import React from "react";
import Image from "next/image";
import styles from "./PostDropDownItem.module.css";

/**
 * Component For Displaying a post dropdown Item.
 * @component
 * @param {string} icon The path to the icon for the dropdown item [Required]
 * @param {string} iconAlt The alt text for the icon [Required]
 * @param {string} description The description of the dropdown item [Required]
 * @param {function} onClick The function to be called when the dropdown item is clicked [Required]
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

function PostDropDownItem({ icon, iconAlt, description, onClick }) {
  return (
    <li className={styles.dropdown_item} onClick={onClick}>
      <div className={styles.option}>
        {icon && <Image width={20} height={20} src={icon} alt={iconAlt} />}
        <span>{description}</span>
      </div>
    </li>
  );
}

export default PostDropDownItem;
