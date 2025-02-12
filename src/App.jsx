import { useState } from "react";
import PreSurvey from "./Components/PreSurvey/PreSurvey";
import AUT from "./Components/AUT/AUT";
import Chatbot from "./Components/AUT/chat_bot";
import AUT_gpt from "./Components/AUT/AUT_gpt";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <PreSurvey /> */}
      {/* <AUT /> */}
      <AUT_gpt />
      {/* <Chatbot /> */}
    </>
  );
}

export default App;
