import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import emailService from '../services/emailService';
import ErrorMessage from './ErrorMessage';

interface Email {
  id: number;
  subject: string;
  from: string;
  content: string;
}

const EmailManagement: React.FC = () => {
  const { theme } = useTheme();
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const fetchedEmails = await emailService.fetchEmails();
      setEmails(fetchedEmails);
    } catch (error) {
      setError('Failed to fetch emails');
      console.error('Failed to fetch emails:', error);
    }
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleReply = async (content: string) => {
    if (!selectedEmail) return;

    try {
      await emailService.sendEmail({
        to: selectedEmail.from,
        subject: `Re: ${selectedEmail.subject}`,
        content,
      });
      setSelectedEmail(null);
      fetchEmails(); // Refresh the email list
    } catch (error) {
      setError('Failed to send email');
      console.error('Failed to send email:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    height: 'calc(100vh - 60px)', // Adjust based on your Navigation height
    padding: '1rem',
  };

  const listStyle = {
    width: '30%',
    overflowY: 'auto' as const,
    borderRight: `1px solid ${theme.borderColor}`,
    paddingRight: '1rem',
  };

  const emailItemStyle = {
    padding: '0.5rem',
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.borderColor}`,
  };

  const contentStyle = {
    flex: 1,
    padding: '0 1rem',
  };

  return (
    <div style={containerStyle}>
      <div style={listStyle}>
        {emails.map(email => (
          <div
            key={email.id}
            style={emailItemStyle}
            onClick={() => handleEmailClick(email)}
          >
            <strong>{email.subject}</strong>
            <div>{email.from}</div>
          </div>
        ))}
      </div>
      <div style={contentStyle}>
        {selectedEmail ? (
          <>
            <h2>{selectedEmail.subject}</h2>
            <p>From: {selectedEmail.from}</p>
            <div>{selectedEmail.content}</div>
            <textarea
              placeholder="Type your reply..."
              style={{
                width: '100%',
                minHeight: '100px',
                marginTop: '1rem',
                padding: '0.5rem',
              }}
            />
            <button
              onClick={() => handleReply('Your reply content here')}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: theme.primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
            >
              Send Reply
            </button>
          </>
        ) : (
          <p>Select an email to view its content</p>
        )}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default EmailManagement;
