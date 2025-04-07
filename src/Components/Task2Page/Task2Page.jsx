import React, { useEffect } from "react";
import styles from "./Task2Page.module.css";
import { useNavigate } from "react-router-dom";

function Task2Page() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    window.scrollTo(0, 0);
    navigate("/AUT_gpt");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Task 2: Alternative Uses</h1>
          <p className={styles.description}>
            In this task, you will be asked to think of alternative uses for a
            common object. You will have three rounds to interact with the AI
            and generate ideas.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Task Overview</h2>
            <ul className={styles.taskList}>
              <li>Round 1: Initial interaction with the AI</li>
              <li>Round 2: Building on previous ideas</li>
              <li>Round 3: Final refinement</li>
            </ul>
            <p className={styles.note}>
              Each round will have specific instructions on how to interact with
              the AI. Please read them carefully before proceeding.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Important Notes</h2>
            <ul className={styles.notesList}>
              <li>You can only ask for up to 3 answers per prompt</li>
              <li>Quality of ideas is more important than quantity</li>
              <li>Be creative and think outside the box</li>
              <li>Provide clear explanations for each use</li>
            </ul>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.startButton} onClick={handleStart}>
            Start Task 2
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task2Page;
