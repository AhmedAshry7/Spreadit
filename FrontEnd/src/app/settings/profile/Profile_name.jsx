import Image from "next/image";
import React, { useState } from "react";
import "./Profile_name";

/**
 * Component for display name textbox in the profile settings page.
 * @component
 * @param   {string} displayName         The real value of the name to be displayed in the box and used for counting characters
 * @param   {Function} setDisplayName   The function to be called when a change is made in the text box
 * @param   {Function} handleSubmit    Oversight. Triggered by pressing enter in the box. Shouldnt be there, and will be removed
 * @returns {JSX.Element} The rendered ProfileName component.
 *
 * @example
 * //Renders the name text box with actual value of `test` inside it, which then can be modified with its setter
 * const [test, setTest] = useState("Gray Fox)");
 * <ProfileName displayName={test} setDisplayName={setTest} />;
 * @example
 * //Same as above, but will only console log if a submit is triggered
 * const [test, setTest] = useState("Gray Fox");
 * <ProfileName displayName={test} setDisplayName={setTest} handleSubmit={console.log(test)}/>;
 */
export default function ProfileName({
  displayName = "",
  setDisplayName,
  handleSubmit,
}) {
  const maxChars = 30;

  /**
   * Function for handling input into the name textbox and checking that its length is below set hardcoded value (30).
   * @component
   * @param   {object} event         The event (keypress) that happened
   * @returns {void} Nothing returned.
   *
   * @example
   * //Test the function with a short string "test" after typing in the box (`event` is the keypress in the box)
   * onChange={handleInputChange}
   * // Since `value` is 4 characters long, it will be accepted and `setDisplayName` will be called, changing `about`'s value
   * @example
   * //Test the function with a 201 character long string after typing in the box
   * onChange={handleInputChange}
   * // Since `value` is more than 30 characters long, it will be rejected and `setDisplayName` wont be called
   * // So `displayName` will remain the same, and no changes will be observed in the textbox
   */
  function handleInputChange(event) {
    const { value } = event.target;
    if (value.length <= maxChars) {
      setDisplayName(value);
    }
  }

  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">Display name (optional)</h3>
          <p className="settings--p">
            Set a display name. This does not change your username.
          </p>
          <div className="settings--flexoption">
            <form onSubmit={handleSubmit}>
              <input
                name="nameTextbox"
                placeholder="Display name (optional)"
                type="text"
                className="profile--textbox"
                onChange={handleInputChange}
                value={displayName}
                maxLength={maxChars}
              ></input>
              <p className="textboxlettercount">
                {displayName !== undefined
                  ? maxChars - displayName.length
                  : maxChars}{" "}
                Characters remaining
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
