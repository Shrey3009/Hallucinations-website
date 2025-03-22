import React from "react";
import styles from "./Instructions.module.css";

function Instructions({ round, task }) {
  return (
    <div className={styles.container}>
      Instructions for round {round} task {task}
      {round === 1 && (
        <p>
          You are allowed only one prompt to interact with the AI. Your prompt
          must not ask for more than 3 answers (e.g., you can request 1, 2, or 3
          answers, but not more). Example (Allowed): "What are 3 alternative
          uses for a paperclip?" Example (Not Allowed): "Give me 5 alternative
          uses for a paperclip." After receiving the AI's response, write down
          your answers. Your list can include both your original ideas and the
          AI’s suggestions.
        </p>
      )}
      {round === 2 && (
        <p>
          You cannot introduce new questions or topics. Your prompt must build
          on the AI's response from Round 1. You may choose to: Build upon: Add
          details or further develop the ideas from Round 1. Refine: Modify or
          improve suggestions to make them clearer, more specific, or more
          unique. Expand: Think of additional uses inspired by the initial
          output. Write down your additional answer in the Round 2 section.
        </p>
      )}
      {round === 3 && (
        <p>
          Same as Round 2 You cannot introduce new questions or topics. Your
          prompt must build on the AI's response from Round 1. You may choose
          to: Build upon: Add details or further develop the ideas from Round 1.
          Refine: Modify or improve suggestions to make them clearer, more
          specific, or more unique. Expand: Think of additional uses inspired by
          the initial output. Write down your additional answer in the Round 3
          section.
        </p>
      )}
    </div>
  );
}

export default Instructions;
