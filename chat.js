import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// AI Chat Route
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Prepare messages for the API
    const messages = [
      {
        role: 'system',
        content: 'You are PetPal, a compassionate AI assistant for mental health and wellness. You provide supportive, helpful responses to users.'
      },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.error.message });
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    res.json({
      message: aiMessage,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PetPal AI Backend' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🐾 PetPal AI backend running on port ${PORT}`);
});

export default app;
