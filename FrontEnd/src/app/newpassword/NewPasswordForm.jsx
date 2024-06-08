import React, { useState } from "react";
import BlueButton from "../components/UI/BlueButton.jsx";

/**
 * Component for displaying NewPasswordForm.
 * @component
 * @param   {Function} handleSubmit         Function to handle form submission.
 * @param   {Function} handleInputChange    Function to handle input change.
 * @param   {string} password               The password value.
 * @param   {string} password2              The password2 value.
 * @param   {boolean} isLong                Boolean to check if password is long enough.
 * @param   {boolean} isEqual               Boolean to check if passwords are equal.
 * @returns {JSX.Element}                   The rendered Form component.
 *
 * @example
 * //renders a NewPasswordForm component
 * const handleSubmit = () => console.log("Form Submitted")
 * const handleInputChange = () => console.log("Input Changed")
 * const formData = {password: "password", password2: "password"}
 * const checks = {isLong: true, isEqual: true}
 *
 * <NewPasswordForm
 *  handleSubmit={handleSubmit}
 *  handleInputChange={handleInputChange}
 *  password={formData.password}
 *  password2={formData.password2}
 *  isLong={checks.isLong}
 *  isEqual={checks.isEqual}
 * />
 */

export default function NewPasswordForm({
  handleSubmit,
  handleInputChange,
  password,
  password2,
  isLong,
  isEqual,
}) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <input
          className={isLong ? "form-input" : "form-input input-error"}
          name="password"
          type="password"
          placeholder="New Password"
          onChange={handleInputChange}
          value={password}
        />
        {!isLong ? (
          <p className="error-message">
            Password must be at least 8 characters
          </p>
        ) : null}
      </div>

      <div>
        <input
          className={
            isEqual && isLong ? "form-input" : "form-input input-error"
          }
          name="password2"
          type="password"
          placeholder="Verify Password"
          onChange={handleInputChange}
          value={password2}
        />
        {!isEqual ? (
          <p className="error-message">Passwords do not match</p>
        ) : isLong ? null : (
          <p className="error-message">
            Password must be at least 8 characters
          </p>
        )}
      </div>
      <BlueButton>Set Password</BlueButton>
    </form>
  );
}
