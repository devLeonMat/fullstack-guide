import { createContext, useContext, useState } from 'react';

const StudyModeContext = createContext();

export function StudyModeProvider({ children }) {
  const [studyMode, setStudyMode] = useState(false);
  const toggleStudyMode = () => setStudyMode(v => !v);

  return (
    <StudyModeContext.Provider value={{ studyMode, toggleStudyMode }}>
      {children}
    </StudyModeContext.Provider>
  );
}

export const useStudyMode = () => useContext(StudyModeContext);
