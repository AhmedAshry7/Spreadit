import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg";
import "./Create.css";

/**
 * Component for displaying posting rules and guidelines in Spreadit.
 * @component
 * @returns {JSX.Element} The rendered CreateRightRules component.
 *
 * @example
 * // Renders the CreateRightRules component.
 * <CreateRightRules />;
 */

export default function CreateRightRules() {
  return (
    <div>
      <div className="createRightFlexRulesBox">
        <div className="createRightFlexRulesBoxHeader">
          <Image src={logo} className="createRightFlexRulesBoxHeaderLogo" />
          Posting to Spreadit
        </div>
        <ol class="createRightFlexRulesBoxList">
          <li class="createRightFlexRulesBoxBullets">Remember the human</li>
          <li class="createRightFlexRulesBoxBullets">
            Behave like you would in real life
          </li>
          <li class="createRightFlexRulesBoxBullets">
            Look for the original source of content
          </li>
          <li class="createRightFlexRulesBoxBullets">
            Search for duplicates before posting
          </li>
          <li class="createRightFlexRulesBoxBullets">
            Read the community’s rules
          </li>
        </ol>
      </div>
      <div class="createRightFlexFooter">
        Please be mindful of Spreadit's{" "}
        <a href="https://www.reddit.com/help/contentpolicy">content policy</a>{" "}
        and practice good{" "}
        <a href="https://www.reddit.com/wiki/reddiquette">Spreadiquette</a>.
      </div>
    </div>
  );
}
