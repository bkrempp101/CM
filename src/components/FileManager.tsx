import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';
import ErrorMessage from './ErrorMessage';

interface File {
  id: number;
  name: string;
  size: number;
  type: string;
  createdAt: string;
}

const FileManager: React.FC = () => {
  const { theme } = useTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await api.get('/files');
      setFiles(response.data);
    } catch (error) {
      setError('Failed to fetch files');
      console.error('Failed to fetch files:', error);
    }
  };

  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      const response = await api.get(`/files/${fileId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError('Failed to download file');
      console.error('Failed to download file:', error);
    }
  };

  const handleDelete = async (fileId: number) => {
    try {
      await api.delete(`/files/${fileId}`);
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      setError('Failed to delete file');
      console.error('Failed to delete file:', error);
    }
  };

  const containerStyle = {
    padding: '2rem',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
  };

  const thStyle = {
    textAlign: 'left' as const,
    padding: '0.5rem',
    borderBottom: `1px solid ${theme.borderColor}`,
  };

  const tdStyle = {
    padding: '0.5rem',
    borderBottom: `1px solid ${theme.borderColor}`,
  };

  const buttonStyle = {
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    backgroundColor: theme.primaryColor,
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    marginRight: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <h2>File Manager</h2>
      {error && <ErrorMessage message={error} />}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Size</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Created At</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td style={tdStyle}>{file.name}</td>
              <td style={tdStyle}>{file.size} bytes</td>
              <td style={tdStyle}>{file.type}</td>
              <td style={tdStyle}>{new Date(file.createdAt).toLocaleString()}</td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => handleDownload(file.id, file.name)}
                >
                  Download
                </button>
                <button
                  style={{...buttonStyle, backgroundColor: theme.dangerColor}}
                  onClick={() => handleDelete(file.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileManager;
