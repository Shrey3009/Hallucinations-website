import React, { useState, useEffect } from "react";
import styles from "./AUT3.module.css";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";
import { useData } from "../../dataContext";

function AUT3() {
  const [useCases, setUseCases] = useState(() =>
    Array.from({ length: 3 }, () => ({ use: "", explanation: "" }))
  );
  const [errors, setErrors] = useState({});
  const { surveyId } = useSurvey();
  const navigate = useNavigate();
  const preSurveyId = surveyId;
  const { data, setData } = useData();
  const [randomString, setRandomString] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomString(data[randomIndex]);
      const newData = [
        ...data.slice(0, randomIndex),
        ...data.slice(randomIndex + 1),
      ];
      setData(newData);
    }
  }, []);

  useEffect(() => {
    // If timeLeft is 0, submit the form/data
    if (timeLeft === 0) {
      handleSubmit();
      setTimeLeft(300);
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
    // Clear error when user starts typing
    if (errors[`${type}_${index}`]) {
      setErrors((prev) => ({ ...prev, [`${type}_${index}`]: null }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_NODE_API + "/AUT3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useCases,
          preSurveyId: preSurveyId,
          patent: randomString,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors) {
          // Handle validation errors
          const newErrors = {};
          responseData.errors.forEach((error) => {
            // Extract field name from error message
            const field = error.toLowerCase().split(" ")[0];
            newErrors[field] = error;
          });
          setErrors(newErrors);
          throw new Error("Please correct the highlighted errors");
        }
        throw new Error(responseData.message || "Failed to submit form");
      }

      console.log("Task 3 submitted successfully:", responseData);
      navigate("/TaskPostSurvey", { state: { task: 3 } });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "Failed to submit form. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskHeader}>
        <h1 className={styles.taskTitle}>
          Task 3: Patent Technology Applications
        </h1>
        <div className={styles.patentSection}>
          <h2 className={styles.patentName}>
            Patent Name: {randomString?.name || "Loading..."}
          </h2>
          <div className={styles.patentDescription}>
            <h3>Patent Description:</h3>
            <p>
              {randomString?.description || "Loading patent description..."}
            </p>
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
            <div className={styles.useCaseNumber}>
              Application Idea {index + 1}
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="What's your application idea?"
                  value={item.use}
                  onChange={(e) => handleChange(index, "use", e.target.value)}
                  className={`${styles.inputField} ${
                    errors[`use_${index}`] ? styles.error : ""
                  }`}
                />
                {errors[`use_${index}`] && (
                  <span className={styles.errorMessage}>
                    {errors[`use_${index}`]}
                  </span>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Explain how it would work..."
                  value={item.explanation}
                  onChange={(e) =>
                    handleChange(index, "explanation", e.target.value)
                  }
                  className={`${styles.inputField} ${
                    errors[`explanation_${index}`] ? styles.error : ""
                  }`}
                />
                {errors[`explanation_${index}`] && (
                  <span className={styles.errorMessage}>
                    {errors[`explanation_${index}`]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Submit Answers
          </button>
        </div>
        {errors.form && <div className={styles.formError}>{errors.form}</div>}
      </form>
    </div>
  );
}

export default AUT3;
