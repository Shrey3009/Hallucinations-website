import React, { useState, useEffect } from "react";
import styles from "./TaskPostSurvey.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";

function TaskPostSurvey() {
  const [formData, setFormData] = useState({
    accuracy: "",
    helpfulness: "",
    confidence: "",
    difficulty: "",
  });
  const [errors, setErrors] = useState({});
  const [currentTask, setCurrentTask] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId } = useSurvey();

  // Get task number from location state or default to 2
  useEffect(() => {
    if (location.state?.task) {
      setCurrentTask(location.state.task);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submitting Task ${currentTask} post-survey data:`, formData);

    try {
      let payload = {
        preSurveyId: surveyId,
        taskNumber: currentTask,
      };

      // ✅ For AI tasks (2, 3, 4)
      if ([2, 3, 4].includes(currentTask)) {
        payload.accuracy = formData.accuracy;
        payload.helpfulness = formData.helpfulness;
      }

      // For baseline task (1)
      if (currentTask === 1) {
        payload.confidence = formData.confidence;
        payload.difficulty = formData.difficulty;
      }

      console.log("Payload being sent:", payload);

      const response = await fetch(
         `${import.meta.env.VITE_NODE_API}/api/TaskPostSurvey`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Backend error response:", responseData);
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

      console.log(
        `Task ${currentTask} post-survey submitted successfully:`,
        responseData
      );

      // Navigate based on current task
      if (currentTask === 2) {
        navigate("/AttentionTest2");
      } else if (currentTask === 3) {
        navigate("/AttentionTest3");
      } else if (currentTask === 4) {
        navigate("/PostSurvey");
      }
    } catch (error) {
      console.error(`Error submitting Task ${currentTask} post-survey:`, error);
      alert(error.message || "Failed to submit survey. Please try again.");
    }
  };

  const isAITask = [2, 3, 4].includes(currentTask);
  const isBaselineTask = currentTask === 1;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task {currentTask} Feedback</h1>
      <p className={styles.subtitle}>
        {isAITask
          ? `Please help us understand your experience with the AI assistant in Task ${currentTask}.`
          : `Please help us understand your experience with Task ${currentTask}.`}
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {isAITask && (
          <>
            {/* Accuracy Question */}
            <div className={styles.questionGroup}>
              <h2 className={styles.questionTitle}>
                How accurate or reasonable did you find the AI's suggestions?
              </h2>
              <p className={styles.questionSubtitle}>
                Choose the option that best reflects your impression.
              </p>
              <div className={styles.radioGroup}>
                {[
                  {
                    value: "mostly-incorrect",
                    label: "The suggestions were mostly incorrect or irrelevant",
                  },
                  {
                    value: "some-made-sense",
                    label: "Some suggestions made sense, but others seemed off",
                  },
                  {
                    value: "generally-reasonable",
                    label: "The suggestions were generally reasonable and plausible",
                  },
                  {
                    value: "mostly-clear-accurate",
                    label: "Most suggestions were clear and accurate",
                  },
                  {
                    value: "highly-logical",
                    label: "All suggestions were highly logical and well-grounded",
                  },
                ].map((opt) => (
                  <label key={opt.value} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="accuracy"
                      value={opt.value}
                      checked={formData.accuracy === opt.value}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.accuracy && (
                <span className={styles.errorMessage}>{errors.accuracy}</span>
              )}
            </div>

            {/* Helpfulness Question */}
            <div className={styles.questionGroup}>
              <h2 className={styles.questionTitle}>
                How helpful were the AI's suggestions in supporting your
                creative thinking?
              </h2>
              <p className={styles.questionSubtitle}>
                Think about whether the ideas inspired or guided your own thinking.
              </p>
              <div className={styles.radioGroup}>
                {[
                  {
                    value: "not-helpful",
                    label: "Not helpful at all — I didn't use any of the AI suggestions",
                  },
                  {
                    value: "slightly-helpful",
                    label: "Slightly helpful — One or two ideas gave me a small nudge",
                  },
                  {
                    value: "moderately-helpful",
                    label: "Moderately helpful — The ideas helped me brainstorm better",
                  },
                  {
                    value: "very-helpful",
                    label: "Very helpful — The suggestions pushed me in new directions",
                  },
                  {
                    value: "extremely-helpful",
                    label: "Extremely helpful — The AI greatly enhanced my creativity",
                  },
                ].map((opt) => (
                  <label key={opt.value} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="helpfulness"
                      value={opt.value}
                      checked={formData.helpfulness === opt.value}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.helpfulness && (
                <span className={styles.errorMessage}>{errors.helpfulness}</span>
              )}
            </div>
          </>
        )}

        {isBaselineTask && (
          <>
            {/* Confidence Question */}
            <div className={styles.questionGroup}>
              <h2 className={styles.questionTitle}>
                How confident are you in the quality of your application ideas?
              </h2>
              <p className={styles.questionSubtitle}>
                Think about how creative, useful, and novel your ideas were.
              </p>
              <div className={styles.radioGroup}>
                {[
                  "not-confident",
                  "slightly-confident",
                  "moderately-confident",
                  "very-confident",
                  "extremely-confident",
                ].map((val) => (
                  <label key={val} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="confidence"
                      value={val}
                      checked={formData.confidence === val}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>{val}</span>
                  </label>
                ))}
              </div>
              {errors.confidence && (
                <span className={styles.errorMessage}>{errors.confidence}</span>
              )}
            </div>

            {/* Difficulty Question */}
            <div className={styles.questionGroup}>
              <h2 className={styles.questionTitle}>
                How difficult did you find this task?
              </h2>
              <p className={styles.questionSubtitle}>
                Consider the mental effort required to generate creative applications.
              </p>
              <div className={styles.radioGroup}>
                {[
                  "very-easy",
                  "somewhat-easy",
                  "moderate",
                  "somewhat-difficult",
                  "very-difficult",
                ].map((val) => (
                  <label key={val} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="difficulty"
                      value={val}
                      checked={formData.difficulty === val}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>{val}</span>
                  </label>
                ))}
              </div>
              {errors.difficulty && (
                <span className={styles.errorMessage}>{errors.difficulty}</span>
              )}
            </div>
          </>
        )}

        <button type="submit" className={styles.submitButton}>
          {currentTask === 4 ? "Complete Study" : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default TaskPostSurvey;
