import React, { useState, useEffect, useRef } from "react";
import styles from "./CommentInput.module.css";
import Image from "next/image";
import fontsicon from "../../assets/fonts.svg";
import imageicon from "../../assets/image.svg";

/**
 * Comment Input component for user to input comments with optional image attachment
 * @component
 * @param {Function} onComment The function to be called when submitting a comment
 * @param {Function} close The function to be called when closing the comment input
 * @param {string} commentBody The initial comment body
 * @param {string} commentImage The URL of the initial comment image
 * @param {string} buttonDisplay The display text for the submit button ("comment" or "edit")
 * @param {boolean} isPost Indicates if the input is for a post or not
 * @returns {JSX.Element} The rendered CommentInput component.
 *
 * @example
 * const onComment = (comment) => {  }
 * const close = () => {  }
 * const commentBody = "Initial comment body"
 * const commentImage = "https://example.com/image.jpg"
 * const buttonDisplay = "comment"
 * const isPost = false
 * <CommentInput
 *   onComment={onComment}
 *   close={close}
 *   commentBody={commentBody}
 *   commentImage={commentImage}
 *   buttonDisplay={buttonDisplay}
 *   isPost={isPost}
 * />
 *
 * @example
 * const onComment = (comment) => {  }
 * const close = () => {  }
 * const commentBody = ""
 * const commentImage = null
 * const buttonDisplay = "Save edits"
 * const isPost = true
 * <CommentInput
 *   onComment={onComment}
 *   close={close}
 *   commentBody={commentBody}
 *   commentImage={commentImage}
 *   buttonDisplay={buttonDisplay}
 *   isPost={isPost}
 * />
 */

const CommentInput = ({
  onComment,
  close,
  commentBody,
  commentImage,
  buttonDisplay,
  isPost,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [commentBodyState, setCommentBody] = useState(commentBody || "");
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(null);
  const contentEditableRef = useRef(null);
  const inputRef = useRef(null);

  const updateImage = () => {
    if (commentImage !== undefined && commentImage.length !== 0) {
      setImageURL(commentImage);
    }
  };

  const resizeContentEditable = (element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight + 40}px`;
  };

  const parseAndStyleLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedText = text.replace(
      urlRegex,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
    );
    return formattedText;
  };

  useEffect(() => {
    // Resize the contentEditable div when the component mounts
    if (contentEditableRef.current) {
      resizeContentEditable(contentEditableRef.current);
      const formattedBody = parseAndStyleLinks(commentBodyState);
      contentEditableRef.current.innerHTML = formattedBody;
      attachClickEventToLinks(contentEditableRef.current);
    }
    updateImage();
  }, []);

  const handleCancel = () => {
    if (contentEditableRef.current.innerHTML == "" && imageURL == null) {
      close();
    } else {
      setShowModal(true);
    }
  };

  const handleCancel2 = () => {
    setShowModal(false);
  };

  const handleDiscard = () => {
    close();
  };

  const handleCommentSubmit = () => {
    if (contentEditableRef.current.innerHTML || imageURL) {
      const newComment = {
        content: contentEditableRef.current.innerHTML,
        attachments: image ? image : [],
      };
      setCommentBody("");
      setImage(null);
      setImageURL(null);
      onComment(newComment);
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageURL(URL.createObjectURL(file));
  };

  const handleCommentChange = (event) => {
    setCommentBody(event.target.value);
    if (contentEditableRef.current) {
      resizeContentEditable(contentEditableRef.current);
      const formattedBody = parseAndStyleLinks(event.target.value);
      contentEditableRef.current.innerHTML = formattedBody;
      attachClickEventToLinks(contentEditableRef.current);
    }
  };

  const attachClickEventToLinks = (element) => {
    const links = element.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className={styles.inputcontainer}>
        <div className={styles.commentContent}>
          {imageURL && (
            <img
              src={imageURL}
              alt="Uploaded"
              className={styles.uploadedImage}
            />
          )}
          <div
            ref={contentEditableRef}
            className={styles.commenttextarea}
            contentEditable="true"
            placeholder="write your comment here"
            onInput={handleCommentChange}
          ></div>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.leftbuttons}>
            {!isPost && (
              <div>
                <input
                  data-testid="file-input"
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  className={styles.uploadbutton}
                  disabled={imageURL !== null}
                />
                <Image
                  src={imageicon}
                  alt="image icon"
                  className={`${styles.icons} ${imageURL !== null ? styles.disabled : ""}`}
                  onClick={handleImageClick}
                />
              </div>
            )}
            <Image src={fontsicon} alt="fonts icon" className={styles.icons} />
          </div>
          <div className={styles.rightbuttons}>
            <button
              data-testid="cancel"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={
                buttonDisplay === "comment"
                  ? styles.addButton
                  : styles.editButton
              }
              onClick={handleCommentSubmit}
            >
              {buttonDisplay}
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className={styles.modaloverlay}>
          <div className={styles.modal}>
            <button className={styles.Xbutton} onClick={handleCancel2}>
              X
            </button>
            <h2>Discard comment?</h2>
            <p>
              You have a comment in progress, are you sure you want to discard
              it?
            </p>
            <div className={styles.modalbuttons}>
              <button
                className={styles.cancelButton2}
                data-testid="cancelmodal"
                onClick={handleCancel2}
              >
                Cancel
              </button>
              <button className={styles.discardButton} onClick={handleDiscard}>
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
