import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SurveyProvider } from "./surveyIDContext";
import { DataProvider } from "./dataContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SurveyProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </SurveyProvider>
  </StrictMode>
);
