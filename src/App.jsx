import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PreSurvey from "./Components/PreSurvey/PreSurvey";
import AUT from "./Components/AUT/AUT";
import Chatbot from "./Components/AUT/chat_bot";
import AUT_gpt from "./Components/AUT/AUT_gpt";
import PostSurvey from "./Components/PostSurvey/PostSurvey";
import WelcomePage from "./Components/LoadingPage/WelcomePage";
import Task2Page from "./Components/LoadingPage/Task2Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreSurvey />} />
        <Route path="/AUT" element={<AUT />} />
        <Route path="/AUT_gpt" element={<AUT_gpt />} />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/PostSurvey" element={<PostSurvey />} />
        <Route path="WelcomePage" element={<WelcomePage />} />
        <Route path="/Task2Page" element={<Task2Page />} />
      </Routes>
    </Router>
  );
}

export default App;
