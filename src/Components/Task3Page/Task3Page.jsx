import React, { useEffect } from "react";
import styles from "./Task3Page.module.css";
import { useNavigate } from "react-router-dom";

function Task3Page() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    window.scrollTo(0, 0);
    navigate("/AUT3"); // Navigate to Task 3 execution
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Task 3: Baseline Ideation</h1>
          <p className={styles.description}>
            In this task, you will explore how a patent might be applied in
            creative and practical ways. This is similar to Task 1, but with a
            different patent technology.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Task Overview</h2>
            <p className={styles.taskDescription}>
              You will read a brief description of a real-world technology and
              generate three creative application ideas for how this technology
              could be used in 5 minutes.
            </p>
            <p className={styles.taskDescription}>
              No AI tools are allowed during this task. Focus on coming up with
              ideas that are creative, original and useful.
            </p>
            <p className={styles.note}>
              Each task will have specific instructions. Please read them
              carefully before proceeding.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Important Notes</h2>
            <ul className={styles.notesList}>
              <li>You have 5 minutes to complete this task</li>
              <li>Generate exactly 3 application ideas</li>
              <li>Focus on creativity, usefulness, and novelty</li>
              <li>No AI assistance is allowed</li>
            </ul>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.startButton} onClick={handleStart}>
            Start Task 3
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task3Page;
