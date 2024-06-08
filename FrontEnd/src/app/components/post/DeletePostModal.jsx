import close from "../../assets/close.svg";
import Button from "./Button";
import styles from "./DeletePostModal.module.css";
import Image from "next/image";

/**
 * Component for displaying a modal to confirm deletion.
 * @component
 * @param {string} modalTitle - The title of the modal.
 * @param {string} modalDescription - The description written in the modal.
 * @param {Function} closeModal - The function to be executed when closeing the modal.
 * @param {Function} onDelete - The function to be executed after clicking delete.
 * @returns {JSX.Element} The rendered DeletePost component.
 *
 * @example
 * // Renders a DeletePost modal with specified functions to handle closing and deleting a post.
 * <DeletePost modalTitle={"Delete post?"} modalDescription={"Once you delete this post, it can’t be restored."} onDelete={() => onDeleteFunction} closeModal={() => onCloseFunction} />
 */

function DeletePost({ modalTitle, modalDescription, closeModal, onDelete }) {
  function handleDelete() {
    closeModal();
    onDelete();
  }

  return (
    <div
      className={styles.modelOverlay}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>{modalTitle}</div>
          <button
            type="button"
            className={styles.close}
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
        <div className={styles.description}>{modalDescription}</div>
        <div className={styles.buttons}>
          <div className={styles.back}>
            <Button
              name={"Go Back"}
              active={true}
              onClick={() => closeModal()}
            />
          </div>
          <div className={styles.delete}>
            <Button
              name={"Yes, Delete"}
              active={true}
              onClick={() => handleDelete()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePost;
