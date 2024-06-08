import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import NewPasswordForm from "./NewPasswordForm";
import BottomHelp from "../components/UI/BottomHelp.jsx";
import submitToApi from "../utils/submitToApi.js";
import apiHandler from "../utils/apiHandler.js";

function ChangePassword({ token }) {
  const url = "http://localhost:3002/reset-password";
  const [formData, setFormData] = useState({ password: "", password2: "" });
  const [isEqual, setIsEqual] = useState(true);
  const [isLong, setIsLong] = useState(true);

  function handleInputChange(event) {
    const { name, value } = event.target;
    
    setIsEqual(true);
    setIsLong(true);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.password2) {
      setIsEqual(false);
      return;
    }
    if (formData.password.length < 8) {
      setIsLong(false);
      return;
    }
    const password = formData.password;
    apiHandler("/reset-password-by-token", "POST", {
      password: password,
      emailToken: token,
    });
    setFormData({ password: "", password2: "" });
  };

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Reset your password"
          description="Choose a new password here, then log in to your account."
        />
        <NewPasswordForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          password={formData.password}
          password2={formData.password2}
          isLong={isLong}
          isEqual={isEqual}
        />
        <BottomHelp> </BottomHelp>
      </div>
    </div>
  );
}

export default ChangePassword;
