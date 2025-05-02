import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const { search } = useLocation();
  const message = new URLSearchParams(search).get('message');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Payment Successful!</h1>
        <p style={styles.message}>
          {message || 'Your payment has been successfully processed. Thank you for your payment!'}
        </p>
        <div style={styles.actions}>
          <a href="/" style={styles.button}>Go to Home</a>
          <a href="/order-list" style={styles.link}>View Order History</a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fb',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '40px 30px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  heading: {
    fontSize: '28px',
    color: '#388E3C',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginTop: '20px',
  },
  actions: {
    marginTop: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#388E3C',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  },
  link: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#1976D2',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default SuccessPage;
