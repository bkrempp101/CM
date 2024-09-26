import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Loading: React.FC = () => {
  const { theme } = useTheme();

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
    color: theme.textColor,
  };

  return <div style={loadingStyle}>Loading...</div>;
};

export default Loading;
