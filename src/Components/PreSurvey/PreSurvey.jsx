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
    address: "",
    agreeToTerms: false,
  });

  const navigate = useNavigate();
  const { surveyId, setSurveyId } = useSurvey();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trying to submit Form:", formData);
    const NODE_api = import.meta.env.VITE_SOME_KEY;
    console.log("VITE_NODE_URI", NODE_api + "/PreSurvey");

    try {
      const response = await fetch(NODE_api + "/PreSurvey", {
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
        navigate("/AUT"); // Use the actual ID from the server

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
      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className={styles.field}
        style={{ height: "80px" }}
        required
      />
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
