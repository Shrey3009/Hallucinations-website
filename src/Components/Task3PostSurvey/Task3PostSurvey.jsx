import React, { useState } from "react";
import styles from "./Task3PostSurvey.module.css";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";

function Task3PostSurvey() {
  const [formData, setFormData] = useState({
    confidence: "",
    difficulty: "",
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
    console.log("Submitting Task 3 post-survey data:", formData);

    try {
      const response = await fetch(
        import.meta.env.VITE_NODE_API + "/Task3PostSurvey",
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

      console.log("Task 3 post-survey submitted successfully:", responseData);
      navigate("/Task4"); // Navigate to Task 4
    } catch (error) {
      console.error("Error submitting Task 3 post-survey:", error);
      alert(error.message || "Failed to submit survey. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task 3 Feedback</h1>
      <p className={styles.subtitle}>
        Please help us understand your experience with Task 3.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.questionGroup}>
          <h2 className={styles.questionTitle}>
            How confident are you in the quality of your application ideas?
          </h2>
          <p className={styles.questionSubtitle}>
            Think about how creative, useful, and novel your ideas were.
          </p>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="confidence"
                value="not-confident"
                checked={formData.confidence === "not-confident"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Not confident at all — My ideas were basic or unoriginal
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="confidence"
                value="slightly-confident"
                checked={formData.confidence === "slightly-confident"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Slightly confident — I had some decent ideas but nothing special
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="confidence"
                value="moderately-confident"
                checked={formData.confidence === "moderately-confident"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Moderately confident — My ideas were reasonably creative and
                useful
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="confidence"
                value="very-confident"
                checked={formData.confidence === "very-confident"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Very confident — I came up with some innovative and practical
                ideas
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="confidence"
                value="extremely-confident"
                checked={formData.confidence === "extremely-confident"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Extremely confident — My ideas were highly creative and
                groundbreaking
              </span>
            </label>
          </div>
          {errors.confidence && (
            <span className={styles.errorMessage}>{errors.confidence}</span>
          )}
        </div>

        <div className={styles.questionGroup}>
          <h2 className={styles.questionTitle}>
            How difficult did you find this task?
          </h2>
          <p className={styles.questionSubtitle}>
            Consider the mental effort required to generate creative
            applications.
          </p>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="difficulty"
                value="very-easy"
                checked={formData.difficulty === "very-easy"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Very easy — Ideas came to me naturally and quickly
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="difficulty"
                value="somewhat-easy"
                checked={formData.difficulty === "somewhat-easy"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Somewhat easy — I could think of ideas without much struggle
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="difficulty"
                value="moderate"
                checked={formData.difficulty === "moderate"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Moderate — Required some thinking but manageable
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="difficulty"
                value="somewhat-difficult"
                checked={formData.difficulty === "somewhat-difficult"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Somewhat difficult — Had to work hard to come up with good ideas
              </span>
            </label>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="difficulty"
                value="very-difficult"
                checked={formData.difficulty === "very-difficult"}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioLabel}>
                Very difficult — Struggled significantly to generate ideas
              </span>
            </label>
          </div>
          {errors.difficulty && (
            <span className={styles.errorMessage}>{errors.difficulty}</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Continue to Task 4
        </button>
      </form>
    </div>
  );
}

export default Task3PostSurvey;
