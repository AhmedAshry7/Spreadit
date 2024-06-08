import React from "react";
import { useState, useEffect } from "react";
import styles from "./Blockmute.module.css";
import apiHandler from "../../utils/apiHandler";
import getCookies from "../../utils/getCookies";
import toast from "react-hot-toast";

/**
 * input to add users or communities
 * @component
 * @param {string} type The type of the component
 * @param {string}  description The secription of the blockmute
 * @param {string}  inputmsg The message to show in the box
 * @param {function}  onAdd The function called when the add button is clicked
 * @returns {JSX.Element} The rendered Blockmute component.
 *
 * @example
 * const boxType = "Block"
 * const description = "Description"
 * const msg=""Block new users"
 * function print() {console.log("Added")}
 * <Blockmute type={boxType} description={description} inputmsg={msg} onAdd={print()}/>
 */

const Blockmute = (props) => {
  const [name, setname] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [temporaryToken, setToken] = useState(null);

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies && cookies.access_token) {
        setToken(cookies.access_token);
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
        user,
        temporaryToken,
      );
      
      return response.available;
    } catch (error) {
      console.error("Error checking", error);
    }
  };

  const clearInput = () => {
    setInputValue("");
  };
  const handlenameChange = (event) => {
    setInputValue(event.target.value);
    setname(event.target.value);
  };
  const handleAdd = async (event) => {
    event.preventDefault();
    clearInput();
    const nameavailable = await checkusername(name);
    
    if (!nameavailable) {
      props.onAdd(name);
    } else {
      toast.error("This username doesn't exist");
    }

    setname("");
  };
  const isButtonDisabled = name === "";

  return (
    <div className={styles.smallcontainer}>
      <p className={styles.subsectiontitle}>{props.type}</p>
      <p className={styles.description}>{props.description}</p>
      <div className={styles.addboxcontainer}>
        <div className={styles.inputwrap}>
          <input
            className={styles.inputbox}
            required
            value={inputValue}
            placeholder=" "
            onChange={handlenameChange}
          ></input>
          <label for="">{props.inputmsg}</label>
        </div>
        <button
          className={styles.addbutton}
          disabled={isButtonDisabled}
          onClick={handleAdd}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Blockmute;
