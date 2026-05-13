import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { StudyModeProvider } from './contexts/StudyModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <StudyModeProvider>
          <App />
        </StudyModeProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
