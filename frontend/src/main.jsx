import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1A1A28', color: '#F5F0E8', border: '1px solid #C9A84C' }
      }} />
    </AuthProvider>
  </BrowserRouter>
);
