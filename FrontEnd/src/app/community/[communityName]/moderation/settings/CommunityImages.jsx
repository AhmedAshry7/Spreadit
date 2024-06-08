import Image from "next/image";
import React, { useState, useEffect } from "react";
import AvatarArea from "./CommunityImages/AvatarArea";
import BannerArea from "./CommunityImages/BannerArea";

/**
 * Component for images section in the community settings page. (This component and its children only have access to the setter, not the stored url)
 * @component
 * @param   {Function} setAvatar         Setter for the community image to be uploaded after upload
 * @param   {Function} setBanner   Setter for the community banner to be uploaded after upload
 * @param   {string} currentBanner   Current community banner for preview
 * @param   {string} currentAvatar   Current community avatar for preview
 * @returns {JSX.Element} The rendered CommunityImages component.
 *
 * @example
 * //Renders the images section with the setters simply logging the action made
 * <CommunityImages setAvatar={console.log(`Avatar changed`) setBanner={console.log(`Banner changed`)} />;
 */
export default function CommunityImages({
  setAvatar,
  setBanner,
  currentBanner = null,
  currentAvatar = null,
  avatarUrl,
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
          <div className="images-flexdrag">
            <AvatarArea
              setAvatar={setAvatar}
              currentAvatar={currentAvatar}
              avatarUrl={avatarUrl}
            />
            <BannerArea
              setBanner={setBanner}
              currentBanner={currentBanner}
              bannerUrl={bannerUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
