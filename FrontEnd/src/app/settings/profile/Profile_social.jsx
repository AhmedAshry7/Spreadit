import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import GrayButton from "./components/GrayButton";
import SocialLink from "./components/SocialLink";
import GrayOutMenuWrapper from "./components/GrayOutMenuWrapper"; // Import the correct component
import social from "../social.js";

/**
 * Component for social links section in the profile settings page.
 * @component
 * @param   {boolean} isOpen         Boolean to check if the modal menu is open
 * @param   {Function} onClose   The function to be called when the "Add social link" Button button is clicked, but is also passed down for the X close button or when the menu wants to close, so it is actually intended to be the toggler for the modal menu
 * @param   {Function} onSelectSocial    Function triggered when a social link bubble is clicked (actually not necessary, a leftover from debugging)
 * @param   {Function} addSocialLink   The function to be called when the save button is clicked
 * @param   {Function} deleteSocialLink   The function to be called when the black parallel social link bubble is clicked
 * @param   {Object[]} socialLinks   An array of social links containing the id, display name, logo, and url linked passed down as a state from page.js
 * @returns {JSX.Element} The rendered ProfileSocial component.
 *
 * @example
 * //Renders the section in a static manner where you cant interact with it at all as no handlers were passed down
 * <ProfileSocial />;
 * @example
 * //Renders the section with the overlay set to be on by default
 * //setting `isOpen` to false also will never allow you to open the menu
 * //These are not intended under normal circumstances
 * //This is because `isOpen` is supposed to be "married" to its state, and this is the only way it can be toggled, but with a plain boolean
 * //constant passed as a prop, it will never be modified.
 * <ProfileSocial isOpen={true} />;
 * @example
 * //When pressing the "add social link" button, or the X close icon, or attempting to save, `onClose` will be called since it is the toggler
 * //In practice, this will never allow the menu to open. but if we set the menu to be permanently on, then onClose will also be called
 * //when pressing the X button or when attempting to save the changes
 * <ProfileSocial isOpen={isOpen} onClose={console.log(`Menu Toggle Attempt Detected: ${isOpen}`)} />;
 * @example
 * //onSelectSocial: Unnecessary debug leftover. Will trigger whenever a social link bubble is clicked (whether in the page or inside the menu as they use the same component)
 * <ProfileSocial isOpen={isOpen} onClose={onClose} onSelectSocial={console.log(`Social Link Clicked`) />;
 * @example
 * //addSocialLink: Supposed to be a setter that adds given object parameters (id, name, url, logo) to `socialLinks` array in the page.js upon saving
 * <ProfileSocial isOpen={isOpen} onClose={onClose} addSocialLink={console.log(`Social Link Created. id: ${id} name: ${name} logo: ${logo} link: ${link}`)} />;
 * //deleteSocialLink: triggered when clicking the delete icon. passes back the Id of the attempted to delete icon
 * <ProfileSocial isOpen={isOpen} onClose={onClose} addSocialLink={addSocialLink} deleteSocialLink={console.log(`Social Link deleted. id: ${id} `)}/>;
 */
export default function ProfileSocial({
  isOpen,
  onClose,
  onSelectSocial,
  addSocialLink,
  deleteSocialLink,
  socialLinks,
}) {
  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">Social links (5 max)</h3>
          <p className="settings--p">
            People who visit your profile will see your social links.
          </p>
        </div>
        <div className="settings--flexoption">
          <nav className="profile--social-nav">
            <ul>
              {socialLinks.map((link, index) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SocialLink
                    key={index}
                    platform={link.platform}
                    displayName={link.displayName}
                    index={index}
                    isLink={true}
                    isDeletor={true}
                    url={link.url}
                    wasClicked={deleteSocialLink}
                  />
                </div>
              ))}
              <GrayButton
                children={"Add social link"}
                wasClicked={onClose}
                isDisabled={socialLinks.length === 5}
              />
              <GrayOutMenuWrapper
                isOpen={isOpen}
                onClose={onClose}
                onSelectWrapper={onSelectSocial}
                addFunc={addSocialLink}
              />{" "}
              {/* Pass onClose instead of onClick */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
