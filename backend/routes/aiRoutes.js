// // backend/routes/aiRoutes.js
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// router.post('/generate-question', async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await axios.post('https://your-groq-api-endpoint', {
//       prompt,
//     }, {
//       headers: {
//         'Authorization': `Bearer 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`,
//       },
//     });
//     res.status(200).json({ question: response.data.question }); // Adjust based on actual response structure
//   } catch (error) {
//     console.error('Error calling Groq API:', error);
//     res.status(500).json({ error: 'Failed to generate question' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate-question', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json'
      },
    });

    const generatedContent = response.data.choices[0].message.content;
    res.status(200).json({ question: generatedContent });
  } catch (error) {
    console.error('Error calling Groq API:', error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

module.exports = router;