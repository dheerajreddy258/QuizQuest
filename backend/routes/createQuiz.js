const express = require('express');
const router = express.Router();
const axios = require('axios');
const genAiRouter = require('./genAi');

router.post('/create-quiz', async (req, res) => {
  try {
    const newQuiz = req.body; // Get the new quiz data from the request body
    const scenario = await axios.post('/generate-scenario', {
      prompt: newQuiz.question, // Pass the question prompt to the Gen AI endpoint
    });
    const generatedQuestion = scenario.data; // Store the generated question in the response
    // Add the generated question to the quiz data
    newQuiz.questions.push(generatedQuestion);
    res.json(newQuiz);
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

module.exports = router;