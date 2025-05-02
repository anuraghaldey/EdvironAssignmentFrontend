import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get('message');
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }
  }, [location.search]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Error</h1>
      <p style={styles.message}>{errorMessage || 'An unknown error occurred. Please try again later.'}</p>
      <a href="/" style={styles.button}>Go Back to Home</a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '50px auto',
  },
  heading: {
    fontSize: '24px',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
  }
};

export default ErrorPage;
