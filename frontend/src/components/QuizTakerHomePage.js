import React, { useState, useEffect } from 'react';
import './QuizTakerHomePage.css';
import Navbar from './Navbar'; // Import Navbar component

function QuizTakerHomePage() {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  

  useEffect(() => {
    // Fetch available quizzes (mock data or API call)
    setAvailableQuizzes([
      { id: 1, title: 'JavaScript Basics', description: 'A quiz on basic JavaScript concepts.' },
      { id: 2, title: 'ReactJS Fundamentals', description: 'Test your knowledge on React fundamentals.' },
      { id: 3, title: 'CSS Mastery', description: 'Advanced quiz on CSS techniques and tricks.' },
    ]);

    // Fetch completed quizzes (mock data or API call)
    
  }, []);

  return (
    <div className="quiz-taker-home-container">
      <Navbar /> 
      <div className="quiz-taker-home">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h1>Welcome, {localStorage.getItem('username')}!</h1>
          <p>Ready to take on a new quiz today?</p>
        </div>

        {/* Available Quizzes Section */}
        <section className="available-quizzes">
          <h2>Available Quizzes</h2>
          <div className="quiz-list">
            {availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-card">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description}</p>
                  <button className="start-quiz-btn">Start Quiz</button>
                </div>
              ))
            ) : (
              <p>No quizzes available right now. Please check back later!</p>
            )}
          </div>
        </section>         
      </div>
    </div>
  );
}

export default QuizTakerHomePage;