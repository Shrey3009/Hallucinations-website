import React, { useState, useEffect } from "react";
import styles from "./AUT.module.css";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";
import { useData } from "../../dataContext";

function AUT() {
  const [useCases, setUseCases] = useState(() =>
    Array.from({ length: 3 }, () => ({ use: "", explanation: "" }))
  );
  const [errors, setErrors] = useState({});
  const { surveyId } = useSurvey();
  const navigate = useNavigate();
  const preSurveyId = surveyId;
  const { data, setData } = useData();
  const [randomString, setRandomString] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 180 seconds = 3 minutes

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
      setTimeLeft(180);
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

  const addMoreUseCases = () => {
    if (useCases.length < 15) {
      setUseCases([...useCases, { use: "", explanation: "" }]);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_NODE_API + "/AUT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useCases,
          preSurveyId: preSurveyId,
          object: randomString,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        window.scrollTo(0, 0);
        navigate("/Task2Page", { state: { data: data } });
      } else {
        if (responseData.errors) {
          const newErrors = {};
          if (Array.isArray(responseData.errors)) {
            responseData.errors.forEach((error) => {
              // Assuming error format is "use_0 is required" or "explanation_1 is required"
              const [field, ...rest] = error.split(" ");
              newErrors[field] = rest.join(" ");
            });
          } else {
            newErrors.form = "Please fill in all required fields";
          }
          setErrors(newErrors);
        } else if (responseData.message) {
          alert(responseData.message);
        } else if (responseData.error) {
          alert(responseData.error);
        } else {
          alert("Failed to submit form");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form due to an error.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskHeader}>
        <h1 className={styles.taskTitle}>Task 1: Alternative Uses</h1>
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
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="What's your alternative use?"
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
        {errors.form && <div className={styles.formError}>{errors.form}</div>}
      </form>
    </div>
  );
}

export default AUT;
