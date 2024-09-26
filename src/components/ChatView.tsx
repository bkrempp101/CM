import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import ErrorMessage from './ErrorMessage';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const ChatView: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/messages');
      setMessages(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError('Failed to load messages. Please try again later.');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: newMessage,
      isUser: true,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');

    try {
      const response = await api.post('/messages', { content: newMessage });
      const aiMessage: Message = {
        id: response.data.id,
        content: response.data.content,
        isUser: false,
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setError(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: 'calc(100vh - 60px)', // Adjust based on your Navigation height
    padding: '1rem',
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto' as const,
    marginBottom: '1rem',
  };

  const messageStyle = (isUser: boolean) => ({
    maxWidth: '70%',
    padding: '0.5rem 1rem',
    borderRadius: '1rem',
    marginBottom: '0.5rem',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? theme.primaryColor : theme.secondaryColor,
    color: isUser ? 'white' : theme.textColor,
  });

  const inputContainerStyle = {
    display: 'flex',
  };

  const inputStyle = {
    flex: 1,
    padding: '0.5rem',
    fontSize: '1rem',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '0.25rem',
    marginRight: '0.5rem',
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
      <div style={messagesContainerStyle}>
        {messages.map(message => (
          <div key={message.id} style={messageStyle(message.isUser)}>
            {message.content}
          </div>
        ))}
      </div>
      <div style={inputContainerStyle}>
        <input
          style={inputStyle}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={buttonStyle} onClick={sendMessage}>Send</button>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default ChatView;
