import React, { useState, useRef, useEffect } from "react";
import styles from "./RichToolbarItem.module.css";

/**
 * RichToolbarItem component represents an item in the toolbar of the RichTextEditor.
 * It contains an icon button that triggers a specific formatting action when clicked.
 *
 * @component
 * @param {Function} onClick - The function to call when the toolbar item is clicked.
 * @param {string} ariaLabel - The accessible label for the toolbar item.
 * @param {boolean} ariaSelected - Indicates whether the toolbar item is selected.
 * @param {string} className - Additional CSS classes to apply to the toolbar item.
 * @param {JSX.Element} icon - The icon element to display within the toolbar item.
 * @returns {JSX.Element} The rendered RichToolbarItem component.
 *
 * @example
 * // Renders a RichToolbarItem with a specific icon and onClick handler.
 * <RichToolbarItem
 *   onClick={() => console.log('Bold button clicked')}
 *   ariaLabel="Bold"
 *   ariaSelected={false}
 *   className="custom-icon"
 *   icon={<strong>&#66;</strong>}
 * />
 */

function RichToolbarItem({
  onClick,
  ariaLabel,
  ariaSelected,
  className,
  icon,
}) {
  return (
    (icon || className || ariaSelected || ariaLabel || onClick) && (
      <span>
        <button
          role="button"
          onClick={onClick}
          tabIndex="-1"
          aria-label={ariaLabel}
          aria-selected={ariaSelected}
          className={`${styles.RichTextToolbarItem} ${className}`}
        >
          <span className={`${styles.miscIcon} icon icon-add`}>{icon}</span>
        </button>
      </span>
    )
  );
}

export default RichToolbarItem;
