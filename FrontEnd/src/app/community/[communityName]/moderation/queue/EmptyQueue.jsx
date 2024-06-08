"use client";
import "./Queue.css";
import styles from "./EmptyQueue.module.css";
import kitteh from "@/app/assets/kitteh.png";

/**
 * Component for displaying an empty queue message with an image of a cat.
 * @component
 * @returns {JSX.Element} The rendered EmptyQueue component.
 *
 * @example
 * // Renders an empty queue message with a cat image
 * <EmptyQueue />
 */

function EmptyQueue({ message }) {
  return (
    <div className={styles.area}>
      <div
        className={styles.kitteh}
        style={{ backgroundImage: `url(${kitteh.src})` }}
      ></div>
      {message ? (
        <div className={styles.queueClean}>{message}</div>
      ) : (
        <div className={styles.queueClean}>The queue is clean!</div>
      )}
      <div className={styles.kittehPleased}>Kitteh is pleased</div>
    </div>
  );
}

export default EmptyQueue;
