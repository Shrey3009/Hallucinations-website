import React, { use, useState } from "react";
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

  const navigate = useNavigate();
  const { surveyId, setSurveyId } = useSurvey();

  const [selection, setSelecion] = useState("");

  const [otherRaceChange, setOtherRaceChange] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    // setSelecion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.race != "") {
      setFormData((prevState) => ({
        ...prevState, // Copy all existing state
        race: "other: " + prevState.race, // Update the race field
      }));
    }

    console.log("Trying to submit Form:", formData);
    let NODE_api = import.meta.env.VITE_NODE_API + "/PreSurvey";
    // console.log("VITE_NODE_URI", NODE_api);

    try {
      const response = await fetch(NODE_api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json(); // Decode JSON response
      console.log("Received ID:", responseData._id);
      if (response.ok) {
        // console.log("Received ID:", responseData._id); // Log or use the ID as needed
        setSurveyId(responseData._id); // Set the ID in the context
        navigate("/WelcomePage"); // Use the actual ID from the server

        // prop drilling with the useNavigate hook
        // console.log("Received ID:", responseData._id); // Log or use the ID as needed
        // navigate("/AUT", { state: { preSurveyId: responseData._id } }); // Use the actual ID from the server
      } else {
        throw new Error(`Failed to submit form: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOtherRace = (e) => {
    setFormData((prevState) => ({
      ...prevState, // Copy all existing state
      race: e.target.value, // Update the race field
    }));
    setOtherRaceChange(e.target.value);
  };

  const setSelectionChange = (e) => {
    setSelecion(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className={styles.field}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        className={styles.field}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={styles.field}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className={styles.field}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        name="major"
        placeholder="Major"
        value={formData.major}
        onChange={handleChange}
        className={styles.field}
        // style={{ height: "80px" }}
        required
      />
      <select
        name="race"
        // value={formData.race !== "other" ? formData.race : ""}
        onChange={(handleChange, setSelectionChange)}
        className={styles.field}
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
        <option value="other">Other </option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
      {selection === "other" && (
        <div>
          <label htmlFor="otherText">Please specify: </label>
          <input
            type="text"
            id="otherText"
            name="otherText"
            value={formData.race === "other" ? "" : formData.race}
            onChange={handleOtherRace}
            required={formData.race === "other"}
          />
        </div>
      )}
      <p>
        Prior Experience with AI Prior Experience with AI (e.g., ChatGPT,
        Midjourney, DALL-E :
      </p>
      <select
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        className={styles.field}
        required
      >
        <option value="">Select an option</option>
        <option value="none">None</option>
        <option value="Beginner">Beginner (Used a few times)</option>
        <option value="Intermediate">Intermediate (Use occasionally)</option>
        <option value="Advanced">Advanced (Frequent user)</option>
      </select>
      <p>
        How often do you engage in creative activities (e.g., writing, music,
        art, design)?
      </p>
      <select
        name="activities"
        value={formData.activities}
        onChange={handleChange}
        className={styles.field}
        required
      >
        <option value="">Select an option</option>
        <option value="Never">Never</option>
        <option value="Rarely">Rarely</option>
        <option value="Sometimes">Sometimes</option>
        <option value="Often">Often</option>
      </select>
      <p>On a scale from 1-5, how creative do you consider yourself?</p>
      <select
        name="creativity"
        value={formData.creativity}
        onChange={handleChange}
        className={styles.field}
        required
      >
        <option value="">Select an option</option>
        <option value="1">1 = Not creative (Rarely generate new ideas)</option>
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

      <p>
        On a scale from 1 to 5, rate your familiarity with the concept of
        alternative uses tasks.{" "}
      </p>
      <select
        name="familiarity"
        value={formData.familiarity}
        onChange={handleChange}
        className={styles.field}
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

      <label className={styles.field}>
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        Agree to terms and conditions
      </label>
      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
}

export default SurveyForm;
