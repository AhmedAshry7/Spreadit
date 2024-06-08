"use client";
import React from "react";
import SideArt from "../../components/UI/SideArt";
import FormInfo from "../../components/form/FormInfo";
import { useState, useEffect } from "react";
import Styles from "../page.module.css";
import apiHandler from "../../utils/apiHandler";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";

const Home = ({ params: { token } }) => {
  const router = useRouter();
  const [temporaryToken, setToken] = useState(null);
  const [newPassword, setnewPassword] = useState("");
  const [newPassword2, setnewPassword2] = useState("");
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isNewPassword2Valid, setIsNewPassword2Valid] = useState(true);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPassword2ErrorMessage, setNewPassword2ErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function validate() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        setToken(cookies.access_token);
      }
    }
    validate();
  }, []);

  const handlenewPasswordChange = (event) => {
    setnewPassword(event.target.value);
  };
  const handlenewPassword2Change = (event) => {
    setnewPassword2(event.target.value);
  };

  const handleclose = () => {
    setIsNewPasswordValid(true);
    setIsNewPassword2Valid(true);
    setIsFormValid(false);
    props.close();
    setIsFormValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate password
    if (newPassword.trim().length < 8) {
      setIsNewPasswordValid(false);
      setNewPasswordErrorMessage(
        "Password must be at least 8 characters long.",
      );
    } else {
      setIsNewPasswordValid(true);
      setNewPasswordErrorMessage("");
    }
    if (newPassword2.trim().length < 8) {
      setIsNewPassword2Valid(false);
      setNewPassword2ErrorMessage(
        "Password must be at least 8 characters long.",
      );
    } else if (newPassword2 != newPassword) {
      setIsNewPassword2Valid(false);
      setNewPassword2ErrorMessage("Passwords doesnt match");
    } else {
      setIsNewPassword2Valid(true);
      setNewPassword2ErrorMessage("");
    }

    if (isNewPasswordValid && isNewPassword2Valid) {
      setIsFormValid(true);
    }
  };
  async function addPassword(newPassword) {
    try {
      
      const response = await apiHandler(
        `/settings/add-password`,
        "POST",
        { password: newPassword },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNjE0NWY1NTI2YmM5Y2ExMTFmNGIiLCJ1c2VybmFtZSI6Im5sM254bGVuIiwiaWF0IjoxNzE1MTA1MDY2fQ.t_SZ4f7f4ocByGu37LPQLqvCCKNhs-o8yRvZHNL4iSE",
      );
      
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    // Submit form
    if (isFormValid && isNewPasswordValid && isNewPassword2Valid) {
      addPassword();
    }
  }, [isFormValid, isNewPasswordValid, isNewPassword2Valid]);

  if (loading) {
    return <div>loading</div>;
  }

  if (!validToken && !loading) {
    return <div>This is invalid token</div>;
  }

  return (
    <div className={Styles.page}>
      <div className={Styles.rowflex}>
        <SideArt className="art" />
        <div className={Styles.formcontainer}>
          <FormInfo title="Add new password" description="" />
          <div className={Styles.inputwrap}>
            <input
              data-testid="new-password"
              className={
                isNewPasswordValid ? Styles.inputs : Styles.invalidInput
              }
              type="password"
              required
              placeholder=" "
              onChange={handlenewPasswordChange}
            ></input>
            <label htmlFor="">NEW PASSWORD</label>
            {!isNewPasswordValid && (
              <p className={Styles.errorMessage}>{newPasswordErrorMessage}</p>
            )}
          </div>
          <div className={Styles.inputwrap}>
            <input
              data-testid="confirm-new-password"
              className={
                isNewPassword2Valid ? Styles.inputs : Styles.invalidInput
              }
              type="password"
              required
              placeholder=" "
              onChange={handlenewPassword2Change}
            ></input>
            <label htmlFor="">CONFIRM NEW PASSWORD</label>
            {!isNewPassword2Valid && (
              <p className={Styles.errorMessage}>{newPassword2ErrorMessage}</p>
            )}
          </div>
          <button
            className={Styles.savebutton}
            disabled={false}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
