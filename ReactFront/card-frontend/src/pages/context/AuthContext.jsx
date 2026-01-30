import { createContext, useState, useContext } from 'react';
import api from '../../api/axiosConfig';
import { useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null); // ← добавь это


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() =>{
    const token = localStorage.getItem('access_token');
    const savedUsername = localStorage.getItem('username'); 

    if (token) {
      setIsAuthenticated(true);
      setUsername(savedUsername);

    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await api.post('/token/', { username, password });
      
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('username', username); 

      
      setIsAuthenticated(true);
      setUsername(username); 
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.response?.data };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username'); // ← добавь это
    setIsAuthenticated(false);
    setUsername(null);
  };

  const register  = async(username, password, password_confirm, email ) => {
    setLoading(true);
    try {
      const response = await api.post('/register/', {username, password, password_confirm, email});
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false)
      return{ success: false, error: error.response?.data}
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, register, username }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}