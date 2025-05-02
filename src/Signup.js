import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://edvironassignment-1backend.onrender.com/api/users/signup', {
        username,
        email,
        password
      });
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #667eea, #764ba2, #e91e63)',
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#555',
    marginBottom: '0.5rem',
  };

  const inputStyle = {
    width: '90%',
    padding: '0.7rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '1.2rem',
    fontSize: '1rem',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#5a67d8',
    color: 'white',
    fontWeight: '700',
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#434190',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    textAlign: 'center',
  };

  const loginTextStyle = {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666',
  };

  const loginLinkStyle = {
    color: '#5a67d8',
    fontWeight: '600',
    cursor: 'pointer',
    marginLeft: '5px',
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <div style={errorStyle}>{error}</div>}
          <div>
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p style={loginTextStyle}>
          Already have an account?
          <span
            style={loginLinkStyle}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
