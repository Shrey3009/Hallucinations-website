import React, { useState } from "react";
import styles from "./AttentionTest.module.css";
import { useNavigate } from "react-router-dom";

function AttentionTest2() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [showError, setShowError] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowError(false);
  };

  const handleContinue = () => {
    if (selectedOption === "option2") {
      // Navigate to Task 3 (next task after Task 2)
      navigate("/AUT_gpt", { state: { task: 3 } });
    } else if (selectedOption === "option1" || selectedOption === "option3") {
      setShowError(true);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.congratulations}>🎉 Congratulations!</div>
        <h1 className={styles.title}>
          You've completed the task and provided some great creative ideas!
        </h1>

        <p className={styles.instruction}>
          To continue, please select option 2 below to continue.
        </p>

        <div className={styles.optionsContainer}>
          <h2 className={styles.optionsTitle}>Choose one option:</h2>

          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>
              <input
                type="radio"
                name="attention"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={() => handleOptionChange("option1")}
                className={styles.radioInput}
              />
              <span className={styles.optionText}>Option 1</span>
            </label>
          </div>

          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>
              <input
                type="radio"
                name="attention"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={() => handleOptionChange("option2")}
                className={styles.radioInput}
              />
              <span className={styles.optionText}>Option 2</span>
            </label>
          </div>

          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>
              <input
                type="radio"
                name="attention"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={() => handleOptionChange("option3")}
                className={styles.radioInput}
              />
              <span className={styles.optionText}>Option 3</span>
            </label>
          </div>
        </div>

        <p className={styles.note}>
          (Note: Only Option 2 enables proceeding to the next task.)
        </p>

        {showError && (
          <div className={styles.errorMessage}>
            Please select Option 2 to continue to the next task.
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button
            onClick={handleContinue}
            className={styles.continueButton}
            disabled={!selectedOption}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttentionTest2;
