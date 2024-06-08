import React from "react";
import BlueButton from "../components/UI/BlueButton";

/**
 * Component for displaying UsernameForm.
 * @component
 * @param   {Function} handleSubmit         Function to handle form submission.
 * @param   {Function} handleInputChange    Function to handle input change.
 * @param   {string} email                  The email value.
 * @param   {string} emailError             The validation error message for email.
 * @returns {JSX.Element}                   The rendered Form component.
 *
 * @example
 * //renders a UserNameForm component
 * const handleSubmit = () => console.log("Form Submitted")
 * const handleInputChange = () => console.log("Input Changed")
 * const email = "email@gmail.com"
 * const emailError = "Invalid Email"
 *
 * <UserNameForm
 *  handleSubmit={handleSubmit}
 *  handleInputChange={handleInputChange}
 *  email={email}
 *  emailError={emailError}
 * />
 */

export default function UserNameForm({
  handleSubmit,
  handleInputChange,
  email,
  emailError,
}) {
  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <BlueButton>Email Me</BlueButton>
    </form>
  );
}
