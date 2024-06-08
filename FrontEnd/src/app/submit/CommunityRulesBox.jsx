import Image from "next/image";
import React, { useState } from "react";
import RuleEntry from "./RuleEntry";
import "./Create.css";
import styles from "./CommunityRulesBox.module.css";

/**
 * Component for displaying community rules.
 * @component
 * @param {string} community - The name of the community.
 * @param {Array} rules - Array of objects containing rule information.
 * @returns {JSX.Element} The rendered CommunityRulesBox component.
 *
 * @example
 * // Renders the CommunityRulesBox component with specified props.
 * <CommunityRulesBox
 *   community="testCom"
 *   rules={[
 *     { title: "Rule Number 1", description: "Rule Number 1 Description", reportReason: "Shouldn't need this" },
 *     { title: "Rule Number 2", description: "Rule Number 2 Description", reportReason: "Shouldn't need this" },
 *     ...
 *   ]}
 * />
 */

export default function CommunityRulesBox({
  community = "testCom",
  rules = [
    {
      title: "Rule Number 1",
      description: "Rule Number 1 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 2",
      description: "Rule Number 2 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
    {
      title: "Rule Number 3",
      description: "Rule Number 3 Description",
      reportReason: "Shouldn't need this",
    },
  ],
}) {
  return (
    <div className={styles.boxSize}>
      <div className={styles.boxStyling}>
        <div className={styles.boxHeader}>
          <div className={styles.boxHeaderPadding}>{community} Rules</div>
        </div>
        <div className={styles.boxPadding} style={{ maxHeight: "none" }}>
          {/* Map over the rules array and render RuleEntry components */}
          {rules.map((rule, index) => (
            <RuleEntry
              key={index} // Provide a unique key for each RuleEntry
              title={rule.title}
              description={rule.description}
              iteration={index + 1} // Increment index by 1 to start from 1
              lastEntry={index === rules.length - 1}
              data-testid="rule-entry"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
