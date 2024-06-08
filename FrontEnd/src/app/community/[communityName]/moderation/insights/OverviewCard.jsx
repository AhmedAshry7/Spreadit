import React from "react";
import styles from "./OverviewCard.module.css";

function OverviewCard({ data, description, date }) {
  return (
    <div className={styles.container}>
      <div className={styles.info_container}>
        <span className={styles.data}>{data}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <span className={styles.date}>in the previous {date}</span>
    </div>
  );
}

export default OverviewCard;
