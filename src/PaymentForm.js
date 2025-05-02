import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      const response = await axios.post('http://13.201.190.79:5000/api/payment/create-payment', {
        amount: amount
      });

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      setError('Failed to initiate payment. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Secure Payment</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="amount" style={styles.label}>Amount (₹):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            required
            min="1"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Pay Now</button>
      </form>
    </div>
  );
};

// Inline styles with enhanced aesthetics
const styles = {
  container: {
    maxWidth: '40%',
    margin: '80px auto',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto, sans-serif',
    background: 'linear-gradient(135deg, #3498db, #8e44ad)',  // Gradient background
    textAlign: 'center',  // Centered content
  },
  heading: {
    fontSize: '28px',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#f0f0f0',  // Light background for input
  },
  button: {
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',  // Slight scaling effect on hover
  },
  error: {
    color: '#e74c3c',
    marginBottom: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    animation: 'shake 0.5s ease-in-out',  // Shake effect for error message
    letterSpacing: '1px',
  },
};

// Keyframe animation for error message shake
const keyframes = `
@keyframes shake {
  0% { transform: translateX(-10px); }
  25% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
  100% { transform: translateX(0); }
}`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default PaymentForm;
