import React, { useState, useEffect } from "react";
import styles from "./AUT_.module.css";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";

function AUT({ round, onStateChange, task, randomString, temperature }) {
  const [useCases, setUseCases] = useState(() =>
    Array.from({ length: 3 }, () => ({ use: "", explanation: "" }))
  );
  const { surveyId } = useSurvey();
  const preSurveyId = surveyId;
  const [timeLeft, setTimeLeft] = useState(195); // 180 seconds = 3 minutes

  // Reset timer when round changes
  useEffect(() => {
    setTimeLeft(195);
  }, [round]);

  useEffect(() => {
    // If timeLeft is 0, submit the form/data
    if (timeLeft === 0) {
      handleSubmit();
    }

    // Set interval to countdown the timer
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Convert seconds into minutes and seconds for display
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleChange = (index, type, value) => {
    const newUseCases = [...useCases];
    newUseCases[index][type] = value;
    setUseCases(newUseCases);
  };

  const addMoreUseCases = () => {
    if (useCases.length < 15) {
      setUseCases([...useCases, { use: "", explanation: "" }]);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      let NODE_api = import.meta.env.VITE_NODE_API + "/AUT_gpt";
      const response = await fetch(NODE_api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useCases,
          preSurveyId,
          round,
          object: randomString,
          temperature,
          task,
        }),
      });

      if (response.ok) {
        const body = await response.json();
        console.log(body);
        setUseCases(() =>
          Array.from({ length: 3 }, () => ({ use: "", explanation: "" }))
        );
        setTimeLeft(195);
        onStateChange(round + 1);
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form due to an error.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskHeader}>
        <h1 className={styles.taskTitle}>Task {task}: Alternative Uses</h1>
        <p className={styles.taskDescription}>
          List as many alternative uses as possible for the following object and
          provide a reasonable explanation for each use:
        </p>
        <div className={styles.objectCard}>
          <h2 className={styles.objectName}>{randomString}</h2>
        </div>
        <div className={styles.timer}>Time remaining: {formatTime()}</div>
      </div>

      <form onSubmit={handleSubmit} className={styles.useCaseForm}>
        {useCases.map((item, index) => (
          <div key={index} className={styles.useCaseGroup}>
            <div className={styles.useCaseNumber}>{index + 1}</div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="What's your alternative use?"
                value={item.use}
                onChange={(e) => handleChange(index, "use", e.target.value)}
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Explain how it would work..."
                value={item.explanation}
                onChange={(e) =>
                  handleChange(index, "explanation", e.target.value)
                }
                className={styles.inputField}
              />
            </div>
          </div>
        ))}

        <div className={styles.buttonContainer}>
          {useCases.length < 15 && (
            <button
              type="button"
              onClick={addMoreUseCases}
              className={styles.addButton}
            >
              Add More Use Cases
            </button>
          )}
          <button type="submit" className={styles.submitButton}>
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  );
}

export default AUT;
