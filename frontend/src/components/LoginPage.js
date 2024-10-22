import React, { useState } from 'react';
import './LoginPage.css';
import loginQuizImage from '../login_quiz_image.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');  // Renamed from fullName
  const [organizationName, setOrganizationName] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (isRegister) {
      if (!username || !role) {  // Changed from fullName to username
        setError('All fields are required for registration.');
        return;
      }

      try {
        const registerData = { email, password, role, username, organizationName, id }; // Changed fullName to username
        const res = await axios.post('http://localhost:5000/api/auth/register', registerData);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);

        if (role === 'creator') {
          navigate('/creator-home');
        } else if (role === 'taker') {
          navigate('/taker-home');
        }
      } catch (err) {
        setError('Registration failed. Please try again.');
      }
    } else {
      
      try {
        
        const loginData = { email, password };
        const res = await axios.post('http://localhost:5000/api/auth/login', loginData);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);

        if (res.data.user.role === 'creator') {
          navigate('/creator-home');
        } else if (res.data.user.role === 'taker') {
          navigate('/taker-home');
        }
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  const handleRegister = () => {
    setIsRegister(true);
    setError(null);
  };

  const handleLogin = () => {
    setIsRegister(false);
    setError(null);
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
              <label>Username:</label> {/* Changed label from Full Name */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Changed from setFullName to setUsername
                placeholder="Enter username"
              />
              <br />
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="creator">Quiz Creator</option>
                <option value="taker">Quiz Taker</option>
              </select>
              {role === 'creator' && (
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
              {role === 'taker' && (
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
                  <button type="submit" className="submit-btn">Register & Login</button>
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
