import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizTakerHomePage.css';
import Navbar from './Navbar';
import QuizCard from './QuizCard';

import { useNavigate } from 'react-router-dom';

function QuizTakerHomePage() {
  const navigate = useNavigate();
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  

  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/quizzes/user-quizzes', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
            
  //         }
  //       });
  //       setAvailableQuizzes(response.data);
  //     } catch (error) {
  //       console.error('Error fetching quizzes:', error);
  //     }
  //   };

  //   fetchQuizzes();
  // }, []);
  // frontend/src/components/QuizTakerHomePage.js
useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quizzes', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setAvailableQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  fetchQuizzes();
}, []);


  return (
    <div className="quiz-taker-home-container">
      <Navbar />
      <div className="quiz-taker-home">
        <div className="welcome-banner">
          <h1>Welcome to Your Quiz Adventure! 🧠✨</h1>
          <p>Ready to take on a new quiz today?</p>
        </div>

        <section className="available-quizzes">
          <h2>Available Quizzes</h2>
          <div className="quiz-list">
            {availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz) => (
                <QuizCard 
                  key={quiz._id} 
                  quiz={quiz} 
                  isCreator={false} 
                  handleTakeQuiz={() => navigate(`/take-quiz/${quiz._id}`)}  // Use navigate here
                />
              ))
            ) : (
              <p>No quizzes available for you right now.</p>
            )}
          </div>
        </section>

        {/* <section className="available-quizzes">
          <h2>Available Quizzes</h2>
          <div className="quiz-list">
            {availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz) => (
                <div key={quiz._id} className="quiz-card">
                  <h3>{quiz.title}</h3>
                  <p>Created by: {quiz.creator.username}</p>
                  <button className="start-quiz-btn">Start Quiz</button>
                </div>
              ))
            ) : (
              <p>No quizzes available for you right now.</p>
            )}
          </div>
        </section> */}
      </div>
    </div>
  );
}
export default QuizTakerHomePage;