import React, { useState } from "react";
import BlueButton from "../components/UI/BlueButton.jsx";
import Link from "next/link.js";

/**
 * Component for displaying PasswordForm.
 * @component
 * @param   {Function} handleSubmit         Function to handle form submission.
 * @param   {Function} handleInputChange    Function to handle input change.
 * @param   {string} username               The username value.
 * @param   {string} email                  The email value.
 * @param   {string} usernameError          The validation error message for username.
 * @param   {string} emailError             The validation error message for email.
 * @returns {JSX.Element}                   The rendered Form component.
 *
 * @example
 * //renders a PasswordForm component
 * const handleSubmit = () => console.log("Form Submitted")
 * const handleInputChange = () => console.log("Input Changed")
 * const formData = {username: "username", email: "email@gmail.com"}
 * const errors = {usernameError: "Invalid Username", emailError: "Invalid Email"}
 *
 * <PasswordForm
 *  handleSubmit={handleSubmit}
 *  handleInputChange={handleInputChange}
 *  username={formData.username}
 *  email={formData.email}
 *  usernameError={errors.usernameError}
 *  emailError={errors.emailError}
 * />
 */

export default function PasswordForm({
  handleSubmit,
  handleInputChange,
  username,
  email,
  usernameError,
  emailError,
}) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <input
          className={!usernameError ? "form-input" : "form-input input-error"}
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleInputChange}
          value={username}
        />
        {usernameError ? (
          <p className="error-message">{usernameError}</p>
        ) : null}
      </div>

      <div>
        <input
          className={!emailError ? "form-input" : "form-input input-error"}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={email}
        />
        {emailError ? <p className="error-message">{emailError}</p> : null}
      </div>
      <BlueButton>Reset Password</BlueButton>
      <Link href="./username" className="bottom-link">
        forgot username?
      </Link>
    </form>
  );
}
