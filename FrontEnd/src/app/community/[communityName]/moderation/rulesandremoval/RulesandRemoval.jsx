import React, { useState, useEffect } from "react";
import "./RulesandRemoval.css";
import RulesItem from "./RulesItem";
import RemovalReasonItem from "./RemovalReasonItem";
import RulesModal from "./RulesModal";
import RemovalReasonModal from "./RemovalReasonModal";
import getCookies from "@/app/utils/getCookies";
import handler from "@/app/utils/apiHandler";

/**
 * Component for managing rules and removal reasons for a community
 * @component
 * @param {Object} props Component props
 * @param {string} props.communityName The name of the community
 * @returns {JSX.Element} JSX element for managing rules and removal reasons
 *
 * @example
 * <RulesandRemoval communityName="Community" />
 */

function RulesandRemoval({ communityName }) {
  const [inRules, setInRules] = useState(true);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showRemovalReasonModal, setRemovalReasonModal] = useState(false);

  function ShowRulesModal() {
    setShowRulesModal(true);
  }

  const CloseRulesModal = () => {
    setShowRulesModal(false);
  };

  function ShowRemovalReasonModal() {
    setRemovalReasonModal(true);
  }

  const CloseRemovalReasonModal = () => {
    setRemovalReasonModal(false);
  };

  const [rules, setRules] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        redirect("/login");
      }
      try {
        const response = await handler(
          `/community/${communityName}/rules`,
          "GET",
          "",
          cookies.access_token,
        );
        
        setRules(response);
      } catch (err) {
        
      }
    };
    fetchData();
  }, []);

  const [removalReason, setRemovalReason] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        redirect("/login");
      }
      try {
        const response = await handler(
          `/community/${communityName}/removal-reasons`,
          "GET",
          "",
          cookies.access_token,
        );
        
        setRemovalReason(response);
      } catch (err) {
        
      }
    };
    fetchData();
  }, [inRules]);

  return (
    <div className="rulesandremoval">
      <div className="title">Rules and Removal Reasons</div>

      <div className="switchbuttons">
        <button
          className={inRules ? "buttons1clicked" : "buttons1"}
          onClick={() => setInRules(true)}
        >
          Rules
        </button>
        <button
          className={!inRules ? "buttons2clicked" : "buttons2"}
          onClick={() => setInRules(false)}
        >
          Removal Reasons
        </button>
      </div>

      <br></br>

      <div className="addbuttonholder">
        {inRules ? (
          <button className="addrulesbutton" onClick={() => ShowRulesModal()}>
            Add rule
          </button>
        ) : (
          <button
            className="addremovalbutton"
            onClick={() => ShowRemovalReasonModal()}
          >
            Add removal reason
          </button>
        )}
      </div>

      {showRulesModal && (
        <RulesModal
          close={() => CloseRulesModal()}
          communityName={communityName}
        />
      )}

      {showRemovalReasonModal && (
        <RemovalReasonModal
          close={() => CloseRemovalReasonModal()}
          communityName={communityName}
        />
      )}

      <br></br>

      <div className="desc">
        {inRules
          ? "These are rules that visitors must follow to participate. They can be used as reasons to report or ban posts, comments, and users. Communities can have a maximum of 15 rules."
          : "Help people become better posters by giving a short reason why their post was removed."}
      </div>

      <div className="content">
        <br></br>

        {inRules ? (
          <ul className="contentbox">
            {rules.map((val, key) => {
              return (
                <RulesItem
                  title={val.title}
                  description={val.description}
                  appliesto={
                    val.appliesTo === "both"
                      ? "Posts & comments"
                      : val.appliesTo === "posts"
                        ? "Posts only"
                        : "Comments only"
                  }
                  report={val.reportReason}
                  key={key}
                  count={key + 1}
                  communityName={communityName}
                />
              );
            })}
          </ul>
        ) : (
          <ul className="contentbox">
            {removalReason.map((val, key) => {
              return (
                <RemovalReasonItem
                  title={val.title}
                  message={val.reasonMessage}
                  count={key + 1}
                  id={val._id}
                  communityName={communityName}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
export default RulesandRemoval;
