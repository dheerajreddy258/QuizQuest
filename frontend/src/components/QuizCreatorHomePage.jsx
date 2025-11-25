import React, { useState, useEffect } from 'react';
import './QuizCreatorHomePage.css';
import logo from '../img_navbar.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizCard from './QuizCard';

function QuizCreatorHomePage() {
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/quizzes', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       // Filter quizzes where the user is the creator
  //       const userCreatedQuizzes = response.data.filter(
  //         quiz => quiz.creator.email === userEmail
  //       );
  //       setCreatedQuizzes(userCreatedQuizzes);
  //     } catch (error) {
  //       console.error('Error fetching quizzes:', error);
  //     }
  //   };

  //   fetchQuizzes();
  // }, [userEmail]);
  // frontend/src/components/QuizCreatorHomePage.js
useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/quizzes/${userId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setCreatedQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  fetchQuizzes();
}, []);


  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };


  const handleEditQuiz = (quiz) => {
    navigate('/create-quiz', {
      state: {
        isEditing: true,
        quizData: quiz
      }
    });
  };

  return (
    <>
      <div className="navbar navbar-expand-custom navbar-mainbg">
        <div className="navbar-logo">
          <img src={logo} alt="QuizQuest Logo" />
          <span className="navbar-title">QuizQuest</span>
        </div>
        <div className="navbar-content">
          <div className="welcome-message">
            Welcome, {localStorage.getItem('username')}!
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="quiz-creator-home">
        <div className="create-quiz-section">
          <h1>Create a New Quiz</h1>
          <button className="create-quiz-btn" onClick={handleCreateQuiz}>
            Create Quiz
          </button>
        </div>

        {/* <div className="available-quizzes">
          <h2>Your Created Quizzes</h2>
          <div className="quiz-list">
            {createdQuizzes.length > 0 ? (
              createdQuizzes.map((quiz) => (
                <div key={quiz._id} className="quiz-card">
                  <h3>{quiz.title}</h3>
                  <p>Participants: {quiz.participants.length}</p>
                  <p>Questions: {quiz.questions.length}</p>
                  <p>Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEditQuiz(quiz)}
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p>No quizzes available. Start by creating one!</p>
            )}
          </div>
        </div> */}
        <div className="available-quizzes">
        <h2>Your Created Quizzes</h2>
        <div className="quiz-list">
          {createdQuizzes.length > 0 ? (
            createdQuizzes.map((quiz) => (
              <QuizCard 
                key={quiz._id} 
                quiz={quiz} 
                isCreator={quiz.creator.email === userEmail} 
                handleEdit={() => handleEditQuiz(quiz)}
              />
            ))
          ) : (
            <p>No quizzes available. Start by creating one!</p>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default QuizCreatorHomePage;