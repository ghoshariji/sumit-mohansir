import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext.jsx'; // ✅ Import your ThemeProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </ThemeProvider>
  </StrictMode>,
);
