import React, { useState, useEffect } from "react";
import styles from "./RenderMiscOptions.module.css";
import OutlineButton from "../components/UI/OutlineButton";
import Wrapper from "./scheduled/components/Wrapper";

/**
 * Component for rendering miscellaneous options for a post.
 * @component
 * @param   {function} setSpoiler   Function to toggle the spoiler state.
 * @param   {function} setNsfw   Function to toggle the NSFW state.
 * @param   {function} createPost   Passed down function to submit the post
 * @param   {function} setScheduledDate   Passed down function to set scheduled date
 * @param   {boolean} scheduled   Passed down boolean to enable scheduled posting
 * @param   {string} scheduledDate   Passed down string representing current scheduled date
 * @param   {boolean} nsfw   Current state of NSFW setting.
 * @param   {boolean} spoiler   Current state of spoiler setting.
 * @param   {boolean} ready   Flag indicating if the post is ready to be submitted (must be a passed down state prop)
 * @returns {JSX.Element} The rendered RenderMiscOptions component.
 *
 * @example
 * // Renders the RenderMiscOptions component with custom props.
 * <RenderMiscOptions
 *   setSpoiler={setSpoilerFunction}
 *   setNsfw={setNsfwFunction}
 *   nsfw={false}
 *   spoiler={true}
 *   ready={ready}
 * />;
 */
function RenderMiscOptions({
  setSpoiler,
  setNsfw,
  nsfw,
  spoiler,
  ready,
  createPost,
  setScheduledDate,
  scheduled,
  scheduledDate,
  spoilerAllowed,
  nsfwAllowed,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleOverlay = () => {
    setIsOpen(!isOpen);
  };

  // 3 second cooldown to prevent spamming
  const handleCooldown = () => {
    createPost();
    setCooldown(true);
    const delay = setTimeout(() => {
      setCooldown(false);
    }, 3000);
    return () => clearTimeout(delay);
  };

  return (
    <div className={`${styles.miscOptionPad}`}>
      <div className={`${styles.miscOptionFlex}`}>
        <div
          className={`${styles._2_rA2mCdhHc1Lr7Ff1ygvH._2_rA2mCdhHc1Lr7Ff1ygvH} ${styles.XZKLTFT5CgGo9MvPQQsy}`}
        >
          <button
            role="button"
            disabled={!spoilerAllowed}
            tabIndex="0"
            onClick={() => setSpoiler(!spoiler)}
            aria-label="Mark as a spoiler"
            className={`${styles.miscOverflow} ${styles.miscAppearance} create--buttonContent create--buttonStyle
            ${spoiler === true ? styles.miscSpoilerSelected : ""}`}
          >
            <span className={`${styles.miscIcon} icon icon-add`}>
              {spoiler === true ? <div>&#10003;</div> : <div>&#43;</div>}
            </span>
            <span>Spoiler</span>
          </button>
          <button
            role="button"
            disabled={!nsfwAllowed}
            onClick={() => setNsfw(!nsfw)}
            tabIndex="0"
            aria-label="Mark as Not Safe For Work"
            className={`${styles.miscOverflow} ${styles.miscAppearance} create--buttonContent create--buttonStyle
            ${nsfw === true ? styles.miscNsfwSelected : ""}
            `}
          >
            <span className={`${styles.miscIcon} icon icon-add`}>
              {nsfw === true ? <div>&#10003;</div> : <div>&#43;</div>}
            </span>
            <span>NSFW</span>
          </button>

          {/*<button
            role="button"
            tabIndex="0"
            aria-label="Not available for this community"
            disabled
            className={`${styles.miscOverflow} ${styles.miscAppearance} create--buttonContent create--buttonStyle`}
          >
            <span>
              <span className={` ${styles.icon} ${styles.iconHeaderMargin}`}>🔖</span>
              <div className={`${styles.miscFlairText}`}>Flair</div>
            </span>
          </button>*/}
        </div>
      </div>
      <hr className={`${styles.mischr}`} />
      <div className={`${styles.miscBottom}`}>
        <div className={`${styles.miscBottomFlex}`}>
          <div className={`${styles.miscBottomBtns}`}>
            <OutlineButton
              children="Post"
              isInverted={true}
              isDisabled={!ready || cooldown}
              btnClick={handleCooldown}
            />
            {scheduled && (
              <>
                <OutlineButton
                  children="Schedule Post"
                  isDisabled={!ready}
                  btnClick={handleOverlay}
                />
                <Wrapper
                  isOpen={isOpen}
                  onClose={handleOverlay}
                  addFunc={setScheduledDate}
                />{" "}
                <button
                  role="button"
                  tabIndex="0"
                  className={`${styles.buttonBorder} ${styles.buttonText} ${styles.buttonColor} "focusable"`}
                  disabled={scheduledDate === ""}
                  onClick={() => {
                    setScheduledDate("");
                  }}
                >
                  Clear Scheduled Date
                  <svg
                    className={styles.deleteIcon}
                    data-testid="deleteicon"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.5,2H12.71l-.85-.85A.5.5,0,0,0,11.5,1h-3a.5.5,0,0,0-.35.15L7.29,2H3.5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-1A.5.5,0,0,0,16.5,2Z"></path>
                    <path d="M16.5,5H3.5a.5.5,0,0,0-.5.5v12A1.5,1.5,0,0,0,4.5,19h11A1.5,1.5,0,0,0,17,17.5V5.5A.5.5,0,0,0,16.5,5ZM6.75,15.5a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Z"></path>
                  </svg>
                </button>
                {scheduledDate !== "" ? (
                  <div style={{ fontSize: "12px", flex: "1" }}>
                    Scheduled Time:{" "}
                    {scheduledDate.slice(0, 16).replace("T", " ")}
                  </div>
                ) : (
                  ""
                )}
              </>
            )}

            {/*<OutlineButton children="Save Draft" isDisabled={true} />*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderMiscOptions;
