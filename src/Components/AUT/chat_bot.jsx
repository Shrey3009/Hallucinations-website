import React, { useState, useEffect, useRef } from "react";
import styles from "./chat_bot.module.css"; // Importing the CSS module

function Chatbot({ resetToggle, onReset, temperature }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  console.log("TEMPERATURE OF GPT = ", temperature);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInput(""); // Clear input field after sending
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chatbotContainer}>
        <div className={styles.chatHeader}>
          <h1 className={styles.chatTitle}>AI Assistant</h1>
          <p className={styles.chatDescription}>
            Ask me anything about alternative uses for objects!
          </p>
        </div>

        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageWrapper} ${
                  msg.sender === "user"
                    ? styles.userMessageWrapper
                    : styles.botMessageWrapper
                }`}
              >
                <div
                  className={`${styles.message} ${
                    msg.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }`}
                >
                  <div className={styles.messageContent}>{msg.text}</div>
                  <div className={styles.messageTime}>{msg.timestamp}</div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={styles.inputField}
            rows={1}
          />
          <button
            onClick={handleSend}
            className={styles.sendButton}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
