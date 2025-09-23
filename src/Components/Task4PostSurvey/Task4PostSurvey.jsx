import React, { useState } from "react";
import styles from "./Task4PostSurvey.module.css";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";

function Task4PostSurvey() {
  const [formData, setFormData] = useState({
    accuracy: "",
    helpfulness: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { surveyId } = useSurvey();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Task 4 post-survey data:", formData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_NODE_API}/api/Task4PostSurvey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            preSurveyId: surveyId,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors) {
          const newErrors = {};
          responseData.errors.forEach((error) => {
            const field = error.toLowerCase().split(" ")[0];
            newErrors[field] = error;
          });
          setErrors(newErrors);
          throw new Error("Please answer all questions");
        }
        throw new Error(responseData.message || "Failed to submit survey");
      }

      console.log("Task 4 post-survey submitted successfully:", responseData);
      navigate("/PostSurvey"); // Navigate to main post-survey
    } catch (error) {
      console.error("Error submitting Task 4 post-survey:", error);
      alert(error.message || "Failed to submit survey. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task 4 Feedback</h1>
      <p className={styles.subtitle}>
        Please help us understand your experience with the AI assistant in Task
        4.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.questionGroup}>
          <h2 className={styles.questionTitle}>
            How accurate or reasonable did you find the AI's suggestions?
          </h2>
          <p className={styles.questionSubtitle}>
            Choose the option that best reflects your impression.
          </p>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="accuracy"
                value="mostly-incorrect"
                checked={formData.accuracy === "mostly-incorrect"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                The suggestions were mostly incorrect or irrelevant
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="accuracy"
                value="some-made-sense"
                checked={formData.accuracy === "some-made-sense"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Some suggestions made sense, but others seemed off
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="accuracy"
                value="generally-reasonable"
                checked={formData.accuracy === "generally-reasonable"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                The suggestions were generally reasonable and plausible
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="accuracy"
                value="mostly-clear-accurate"
                checked={formData.accuracy === "mostly-clear-accurate"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Most suggestions were clear and accurate
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="accuracy"
                value="highly-logical"
                checked={formData.accuracy === "highly-logical"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                All suggestions were highly logical and well-grounded
              </span>
            </label>
          </div>
          {errors.accuracy && (
            <span className={styles.errorMessage}>{errors.accuracy}</span>
          )}
        </div>

        <div className={styles.questionGroup}>
          <h2 className={styles.questionTitle}>
            How helpful were the AI's suggestions in supporting your creative
            thinking?
          </h2>
          <p className={styles.questionSubtitle}>
            Think about whether the ideas inspired or guided your own thinking.
          </p>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="helpfulness"
                value="not-helpful"
                checked={formData.helpfulness === "not-helpful"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Not helpful at all — I didn't use any of the AI suggestions
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="helpfulness"
                value="slightly-helpful"
                checked={formData.helpfulness === "slightly-helpful"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Slightly helpful — One or two ideas gave me a small nudge
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="helpfulness"
                value="moderately-helpful"
                checked={formData.helpfulness === "moderately-helpful"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Moderately helpful — The ideas helped me brainstorm better
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="helpfulness"
                value="very-helpful"
                checked={formData.helpfulness === "very-helpful"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Very helpful — The suggestions pushed me in new directions
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="helpfulness"
                value="extremely-helpful"
                checked={formData.helpfulness === "extremely-helpful"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Extremely helpful — The AI greatly enhanced my creativity
              </span>
            </label>
          </div>
          {errors.helpfulness && (
            <span className={styles.errorMessage}>{errors.helpfulness}</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Complete Study
        </button>
      </form>
    </div>
  );
}

export default Task4PostSurvey;
