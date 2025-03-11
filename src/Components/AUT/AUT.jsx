import React, { useState } from "react";
import styles from "./AUT.module.css"; // Importing the CSS module
import { useNavigate, useLocation } from "react-router-dom";
import Instructions from "../Instructions/Instructions";
import { useSurvey } from "../../surveyIDContext";
function AUT() {
  const [useCases, setUseCases] = useState(() =>
    Array.from({ length: 3 }, () => ({ use: "", explanation: "" }))
  );
  const { surveyId, setSurveyId } = useSurvey();

  const navigate = useNavigate();
  // const location = useLocation();
  // const { preSurveyId } = location.state || {}; // Ensure a fallback if state is undefined

  const preSurveyId = surveyId;
  // console.log("preSurveyId", preSurveyId);

  const handleChange = (index, type, value) => {
    const newUseCases = [...useCases];
    newUseCases[index][type] = value;
    setUseCases(newUseCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Sending data:",
      JSON.stringify({ useCases, preSurveyId: preSurveyId })
    );

    // Simple client-side validation
    if (useCases.some((uc) => !uc.use.trim() || !uc.explanation.trim())) {
      alert("All fields must be filled out.");
      return;
    }

    try {
      // console.log("PreSurveyId", preSurveyId);
      let NODE_api = import.meta.env.VITE_NODE_API + "/AUT";
      const response = await fetch(NODE_api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useCases, preSurveyId: preSurveyId }),
      });
      if (response.ok) {
        navigate("/AUT_gpt");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form due to an error.");
    }
  };

  return (
    <>
      <Instructions />
      <div className={styles.container}>
        <h1>AUT</h1>
        <div className={styles.header}>
          <img
            src="../../assets/bicycle-pump.png"
            alt="Bicycle Pump"
            className={styles.image}
          />
          <h2 className={styles.title}>BICYCLE PUMP</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {useCases.map((item, index) => (
            <div key={index} className={styles.useCaseGroup}>
              <input
                type="text"
                placeholder={`Use Case #${index + 1}`}
                value={item.use}
                onChange={(e) => handleChange(index, "use", e.target.value)}
                className={styles.inputField}
              />
              <input
                type="text"
                placeholder="Explanation"
                value={item.explanation}
                onChange={(e) =>
                  handleChange(index, "explanation", e.target.value)
                }
                className={styles.inputField}
              />
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AUT;
