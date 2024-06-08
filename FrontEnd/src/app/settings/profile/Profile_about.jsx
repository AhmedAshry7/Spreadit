import Image from "next/image";
import React, { useState } from "react";
import "./Profile.css";

/**
 * Component for about section in the profile settings page.
 * @component
 * @param   {string} about         The real value of the about to be displayed in the box and used for counting characters
 * @param   {Function} setAbout   The function to be called when a change is made in the text box
 * @param   {Function} handleSubmit          Currently unused and unnecessary. Not possible to trigger in this textarea anyway so should be removed
 * @returns {JSX.Element} The rendered ProfileAbout component.
 *
 * @example
 * //Renders the about text box with actual value of `test` inside it, which then can be modified with its setter
 * const [test, setTest] = useState("Default Value (but not a placeholder)");
 * <ProfileAbout about={test} setAbout={setTest} />;
 */

export default function ProfileAbout({ about = "", setAbout, handleSubmit }) {
  const maxChars = 200;

  /**
 * Function for handling input into the about textbox and checking that its length is below set hardcoded value (200).

 * @param   {object} event         The event (keypress) that happened
 * @returns {void} Nothing returned.
 *
 * @example
 * //Test the function with a short string "test" after typing in the box (`event` is the keypress in the box)
 * onChange={handleInputChange}
 * // Since `value` is 4 characters long, it will be accepted and `setAbout` will be called, changing `about`'s value
 * @example
 * //Test the function with a 201 character long string after typing in the box
 * onChange={handleInputChange}
 * // Since `value` is more than 200 characters long, it will be rejected and `setAbout` wont be called
 * // So `about` will remain the same, and no changes will be observed in the textbox
 */
  function handleInputChange(event) {
    const { value } = event.target;
    if (value.length <= maxChars) {
      setAbout(value);
    }
  }

  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">About (optional)</h3>
          <p className="settings--p">
            A brief description of yourself shown on your profile.
          </p>
        </div>
        <div className="settings--flexoption">
          <textarea
            className="profile--aboutTextBox"
            name="aboutTextbox"
            onChange={handleInputChange}
            value={about}
            maxLength={maxChars}
            placeholder="About (optional)"
          ></textarea>
          <p className="textboxlettercount">
            {about !== undefined ? maxChars - about.length : maxChars}{" "}
            Characters remaining
          </p>
        </div>
      </div>
    </div>
  );
}
