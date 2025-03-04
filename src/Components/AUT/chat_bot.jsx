import React, { useState, useEffect } from "react";
import styles from "./Chat_bot.module.css"; // Importing the CSS module

function Chatbot({ resetToggle, onReset, temperature }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  console.log("TEMPERATURE OF GPT = ", temperature);

  useEffect(() => {
    if (resetToggle) {
      console.log("Attempting to reset chatbot");
      setMessages([]); // Reset messages or other state
      onReset(); // Call onReset to toggle reset state back
    }
  }, [resetToggle, onReset]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInput(""); // Clear input field after sending
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <h1 className={styles.chatbotHeader}>Chatbot</h1>
      <div className={styles.messagesContainer}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.messageUser : ""
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={styles.inputField}
        />
        <button onClick={handleSend} className={styles.submitButton}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
