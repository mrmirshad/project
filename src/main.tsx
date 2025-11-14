import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import AppEn from './App_en.tsx';
import './index.css';

const RootApp = () => {
  if (typeof window !== 'undefined') {
    const lang = window.localStorage.getItem('lang');
    if (lang === 'en') {
      return <AppEn />;
    }
  }
  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootApp />} />
        <Route path="/en" element={<AppEn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
