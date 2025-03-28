import { useState, useEffect, use } from "react";
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

let API_KEY = import.meta.env.VITE_API_KEY;
// console.log("API_KEY : ", API_KEY);
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

function chatbot({ task, resetToggle, onReset, temperature }) {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      direction: "incoming",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { surveyId, setSurveyId } = useSurvey();

  useEffect(() => {
    console.log("TEMPERATURE OF GPT = ", temperature);
  }, [temperature]);

  useEffect(async () => {
    if (resetToggle) {
      console.log("Attempting to reset chatbot");
      setMessages([
        {
          message: "Hello, I'm ChatGPT! Ask me anything!",
          direction: "incoming",
          sender: "ChatGPT",
        },
      ]); // Reset messages or other state
      await postChatGPTMessages(messages);
      onReset(); // Call onReset to toggle reset state back
    }
  }, [resetToggle, onReset]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      //   direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  // To make adatabase with all the messages
  async function postChatGPTMessages(chatMessages) {
    console.log("Inside chatbot: ", chatMessages);
    const bodyData = {
      preSurveyId: surveyId,
      task: task,
      chatMessages: chatMessages,
    };
    console.log("BodyData: ", bodyData);
    try {
      let NODE_api = import.meta.env.VITE_NODE_API + "/chatbotmessages";
      const response = await fetch(NODE_api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        response.json().then((body) => {
          console.log(body); // Log the body of the response
          // setInputValue(""); // Clear the input field
          console.log("Submitted chat Messages for task ", task);
        });
      } else {
        alert("Failed to post chat messages");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post chat messages due to an error.");
    }
  }

  // useEffect(async () => {
  //   if (task > 1) {
  //     await postChatGPTMessages(messages);
  //   }
  // }, [task]);

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-4o-mini",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
      temperature: temperature,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            direction: "incoming",
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="App">
      <div className={styles.container}>
        <h1>ChatGPT</h1>
        <div style={{ position: "relative", height: "600px", width: "500px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  console.log(message);
                  return <Message key={i} model={message} />;
                })}
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

export default chatbot;
