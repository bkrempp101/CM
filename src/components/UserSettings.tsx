import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import ErrorMessage from './ErrorMessage';

interface UserData {
  name: string;
  email: string;
}

const UserSettings: React.FC = () => {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put('/user', { ...userData, password });
      updateUser(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to update user settings');
      console.error('Failed to update user settings:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '2rem',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '300px',
    padding: '2rem',
    backgroundColor: theme.cardBg,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '0.25rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: theme.primaryColor,
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>User Settings</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password (optional)"
        />
        <button style={buttonStyle} type="submit">Update Settings</button>
      </form>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default UserSettings;
