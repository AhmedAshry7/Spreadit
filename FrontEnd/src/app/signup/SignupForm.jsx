import React from "react";
import BlueButton from "../components/UI/BlueButton";
import Link from "next/link.js";

/**
 * Signup form component.
 * @param {Object} props  Component props.
 * @param {Function} props.handleSubmit  Function to handle form submission.
 * @param {Function} props.handleInputChange  Function to handle input changes.
 * @param {string} props.emailErrors  Error message for the email input field.
 * @param {string} props.usernameErrors  Error message for the username input field.
 * @param {string} props.passwordErrors  Error message for the password input field.
 * @param {string} props.email  Value of the email input field.
 * @param {string} props.username  Value of the username input field.
 * @param {string} props.password  Value of the password input field.
 * @returns {JSX.Element}  JSX for the signup form.
 *
 * @example
 * // Renders a signup form with initial values and event handlers
 * const handleSubmit = (formData) => {
 *   
 * };
 *
 * const handleInputChange = (event) => {
 *   
 * };
 *
 * const emailError = "Invalid email address.";
 * const usernameError = "Username is Required.";
 * const passwordError = "Password is Required.";
 * const initialEmail = "";
 * const initialUsername = "";
 * const initialPassword = "";
 *
 * <SignupForm
 *   handleSubmit={handleSubmit}
 *   handleInputChange={handleInputChange}
 *   emailErrors={emailError}
 *   usernameErrors={usernameError}
 *   passwordErrors={passwordError}
 *   email={initialEmail}
 *   username={initialUsername}
 *   password={initialPassword}
 * />
 */

export default function SignupForm({
  handleSubmit,
  handleInputChange,
  emailErrors,
  usernameErrors,
  passwordErrors,
  username,
  password,
  email,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className="info_holder"
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleInputChange}
          value={email}
        />
        {emailErrors && <p className="errors-text">{emailErrors}</p>}
      </div>
      <div>
        <input
          className="info_holder"
          name="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={handleInputChange}
        />
        {usernameErrors && <p className="errors-text">{usernameErrors}</p>}
      </div>
      <div>
        <input
          className="info_holder"
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={handleInputChange}
        />
        {passwordErrors && <p className="errors-text">{passwordErrors}</p>}
      </div>
      <BlueButton>Continue</BlueButton>
    </form>
  );
}
