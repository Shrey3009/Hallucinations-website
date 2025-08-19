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
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submitting Task ${currentTask} post-survey data:`, formData);

    try {
      const response = await fetch(
        import.meta.env.VITE_NODE_API + "/TaskPostSurvey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            preSurveyId: surveyId,
            taskNumber: currentTask,
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

      console.log(
        `Task ${currentTask} post-survey submitted successfully:`,
        responseData
      );

      // Navigate based on current task
      if (currentTask === 2) {
        navigate("/AttentionTest2"); // Go to attention test after Task 2
      } else if (currentTask === 3) {
        navigate("/AttentionTest3"); // Go to attention test after Task 3
      } else if (currentTask === 4) {
        navigate("/PostSurvey"); // Go to main post-survey
      }
    } catch (error) {
      console.error(`Error submitting Task ${currentTask} post-survey:`, error);
      alert(error.message || "Failed to submit survey. Please try again.");
    }
  };

  const isAITask = currentTask === 2 || currentTask === 4;
  const isBaselineTask = currentTask === 3;

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
                How helpful were the AI's suggestions in supporting your
                creative thinking?
              </h2>
              <p className={styles.questionSubtitle}>
                Think about whether the ideas inspired or guided your own
                thinking.
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
                <span className={styles.errorMessage}>
                  {errors.helpfulness}
                </span>
              )}
            </div>
          </>
        )}

        {isBaselineTask && (
          <>
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
                    Slightly confident — I had some decent ideas but nothing
                    special
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
                    Very confident — I came up with some innovative and
                    practical ideas
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
                    Somewhat difficult — Had to work hard to come up with good
                    ideas
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
