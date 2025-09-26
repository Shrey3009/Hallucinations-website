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
  
  const { data, setData } = useData();
  const [randomString, setRandomString] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (surveyId) {
      fetchPatentForTask();
    }
  }, [surveyId]);

  const fetchPatentForTask = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_NODE_API
      }/api/patent-for-task/${surveyId}/1`;
      console.log(`Attempting to fetch patent from: ${apiUrl}`);

      const response = await fetch(apiUrl);

      if (response.ok) {
        const patentData = await response.json();
        setRandomString(patentData.data);
        console.log("Patent fetched for Task 1:", patentData.data.patentName);
      } else {
        console.error(`API failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch patent:", error.message);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      setTimeLeft(300);
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleChange = (index, type, value) => {
    const newUseCases = [...useCases];
    newUseCases[index][type] = value;
    setUseCases(newUseCases);
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
      const response = await fetch(
         `${import.meta.env.VITE_NODE_API}/api/AUT`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useCases,
          preSurveyId: surveyId,
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
        <h1 className={styles.taskTitle}>
          Task 1: Patent Technology Applications
        </h1>
        <div className={styles.patentSection}>
          <h2 className={styles.patentName}>
            Patent Name: {randomString?.patentName || "Loading..."}
          </h2>
          <div className={styles.patentDescription}>
            <h3>Patent Description:</h3>
            {randomString?.patentDescription ? (
              (() => {
                const text = randomString.patentDescription || "";
                const [summaryPart, detailsPart] =
                  text.split("Key Technical Details:");

                return (
                  <>
                    <p>
                      <strong>Summary:</strong>{" "}
                      {summaryPart.replace("Summary:", "").trim()}
                    </p>

                    {detailsPart && (
                      <>
                        <p><strong>Key Technical Details:</strong></p>
                        <div style={{ textAlign: "left", marginLeft: "1rem" }}>
                          {detailsPart
                            .trim()
                            .split("\n")
                            .map((line, index) =>
                              line.trim() ? (
                                <p key={index}>{line.trim()}</p>
                              ) : null
                            )}
                        </div>
                      </>
                    )}
                  </>
                );
              })()
            ) : (
              "Loading patent description..."
            )}
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

export default AUT;
