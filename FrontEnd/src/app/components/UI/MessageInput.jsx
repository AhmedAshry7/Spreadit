import React, { useState, useRef, useEffect } from "react";
import styles from "./MessageInput.module.css";
import Image from "next/image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../../lib/firebase";
import EmojiPicker from "emoji-picker-react";
import emojiIcon from "../../assets/emoji-smile.svg";
import sendIcon from "../../assets/send.svg";
import sendIconDisabled from "../../assets/senddisabled.svg";
import imageIcon from "../../assets/image.svg";
import ImagePreview from "./ImagePreview";

/**
 * MessageInput component for composing and sending messages.
 * @component
 * @param {Function} onSend Function to handle sending of the message
 * @param {string} message The text content of the message
 * @param {Function} setmessage Function to update the message content
 * @param {Function} setimage Function to update the image URL
 * @returns {JSX.Element} The rendered MessageInput component.
 *
 * @example
 * const onSend = () => {
 *   
 * };
 * const message = "Hello";
 * const setmessage = () => {
 *   
 * };
 * const setimage = () => {
 *   
 * };
 * <MessageInput onSend={onSend} message={message} setmessage={setmessage} image={image} setimage={setimage} />
 */

const MessageInput = ({ onSend, message, setmessage, setimage }) => {
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagesURL, setImagesURL] = useState([]);
  const [counter, setCounter] = useState(null);
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);

  // Initialize storage object
  const storage = getStorage(app);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const newImages = [...images, selectedFile];
    setImages(newImages);

    const newImagesUrl = [...imagesURL, URL.createObjectURL(selectedFile)];
    setImagesURL(newImagesUrl);
  };

  useEffect(() => {
    const handleUpload = async () => {
      if (!file) {
        return;
      }

      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Error uploading file:", error.message);
        },
        async () => {
          // Upload complete, get download URL and log it
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Update image state and call onSend
            setimage(downloadURL);
            if (counter === images.length - 1) {
              setImages([]);
              setCounter(null);
              inputRef.current.value = null;
            } else {
              let newcounter = counter;
              newcounter++;
              setCounter(newcounter);
            }
          } catch (error) {
            console.error("Error getting download URL:", error.message);
          }
        },
      );
    };

    handleUpload();
  }, [file]);

  useEffect(() => {
    const setting = () => {
      setFile(images[counter]);
    };
    setting();
  }, [counter]);

  const onClickSend = async () => {
    setShowEmojiPicker(false);
    if (message !== "") {
      onSend();
      setmessage("");
    }

    if (images.length !== 0) {
      setImagesURL([]);
      setCounter(0);
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (event) => {
    setmessage(event.target.value);
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    const newImagesUrl = [...imagesURL];

    newImages.splice(index, 1);
    newImagesUrl.splice(index, 1);

    setImages(newImages);
    setImagesURL(newImagesUrl);
  };

  const handleEmojiClick = (emojiData, event) => {
    setmessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  return (
    <div className={styles.messageinput}>
      {imagesURL.length !== 0 && (
        <div className={styles.imagepreviews}>
          {imagesURL.map((imageUrl, index) => (
            <ImagePreview
              key={index}
              imageUrl={imageUrl}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
      )}

      <div className={styles.inputarea}>
        <div>
          <input
            data-testid="file-input"
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            className={styles.uploadbutton}
          />
          <Image
            src={imageIcon}
            alt="image icon"
            className={styles.uploadicons}
            onClick={handleImageClick}
          />
        </div>
        <div className={styles.inputholder}>
          <input
            type="text"
            value={message}
            placeholder="Message"
            className={styles.inputbox}
            onChange={handleInputChange}
          />
          <Image
            src={emojiIcon}
            className={styles.emoijiicon}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
        </div>
        {showEmojiPicker && (
          <div className={styles.emojis}>
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              disableAutoFocus={true}
            />
          </div>
        )}
        {message === "" && images.length === 0 && (
          <Image
            src={sendIconDisabled}
            alt={"send icon disabled"}
            className={styles.disabled}
          />
        )}
        {(message !== "" || images.length !== 0) && (
          <Image
            src={sendIcon}
            alt={"send icon"}
            className={styles.icons}
            onClick={onClickSend}
          />
        )}
      </div>
    </div>
  );
};

export default MessageInput;
