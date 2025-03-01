import React, { useState } from "react";
// import styles from "./AUT_gpt.module.css"; // Importing the CSS module
import Chatbot from "./chat_bot";
import { useNavigate, useLocation } from "react-router-dom";
import Instructions from "../Instructions/Instructions";

import AUT_ from "./AUT_";
import styles from "./organize.module.css"; // Importing the CSS module

function AUT_gpt() {
  return (
    <>
      <div className={styles.main}>
        <Instructions className={styles.instructions} />
        <div className={styles.bottom_container}>
          <div className={styles.aut_component}>
            <AUT_ />
          </div>
          <div className={styles.chat}>
            <Chatbot />
          </div>
        </div>
      </div>
    </>
  );
}

export default AUT_gpt;
