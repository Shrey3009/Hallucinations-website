import React from "react";
import styles from "./Instructions.module.css";

function Instructions({ round, task }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Instructions for Round {round}</h2>
      <div className={styles.taskNumber}>Task {task}</div>

      <div className={styles.instructionCard}>
        {round === 1 && (
          <>
            <h3 className={styles.subtitle}>Initial Interaction</h3>
            <p className={styles.text}>
              You are allowed only one prompt to interact with the AI. Your
              prompt must not ask for more than 3 answers.
            </p>
            <div className={styles.examples}>
              <div className={styles.example}>
                <h4>✅ Allowed Example:</h4>
                <p>"What are 3 alternative uses for a paperclip?"</p>
              </div>
              <div className={styles.example}>
                <h4>❌ Not Allowed Example:</h4>
                <p>"Give me 5 alternative uses for a paperclip."</p>
              </div>
            </div>
            <p className={styles.note}>
              After receiving the AI's response, write down your answers. Your
              list can include both your original ideas and the AI's
              suggestions.
            </p>
          </>
        )}

        {round === 2 && (
          <>
            <h3 className={styles.subtitle}>Building on Previous Ideas</h3>
            <p className={styles.text}>
              You cannot introduce new questions or topics. Your prompt must
              build on the AI's response from Round 1.
            </p>
            <div className={styles.options}>
              <div className={styles.option}>
                <h4>🔨 Build upon:</h4>
                <p>Add details or further develop the ideas from Round 1.</p>
              </div>
              <div className={styles.option}>
                <h4>✨ Refine:</h4>
                <p>
                  Modify or improve suggestions to make them clearer, more
                  specific, or more unique.
                </p>
              </div>
              <div className={styles.option}>
                <h4>🌱 Expand:</h4>
                <p>Think of additional uses inspired by the initial output.</p>
              </div>
            </div>
            <p className={styles.note}>
              Write down your additional answers in the Round 2 section.
            </p>
          </>
        )}

        {round === 3 && (
          <>
            <h3 className={styles.subtitle}>Final Refinement</h3>
            <p className={styles.text}>
              Continue building on previous responses. You cannot introduce new
              questions or topics.
            </p>
            <div className={styles.options}>
              <div className={styles.option}>
                <h4>🔨 Build upon:</h4>
                <p>
                  Add details or further develop the ideas from previous rounds.
                </p>
              </div>
              <div className={styles.option}>
                <h4>✨ Refine:</h4>
                <p>
                  Modify or improve suggestions to make them clearer, more
                  specific, or more unique.
                </p>
              </div>
              <div className={styles.option}>
                <h4>🌱 Expand:</h4>
                <p>
                  Think of additional uses inspired by the previous outputs.
                </p>
              </div>
            </div>
            <p className={styles.note}>
              Write down your additional answers in the Round 3 section.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Instructions;
