import React, { useState } from "react";
import styles from "./PreSurvey.module.css"; // Importing the CSS file
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../surveyIDContext";

function SurveyForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    race: "",
    experience: "",
    designExperience: "",
    healthcareFamiliarity: "",
    automationFamiliarity: "",
    smartDevicesFamiliarity: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setSurveyId } = useSurvey();   // ✅ only surveyId now
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
        `${import.meta.env.VITE_NODE_API}/api/PreSurvey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      console.log("Full PreSurvey response:", responseData);

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
      setSurveyId(responseData._id);   // ✅ store only surveyId

      // Assign patents to the user after successful PreSurvey submission
      try {
        const patentApiUrl = `${
          import.meta.env.VITE_NODE_API
        }/api/patent-assignment`;
        console.log(`Attempting to assign patents via: ${patentApiUrl}`);

        const patentResponse = await fetch(patentApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            preSurveyId: responseData._id,
          }),
        });

        if (!patentResponse.ok) {
          const errorText = await patentResponse.text();
          console.log(
            `Patent assignment API not available (Status: ${patentResponse.status}). Using fallback logic.`
          );
        } else {
          const patentData = await patentResponse.json();
          console.log("Patents assigned successfully:", patentData);
          // ✅ no longer storing patentAssignmentId in context
        }
      } catch (patentError) {
        console.log(
          "Patent assignment API not available, using fallback logic:",
          patentError.message
        );
        // Continue to welcome page even if patent assignment fails
      }

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

      <p>Prior Experience with AI (e.g., ChatGPT):</p>
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
        Do you have any previous experience with product design, innovation, or
        creative problem-solving?
      </p>
      <div className={styles.formGroup}>
        <select
          name="designExperience"
          value={formData.designExperience}
          onChange={handleChange}
          className={`${styles.field} ${
            errors.designExperience ? styles.error : ""
          }`}
          required
        >
          <option value="">Select an option</option>
          <option value="None">
            None – I have never done this type of activity
          </option>
          <option value="Some">
            Some – I have done this a few times in school, work, or personal
            life
          </option>
          <option value="Extensive">
            Extensive – I frequently engage in this kind of activity or have
            formal training/experience
          </option>
        </select>
        {errors.designExperience && (
          <span className={styles.errorMessage}>{errors.designExperience}</span>
        )}
      </div>

      <p>
        How familiar are you with each of the following domains? (1 = Not at all
        familiar, 5 = Very familiar)
      </p>

      <p>
        Healthcare technologies (e.g., smart hydration containers, wearable
        emotion detection devices, remote health monitors):
      </p>
      <div className={styles.formGroup}>
        <select
          name="healthcareFamiliarity"
          value={formData.healthcareFamiliarity}
          onChange={handleChange}
          className={`${styles.field} ${
            errors.healthcareFamiliarity ? styles.error : ""
          }`}
          required
        >
          <option value="">Select an option</option>
          <option value="1">1 = Not at all familiar</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 = Very familiar</option>
        </select>
        {errors.healthcareFamiliarity && (
          <span className={styles.errorMessage}>
            {errors.healthcareFamiliarity}
          </span>
        )}
      </div>

      <p>
        Personal service robots (e.g., companion robots for home interaction,
        autonomous service robots with health monitoring, medical assistance
        delivery robots):
      </p>
      <div className={styles.formGroup}>
        <select
          name="automationFamiliarity"
          value={formData.automationFamiliarity}
          onChange={handleChange}
          className={`${styles.field} ${
            errors.automationFamiliarity ? styles.error : ""
          }`}
          required
        >
          <option value="">Select an option</option>
          <option value="1">1 = Not at all familiar</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 = Very familiar</option>
        </select>
        {errors.automationFamiliarity && (
          <span className={styles.errorMessage}>
            {errors.automationFamiliarity}
          </span>
        )}
      </div>

      <p>
        Smart devices (e.g., temperature-controlled beverage containers,
        AI-powered drink dispensers, smart foodware with interactive lights):
      </p>
      <div className={styles.formGroup}>
        <select
          name="smartDevicesFamiliarity"
          value={formData.smartDevicesFamiliarity}
          onChange={handleChange}
          className={`${styles.field} ${
            errors.smartDevicesFamiliarity ? styles.error : ""
          }`}
          required
        >
          <option value="">Select an option</option>
          <option value="1">1 = Not at all familiar</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 = Very familiar</option>
        </select>
        {errors.smartDevicesFamiliarity && (
          <span className={styles.errorMessage}>
            {errors.smartDevicesFamiliarity}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
}

export default SurveyForm;
