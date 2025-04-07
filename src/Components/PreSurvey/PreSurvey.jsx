import React, { useState } from "react";
import styles from "./PreSurvey.module.css"; // Importing the CSS file
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";

function SurveyForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    gender: "",
    major: "",
    race: "",
    experience: "",
    activities: "",
    creativity: "",
    familiarity: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { surveyId, setSurveyId } = useSurvey();
  const [selection, setSelection] = useState("");
  const [otherRace, setOtherRace] = useState("");

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

  const handleRaceChange = (e) => {
    const value = e.target.value;
    setSelection(value);
    if (value !== "other") {
      setFormData((prev) => ({ ...prev, race: value }));
      setOtherRace("");
    }
  };

  const handleOtherRaceChange = (e) => {
    const value = e.target.value;
    setOtherRace(value);
    setFormData((prev) => ({ ...prev, race: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const response = await fetch(
        import.meta.env.VITE_NODE_API + "/PreSurvey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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

      console.log("Form submitted successfully:", responseData);
      setSurveyId(responseData._id);
      navigate("/WelcomePage");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "Failed to submit form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.field} ${errors.name ? styles.error : ""}`}
          required
        />
        {errors.name && (
          <span className={styles.errorMessage}>{errors.name}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className={`${styles.field} ${errors.age ? styles.error : ""}`}
          required
        />
        {errors.age && (
          <span className={styles.errorMessage}>{errors.age}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.field} ${errors.email ? styles.error : ""}`}
          required
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`${styles.field} ${errors.gender ? styles.error : ""}`}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <span className={styles.errorMessage}>{errors.gender}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          name="major"
          placeholder="Major"
          value={formData.major}
          onChange={handleChange}
          className={`${styles.field} ${errors.major ? styles.error : ""}`}
          required
        />
        {errors.major && (
          <span className={styles.errorMessage}>{errors.major}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <select
          name="race"
          value={selection}
          onChange={handleRaceChange}
          className={`${styles.field} ${errors.race ? styles.error : ""}`}
          required
        >
          <option value="">Select Race</option>
          <option value="White">White</option>
          <option value="Black or African American">
            Black or African American
          </option>
          <option value="Asian">Asian</option>
          <option value="American Indian or Alaska Native">
            American Indian or Alaska Native
          </option>
          <option value="Native Hawaiian or Other Pacific Islander">
            Native Hawaiian or Other Pacific Islander
          </option>
          <option value="other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        {errors.race && (
          <span className={styles.errorMessage}>{errors.race}</span>
        )}
      </div>

      {selection === "other" && (
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Please specify your race"
            value={otherRace}
            onChange={handleOtherRaceChange}
            className={`${styles.field} ${errors.race ? styles.error : ""}`}
            required
          />
          {errors.race && (
            <span className={styles.errorMessage}>{errors.race}</span>
          )}
        </div>
      )}

      <p>Prior Experience with AI (e.g., ChatGPT, Midjourney, DALL-E):</p>
      <div className={styles.formGroup}>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className={`${styles.field} ${errors.experience ? styles.error : ""}`}
          required
        >
          <option value="">Select an option</option>
          <option value="none">None</option>
          <option value="Beginner">Beginner (Used a few times)</option>
          <option value="Intermediate">Intermediate (Use occasionally)</option>
          <option value="Advanced">Advanced (Frequent user)</option>
        </select>
        {errors.experience && (
          <span className={styles.errorMessage}>{errors.experience}</span>
        )}
      </div>

      <p>
        How often do you engage in creative activities (e.g., writing, music,
        art, design)?
      </p>
      <div className={styles.formGroup}>
        <select
          name="activities"
          value={formData.activities}
          onChange={handleChange}
          className={`${styles.field} ${errors.activities ? styles.error : ""}`}
          required
        >
          <option value="">Select an option</option>
          <option value="Never">Never</option>
          <option value="Rarely">Rarely</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Often">Often</option>
        </select>
        {errors.activities && (
          <span className={styles.errorMessage}>{errors.activities}</span>
        )}
      </div>

      <p>On a scale from 1-5, how creative do you consider yourself?</p>
      <div className={styles.formGroup}>
        <select
          name="creativity"
          value={formData.creativity}
          onChange={handleChange}
          className={`${styles.field} ${errors.creativity ? styles.error : ""}`}
          required
        >
          <option value="">Select an option</option>
          <option value="1">
            1 = Not creative (Rarely generate new ideas)
          </option>
          <option value="2">
            2 = Slightly creative (Occasionally think outside the box)
          </option>
          <option value="3">
            3 = Moderately creative (Sometimes generate original ideas)
          </option>
          <option value="4">
            4 = Very creative (Frequently come up with unique ideas)
          </option>
          <option value="5">
            5 = Extremely creative (Creativity is central to how I think)
          </option>
        </select>
        {errors.creativity && (
          <span className={styles.errorMessage}>{errors.creativity}</span>
        )}
      </div>

      <p>
        On a scale from 1 to 5, rate your familiarity with the concept of
        alternative uses tasks.
      </p>
      <div className={styles.formGroup}>
        <select
          name="familiarity"
          value={formData.familiarity}
          onChange={handleChange}
          className={`${styles.field} ${
            errors.familiarity ? styles.error : ""
          }`}
          required
        >
          <option value="">Select an option</option>
          <option value="1">1 = Never heard of it</option>
          <option value="2">
            2 = Slightly familiar (Know the term but no experience)
          </option>
          <option value="3">
            3 = Moderately familiar (Some understanding, little experience)
          </option>
          <option value="4">
            4 = Very familiar (Know how it works, have done it before)
          </option>
          <option value="5">
            5 = Expert (Fully understand and have experience)
          </option>
        </select>
        {errors.familiarity && (
          <span className={styles.errorMessage}>{errors.familiarity}</span>
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
          I agree to the terms and conditions
        </label>
        {errors.agreeToTerms && (
          <span className={styles.errorMessage}>{errors.agreeToTerms}</span>
        )}
      </div>

      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
}

export default SurveyForm;
