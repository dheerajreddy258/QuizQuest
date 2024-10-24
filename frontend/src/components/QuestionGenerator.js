import React, { useState } from 'react';

const QuestionGenerator = ({ onQuestionGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState(null);
  const [error, setError] = useState(null);

  const generateQuestion = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      console.log('Generating question for topic:', topic);

      // Updated to use relative path instead of full URL
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Removed Authorization header as it's not needed for this endpoint
        },
        body: JSON.stringify({ topic })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Generated question data:', data);
      
      if (!data.question || !Array.isArray(data.options)) {
        throw new Error('Invalid response format from server');
      }
      
      setGeneratedQuestion(data);
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold">AI Question Generator</h3>
      
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter topic (e.g., JavaScript, React, Node.js)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={generateQuestion}
          disabled={isGenerating || !topic}
          className={`px-4 py-2 rounded text-white ${
            isGenerating || !topic ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Generate Question'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <br/>
          <span className="text-sm">Please check if the backend server is running.</span>
        </div>
      )}
      
      {generatedQuestion && (
        <div className="mt-4 p-4 border rounded bg-white shadow-sm">
          <h3 className="font-bold mb-2 text-lg">Generated Question:</h3>
          <p className="mb-4 text-gray-800">{generatedQuestion.question}</p>
          
          <div className="mt-2">
            <h4 className="font-semibold mb-2">Options:</h4>
            <ul className="space-y-2">
              {generatedQuestion.options.map((option, index) => (
                <li 
                  key={index}
                  className={`p-2 rounded ${
                    index === generatedQuestion.correctAnswer 
                    ? 'bg-green-100 border border-green-200' 
                    : 'bg-gray-50'
                  }`}
                >
                  {index + 1}. {option}
                  {index === generatedQuestion.correctAnswer && (
                    <span className="ml-2 text-green-600 text-sm">(Correct Answer)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onQuestionGenerated(generatedQuestion)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add to Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionGenerator;
