import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { KanbanProvider } from './context/KanbanContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import { Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <KanbanProvider>
        <App />
      </KanbanProvider>
    </AuthProvider>
  </StrictMode>
);