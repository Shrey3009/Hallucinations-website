import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context
const SurveyContext = createContext(null);

// Provider in your app's component tree
export const SurveyProvider = ({ children }) => {
  const [surveyId, setSurveyId] = useState(() => {
    // Retrieve from local storage or return null
    return localStorage.getItem("surveyId") || null;
  });

  useEffect(() => {
    // Persist to local storage
    localStorage.setItem("surveyId", surveyId);
  }, [surveyId]);

  return (
    <SurveyContext.Provider value={{ surveyId, setSurveyId }}>
      {children}
    </SurveyContext.Provider>
  );
};

// Custom hook to use the surveyId context
export const useSurvey = () => useContext(SurveyContext);
