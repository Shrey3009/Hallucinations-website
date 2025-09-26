import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context
const SurveyContext = createContext(null);

export const SurveyProvider = ({ children }) => {
  // PreSurvey ID (needed for tasks + final PostSurvey)
  const [surveyId, setSurveyId] = useState(() => {
    return localStorage.getItem("surveyId") || null;
  });

  useEffect(() => {
    if (surveyId) {
      localStorage.setItem("surveyId", surveyId);
    }
  }, [surveyId]);

  return (
    <SurveyContext.Provider value={{ surveyId, setSurveyId }}>
      {children}
    </SurveyContext.Provider>
  );
};

// Custom hook to use surveyId
export const useSurvey = () => useContext(SurveyContext);
