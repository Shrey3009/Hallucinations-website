import React, { useState } from "react";
import styles from "./PostSurvey.module.css";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";

function PostSurvey() {
  const [formData, setFormData] = useState({
    enjoyment: "",
    difficulty: "",
    aiHelpfulness: "",
    aiInteraction: "",
    creativity: "",
    feedback: "",
    improvements: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { surveyId } = useSurvey();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        import.meta.env.VITE_NODE_API + "/PostSurvey",
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

      const data = await response.json();
      console.log("data", data);
      if (!response.ok) {
        if (data.errors) {
          const newErrors = {};
          // Check if data.errors is an array before using forEach
          if (Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              const field = error.toLowerCase().split(" ")[0];
              newErrors[field] = error;
            });
          } else {
            // Handle case where errors is not an array
            newErrors.form = "Invalid error format received from server";
          }
          setErrors(newErrors);
          throw new Error("Please correct the highlighted errors");
        }
        throw new Error(data.message || "Failed to submit form");
      }

      navigate("/ThankYou");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to submit form. Please try again.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Post-Task Survey</h1>
          <p className={styles.description}>
            Please help us understand your experience with the alternative uses
            task and AI interaction.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>How enjoyable was the task?</label>
            <select
              name="enjoyment"
              value={formData.enjoyment}
              onChange={handleChange}
              className={`${styles.field} ${
                errors.enjoyment ? styles.error : ""
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="1">1 - Not enjoyable at all</option>
              <option value="2">2 - Slightly enjoyable</option>
              <option value="3">3 - Moderately enjoyable</option>
              <option value="4">4 - Very enjoyable</option>
              <option value="5">5 - Extremely enjoyable</option>
            </select>
            {errors.enjoyment && (
              <span className={styles.errorMessage}>{errors.enjoyment}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>How difficult was the task?</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className={`${styles.field} ${
                errors.difficulty ? styles.error : ""
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="1">1 - Very easy</option>
              <option value="2">2 - Easy</option>
              <option value="3">3 - Moderate</option>
              <option value="4">4 - Difficult</option>
              <option value="5">5 - Very difficult</option>
            </select>
            {errors.difficulty && (
              <span className={styles.errorMessage}>{errors.difficulty}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              How helpful was the AI in generating ideas?
            </label>
            <select
              name="aiHelpfulness"
              value={formData.aiHelpfulness}
              onChange={handleChange}
              className={`${styles.field} ${
                errors.aiHelpfulness ? styles.error : ""
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="1">1 - Not helpful at all</option>
              <option value="2">2 - Slightly helpful</option>
              <option value="3">3 - Moderately helpful</option>
              <option value="4">4 - Very helpful</option>
              <option value="5">5 - Extremely helpful</option>
            </select>
            {errors.aiHelpfulness && (
              <span className={styles.errorMessage}>
                {errors.aiHelpfulness}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              How was your interaction with the AI?
            </label>
            <select
              name="aiInteraction"
              value={formData.aiInteraction}
              onChange={handleChange}
              className={`${styles.field} ${
                errors.aiInteraction ? styles.error : ""
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="1">1 - Very poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Fair</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
            {errors.aiInteraction && (
              <span className={styles.errorMessage}>
                {errors.aiInteraction}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Did the AI help enhance your creativity?
            </label>
            <select
              name="creativity"
              value={formData.creativity}
              onChange={handleChange}
              className={`${styles.field} ${
                errors.creativity ? styles.error : ""
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="1">1 - Not at all</option>
              <option value="2">2 - A little bit</option>
              <option value="3">3 - Somewhat</option>
              <option value="4">4 - Quite a bit</option>
              <option value="5">5 - Significantly</option>
            </select>
            {errors.creativity && (
              <span className={styles.errorMessage}>{errors.creativity}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              What aspects of the AI interaction were most helpful?
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className={`${styles.field} ${styles.textarea} ${
                errors.feedback ? styles.error : ""
              }`}
              placeholder="Please share your thoughts..."
              required
            />
            {errors.feedback && (
              <span className={styles.errorMessage}>{errors.feedback}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              How could the AI interaction be improved?
            </label>
            <textarea
              name="improvements"
              value={formData.improvements}
              onChange={handleChange}
              className={`${styles.field} ${styles.textarea} ${
                errors.improvements ? styles.error : ""
              }`}
              placeholder="Your suggestions for improvement..."
              required
            />
            {errors.improvements && (
              <span className={styles.errorMessage}>{errors.improvements}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              I agree that my responses can be used for research purposes
            </label>
            {errors.agreeToTerms && (
              <span className={styles.errorMessage}>{errors.agreeToTerms}</span>
            )}
          </div>

          <div className={styles.submitContainer}>
            <button type="submit" className={styles.submitButton}>
              Submit Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostSurvey;
