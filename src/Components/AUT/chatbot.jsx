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
    "Explain things like you're talking to a software professional with 2 years of experience.",
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
      await postChatGPTMessages(initialMessages);
      setMessages(initialMessages);
      onReset();
    };

    if (resetToggle) {
      resetMessages();
    }
  }, [resetToggle, onReset]);

  const handleSend = async (message) => {
    const newMessage = { message, sender: "user" };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsTyping(true);
    await processMessageToChatGPT(updatedMessages);
  };

  async function postChatGPTMessages(chatMessages) {
    console.log("Inside chatbot: ", chatMessages);
    const bodyData = { preSurveyId: surveyId, task, chatMessages };
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
      model: "gpt-4o-mini",
      messages: [systemMessage, ...apiMessages],
      temperature,
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
      const data = await response.json();
      const responseMessage = {
        message: data.choices[0].message.content,
        direction: "incoming",
        sender: "ChatGPT",
      };
      setMessages([...chatMessages, responseMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Failed to fetch response from ChatGPT:", error);
      setIsTyping(false);
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
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
