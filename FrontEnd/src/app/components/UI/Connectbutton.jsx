import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import mailp from "../../assets/mailimage.png";
import googlep from "../../assets/Google.png";
import Styles from "./Connectbutton.module.css";
import apiHandler from "../../utils/apiHandler";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import { signIn } from "next-auth/react";

/**
 * connect/disconnect button to google account
 * @component
 * @param {string} type The account type
 * @param {string} description The description of Connect button
 * @param {boolean} condition The condition if it is connected or not
 * @returns {JSX.Element} The rendered Connectbutton component.
 *
 * @example
 * const title = "Google"
 * const description = "Description"
 * const connected=true
 * <Connectbutton type={title} description={description} condition={connected} />
 *
 * @example
 * const accountType = "Google"
 * const description = "Description"
 * const connected=false
 * <Connectbutton type={accountType} description={description} condition={connected} />
 */

const Connectbutton = (props) => {
  const router = useRouter();
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
  const [showModal, setShowModal] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  let connected = props.condition;
  const [isConnected, setIsConnected] = useState(connected);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };
  const isButtonDisabled = currentPassword === "";
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentPassword.trim().length < 8) {
      setIsPasswordValid(false);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
    } else {
      setIsPasswordValid(true);
      setPasswordErrorMessage("");
    }
    if (isPasswordValid) {
      setIsFormValid(true);
    }
  };
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
      console.error("Error", error);
      setIsPasswordValid(false);
      setPasswordErrorMessage("Incorrect password.");
    }
  }
  async function checkpassword() {
    try {
      const response = await post(currentPassword);
      if (response.message !== "Password matches") {
        setIsPasswordValid(false);
        setPasswordErrorMessage("Incorrect password.");
      } else {
        setIsConnected(false);
        alterconnect();
        closeModal();
      }
    } catch (error) {
      console.error("Error ", error.message);
    }
  }

  async function alterconnect() {
    try {
      
      const response = await apiHandler(
        `/settings/account`,
        "PUT",
        { email: props.email, connectedAccounts: [] },
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    // Submit form
    if (isFormValid && isPasswordValid) {
      checkpassword();
    }
  }, [isFormValid, isPasswordValid]);
  const openModal = (event) => {
    handleCurrentPasswordChange(event);
    setIsFormValid(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsPasswordValid(true);
    setIsFormValid(false);
  };
  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/redirecting?isConnecting=yes`,
    });
  };

  return (
    <div className={Styles.smallcontainer}>
      <div className={Styles.changecontainer}>
        <div className="labeldescription">
          <h3 className={Styles.subsectiontitle}>Connect to {props.type}</h3>
          <p className={Styles.description}>{props.description}</p>
        </div>
        {!isConnected && (
          <button className={Styles.connectbutton} onClick={handleGoogleSignIn}>
            <Image src={googlep} className={Styles.picture} /> Connect to{" "}
            {props.type}
          </button>
        )}
        {isConnected && (
          <button className={Styles.disconnectbutton} onClick={openModal}>
            (disconnect)
          </button>
        )}
      </div>
      {showModal && (
        <div className={Styles.modaloverlay}>
          <div className={Styles.modal}>
            <button className={Styles.Xbutton} onClick={closeModal}>
              X
            </button>
            <Image className={Styles.mailimage} src={mailp} alt="" />
            <h2 className={Styles.connectformlabel}>
              Disconnect {props.type} Account
            </h2>
            <p>To continue, confirm your password.</p>
            <form>
              <div className={Styles.connectform}>
                <input
                  className={
                    isPasswordValid ? Styles.inputs : Styles.invalidInput
                  }
                  type="password"
                  required
                  placeholder="PASSWORD"
                  onChange={handleCurrentPasswordChange}
                ></input>
                {!isPasswordValid && (
                  <p className={Styles.errorMessage}>{passwordErrorMessage}</p>
                )}
                <div className={Styles.leftflex}>
                  <button className={Styles.brightbutton} onClick={closeModal}>
                    CANCEL
                  </button>
                  <button
                    className={Styles.darkbutton}
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connectbutton;
