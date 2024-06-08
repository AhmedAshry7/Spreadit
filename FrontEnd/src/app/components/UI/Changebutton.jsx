import React from "react";
import Styles from "./Changebutton.module.css";

/**
 * a button and its title and description
 * @component
 * @param {string} type The type of the button
 * @param {string} description The description of the change button 
 * @param {string} display What will be displayed inside the button
 * @param {function} activate function called when the button is clicked
 * @returns {JSX.Element} The rendered Blockmute component.

 * 
 * @example
 * const buttonType="Email address"
 * const description = "aa21@gmail.com"
 * const displays="Change"
 * function print() {console.log("Activated")}
 * <Changebutton type={buttonType} description={description} display={displays} activate={print()} /> 
 *  @example
 * const buttonType="password"
 * const description = "password have to be at least 8 characters"
 * const displays="Change"
 * function print() {console.log("Activated")}
 * <Changebutton type={buttonType} description={description} display={displays} activate={print()} /> 
 */

const Changeemailpassword = (props) => {
  return (
    <div className={Styles.smallcontainer}>
      <div className={Styles.changecontainer}>
        <h3 className={Styles.subsectiontitle}>{props.type}</h3>
        <button
          className={Styles.brightbutton}
          onClick={() => {
            props.activate();
          }}
        >
          {props.display}
        </button>
      </div>
      <p className={Styles.description}>{props.description}</p>
    </div>
  );
};
export default Changeemailpassword;
