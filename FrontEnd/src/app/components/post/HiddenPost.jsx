import styles from "./HiddenPost.module.css";

/**
 * Component for displaying a hidden post with an option to undo hiding.
 * @component
 * @param {Function} unHide - The function to be executed when unhiding the post.
 * @returns {JSX.Element} The rendered HiddenPost component.
 *
 * @example
 * // Renders a HiddenPost with an option to undo hiding.
 * <HiddenPost unHide={handleUnhideFunction} />
 */

function HiddenPost({ unHide }) {
  return (
    <div
      className={styles.hidden}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.text}>Post hidden</div>
      <button type="button" className={styles.button} onClick={() => unHide()}>
        Undo
      </button>
    </div>
  );
}

export default HiddenPost;
