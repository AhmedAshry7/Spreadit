import { useState } from "react";
import styles from "./ReportModal.module.css";
import Image from "next/image";
import Button from "../post/Button";
import Toogle from "./Switch";
import close from "../../assets/close.svg";
import back from "../../assets/back.svg";

/**
 * Component for reporting a post or user in a subreddit.
 * @component
 * @param {string} subRedditPicture - The URL of the subreddit profile picture.
 * @param {string} subRedditName - The name of the subreddit where the post or commnt was made.
 * @param {array} subRedditRules - An array of subreddit rules each object must include a report reason.
 * @param {Function} closeModal - The function to be executed when closing the report modal.
 * @param {Function} onReport - The function to be executed when submiting the report.
 * @param {Function} onBlock - The function to be executed when blocking the reported user.
 * @param {string} userName - The username of the reported user.
 * @returns {JSX.Element} The rendered ReportModal component.
 *
 * @example
 * // Renders a report modal for a post or user in a subreddit
 * const subRedditPicture = "/subreddit.jpg";
 * const subRedditName = "example";
 * const subRedditRules = [{Rule : "Be nice", reportReason: "was not nice"}, {Rule : "No spam",  reportReason: "spam"}];
 * const closeModal = () => 
 * const onReport = (reason, details) => 
 * const onBlock = () => 
 * const userName = "user123";
 * <ReportModal subRedditPicture={subRedditPicture} subRedditName={subRedditName} subRedditRules={subRedditRules} closeModal={closeModal} onReport={onReport} onBlock={onBlock} userName={userName} />
 */

function StageOne({
  subRedditPicture,
  subRedditName,
  subRedditRules,
  changeStage,
  mainReasonIndex,
  subReasonIndex,
  closeModal,
  onReport,
}) {
  let reasons;
  let descriptions;
  if (subRedditName === null) {
    reasons = [
      "Harassment",
      "Threatening violence",
      "Hate",
      "Minor abuse or sexualization",
      "Sharing personal information",
      "Non-consensual intimate media",
      "Prohibited transaction",
      "Impersonation",
      "Copyright violation",
      "Trademark violation",
      "Spam",
    ];
  } else {
    reasons = [
      `Breaks r/${subRedditName} rules`,
      "Harassment",
      "Threatening violence",
      "Hate",
      "Minor abuse or sexualization",
      "Sharing personal information",
      "Non-consensual intimate media",
      "Prohibited transaction",
      "Impersonation",
      "Copyright violation",
      "Trademark violation",
      "Spam",
    ];
  }
  if (subRedditName === null) {
    descriptions = [
      "Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.",
      "Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.",
      "Promoting hate or inciting violence based on identity or vulnerability.",
      "Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior towards minors.",
      "Sharing or threatening to share private, personal, or confidential information about someone.",
      'Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).',
      "Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services.",
      "Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions.",
      "Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)",
      "Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)",
      "Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.",
    ];
  } else {
    descriptions = [
      `Posts, comments, or behavior that breaks r/${subRedditName} community rules.`,
      "Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.",
      "Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.",
      "Promoting hate or inciting violence based on identity or vulnerability.",
      "Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior towards minors.",
      "Sharing or threatening to share private, personal, or confidential information about someone.",
      'Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).',
      "Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services.",
      "Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions.",
      "Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)",
      "Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)",
      "Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.",
    ];
  }
  const [selectedReason, setSelectedReason] = useState(mainReasonIndex);

  function handleSubmit() {
    onReport(reasons[selectedReason], "");
    changeStage(3, -1, -1);
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>Submit a report</div>
        <button
          type="button"
          className={styles.controls}
          style={{ marginLeft: "auto" }}
          onClick={() => closeModal()}
        >
          <Image
            src={close}
            width={16}
            height={16}
            viewBox="0 0 20 20"
            alt="close"
          />
        </button>
      </div>
      <div className={styles.description}>
        Thanks for looking out for yourself and your fellow redditors by
        reporting things that break the rules. Let us know what's happening, and
        we'll look into it.{" "}
      </div>
      <div className={styles.body}>
        <div className={styles.rules}>
          <div style={{ width: "100%" }}>
            {subRedditName !== null && (
              <div
                className={`${styles.subRedditRule} ${selectedReason === 0 ? styles.selected : ""}`}
                onClick={() => setSelectedReason(0)}
              >
                <img
                  className={styles.subRedditPicture}
                  src={subRedditPicture}
                  width={256}
                  height={256}
                  alt="The subReddit picture "
                  quality={100}
                />
                <div className={styles.rule}>{reasons[0]}</div>
              </div>
            )}
          </div>
          {subRedditName !== null &&
            reasons.slice(1).map((str, index) => (
              <div
                key={index}
                className={`${styles.rule} ${selectedReason === index + 1 ? styles.selected : ""}`}
                onClick={() => setSelectedReason(index + 1)}
              >
                {str}
              </div>
            ))}
          {subRedditName === null &&
            reasons.map((str, index) => (
              <div
                key={index}
                className={`${styles.rule} ${selectedReason === index ? styles.selected : ""}`}
                onClick={() => setSelectedReason(index)}
              >
                {str}
              </div>
            ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.reasonDescription}>
            {selectedReason !== -1 && (
              <div>
                <div className={styles.ruleName}>{reasons[selectedReason]}</div>
                <div className={styles.ruleDescription}>
                  {descriptions[selectedReason]}
                </div>
              </div>
            )}
          </div>
          {subRedditName !== null && (
            <Button
              name={`${selectedReason === 3 || selectedReason === 7 ? "Submit Report" : "Next"}`}
              active={selectedReason === -1 ? false : true}
              onClick={() => {
                selectedReason === 3 || selectedReason === 7
                  ? handleSubmit()
                  : changeStage(2, selectedReason, subReasonIndex);
              }}
            />
          )}
          {subRedditName === null && (
            <Button
              name={`${selectedReason === 2 || selectedReason === 6 ? "Submit Report" : "Next"}`}
              active={selectedReason === -1 ? false : true}
              onClick={() => {
                selectedReason === 2 || selectedReason === 6
                  ? handleSubmit()
                  : changeStage(2, selectedReason, subReasonIndex);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StageTwo({
  subRedditRules,
  mainReasonIndex,
  mainReason,
  subReasonIndex,
  changeStage,
  closeModal,
  onReport,
}) {
  let question;
  let choices;
  const [selectedChoice, setSelectedChoice] = useState(subReasonIndex);

  if (subRedditRules === null) {
    question = [
      "Who is the harassment towards?",
      "Who is the threat towards?",
      "Hate",
      "What type of minor abuse or sexualization is this?",
      "Whose personal information is it?",
      "Who is the non-consensual intimate media of?",
      "Prohibited transaction",
      "Who is being impersonated?",
      "Whose copyright is it?",
      "Whose trademark is it?",
      "What type of spam is this?",
    ];
  } else {
    question = [
      "Which community rule does this violate?",
      "Who is the harassment towards?",
      "Who is the threat towards?",
      "Hate",
      "What type of minor abuse or sexualization is this?",
      "Whose personal information is it?",
      "Who is the non-consensual intimate media of?",
      "Prohibited transaction",
      "Who is being impersonated?",
      "Whose copyright is it?",
      "Whose trademark is it?",
      "What type of spam is this?",
    ];
  }
  if (subRedditRules === null) {
    choices = [
      ["You", "Someone else"],
      ["You", "Someone else"],
      [],
      [
        "Sexual or suggestive content",
        "Predatory or inappropriate behaviour",
        "Content involving physical or emotional abuse or neglect",
      ],
      ["Yours", "Someone else's"],
      ["You", "Someone else"],
      [],
      ["You or an individual or entity you represent", "Someone else"],
      ["Yours or an individual or entity you represent", "Someone else's"],
      ["Yours or an individual or entity you represent", "Someone else's"],
      [
        "Link farming",
        "Unsolicited messaging",
        "Excessive posts or comments in a community",
        "Posting harmful links (malware)",
        "Harmful bots",
        "Other",
      ],
    ];
  } else {
    const subRedditReportReasons = subRedditRules.map(
      (item) => item.reportReason,
    );
    choices = [
      subRedditReportReasons,
      ["You", "Someone else"],
      ["You", "Someone else"],
      [],
      [
        "Sexual or suggestive content",
        "Predatory or inappropriate behaviour",
        "Content involving physical or emotional abuse or neglect",
      ],
      ["Yours", "Someone else's"],
      ["You", "Someone else"],
      [],
      ["You or an individual or entity you represent", "Someone else"],
      ["Yours or an individual or entity you represent", "Someone else's"],
      ["Yours or an individual or entity you represent", "Someone else's"],
      [
        "Link farming",
        "Unsolicited messaging",
        "Excessive posts or comments in a community",
        "Posting harmful links (malware)",
        "Harmful bots",
        "Other",
      ],
    ];
  }

  function handleSubmit() {
    onReport(mainReason, choices[mainReasonIndex][selectedChoice]);
    changeStage(3, -1, -1);
  }

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.controls}
          style={{ marginRight: "10px" }}
          onClick={() => {
            changeStage(1, mainReasonIndex, selectedChoice);
          }}
        >
          <Image
            src={back}
            width={16}
            height={16}
            viewBox="0 0 20 20"
            alt="back"
          />
        </button>
        <div className={styles.title}>Submit a report</div>
        <button
          type="button"
          className={styles.controls}
          style={{ marginLeft: "auto" }}
          onClick={() => closeModal()}
        >
          <Image
            src={close}
            width={16}
            height={16}
            viewBox="0 0 20 20"
            alt="close"
          />
        </button>
      </div>
      <div className={styles.subTitle}>{[question[mainReasonIndex]]}</div>
      <div className={styles.body} style={{ height: "85%" }}>
        <div className={styles.choices}>
          {choices[mainReasonIndex].map((option, index) => (
            <div className={styles.radio} key={index}>
              <input
                className={`${styles.radioButton} ${selectedChoice === index ? styles.selected : ""}`}
                onClick={() => {
                  setSelectedChoice(index);
                }}
                type="radio"
                id={`option${index}`}
                name="options"
                value={option}
                defaultChecked={selectedChoice === index}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              name={"Submit"}
              active={selectedChoice === -1 ? false : true}
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StageThree({ reportedUser, closeModal, onBlock }) {
  const [blockUser, setBlockUser] = useState(false);

  function finishReport() {
    if (blockUser === true) {
      onBlock();
    }
    closeModal();
  }

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.header}>
        <div className={styles.title}>Report Submitted</div>
        <button
          type="button"
          className={styles.controls}
          style={{ marginLeft: "auto" }}
          onClick={() => closeModal()}
        >
          <Image
            src={close}
            width={16}
            height={16}
            viewBox="0 0 20 20"
            alt="close"
          />
        </button>
      </div>
      <div className={styles.subTitle}>Thanks for your report</div>
      <div className={styles.description}>
        Thanks again for your report and for looking out for yourself and your
        fellow redditors. Your reporting helps make Reddit a better, safer, and
        more welcoming place for everyone; and it means a lot to use
      </div>
      <div
        className={styles.body}
        style={{ justifyContent: "flex-end", height: "65%" }}
      >
        <div className={styles.footer}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <Toogle
                optionTitle={`Block ${reportedUser} `}
                optionDescription={
                  "You won't be able to send direct messages or chat requests to each other "
                }
                isToggled={blockUser}
                onToggle={() => setBlockUser(!blockUser)}
              />
            </div>
            <Button name={"Done"} onClick={() => finishReport()} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportModal({
  subRedditPicture,
  subRedditName,
  subRedditRules,
  closeModal,
  onReport,
  onBlock,
  userName,
}) {
  let reasons;
  if (subRedditName === null) {
    reasons = [
      "Harassment",
      "Threatening violence",
      "Hate",
      "Minor abuse or sexualization",
      "Sharing personal information",
      "Non-consensual intimate media",
      "Prohibited transaction",
      "Impersonation",
      "Copyright violation",
      "Trademark violation",
      "Spam",
    ];
  } else {
    reasons = [
      `Breaks r/${subRedditName} rules`,
      "Harassment",
      "Threatening violence",
      "Hate",
      "Minor abuse or sexualization",
      "Sharing personal information",
      "Non-consensual intimate media",
      "Prohibited transaction",
      "Impersonation",
      "Copyright violation",
      "Trademark violation",
      "Spam",
    ];
  }
  const [stage, setStage] = useState(1);
  const [mainReasonIndex, setMainReasonIndex] = useState(-1);
  const [subReasonIndex, setSubReasonIndex] = useState(-1);

  function handleStateChange(nextStage, mainReason, subReason) {
    setStage(nextStage);
    setMainReasonIndex(mainReason);
    setSubReasonIndex(subReason);
  }

  return (
    <div
      className={styles.modelOverlay}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.modal}>
        {stage === 1 && (
          <StageOne
            closeModal={closeModal}
            onReport={onReport}
            mainReasonIndex={mainReasonIndex}
            subReasonIndex={subReasonIndex}
            subRedditPicture={subRedditPicture}
            subRedditName={subRedditName}
            changeStage={(nextStage, mainReason, subReason) =>
              handleStateChange(nextStage, mainReason, subReason)
            }
          />
        )}
        {stage === 2 && (
          <StageTwo
            closeModal={closeModal}
            onReport={onReport}
            subRedditRules={subRedditRules}
            mainReasonIndex={mainReasonIndex}
            subReasonIndex={subReasonIndex}
            mainReason={reasons[mainReasonIndex]}
            changeStage={(nextStage, mainReason, subReason) =>
              handleStateChange(nextStage, mainReason, subReason)
            }
          />
        )}
        {stage === 3 && (
          <StageThree
            closeModal={closeModal}
            onBlock={onBlock}
            reportedUser={userName}
          />
        )}
      </div>
    </div>
  );
}

export default ReportModal;
