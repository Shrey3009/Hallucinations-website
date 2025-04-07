import React from "react";
import styles from "./LoadingPage.module.css";

function LoadingPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        <h2 className={styles.loadingText}>Loading...</h2>
        <p className={styles.loadingMessage}>
          Please wait while we prepare your next task
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;
