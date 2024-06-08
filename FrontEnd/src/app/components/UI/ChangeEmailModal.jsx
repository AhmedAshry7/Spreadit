import React from "react";
import Image from "next/image";
import mailp from "../../assets/mailimage.png";
import { useState, useEffect } from "react";
import Styles from "./ChangeEmailModal.module.css";
import apiHandler from "../../utils/apiHandler";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import { app, firestore } from "../../../../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/**
 * modal that takes new email and password and checks on them then updates the email
 * @component
 * @param {function} close function called when X button is clicked to close the modal
 * @param {function} updatetext function called to change the displaed email
 * @returns {JSX.Element} The rendered ChangeEmailModal component.
 *
 * @example
 * function print() {console.log("closed")}
 * <ChangeEmailModal close={print()} updatetext= {print()}/>
 */

const ChangeEmailmodal = (props) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [temporaryToken, setToken] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] =
    useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = { id: userSnap.id, ...userSnap.data() };
        setUser(userData);
        
      } else {
        setUser(null);
        
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleclose = () => {
    setIsEmailValid(true);
    setIsFormValid(false);
    setIsPasswordValid(true);
    props.close();
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

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    if (isEmailValid && isPasswordValid) {
      setIsFormValid(true);
    }
  };

  async function updateEmail(newEmail) {
    try {
      const response = await apiHandler(
        `/settings/account`,
        "PUT",
        { email: newEmail },
        temporaryToken,
      );
      
      props.updatetext(newEmail);

      const newusser = doc(firestore, "users", user.id);
      await updateDoc(newusser, { email: newEmail });
      const user = auth.currentUser;
      await user.updateEmail(newEmail);

      
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
        updateEmail(newEmail);
        handleclose();
      }
    } catch (error) {
      console.error("Error ", error.message);
    }
  }
  useEffect(() => {
    // Submit form
    if (isFormValid && isEmailValid && isPasswordValid) {
      checkpassword();
    }
  }, [isFormValid, isPasswordValid, isEmailValid]);
  // Disable the button if either input is empty
  const isButtonDisabled = currentPassword === "" || newEmail === "";

  return (
    <div className={Styles.modaloverlay}>
      <div className={Styles.modal}>
        <button className={Styles.Xbutton} onClick={handleclose}>
          X
        </button>
        <Image className={Styles.mailimage} src={mailp} alt="" />
        <h2 className={Styles.changeformlabel}>Update your email</h2>
        <p>
          Update your email below. There will be a new verification email sent
          that you will need to use to verify this new email.
        </p>
        <form>
          <div className={Styles.updateemailform}>
            <input
              className={isPasswordValid ? Styles.inputs : Styles.invalidInput}
              type="password"
              required
              placeholder="CURRENT PASSWORD"
              onChange={handleCurrentPasswordChange}
            ></input>
            {!isPasswordValid && (
              <p className={Styles.errorMessage}>
                {currentPasswordErrorMessage}
              </p>
            )}
            <input
              className={isEmailValid ? Styles.inputs : Styles.invalidInput}
              type="email"
              required
              placeholder="NEW EMAIL"
              onChange={handleNewEmailChange}
            ></input>
            {!isEmailValid && (
              <p className={Styles.errorMessage}>
                Please enter a valid email address.
              </p>
            )}
            <div className={Styles.leftflex}>
              <button
                className={Styles.darkbutton}
                disabled={isButtonDisabled}
                onClick={handleSubmit}
              >
                Save email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmailmodal;
