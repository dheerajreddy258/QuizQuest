import React, { useState} from 'react';
import './CreateQuiz.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = location.state?.isEditing || false;
  const existingQuizData = location.state?.quizData;

  const [quizTitle, setQuizTitle] = useState(existingQuizData?.title || '');
  const [questions, setQuestions] = useState(existingQuizData?.questions || []);
  const [participants, setParticipants] = useState(existingQuizData?.participants || ['']);
  const [showAlert, setShowAlert] = useState(false);

  // New states for AI generation
  const [prompt, setPrompt] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState('');

  // Question Management Functions
  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''], correctAnswer: 0 }]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setQuestions(updatedQuestions);
  };

  // Participant Management Functions
  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const updateParticipant = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value;
    setParticipants(updatedParticipants);
  };

  const removeParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  // New function to generate question from AI
  // const generateQuestionFromAI = async () => {
  //   try {
  //     const response = await axios.post('https://your-groq-api-endpoint', {
  //       prompt: prompt,
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer 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`,
  //       },
  //     });
  //     setGeneratedQuestion(response.data.question); // Assuming the response structure has 'question'
  //   } catch (error) {
  //     console.error('Error generating question:', error);
  //   }
  // };
  const generateQuestionFromAI = async () => {
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
      setGeneratedQuestion(generatedContent);
    } catch (error) {
      console.error('Error generating question:', error);
    }
  };
  

  // Save Quiz with Participants
  const saveQuiz = async () => {
    try {
      const validParticipants = participants.filter(email => email.trim() !== '');
      const quizData = {
        title: quizTitle,
        questions,
        participants: validParticipants,
      };

      let response;
      if (isEditing) {
        response = await axios.put(`/api/quizzes/${existingQuizData._id}`, quizData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        response = await axios.post('http://localhost:5000/api/quizzes/create', quizData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/creator-home');
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Left Grid - Existing Create Quiz Form */}
  <div className="lg:col-span-2">
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Quiz' : 'Create a New Quiz'}</h1>

      {/* Quiz Title Input */}
      <h2 className="mb-2">Enter the Quiz Title</h2>
      <input
        type="text"
        placeholder="Enter quiz title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="mb-4 border p-2 w-full rounded-lg"
      />

      {/* Questions Section */}
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-4 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Question {qIndex + 1}</span>
            <button
              onClick={() => removeQuestion(qIndex)}
              className="bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Remove Question
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter question"
            value={question.text}
            onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
            className="mb-2 border p-2 w-full rounded-lg"
          />

          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                className="border p-2 flex-grow mr-2 rounded-lg"
              />
              <button
                onClick={() => removeOption(qIndex, oIndex)}
                className="bg-red-600 text-white px-2 py-1 rounded-lg"
                disabled={question.options.length <= 2}
              >
                Remove Option
              </button>
            </div>
          ))}

          <button
            onClick={() => addOption(qIndex)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            Add Option
          </button>

          <select
            value={question.correctAnswer}
            onChange={(e) => updateQuestion(qIndex, 'correctAnswer', parseInt(e.target.value))}
            className="border p-2 mt-2 w-full rounded-lg"
          >
            {question.options.map((_, index) => (
              <option key={index} value={index}>
                Correct Answer: Option {index + 1}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Add Question Button */}
      <button onClick={addQuestion} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Add Question
      </button>

      {/* Participant Management Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add Participants</h2>
        {participants.map((email, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="email"
              placeholder="Enter participant email"
              value={email}
              onChange={(e) => updateParticipant(index, e.target.value)}
              className="border p-2 flex-grow mr-2 rounded-lg"
            />
            <button
              onClick={() => removeParticipant(index)}
              className="bg-red-600 text-white px-2 py-1 rounded-lg"
              disabled={participants.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addParticipant} className="bg-blue-600 text-white px-3 py-1 rounded-lg">
          Add Participant
        </button>
      </div>

      {/* Save Quiz Button */}
      <button onClick={saveQuiz} className="bg-green-600 text-white px-4 py-2 rounded-lg">
        {isEditing ? 'Update Quiz' : 'Save Quiz'}
      </button>

      {/* Success Alert */}
      {showAlert && (
        <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-lg">
          Quiz {isEditing ? 'updated' : 'saved'} successfully!
        </div>
      )}
    </div>
  </div>

  {/* Right Grid - Question Generator */}
  <div className="p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Generate a Question</h2>
    <input
      type="text"
      placeholder="Enter your question" //prompt
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className="mb-4 border p-2 w-full rounded-lg"
    />
    <button 
          onClick={generateQuestionFromAI} 
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
          Generate
    </button>

    <h3 className="text-lg font-medium mb-2">Generated Output:</h3>
    <div className="bg-gray-100 p-4 rounded-lg h-40 overflow-auto">
      {/* Display the generated output here */}
      <p>{generatedQuestion || 'Your generated content will appear here...'}</p>
    </div>
  </div>
</div>

    
  );
  
};

export default CreateQuiz;