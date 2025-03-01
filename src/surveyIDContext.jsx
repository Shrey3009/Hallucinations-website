import React, { createContext, useContext, useState } from "react";

// Create a Context
const SurveyContext = createContext(null);

// Provider in your app's component tree
export const SurveyProvider = ({ children }) => {
  const [surveyId, setSurveyId] = useState(null);

  return (
    <SurveyContext.Provider value={{ surveyId, setSurveyId }}>
      {children}
    </SurveyContext.Provider>
  );
};

// Custom hook to use the surveyId context
export const useSurvey = () => useContext(SurveyContext);
