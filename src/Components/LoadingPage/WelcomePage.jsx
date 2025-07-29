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
        Welcome to the Creative Innovation Study
      </h1>
      <p className={styles["welcome-text"]}>
        Thank you for participating in our study on how people generate creative
        product ideas. In this experiment, you'll be asked to come up with
        innovative applications for real-world technologies based on brief
        descriptions adapted from actual patents.
      </p>
      <p className={styles["welcome-text"]}>
        There are no right or wrong answers - we're simply interested in your
        ideas and how you think creatively.
      </p>
      <p className={styles["welcome-text"]}>
        Please aim for novel, useful, and diverse applications in each task.
      </p>
      <div className={styles["task-description"]}>
        <h2>Task 1: Baseline Ideation (No AI Support)</h2>
        <p>
          In this task, you will read a brief description of a real-world
          technology.
        </p>
        <p>
          Your goal is to generate three creative application ideas for how this
          technology could be used in 5 minutes.
        </p>
        <p>
          No AI tools is allowed during this task. Focus on coming up with ideas
          that are creative, original and useful.
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
