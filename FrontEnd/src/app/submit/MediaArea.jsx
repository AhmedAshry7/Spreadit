import React, { useState, useRef, useEffect } from "react";
import styles from "./MediaArea.module.css";
import ImageUpload from "./ImageUpload";

/**
 * Component for handling media uploads and displaying them in a grid layout.
 * @component
 * @param   {Array}  mediaArray    Array containing media files.
 * @param   {Function}  setMediaArray  Function to update the media array.
 * @returns {JSX.Element} The rendered MediaArea component.
 *
 * @example
 * // Renders the MediaArea component with a mediaArray and setMediaArray function.
 * <MediaArea mediaArray={mediaArray} setMediaArray={setMediaArray} />;
 */

export default function MediaArea({
  mediaArray,
  setMediaArray,
  multipleImages = true,
  mediaAllowed = true,
}) {
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) =>
        // Filter out invalid file types
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
          "video/webm",
          "video/mp4",
          "video/mkv",
        ].includes(file.type),
      );
      setMediaArray([...mediaArray, ...validFiles]); // Update the media array with the uploaded files
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) =>
        // Filter out invalid file types
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
          "video/webm",
          "video/mp4",
          "video/mkv",
        ].includes(file.type),
      );
      setMediaArray([...mediaArray, ...validFiles]); // Update the media array with the dropped files
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeleteImage = (index) => {
    const updatedMediaArray = [...mediaArray];
    updatedMediaArray.splice(index, 1);
    setMediaArray(updatedMediaArray);
  };

  const handleKeypress = (event) => {
    // Check if the key pressed is the arrow keys
    if (event.key === "ArrowRight") {
      // Increment the selected state if it's less than mediaArray.length - 1
      if (selected == -1) {
        setSelected(mediaArray.length - 1);
      } else if (selected < mediaArray.length - 1) {
        setSelected(selected + 1);
      }
    } else if (event.key === "ArrowLeft") {
      // Decrement the selected state if it's greater than zero
      if (selected > 0) {
        setSelected(selected - 1);
      } else if (selected == -1) {
        setSelected(0);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [selected]);

  return (
    <div
      className={`${styles.container}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      data-testid="media-area"
    >
      {!mediaAllowed && (
        <p style={{ marginBottom: "1em" }} className="settings--p">
          This community does not allow image/video uploads.
        </p>
      )}
      {!multipleImages && mediaAllowed && (
        <p style={{ marginBottom: "1em" }} className="settings--p">
          Note: this community does not allow multiple images per post. In this
          case, only the first image/video (the leftmost) will be submitted.
        </p>
      )}
      {!mediaArray.length
        ? mediaAllowed && (
            <ImageUpload
              inputRef={inputRef}
              handleImageUpload={handleImageUpload}
            />
          )
        : mediaAllowed && (
            <div className={`${styles.uploadedBorder}`}>
              <div className={`${styles.uploadedFlex}`}>
                <div
                  className={`${styles.uploadedBlock} ${styles.uploadedBlockSize}`}
                >
                  <div
                    className={`${styles.uploadedContentFlow} ${styles.uploadedContentOverflow}`}
                  >
                    <div className={`${styles.uploadedImageFlex}`}>
                      {mediaArray.map((file, index) => (
                        <div
                          className={`${styles.uploadedImageFlex}`}
                          key={index}
                          onClick={() =>
                            setSelected(index === selected ? -1 : index)
                          }
                        >
                          <div draggable="true">
                            <span className={`${styles.uploadedImageSpanFlex}`}>
                              <span>
                                <div
                                  className={`${styles.uploadedImagePosition}
                            ${selected === index ? styles.uploadedImageSelected : ""}`}
                                >
                                  {file.type.includes("image") ? (
                                    <>
                                      <span
                                        className={`${styles.uploadedImageFormatting}
                              ${selected === index ? styles.uploadedImageSizeSelected : ""}`}
                                        style={{
                                          backgroundImage: `url(${URL.createObjectURL(
                                            file,
                                          )})`,
                                        }}
                                      >
                                        <button
                                          className={`${styles.deleteButton}`}
                                          data-testid="delete-button"
                                          onClick={() =>
                                            handleDeleteImage(index)
                                          }
                                        >
                                          <svg
                                            className={`${styles.deleteSvg}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 40 40"
                                          >
                                            <path d="M20 2.5C10.3 2.5 2.5 10.3 2.5 20c0 9.7 7.8 17.5 17.5 17.5S37.5 29.7 37.5 20C37.5 10.3 29.7 2.5 20 2.5zM24.2 27.7L20 23.5l-4.2 4.2c-1.1 1.1-2.5 1.1-3.5 0-1.1-1.1-1.1-2.4 0-3.5l4.2-4.2-4.2-4.2c-1.1-1.1-1.1-2.5 0-3.5 1.1-1.1 2.4-1.1 3.5 0l4.2 4.2 4.2-4.2c1.1-1.1 2.5-1.1 3.5 0 1.1 1.1 1.1 2.4 0 3.5L23.5 20l4.2 4.2c1.1 1.1 1.1 2.5 0 3.5C26.7 28.8 25.3 28.8 24.2 27.7z"></path>
                                          </svg>
                                        </button>
                                      </span>
                                    </>
                                  ) : (
                                    <span
                                      className={`${styles.uploadedImageFormatting}`}
                                    >
                                      <video
                                        className={`${styles.uploadedImageFormatting} ${selected === index ? styles.uploadedImageSizeSelected : ""}`}
                                        src={URL.createObjectURL(file)}
                                        style={{
                                          backgroundColor: "black",
                                          zIndex: "10",
                                        }}
                                        alt={`Media ${index}`}
                                      />
                                      <button
                                        className={`${styles.deleteButton}`}
                                        data-testid="delete-button"
                                        style={{
                                          position: "absolute",
                                          zIndex: "10000",
                                        }}
                                        onClick={() => handleDeleteImage(index)}
                                      >
                                        <svg
                                          className={`${styles.deleteSvg}`}
                                          style={{
                                            position: "absolute",
                                            zIndex: "10000",
                                          }}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 40 40"
                                        >
                                          <path d="M20 2.5C10.3 2.5 2.5 10.3 2.5 20c0 9.7 7.8 17.5 17.5 17.5S37.5 29.7 37.5 20C37.5 10.3 29.7 2.5 20 2.5zM24.2 27.7L20 23.5l-4.2 4.2c-1.1 1.1-2.5 1.1-3.5 0-1.1-1.1-1.1-2.4 0-3.5l4.2-4.2-4.2-4.2c-1.1-1.1-1.1-2.5 0-3.5 1.1-1.1 2.4-1.1 3.5 0l4.2 4.2 4.2-4.2c1.1-1.1 2.5-1.1 3.5 0 1.1 1.1 1.1 2.4 0 3.5L23.5 20l4.2 4.2c1.1 1.1 1.1 2.5 0 3.5C26.7 28.8 25.3 28.8 24.2 27.7z"></path>
                                        </svg>
                                      </button>
                                    </span>
                                  )}
                                </div>
                              </span>
                            </span>
                          </div>
                        </div>
                      ))}

                      <label
                        className={`${styles.uploadedAddMargin} ${styles.uploadedAddButton}`}
                      >
                        <input
                          type="file"
                          accept=".jpeg, .jpg, .png, .gif, .webm, .mp4, .mkv"
                          onChange={handleImageUpload}
                          data-testid="upload-button"
                          ref={inputRef}
                          style={{ display: "none" }}
                          multiple // Allow multiple file selection
                        />
                        <svg
                          className={`${styles.uploadedPlusIcon}`}
                          viewBox="0 0 20 20"
                          version="1.1"
                        >
                          <g stroke="none">
                            <g
                              transform="translate(-34.000000, -136.000000)"
                              fill="inherit"
                            >
                              <path d="M45.2,147.2 L48.8,147.2 C49.46272,147.2 50,146.66272 50,146 C50,145.33728 49.46272,144.8 48.8,144.8 L45.2,144.8 L45.2,141.2 C45.2,140.53728 44.66272,140 44,140 C43.33728,140 42.8,140.53728 42.8,141.2 L42.8,144.8 L39.2,144.8 C38.53728,144.8 38,145.33728 38,146 C38,146.66272 38.53728,147.2 39.2,147.2 L42.8,147.2 L42.8,150.8 C42.8,151.46272 43.33728,152 44,152 C44.66272,152 45.2,151.46272 45.2,150.8 L45.2,147.2 Z"></path>
                            </g>
                          </g>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
                {mediaArray.length >= 1 && mediaArray[selected] && (
                  <div className={`${styles.uploadedPreviewFlex}`}>
                    {mediaArray[selected].type.includes("image") ? (
                      <img
                        className={styles.uploadedPreviewImage}
                        src={URL.createObjectURL(mediaArray[selected])}
                      />
                    ) : (
                      <video
                        className={styles.uploadedPreviewImage}
                        src={URL.createObjectURL(mediaArray[selected])}
                        controls
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
    </div>
  );
}
