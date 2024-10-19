/*import React, { useState } from 'react';
import './LoginPage.css';
import loginQuizImage from '../login_quiz_image.png';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (isRegister) {
      // Register logic
      if (!fullName || !role) {
        setError('All fields are required for registration.');
        return;
      }
      console.log('Register submitted:', { email, password, role, fullName, organizationName, id });
      navigate('/home'); // Navigate to Home page after registration
    } else {
      // Login logic
      console.log('Login submitted:', { email, password });
      navigate('/home'); // Navigate to Home page after login
    }

    // Clear the form and error after successful submission
    setEmail('');
    setPassword('');
    setFullName('');
    setRole('');
    setOrganizationName('');
    setId('');
    setError(null);
  };

  const handleRegister = () => {
    setIsRegister(true);
  };

  const handleLogin = () => {
    setIsRegister(false);
  };

  return (
    
    <div className="login-container">
      <div className="login-content">
        <div className="image-container">
          <img src={loginQuizImage} alt="Quiz Illustration" className="quiz-image" />
        </div>
    
        <div className="login-box">
          <h2>{isRegister ? 'Register' : 'Login'}</h2>
          {error && <p className="error-message">{error}</p>}
          {isRegister && (
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
              />
              <br />
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="quizCreator">Quiz Creator</option>
                <option value="quizTaker">Quiz Taker</option>
              </select>
              {role === 'quizCreator' && (
                <div>
                  <label>ID:</label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter your ID"
                  />
                  <br />
                  <label>Organization Name:</label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Enter organization name"
                  />
                </div>
              )}
              {role === 'quizTaker' && (
                <div>
                  <label>Institution:</label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Enter institution name"
                  />
                </div>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <div className="form-buttons">
              {isRegister ? (
                <div>
                  <button type="submit" className="submit-btn">Register</button>
                  <p>Already have an account? <span onClick={handleLogin} className="toggle-link">Login</span></p>
                </div>
              ) : (
                <div>
                  <button type="submit" className="submit-btn">Login</button>
                  <p>Don't have an account? <span onClick={handleRegister} className="toggle-link">Register</span></p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; */

import React, { useState } from 'react';
import './LoginPage.css';
import loginQuizImage from '../login_quiz_image.png';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (isRegister) {
      // Register logic
      if (!fullName || !role) {
        setError('All fields are required for registration.');
        return;
      }

      console.log('Register submitted:', { email, password, role, fullName, organizationName, id });

      // Navigate to the appropriate home page based on the selected role
      if (role === 'quizCreator') {
        localStorage.setItem('username', fullName);
        navigate('/creator-home'); // Redirect to Quiz Creator Home Page
      } else if (role === 'quizTaker') {
        localStorage.setItem('username', fullName);
        navigate('/taker-home'); // Redirect to Quiz Taker Home Page
      }
    } else {
      // Login logic
      console.log('Login submitted:', { email, password });

      // Logic to determine if the user is a creator or taker (you might want to fetch this from backend)
      if (role === 'quizCreator') {
        localStorage.setItem('username', 'QuizCreator');  // Mock username for login
        navigate('/creator-home'); // Redirect to Quiz Creator Home Page
      } else if (role === 'quizTaker') {
        localStorage.setItem('username', 'QuizTaker');  // Mock username for login
        navigate('/taker-home'); // Redirect to Quiz Taker Home Page
      }
    }

    // Clear the form and error after successful submission
    setEmail('');
    setPassword('');
    setFullName('');
    setRole('');
    setOrganizationName('');
    setId('');
    setError(null);
  };

  const handleRegister = () => {
    setIsRegister(true);
  };

  const handleLogin = () => {
    setIsRegister(false);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="image-container">
          <img src={loginQuizImage} alt="Quiz Illustration" className="quiz-image" />
        </div>

        <div className="login-box">
          <h2>{isRegister ? 'Register' : 'Login'}</h2>
          {error && <p className="error-message">{error}</p>}
          {isRegister && (
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
              />
              <br />
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="quizCreator">Quiz Creator</option>
                <option value="quizTaker">Quiz Taker</option>
              </select>
              {role === 'quizCreator' && (
                <div>
                  <label>ID:</label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter your ID"
                  />
                  <br />
                  <label>Organization Name:</label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Enter organization name"
                  />
                </div>
              )}
              {role === 'quizTaker' && (
                <div>
                  <label>Institution:</label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Enter institution name"
                  />
                </div>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <div className="form-buttons">
              {isRegister ? (
                <div>
                  <button type="submit" className="submit-btn">Register</button>
                  <p>Already have an account? <span onClick={handleLogin} className="toggle-link">Login</span></p>
                </div>
              ) : (
                <div>
                  <button type="submit" className="submit-btn">Login</button>
                  <p>Don't have an account? <span onClick={handleRegister} className="toggle-link">Register</span></p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;