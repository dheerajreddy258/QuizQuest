import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TakeQuizPage.css';
import { useParams } from 'react-router-dom';

function TakeQuizPage() {
  const quizId = useParams()._id; // Get quiz ID from URL params
  const [quiz, setQuiz] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerSubmit = (questionIndex, answerIndex) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[questionIndex] = answerIndex;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/quizzes/${quizId}/submit`, {
        answers,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      console.log('Quiz submitted:', response.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  return (
    <div className="take-quiz-page">
      <h1>Take Quiz: {quiz.title}</h1>
      {quiz.questions && (
        <div className="quiz-questions">
          {quiz.questions.map((question, index) => (
            <div key={index} className="question-card">
              <h2>Question {index + 1}: {question.text}</h2>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    onChange={() => handleAnswerSubmit(index, optionIndex)}
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          ))}
          {currentQuestion < quiz.questions.length - 1 && (
            <button onClick={handleNextQuestion}>Next Question</button>
          )}
          {currentQuestion > 0 && (
            <button onClick={handlePrevQuestion}>Previous Question</button>
          )}
          {currentQuestion === quiz.questions.length - 1 && (
            <button onClick={handleSubmitQuiz}>Submit Quiz</button>
          )}
        </div>
      )}
    </div>
  );
}

export default TakeQuizPage;