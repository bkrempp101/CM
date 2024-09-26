const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample data
let messages = [
  { id: 1, content: 'Welcome to the AI Chat App!', isUser: false },
];

// GET messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST message
app.post('/api/messages', (req, res) => {
  const { content } = req.body;
  const newMessage = {
    id: messages.length + 1,
    content,
    isUser: true,
  };
  messages.push(newMessage);
  
  // Simulate AI response
  setTimeout(() => {
    const aiResponse = {
      id: messages.length + 1,
      content: `AI response to: ${content}`,
      isUser: false,
    };
    messages.push(aiResponse);
  }, 1000);

  res.status(201).json(newMessage);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
