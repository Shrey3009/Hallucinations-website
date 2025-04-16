import { useState, useEffect } from "react";
import styles from "./chatbot.module.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useSurvey } from "../../surveyIDContext";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_NODE_API + "/chatbotmessages";

const systemMessage = {
  role: "system",
  content:
    "You are a helpful AI assistant. Your responses should be clear, coherent, and in English. Help users brainstorm creative uses for everyday objects.",
};

function Chatbot({ task, resetToggle, onReset, temperature }) {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      direction: "incoming",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { surveyId } = useSurvey();

  useEffect(() => {
    const resetMessages = async () => {
      console.log("Attempting to reset chatbot");
      const initialMessages = [
        {
          message: "Hello, I'm ChatGPT! Ask me anything!",
          direction: "incoming",
          sender: "ChatGPT",
        },
      ];
      setMessages(initialMessages);
      onReset();
    };

    if (resetToggle) {
      resetMessages();
    }
  }, [resetToggle, onReset]);

  useEffect(() => {
    if (task > 2) {
      postChatGPTMessages(messages);
    }
  }, [task]);

  const validateResponse = (content) => {
    // Check if content is a string
    if (typeof content !== "string") {
      return false;
    }
    // Check if content contains mostly non-ASCII characters
    const nonAsciiRatio =
      content.split("").filter((char) => char.charCodeAt(0) > 127).length /
      content.length;
    if (nonAsciiRatio > 0.3) {
      // If more than 30% non-ASCII characters
      return false;
    }
    // Check minimum length
    if (content.length < 10) {
      return false;
    }
    return true;
  };

  const handleSend = async (message) => {
    if (isProcessing) return; // Prevent multiple submissions while processing

    setIsProcessing(true);
    setIsTyping(true);

    const newMessage = { message, sender: "user" };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      await processMessageToChatGPT(updatedMessages);
    } catch (error) {
      console.error("Error processing message:", error);
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          message: "I apologize, but I encountered an error. Please try again.",
          direction: "incoming",
          sender: "ChatGPT",
        },
      ]);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };

  async function postChatGPTMessages(chatMessages) {
    console.log("Inside chatbot: ", chatMessages);
    const bodyData = { preSurveyId: surveyId, task: task - 1, chatMessages };
    console.log("BodyData: ", bodyData);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const body = await response.json();
      if (!response.ok) throw new Error("Failed to post chat messages");
      console.log(body);
      console.log("Submitted chat Messages for task ", task);
    } catch (error) {
      console.error("Error posting chat messages:", error);
      alert("Failed to post chat messages due to an error.");
    }
  }

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((msg) => ({
      role: msg.sender === "ChatGPT" ? "assistant" : "user",
      content: msg.message,
    }));

    const apiRequestBody = {
      model: "gpt-3.5-turbo", // Fixed model name
      messages: [systemMessage, ...apiMessages],
      temperature: temperature,
      top_p: 1,
      max_tokens: 2048,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Validate the response content
      if (!validateResponse(content)) {
        throw new Error("Invalid response received from API");
      }

      const responseMessage = {
        message: content,
        direction: "incoming",
        sender: "ChatGPT",
      };

      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (error) {
      console.error("Failed to fetch response from ChatGPT:", error);
      throw error;
    }
  }

  return (
    <div className="App">
      <div className={styles.container}>
        <h1>ChatGPT</h1>
        <div style={{ position: "relative", height: "600px", width: "500px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, index) => (
                  <Message key={index} model={message} />
                ))}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
                disabled={isProcessing}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
