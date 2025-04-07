import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";

function WelcomePage() {
  const navigate = useNavigate();

  const navigateToTask = async () => {
    // Navigate to the next task
    console.log("Navigating to the next task");
    navigate("/AUT");
  };

  return (
    <div className={styles["welcome-container"]}>
      <h1 className={styles["welcome-title"]}>
        Welcome to the Creative Thinking Study
      </h1>
      <p className={styles["welcome-text"]}>
        Thank you for participating in this study on creative thinking. In this
        experiment, you will complete a series of tasks designed to explore
        different ways of generating ideas. Your input is valuable, and there
        are no right or wrong answers—just focus on being creative!
      </p>
      <div className={styles["task-description"]}>
        <h2>Task 1: Creative Thinking Without AI Assistance</h2>
        <p>
          In this task, you are not allowed to use AI tools. Think of as many
          alternative uses for the given object as possible within 3 minutes.
          For each idea, include a one-sentence explanation of the rationale
          behind its creative use.
        </p>
      </div>
      <p className={styles["welcome-text"]}>Click Next to begin!</p>
      <button onClick={navigateToTask} className={styles["next-button"]}>
        Next
      </button>
    </div>
  );
}

export default WelcomePage;
