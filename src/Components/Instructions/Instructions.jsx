import React from "react";
import styles from "./Instructions.module.css";

function Instructions({ round, task }) {
  return (
    <div className={styles.container}>
      Instructions for round {round} task {task}
    </div>
  );
}

export default Instructions;
