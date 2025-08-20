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
  const [timeLeft, setTimeLeft] = useState(180); // 180 seconds = 3 minutes
  const [currentPatent, setCurrentPatent] = useState(randomString || null);

  // Fetch patent for the current task
  useEffect(() => {
    if (preSurveyId && task) {
      fetchPatentForTask();
    } else if (randomString) {
      // If no API data but randomString is provided, use it
      console.log("Using provided randomString as patent:", randomString);
      setCurrentPatent(randomString);
    }
  }, [preSurveyId, task, randomString]);

  const fetchPatentForTask = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_NODE_API
      }/api/patent-for-task/${preSurveyId}/${task}`;
      console.log(`Attempting to fetch patent from: ${apiUrl}`);

      const response = await fetch(apiUrl);

      if (response.ok) {
        const patentData = await response.json();
        setCurrentPatent(patentData.data);
        console.log(`Patent fetched for Task ${task}:`, patentData.data);
      } else {
        console.error(`API failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch patent:", error.message);
    }
  };

  // Reset timer when round changes
  useEffect(() => {
    setTimeLeft(180);
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
          patent: currentPatent,
          temperature,
          task,
        }),
      });

      if (response.ok) {
        const body = await response.json();
        console.log("Task submission successful:", body);
        console.log("Patent data sent:", currentPatent);
        setUseCases(() =>
          Array.from({ length: 3 }, () => ({ use: "", explanation: "" }))
        );
        setTimeLeft(180);
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
        <h1 className={styles.taskTitle}>
          Task {task}: Patent Technology Applications
        </h1>
        <div className={styles.patentSection}>
          <h2 className={styles.patentName}>
            Patent Name: {currentPatent?.patentName || "Loading..."}
          </h2>
          <div className={styles.patentDescription}>
            <h3>Patent Description:</h3>
            <p>{currentPatent?.abstract || "Loading patent description..."}</p>
          </div>
        </div>
        <p className={styles.taskDescription}>
          List three creative application ideas for how this technology could be
          used in the real world.
        </p>
        <div className={styles.timer}>Time remaining: {formatTime()}</div>
      </div>

      <form onSubmit={handleSubmit} className={styles.useCaseForm}>
        {useCases.map((item, index) => (
          <div key={index} className={styles.useCaseGroup}>
            <div className={styles.useCaseNumber}>{index + 1}</div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="What's your application idea?"
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
          <button type="submit" className={styles.submitButton}>
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  );
}

export default AUT;
