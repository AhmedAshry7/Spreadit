import React, { useState } from "react";
import styles from "./RuleEntry.module.css";

/**
 * Component representing a single entry or rule within a set of rules in the rules box.
 * @component
 * @param   {string} title   The title or name of the rule.
 * @param   {number} iteration   The iteration number of the rule.
 * @param   {string} description   The description of the rule.
 * @param   {boolean} lastEntry   Indicates whether this is the last entry in the set of rules (is there border below or not?)
 * @returns {JSX.Element} The rendered RuleEntry component.
 *
 * @example
 * // Renders an empty RuleEntry component
 * <RuleEntry />;
 * @example
 * // Renders with custom title, iteration, description, and lastEntry props.
 * <RuleEntry
 *   title="Example Rule"
 *   iteration={1}
 *   description="This is an example description of the rule."
 *   lastEntry={false}
 * />;
 */

function RuleEntry({ title, iteration, description, lastEntry }) {
  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <div
      className={styles.boxRulesTitle}
      style={{ borderBottom: lastEntry ? "none" : "1px solid #edeff1" }}
    >
      <div className={styles.boxRulesTitleFlex} onClick={toggleCollapse}>
        <div className={styles.boxRulesTitleNumberCell}>
          <div className={styles.boxRulesTitleNumberPadding}>{iteration}.</div>
        </div>
        <div className={styles.boxRulesTitleCell}>
          <div className={styles.boxRulesTitlePadding}>{title}</div>
        </div>
        <div className={styles.boxRulesTitleDropdownCell}>
          <div>
            <span className={`${styles.icon}`}>
              <svg
                className={styles.boxRulesTitleDropdown}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      {collapse && (
        <div className={styles.boxRulesDescription}>
          <div className={styles.boxRulesDescription2}>
            <p className={styles.boxRulesDescriptionPadding}>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RuleEntry;
