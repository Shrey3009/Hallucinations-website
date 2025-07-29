import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ConsentForm from "./Components/ConsentForm/ConsentForm";
import PreSurvey from "./Components/PreSurvey/PreSurvey";
import AUT from "./Components/AUT/AUT";
import Chatbot from "./Components/AUT/chat_bot";
import AUT_gpt from "./Components/AUT/AUT_gpt";
import PostSurvey from "./Components/PostSurvey/PostSurvey";
import WelcomePage from "./Components/LoadingPage/WelcomePage";
import Task2Page from "./Components/Task2Page/Task2Page";
import ThankYou from "./Components/ThankYou/ThankYou";
import Task2PostSurvey from "./Components/Task2PostSurvey/Task2PostSurvey";
// import Task3Page from "./Components/Task3Page/Task3Page";
import Task3PostSurvey from "./Components/Task3PostSurvey/Task3PostSurvey";
// import Task4Page from "./Components/Task4Page/Task4Page";
import Task4PostSurvey from "./Components/Task4PostSurvey/Task4PostSurvey";
// import AUT3 from "./Components/AUT3/AUT3";
import TaskPostSurvey from "./Components/TaskPostSurvey/TaskPostSurvey";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsentForm />} />
        <Route path="/PreSurvey" element={<PreSurvey />} />
        <Route path="/AUT" element={<AUT />} />
        <Route path="/AUT_gpt" element={<AUT_gpt />} />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/PostSurvey" element={<PostSurvey />} />
        <Route path="/Task2PostSurvey" element={<Task2PostSurvey />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/Task2Page" element={<Task2Page />} />
        <Route path="/ThankYou" element={<ThankYou />} />
        {/* <Route path="/Task3Page" element={<Task3Page />} /> */}
        <Route path="/Task3PostSurvey" element={<Task3PostSurvey />} />
        {/* <Route path="/Task4Page" element={<Task4Page />} /> */}
        <Route path="/Task4PostSurvey" element={<Task4PostSurvey />} />
        {/* <Route path="/AUT3" element={<AUT3 />} /> */}
        <Route path="/TaskPostSurvey" element={<TaskPostSurvey />} />
      </Routes>
    </Router>
  );
}

export default App;
