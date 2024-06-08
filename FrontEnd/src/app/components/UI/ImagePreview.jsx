import React from "react";
import styles from "./ImagePreview.module.css";

/**
 * ImagePreview component for displaying a preview of an image.
 * @component
 * @param {string} imageUrl The URL of the image to be displayed as a preview
 * @param {Function} onDelete Function to handle deletion of the image preview
 * @returns {JSX.Element} The rendered ImagePreview component.
 *
 * @example
 * const imageUrl = "https://wallpaperaccess.com/full/4723250.jpg";
 * const onDelete = () => {
 *   
 * };
 * <ImagePreview imageUrl={imageUrl} onDelete={onDelete} />
 */

const ImagePreview = ({ imageUrl, onDelete }) => {
  return (
    <div className={styles.imagepreview}>
      <img src={imageUrl} alt="preview image" className={styles.image} />
      <button onClick={onDelete} className={styles.xbutton}>
        X
      </button>
    </div>
  );
};
export default ImagePreview;
