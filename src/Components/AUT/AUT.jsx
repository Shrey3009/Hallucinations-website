import React, { useState } from "react";
import styles from "./AUT.module.css"; // Importing the CSS module

function AUT() {
  const [useCases, setUseCases] = useState(
    Array(5).fill({ use: "", explanation: "" })
  );

  const handleChange = (index, type, value) => {
    const newUseCases = [...useCases];
    newUseCases[index][type] = value;
    setUseCases(newUseCases);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted use cases:", useCases);
    // Implement submission logic, e.g., sending to a server
  };

  return (
    <div className={styles.container}>
      <h1>AUT</h1>
      <div className={styles.header}>
        <img
          src="../../assets/bicycle-pump.png"
          alt="Bicycle Pump"
          className={styles.image}
        />
        <h2 className={styles.title}>BICYCLE PUMP</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {useCases.map((item, index) => (
          <div key={index} className={styles.useCaseGroup}>
            <input
              type="text"
              placeholder={`Use Case #${index + 1}`}
              value={item.use}
              onChange={(e) => handleChange(index, "use", e.target.value)}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Explanation"
              value={item.explanation}
              onChange={(e) =>
                handleChange(index, "explanation", e.target.value)
              }
              className={styles.inputField}
            />
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AUT;
