import React from "react";
import styles from "./PlusIcon.module.css";

/**
 * Component rendering the plus icon used in the image upload areas
 * @component
 * @returns {JSX.Element} The rendered PlusIcon component.
 */
export default function PlusIcon() {
  return (
    <div className={styles.margin}>
      <svg
        className={`${styles.ColorSizing} ${styles.svgContainer}`}
        viewBox="0 0 36 36"
        version="1.1"
      >
        <circle cx="18" cy="18" fill="#fff" r="17.5" stroke="inherit"></circle>
        <path
          clip-rule="evenodd"
          d="m25.2 16.8001h-6v-6c0-.6624-.5364-1.2-1.2-1.2s-1.2.5376-1.2 1.2v6h-6c-.6636 0-1.20002.5376-1.20002 1.2s.53642 1.2 1.20002 1.2h6v6c0 .6624.5364 1.2 1.2 1.2s1.2-.5376 1.2-1.2v-6h6c.6636 0 1.2-.5376 1.2-1.2s-.5364-1.2-1.2-1.2z"
          fill="inherit"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
