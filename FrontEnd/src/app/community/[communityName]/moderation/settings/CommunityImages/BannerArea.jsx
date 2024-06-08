import React, { useState, useRef, useEffect } from "react";
import styles from "./BannerArea.module.css";
import PlusIcon from "./PlusIcon";
import "./Community.css";

/**
 * Component rendering the banner upload area
 * @component
 * @param   {Function} setBannerUrl     The setter to the URL link
 * @param   {string} currentBanner     Current banner
 * @returns {JSX.Element} The rendered BannerArea component.
 *
 * @example
 * //Non interactive static area
 * <BannerArea />
 * //Print the URL to be returned
 * <bannerArea setBannerUrl={console.log(`${URL.createObjectURL(bannerImage)}`)}/>
 */
export default function BannerArea({
  setBanner,
  currentBanner = null,
  bannerUrl = "",
}) {
  const [bannerImage, setBannerImage] = useState(null);
  const [fakeUrl, setFakeUrl] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (bannerImage) {
      setBanner(bannerImage);
    }
  }, [bannerImage]);

  /**
   * Handles image upload event
   * @param   {object} event The event object triggered by the image upload
   * @returns {void} Nothing returned.
   *
   * @example
   * // This will set the bannerImage object, which will then have its URL derived by above useEffect
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
        setBannerImage(file);
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
        file.type === "image/gif"
      ) {
        setBannerImage(file);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    
    if (bannerUrl !== "" && bannerImage === null) setFakeUrl(bannerUrl);
    else if (bannerImage !== null)
      setFakeUrl(`${URL.createObjectURL(bannerImage)}`);
  }, [bannerImage, bannerUrl]);

  useEffect(() => {
    
  }, [fakeUrl]);

  return (
    <div
      className="profile--banner"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label className="profile--images-dragarea profile--images-border">
        <div
          style={{
            backgroundImage: `url(${fakeUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "200px",
          }}
        >
          {bannerImage || bannerUrl !== "" ? null : (
            <div className="profile--banner-shiftdown">
              <PlusIcon />
              <div className="profile--images-text">
                <span>
                  Drag and Drop or Upload{" "}
                  <span className="profile--images-textbold">Banner</span> Image
                </span>
              </div>
            </div>
          )}
        </div>
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
