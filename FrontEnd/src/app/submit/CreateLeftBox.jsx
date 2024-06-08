import Image from "next/image";
import React, { useState } from "react";
import "./Create.css";
import styles from "./CreateLeftBox.module.css";
import OutlineButton from "../components/UI/OutlineButton";
import BlueButton from "../components/UI/BlueButton";
import Checkbox from "../components/UI/Checkbox";
import MediaArea from "./MediaArea";
import PollCreator from "./PollCreator";
import RichTextEditor from "../components/UI/RichTextEditor";

import RenderLinkBox from "./RenderLinkBox";
import RenderMiscOptions from "./RenderMiscOptions";
import RenderNotificationSettings from "./RenderNotificationSettings";
import RenderTitleBox from "./RenderTitleBox";
import { create } from "@mui/material/styles/createTransitions";

/**
 * Component for the left box in the post creation interface.
 * @component
 * @param {function} setTitle - Function to set the title of the post.
 * @param {string} title - The title of the post.
 * @param {function} setUrl - Function to set the URL of the post.
 * @param {string} url - The URL of the post.
 * @param {boolean} spoiler - Boolean indicating whether the post contains spoilers.
 * @param {function} setSpoiler - Function to set whether the post contains spoilers.
 * @param {boolean} nsfw - Boolean indicating whether the post is NSFW (Not Safe For Work).
 * @param {function} setNsfw - Function to set whether the post is NSFW.
 * @param {boolean} notify - Boolean indicating whether to notify about the post.
 * @param {function} setNotify - Function to set whether to notify about the post.
 * @param {number} length - The length of the post.
 * @param {function} setLength - Function to set the length of the post.
 * @param {array} options - Array of options for a poll.
 * @param {function} setOptions - Function to set the options for a poll.
 * @param {array} mediaArray - Array of media files for the post.
 * @param {function} setMediaArray - Function to set the media files for the post.
 * @param {array} postMediaArray - Array of media files specifically for a post.
 * @param {function} setPostMediaArray - Function to set the media files specifically for a post.
 * @param {string} selectedOption - The currently selected option (post, image, link, poll).
 * @param {function} setSelectedOption - Function to set the currently selected option.
 * @param {boolean} ready - Boolean indicating whether the post is ready to be published.
 * @param {string} content - The content of the post.
 * @param {function} setContent - Function to set the content of the post.
 * @returns {JSX.Element} The rendered CreateLeftBox component.
 *
 * @example
 * // Renders the CreateLeftBox component with specified props.
 * <CreateLeftBox
 *   setTitle={setTitle}
 *   title={title}
 *   setUrl={setUrl}
 *   url={url}
 *   spoiler={spoiler}
 *   setSpoiler={setSpoiler}
 *   nsfw={nsfw}
 *   setNsfw={setNsfw}
 *   notify={notify}
 *   setNotify={setNotify}
 *   length={length}
 *   setLength={setLength}
 *   options={options}
 *   setOptions={setOptions}
 *   mediaArray={mediaArray}
 *   setMediaArray={setMediaArray}
 *   postMediaArray={postMediaArray}
 *   setPostMediaArray={setPostMediaArray}
 *   selectedOption={selectedOption}
 *   setSelectedOption={setSelectedOption}
 *   ready={ready}
 *   content={content}
 *   setContent={setContent}
 * />;
 */

function CreateLeftBox({
  setTitle,
  title,
  setUrl,
  url,
  spoiler,
  setSpoiler,
  nsfw,
  setNsfw,
  notify,
  setNotify,
  length,
  setLength,
  options,
  setOptions,
  mediaArray,
  setMediaArray,
  postMediaArray,
  setPostMediaArray,
  selectedOption,
  setSelectedOption,
  ready,
  content,
  setContent,
  createPost,
  setScheduledDate,
  scheduled,
  scheduledDate,
  pollsAllowed,
  spoilerAllowed,
  nsfwAllowed,
  linksAllowed,
  postsAllowed,
  multipleImages,
  mediaAllowed,
}) {
  const [rawContent, setRawContent] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  
  return (
    <div className={styles.mainBoxBorders}>
      <div className={styles.mainBoxHeader}>
        <div className={styles.mainBoxHeaderFlex}>
          <button
            disabled={!postsAllowed}
            className={`${styles.mainBoxHeaderItem} ${styles.mainBoxHeaderItemFirst} ${
              selectedOption === "post" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("post")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              📝
            </span>
            Post
          </button>
          <button
            disabled={!mediaAllowed}
            className={`${styles.mainBoxHeaderItem} ${
              selectedOption === "image" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("image")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              📸
            </span>
            Images & Video
          </button>
          <button
            disabled={!linksAllowed}
            className={`${styles.mainBoxHeaderItem} ${
              selectedOption === "link" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("link")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              🔗
            </span>
            Link
          </button>
          <button
            disabled={!pollsAllowed}
            className={`${styles.mainBoxHeaderItem} ${styles.mainBoxHeaderItemLast} ${
              selectedOption === "poll" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("poll")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              📊
            </span>
            Poll
          </button>
        </div>
      </div>
      <div style={{ margin: "16px" }}>
        <RenderTitleBox title={title} setTitle={setTitle} />
        {selectedOption === "link" && (
          <RenderLinkBox setUrl={setUrl} url={url} />
        )}
        {selectedOption === "image" && (
          <MediaArea
            mediaArray={mediaArray}
            setMediaArray={setMediaArray}
            multipleImages={multipleImages}
            mediaAllowed={mediaAllowed}
          />
        )}
        {selectedOption === "poll" && (
          <div>
            <RichTextEditor
              content={content}
              setContent={setContent}
              mediaArray={postMediaArray}
              setMediaArray={setPostMediaArray}
              rawContent={rawContent}
              setRawContent={setRawContent}
              multipleImages={multipleImages}
              mediaAllowed={mediaAllowed}
            />
            <PollCreator
              setOptions={setOptions}
              options={options}
              setLength={setLength}
              length={length}
            />
          </div>
        )}
        {selectedOption === "post" && (
          <RichTextEditor
            rawContent={rawContent}
            setRawContent={setRawContent}
            content={content}
            mediaAllowed={mediaAllowed}
            setContent={setContent}
            mediaArray={postMediaArray}
            setMediaArray={setPostMediaArray}
            multipleImages={multipleImages}
          />
        )}
      </div>

      <RenderMiscOptions
        scheduledDate={scheduledDate}
        scheduled={scheduled}
        setNsfw={setNsfw}
        nsfw={nsfw}
        setSpoiler={setSpoiler}
        spoiler={spoiler}
        ready={ready}
        createPost={createPost}
        setScheduledDate={setScheduledDate}
        spoilerAllowed={spoilerAllowed}
        nsfwAllowed={nsfwAllowed}
      />
      <RenderNotificationSettings notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default CreateLeftBox;
