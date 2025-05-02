import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ darkTheme }) => {
  const [orders, setOrders] = useState([]);
  const [orderFormData, setOrderFormData] = useState({
    school_id: '65b0e6293e9f76a9694d84b4',
    trustee_id: 'trustee123',
    gateway_name: '',
    student_info: { name: '', id: '', email: '' },
  });

  const [transactionData, setTransactionData] = useState({
    collect_id: '',
    order_amount: '',
    transaction_amount: '',
    payment_mode: '',
    payment_details: '',
    bank_reference: '',
    payment_message: '',
    status: '',
    error_message: '',
    payment_time: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://13.201.190.79:5000/api/orders/');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'id' || name === 'email') {
      setOrderFormData((prev) => ({
        ...prev,
        student_info: {
          ...prev.student_info,
          [name]: value,
        },
      }));
    } else {
      setOrderFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTransactionInputChange = (e) => {
    setTransactionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.201.190.79:5000/api/orders/create', orderFormData);
      alert('Order created successfully! Now fill the Transaction form.');
      const newOrderId = response.data._id;
      setTransactionData((prev) => ({
        ...prev,
        collect_id: newOrderId,
      }));

      setOrderFormData({
        school_id: '',
        trustee_id: '',
        gateway_name: '',
        student_info: { name: '', id: '', email: '' },
      });

      const res = await axios.get('http://13.201.190.79:5000/api/orders/');
      setOrders(res.data);

    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Error creating order!');
    }
  };

  

  const containerStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
    padding: '40px',
    background: darkTheme
      ? 'linear-gradient(90deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)'
      : 'linear-gradient(90deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    color: darkTheme ? '#ffffff' : '#000000',
    transition: 'all 0.5s ease',
  };

  const formStyle = {
    backgroundColor: 'transparent',
    padding: '30px',
    marginBottom: '40px',
    borderRadius: '12px',
    boxShadow: darkTheme
      ? '0 6px 24px rgba(255, 255, 255, 0.1)'
      : '0 6px 24px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s ease',
  };

  const inputGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  };

  const inputStyle = {
    padding: '14px',
    borderRadius: '12px',
    border: `2px solid ${darkTheme ? '#2196F3' : '#2196F3'}`,
    fontSize: '16px',
    backgroundColor: darkTheme ? '#f9f9f9' : '#f9f9f9',
    color: darkTheme ? '#ffffff' : '#000000',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    marginTop: '20px',
    backgroundColor: darkTheme ? '#90caf9' : '#64b5f6',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: '18px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '30px',
    color: darkTheme ? '#ffffff' : '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textAlign: 'center',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = darkTheme ? '#64b5f6' : '#64b5f6';
    e.target.style.backgroundColor = '#ffffff';
    e.target.style.color = '#000000';
    e.target.style.transform = 'scale(1.05)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = darkTheme ? '#90caf9' : '#2196F3';
    e.target.style.backgroundColor = darkTheme ? '#1e1e1e' : '#f9f9f9';
    e.target.style.color = darkTheme ? '#ffffff' : '#000000';
    e.target.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      {/* --- Order Creation Form --- */}
      <h2 style={titleStyle}>Create New Order</h2>
      <form onSubmit={handleOrderSubmit} style={formStyle}>
        <div style={inputGridStyle}>
          <input
            type="text"
            name="gateway_name"
            placeholder="Gateway Name"
            value={orderFormData.gateway_name}
            onChange={handleOrderInputChange}
            style={inputStyle}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={orderFormData.student_info.name}
            onChange={handleOrderInputChange}
            style={inputStyle}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <input
            type="text"
            name="id"
            placeholder="Student ID"
            value={orderFormData.student_info.id}
            onChange={handleOrderInputChange}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <input
            type="email"
            name="email"
            placeholder="Student Email"
            value={orderFormData.student_info.email}
            onChange={handleOrderInputChange}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Create Order
        </button>
      </form>

      
    </div>
  );
};

export default Home;
