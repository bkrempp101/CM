import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';
import ErrorMessage from './ErrorMessage';

const DocumentUploadView: React.FC = () => {
  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await api.post('/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Document uploaded successfully');
      setFile(null);
      setError(null);
    } catch (error) {
      setError('Failed to upload document');
      console.error('Failed to upload document:', error);
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
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: theme.cardBg,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    marginBottom: '1rem',
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
      <h2>Document Upload</h2>
      <div style={formStyle}>
        <input
          type="file"
          onChange={handleFileChange}
          style={inputStyle}
        />
        <button onClick={handleUpload} style={buttonStyle}>
          Upload Document
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default DocumentUploadView;
