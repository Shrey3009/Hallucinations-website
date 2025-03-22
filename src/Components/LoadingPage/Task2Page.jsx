import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Task2Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || [];

  const navigateToTask = async () => {
    // Navigate to the next task
    console.log("Navigating to the next task");
    // console.log("Data in Task: ", data);
    navigate("/AUT_gpt", { state: { data: data } });
  };

  return (
    <div>
      <p>
        Great Job on Completing Task 1! 🎉 Now that you’re familiar with the
        process, we’re introducing AI assistance for the next three tasks! For
        these tasks, you can use an AI tool to help generate ideas. You will
        have three rounds of interaction with the AI in each task, with guidance
        provided for each round. Click Next to continue!
      </p>
      <button onClick={navigateToTask}>Next</button>
    </div>
  );
}

export default Task2Page;
