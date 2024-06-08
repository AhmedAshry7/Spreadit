import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import AvatarArea from "./profile_images/AvatarArea";
import BannerArea from "./profile_images/BannerArea";

/**
 * Component for images section in the profile settings page. (This component and its children only have access to the setter, not the stored url)
 * @component
 * @param   {Function} setAvatar         Setter for the profile image to be uploaded after upload
 * @param   {Function} setBanner   Setter for the profile banner to be uploaded after upload
 * @returns {JSX.Element} The rendered ProfileImages component.
 *
 * @example
 * //Renders the images section with the setters simply logging the action made
 * <ProfileImages setAvatarUrl={console.log(`Avatar URL changed`) setBannerUrl={console.log(`Banner URL changed`)} />;
 */
export default function ProfileImages({
  setAvatar,
  setBanner,
  avatar,
  avatarUrl,
  banner,
  bannerUrl,
}) {
  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">Avatar and banner image</h3>
          <p className="settings--p ">Images must be .png or .jpg format</p>
        </div>
        <div class="settings--flexoption">
          <div className="profile--images-flexdrag">
            <AvatarArea
              setAvatar={setAvatar}
              currentAvatar={avatar}
              avatarUrl={avatarUrl}
            />
            <BannerArea
              setBanner={setBanner}
              currentBanner={banner}
              bannerUrl={bannerUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
