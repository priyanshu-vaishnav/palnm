import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Production: use Render backend URL; Dev: proxy handles it
const API = import.meta.env.VITE_API_URL || '';
axios.defaults.baseURL = API;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setIsAdmin(res.data.valid))
        .catch(() => { localStorage.removeItem('admin_token'); setIsAdmin(false); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('admin_token', res.data.token);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
  };

  const getToken = () => localStorage.getItem('admin_token');

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
