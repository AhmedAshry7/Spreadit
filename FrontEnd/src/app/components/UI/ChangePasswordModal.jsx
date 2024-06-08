import React from "react";
import SideArt from "./SideArt";
import FormInfo from "../form/FormInfo";
import Toogle from "./Switch";
import { useState, useEffect } from "react";
import Styles from "./ChangePasswordModal.module.css";
import apiHandler from "../../utils/apiHandler";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import { app } from "../../../../lib/firebase";
import { getAuth } from "firebase/auth";

/**
 * a modal that checks the new password and updates it
 * @component
 * @param {function} close function called when Xbutton is clicked
 * @returns {JSX.Element} The rendered ChangePasswordModal component.
 *
 * @example
 * function print() {console.log("closed")}
 * <ChangePasswordModal close={print()} />
 */

const ChangePasswordModal = (props) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [temporaryToken, setToken] = useState(null);
  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPassword2, setnewPassword2] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isNewPassword2Valid, setIsNewPassword2Valid] = useState(true);
  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] =
    useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPassword2ErrorMessage, setNewPassword2ErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handlenewPasswordChange = (event) => {
    setnewPassword(event.target.value);
  };
  const handlenewPassword2Change = (event) => {
    setnewPassword2(event.target.value);
  };

  const handleclose = () => {
    setIsPasswordValid(true);
    setIsNewPasswordValid(true);
    setIsNewPassword2Valid(true);
    setIsFormValid(false);
    props.close();
    setIsFormValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate password
    if (currentPassword.trim().length < 8) {
      setIsPasswordValid(false);
      setCurrentPasswordErrorMessage(
        "Password must be at least 8 characters long.",
      );
    } else {
      setIsPasswordValid(true);
      setCurrentPasswordErrorMessage("");
    }
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

    if (isPasswordValid && isNewPasswordValid && isNewPassword2Valid) {
      setIsFormValid(true);
    }
  };
  async function updatePassword(newPassword) {
    try {
      
      const response = await apiHandler(
        `/settings/account`,
        "PUT",
        { email: props.email, password: newPassword },
        temporaryToken,
      );

      const user = auth.currentUser;
      await user.updatePassword(newPassword);

      
    } catch (error) {
      console.error("Error", error);
    }
  }
  async function post(data) {
    try {
      const response = await apiHandler(
        `/settings/layout`,
        "PUT",
        { enteredPassword: data },
        temporaryToken,
      );
      
      return response;
    } catch (error) {
      setIsPasswordValid(false);
      setCurrentPasswordErrorMessage("Incorrect password.");
      console.error("Error", error);
    }
  }
  async function checkpassword() {
    try {
      const response = await post(currentPassword);
      if (response.message !== "Password matches") {
        setIsPasswordValid(false);
        setCurrentPasswordErrorMessage("Incorrect password.");
      } else {
        updatePassword(newPassword);
        handleclose();
      }
    } catch (error) {
      console.error("Error ", error.message);
    }
  }
  useEffect(() => {
    // Submit form
    if (
      isFormValid &&
      isPasswordValid &&
      isNewPasswordValid &&
      isNewPassword2Valid
    ) {
      checkpassword();
    }
  }, [isFormValid, isPasswordValid, isNewPasswordValid, isNewPassword2Valid]);

  return (
    <div className={Styles.modaloverlay}>
      <div className={Styles.passwordmodal}>
        <div className={Styles.rowflex}>
          <SideArt className="modal-art" />
          <div className={Styles.formcontainer}>
            <FormInfo title="Update your password" description="" />
            <div className={Styles.inputwrap}>
              <input
                data-testid="old-password"
                className={
                  isPasswordValid ? Styles.inputs : Styles.invalidInput
                }
                type="password"
                required
                placeholder=" "
                onChange={handleCurrentPasswordChange}
              ></input>
              <label htmlFor="">OLD PASSWORD</label>
              {!isPasswordValid && (
                <p className={Styles.errorMessage}>
                  {currentPasswordErrorMessage}
                </p>
              )}
            </div>
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
                <p className={Styles.errorMessage}>
                  {newPassword2ErrorMessage}
                </p>
              )}
            </div>
            <Toogle
              optionTitle="Log me out everywhere"
              optionDescription="Changing your password logs you out of all browsers on your device(s). Checking this box also logs you out of all apps you have authorized."
            />
            <button
              className={Styles.savebutton}
              disabled={false}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
        <button className={Styles.Xbutton} onClick={handleclose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
