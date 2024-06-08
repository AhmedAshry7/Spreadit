import React from "react";
import BlueButton from "../components/UI/BlueButton";
import Link from "next/link.js";

/**
 * Component for displaying the Login form.
 * @component
 * @param {Object} props  Component props.
 * @param {Function} props.handleSubmit  Function to handle form submission.
 * @param {Function} props.handleInputChange  Function to handle input changes.
 * @param {Function} props.HandleRememberMe  Function to handle "Remember me" checkbox.
 * @param {string} props.usernameErrors  Error message for the username input field.
 * @param {string} props.passwordErrors  Error message for the password input field.
 * @param {string} props.username  Value of the username input field.
 * @param {string} props.password  Value of the password input field.
 * @returns {JSX.Element}  JSX element for the login form.
 *
 * @example
 * // Renders a login form with initial values and event handlers
 * const handleSubmit = (formData) => {
 *   
 * };
 *
 * const handleInputChange = (event) => {
 *   
 * };
 *
 * const HandleRememberMe = (event) => {
 *   
 * };
 *
 * const usernameError = "Username is Required.";
 * const passwordError = "Password is Required.";
 * const initialUsername = "";
 * const initialPassword = "";
 *
 * <LoginForm
 *   handleSubmit={handleSubmit}
 *   handleInputChange={handleInputChange}
 *   HandleRememberMe={HandleRememberMe}
 *   usernameErrors={usernameError}
 *   passwordErrors={passwordError}
 *   username={initialUsername}
 *   password={initialPassword}
 * />
 */

export default function LoginForm({
  handleSubmit,
  handleInputChange,
  HandleRememberMe,
  usernameErrors,
  passwordErrors,
  username,
  password,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className="info_holder"
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleInputChange}
          value={username}
        />
        {usernameErrors && <p className="errors-text">{usernameErrors}</p>}
      </div>

      <div>
        <input
          className="info_holder"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={password}
        />
        {passwordErrors && <p className="errors-text">{passwordErrors}</p>}
      </div>
      <input
        type="checkbox"
        className="remember_me"
        onChange={HandleRememberMe}
      />
      <label className="remember_me_label">Remember me</label>
      <BlueButton>Log in</BlueButton>
      <div className="bottom-text">
        <span className="link-text">Forgot your </span>
        <Link href="./username" className="bottom-link">
          username
        </Link>
        <span className="link-text"> or </span>
        <Link href="./password" className="bottom-link">
          password
        </Link>
        <span className="link-text">? </span>
      </div>
    </form>
  );
}
