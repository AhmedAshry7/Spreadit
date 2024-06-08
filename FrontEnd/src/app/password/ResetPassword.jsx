"use client";
import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";
import submitToApi from "../utils/submitToApi.js";
import apiHandler from "../utils/apiHandler.js";
import { useRouter } from "next/navigation";
import Validation from "../utils/Validation.js";
import PasswordForm from "./PasswordForm";
import toast from "react-hot-toast";

function ResetPassword() {
  const url = "http://localhost:3002/forgot-password";
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
  });
  const router = useRouter();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setValidationErrors({ username: "", email: "" });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = Validation(formData);
    setValidationErrors(errors);
    if (errors.username === "" && errors.email === "") {
      try {
        const responseData = await apiHandler(
          "/forgot-password",
          "POST",
          formData,
        );

        toast.success("Email sent, please check your inbox");
        setFormData({ username: "", email: "" });
      } catch (err) {
        toast.error(
          "An error occured, Make sure you entered valid email and username",
        );
      }
    }
  };

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Reset your password"
          description="Tell us the username and email address associated with your Reddit account, and we'll send you an email with a link to reset your password."
        />
        <PasswordForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          username={formData.username}
          email={formData.email}
          usernameError={validationErrors.username}
          emailError={validationErrors.email}
        />
        <BottomHelp />
      </div>
    </div>
  );
}

export default ResetPassword;
