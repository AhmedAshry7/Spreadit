import React from "react";
import styles from "./ImageUpload.module.css";

/**
 * Component for rendering a file input field for uploading images and videos.
 * @component
 * @param   {Function}  handleImageUpload  Function to handle image upload.
 * @returns {JSX.Element} The rendered ImageUpload component.
 *
 * @example
 * // Renders the ImageUpload component with handleImageUpload function.
 * <ImageUpload handleImageUpload={handleImageUpload} />;
 */

function ImageUpload({ handleImageUpload }) {
  return (
    <div className={`${styles.uploadWrapper}`}>
      <p className={`${styles.uploadText}`}>
        Drag and drop images or{" "}
        <div style={{ marginLeft: "10px" }}>
          <label
            className={`${styles.uploadButton} ${styles.uploadButtonBorder}`}
          >
            Upload
            <input
              type="file"
              accept=".jpeg, .jpg, .png, .gif, .webm, .mp4, .mkv"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              multiple // Allow multiple file selection
            />
          </label>
        </div>
      </p>
    </div>
  );
}

export default ImageUpload;
