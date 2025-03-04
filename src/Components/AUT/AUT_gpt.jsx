import React, { useState, useEffect } from "react";
import Chatbot from "./chat_bot";
import Instructions from "../Instructions/Instructions";
import { useNavigate } from "react-router-dom";
import AUT_ from "./AUT_";
import styles from "./organize.module.css"; // Importing the CSS module

function AUT_gpt() {
  const [round, setRound] = useState(1); // Manage round as state
  const [task, setTask] = useState(2);
  const [tempsArray, setTemps_Array] = useState([0, 1, 2, 3, 4, 5]);
  const [temperature, setTemperature] = useState();
  const [resetToggle, setResetToggle] = useState(false);
  const navigate = useNavigate();

  // Select and remove temperature from the array
  const random_temp = () => {
    setTemps_Array((currentTemps) => {
      if (currentTemps.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentTemps.length);
        const selectedNumber = currentTemps[randomIndex];

        // Remove the number by filtering out the selected index
        const updatedTemps = currentTemps.filter(
          (_, index) => index !== randomIndex
        );
        console.log(updatedTemps, " Updated when task is", task); // Log the updated array

        // Set the temperature immediately here, if needed
        setTemperature(selectedNumber);

        return updatedTemps; // Return the new array for the state update
      }
      return []; // Return an empty array if no items are left
    });

    // Since the state update above is asynchronous, we should not return anything here
    // or manage the selectedNumber differently if needed outside.
  };

  useEffect(() => {
    setTemperature(random_temp()); // Initialize temperature
  }, [task]); // Empty array ensures this only runs once on mount

  useEffect(() => {
    if (round === 4) {
      console.log(`Task ${task} completed!`);
      setTask((prevTask) => prevTask + 1);
      setRound(1);
      setResetToggle(true);
      // setTemperature(random_temp());
    }

    if (task === 5) {
      navigate("/PostSurvey");
    }
  }, [round, task, navigate]); // Ensure all dependencies are correctly listed

  return (
    <>
      <div className={styles.main}>
        <Instructions
          className={styles.instructions}
          round={round}
          task={task}
        />
        <div className={styles.bottom_container}>
          <div className={styles.aut_component}>
            <AUT_ round={round} onStateChange={setRound} />
          </div>
          <div className={styles.chat}>
            <Chatbot
              resetToggle={resetToggle}
              onReset={() => setResetToggle(false)}
              temperature={temperature}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AUT_gpt;
