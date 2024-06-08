import React, { useState, useRef, useEffect } from "react";
import styles from "./AvatarArea.module.css";
import PlusIcon from "./PlusIcon";
import "./Community.css";

/**
 * Component rendering the avatar upload area
 * @component
 * @param   {Function} setAvatarUrl     The setter to the URL link
 * @param   {string} currentAvatar     Current avatar
 * @returns {JSX.Element} The rendered AvatarArea component.
 *
 * @example
 * //Non interactive static area
 * <AvatarArea />
 * //Print the URL to be returned
 * <AvatarArea setAvatarUrl={console.log(`${URL.createObjectURL(avatarImage)}`)}/>
 */
export default function AvatarArea({
  setAvatar,
  currentAvatar = null,
  avatarUrl = "",
}) {
  const [avatarImage, setAvatarImage] = useState(null);
  const [fakeUrl, setFakeUrl] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    
  }, []);
  useEffect(() => {
    if (avatarImage) {
      setAvatar(avatarImage);
    }
  }, [avatarImage]);

  /**
   * Handles image upload event
   * @param   {object} event The event object triggered by the image upload
   * @returns {void} Nothing returned.
   *
   * @example
   * // This will set the avatarImage object, which will then have its URL derived by above useEffect
   * <input type="file" onChange={handleImageUpload} />
   */
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/webp"
      ) {
        setAvatarImage(file);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/webp"
      ) {
        setAvatarImage(file);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (avatarUrl !== "" && avatarImage === null) setFakeUrl(avatarUrl);
    else if (avatarImage !== null) setFakeUrl(URL.createObjectURL(avatarImage));
  }, [avatarImage, avatarUrl]);

  return (
    <div
      className="profile--avatar"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label className="profile--images-dragarea profile--images-border">
        {avatarImage || avatarUrl !== "" ? (
          <img
            className={`${styles.box} ${styles.color} ${styles.border} }`}
            src={fakeUrl}
            alt="Uploaded Avatar"
          />
        ) : (
          <>
            <PlusIcon />
            <div className="profile--images-text">
              <span>
                Drag and Drop or Upload{" "}
                <span className="profile--images-textbold">Avatar</span> Image
              </span>
            </div>
          </>
        )}
        <input
          type="file"
          accept=".png, .jpg"
          onChange={handleImageUpload}
          className="acceptinput"
          ref={inputRef}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
