import React, { useState } from 'react';
import './CreateQuiz.css';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

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

  const saveQuiz = () => {
    console.log('Quiz saved:', { title: quizTitle, questions });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
      
      {/* Quiz Title Input */}
      <input
        type="text"
        placeholder="Enter quiz title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="mb-4 border p-2 w-full"
      />

      {/* Questions */}
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-4 border rounded shadow">
          <div className="flex justify-between items-center">
            <span>Question {qIndex + 1}</span>
            <button
              onClick={() => removeQuestion(qIndex)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove Question
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter question"
            value={question.text}
            onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
            className="mb-2 border p-2 w-full"
          />

          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                className="border p-2 flex-grow mr-2"
              />
              <button
                onClick={() => removeOption(qIndex, oIndex)}
                className="bg-red-500 text-white px-2 py-1 rounded"
                disabled={question.options.length <= 2}
              >
                Remove Option
              </button>
            </div>
          ))}

          <button onClick={() => addOption(qIndex)} className="bg-blue-500 text-white px-2 py-1 rounded">
            Add Option
          </button>

          <select
            value={question.correctAnswer}
            onChange={(e) => updateQuestion(qIndex, 'correctAnswer', parseInt(e.target.value))}
            className="border p-2 mt-2 w-full"
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
      <button onClick={addQuestion} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Add Question
      </button>

      {/* Save Quiz Button */}
      <button onClick={saveQuiz} className="bg-green-500 text-white px-4 py-2 rounded">
        Save Quiz
      </button>

      {/* Success Alert */}
      {showAlert && (
        <div className="mt-4 bg-green-200 text-green-800 p-4 rounded">
          Quiz saved successfully!
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
