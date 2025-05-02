import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import OrderList from './OrderList';
import Navbar from './Navbar';
import Home from './Home';
import PaymentForm from './PaymentForm';
import Success from './Success';
import Error from './Error';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      style={{
        backgroundColor: darkTheme ? '#121212' : '#ffffff',
        color: darkTheme ? '#ffffff' : '#000000',
        minHeight: '100vh',
        transition: 'all 0.5s ease',
      }}
    >
      <Router>
        <Navbar darkTheme={darkTheme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home darkTheme={darkTheme} />} />
          <Route path="/login" element={<Login darkTheme={darkTheme} />} />
          <Route path="/signup" element={<Signup darkTheme={darkTheme} />} />
          <Route path="/order-list" element={<OrderList darkTheme={darkTheme} />} />
          <Route path="/payment" element={<PaymentForm darkTheme={darkTheme} />} />
          <Route path="/success" element={<Success darkTheme={darkTheme} />} />
          <Route path="/error" element={<Error darkTheme={darkTheme} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
