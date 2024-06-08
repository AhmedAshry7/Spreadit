import React from "react";
import styles from "./Switch.module.css";

/**
 * Component for displaying the toogle switch.
 * @component
 * @param   {string} optionTitle         The title of the switch
 * @param   {string} optionDescription   The description of the switch
 * @param   {boolean} isToggled          The state of the switch (on or off)
 * @param   {Function} onToggle          The function to be called upon clicking on the switch [Required*]
 * @param   {boolean} disabled           Whether the switch is disabled or not if true the switch becomes unreactive and grayed out
 * @returns {JSX.Element} The rendered Switch component.
 *
 * @example
 * //renders a toogle with only a title, by default it is enabled and set to off
 * const title = "Name"
 * function print() {console.log("switched")}
 * <Toogle optionTitle={title} onToggle={print()} />
 * @example
 * //renders a toogle with a title and a description, by default it is enabled and set to off
 * const title = "Name"
 * const description = "Description"
 * function print() {console.log("switched")}
 * <Toogle optionTitle={title} optionDescription={description} onToggle={print()} />
 * @example
 * //renders a toogle with a title and a description and set to on and disabled
 * const title = "Name"
 * const description = "Description"
 * const toggled = true
 * const inactive = true
 * function print() {console.log("switched")}
 * <Toogle optionTitle={title} optionDescription={description} isToggled={toggled} disabled={inactive} onToggle={print()} />
 */

function Toogle(props) {
  const optionClassName = props.disabled ? styles.disabledOption : "";

  return (
    <div className={`${styles.option} ${optionClassName}`}>
      <div className={styles.data}>
        <h1 className={styles.optionName}>{props.optionTitle}</h1>
        <h2 className={styles.optionDescription}>{props.optionDescription}</h2>
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={props.isToggled}
          onChange={props.onToggle}
          disabled={props.disabled}
        />
        <span className={styles.slider} />
      </label>
    </div>
  );
}

export default Toogle;
