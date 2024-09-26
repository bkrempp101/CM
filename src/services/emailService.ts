import api from './api';

interface Email {
  to: string;
  subject: string;
  content: string;
}

const emailService = {
  sendEmail: async (email: Email) => {
    try {
      const response = await api.post('/emails/send', email);
      return response.data;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  },

  fetchEmails: async () => {
    try {
      const response = await api.get('/emails');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch emails:', error);
      throw error;
    }
  },
};

export default emailService;
