// PaymentStatus.js
import React, { useEffect, useState } from 'react';

const PaymentStatus = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get the message from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const statusMessage = urlParams.get('message');
    if (statusMessage) {
      setMessage(decodeURIComponent(statusMessage));
    }
  }, []);

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{message ? message : 'No payment status available.'}</p>
    </div>
  );
};

export default PaymentStatus;
