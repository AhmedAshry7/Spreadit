"use client";
import React from "react";
import { useState, useEffect } from "react";
import Layout from "../MessageLayout";
import styles from "./page.module.css";
import apiHandler from "../../utils/apiHandler";
import getCookies from "../../utils/getCookies";

function Home() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isToValid, setIsToValid] = useState(true);
  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isMessageValid, setIsMessageValid] = useState(true);
  const [toErrorMessage, setToErrorMessage] = useState("");
  const [temporaryToken, setToken] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies && cookies.access_token) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);

  const checkusername = async (userName) => {
    const user = { username: userName };
    try {
      const response = await apiHandler(
        `/check-username`,
        "POST",
        { user },
        temporaryToken,
      );
      
      return response.available;
    } catch (error) {
      console.error("Error checking", error);
    }
  };

  const sendMessage = async (theMessage) => {
    try {
      const response = await apiHandler(
        `/message/compose/`,
        "POST",
        theMessage,
        temporaryToken,
      );
      
      
    } catch (error) {
      console.error("Error sending Meesage: ", error);
    }
  };

  const handleTochange = (event) => {
    setTo(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleMessagechange = (event) => {
    setMessage(event.target.value);
  };

  const handlesend = () => {
    setIsToValid(true);
    setIsMessageValid(true);
    setIsSubjectValid(true);
    if (to === "") {
      setIsToValid(false);
      setToErrorMessage("please enter a username");
      return;
    } else if (!checkusername(to)) {
      setIsToValid(false);
      setToErrorMessage("that user doesn't exist");
      return;
    } else {
      setIsToValid(true);
    }

    if (subject === "") {
      setIsSubjectValid(false);
      return;
    } else {
      setIsSubjectValid(true);
    }
    if (message === "") {
      setIsMessageValid(false);
      return;
    } else {
      setIsMessageValid(true);
    }
    if (isToValid && isSubjectValid && isMessageValid) {
      setIsFormValid(true);
      const themessage = {
        username: to,
        subject: subject,
        content: message,
      };
      sendMessage(themessage);
    }
  };

  return (
    <div className={styles.page}>
      <Layout index={2} />
      <div className={styles.body}>
        <h5>Send A Private Message</h5>
        <div className={styles.inputscontainer}>
          <div className={styles.inputarea}>
            <h6>To(username, or /r/name for that subreddit's moderators)</h6>
            <input
              type="text"
              placeholder=""
              onChange={handleTochange}
              className={styles.inputbox}
            />
            {!isToValid && (
              <p className={styles.errorMessage}>{toErrorMessage}</p>
            )}
          </div>
          <div className={styles.inputarea}>
            <h6>subject</h6>
            <input
              type="text"
              placeholder=""
              onChange={handleSubjectChange}
              className={styles.inputbox}
            />
            {!isSubjectValid && (
              <p className={styles.errorMessage}>please enter a subject</p>
            )}
          </div>
          <div className={styles.inputarea}>
            <h6>message</h6>
            <textarea
              placeholder=""
              onChange={handleMessagechange}
              className={styles.inputtextbox}
            />
            {!isMessageValid && (
              <p className={styles.errorMessage}>we need something here</p>
            )}
          </div>
        </div>
        <button className={styles.sendbutton} onClick={handlesend}>
          SEND
        </button>
      </div>
    </div>
  );
}

export default Home;
