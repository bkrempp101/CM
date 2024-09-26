import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { theme } = useTheme();

  const errorStyle = {
    backgroundColor: theme.dangerColor,
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    marginTop: '1rem',
  };

  return <div style={errorStyle}>{message}</div>;
};

export default ErrorMessage;
