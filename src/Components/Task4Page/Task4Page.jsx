import React, { useEffect } from "react";
import styles from "./Task4Page.module.css";
import { useNavigate } from "react-router-dom";

function Task4Page() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    window.scrollTo(0, 0);
    navigate("/AUT4_gpt");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Task 4: AI-Supported Creative Ideation
          </h1>
          <p className={styles.description}>
            In this task, you will explore how a patent might be applied in
            creative and practical ways. You will interact with an AI assistant
            to help inspire and develop your ideas.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Task Overview</h2>
            <ul className={styles.taskList}>
              <li>Round 1: Ask the AI for 3 possible application ideas</li>
              <li>Round 2: Reflect and build on AI's suggestions</li>
            </ul>
            <p className={styles.note}>
              Each round will have specific instructions on how to interact with
              the AI. Please read them carefully before proceeding.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Important Notes</h2>
            <ul className={styles.notesList}>
              <li>
                In Round 1, you can only request up to 3 application ideas for
                each patent from the AI.
              </li>
              <li>
                In Round 2, your interaction must be based only on the AI's
                previous outputs. No fresh prompts about unrelated ideas are
                allowed.
              </li>
              <li>
                Focus on finalizing your best three ideas, integrating your
                thoughts and any useful insights from the AI.
              </li>
              <li>
                You are not evaluated on writing skills. Focus on creativity,
                usefulness, and novelty.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.startButton} onClick={handleStart}>
            Start Task 4
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task4Page;
