import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ darkTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navStyle = {
    background: darkTheme
      ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
      : '#f8f9fa',
    padding: '1rem 2rem',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const ulStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: darkTheme ? 'white' : '#333',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: darkTheme ? 'white' : '#333',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s',
  };

  const hoverLinkStyle = {
    backgroundColor: darkTheme ? 'white' : '#764ba2',
    color: darkTheme ? '#764ba2' : 'white',
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = hoverLinkStyle.backgroundColor;
    e.target.style.color = hoverLinkStyle.color;
  };

  const handleLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = darkTheme ? 'white' : '#333';
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: darkTheme ? 'white' : '#764ba2',
    color: darkTheme ? '#764ba2' : 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s',
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link
            to="/"
            style={{ ...linkStyle, fontSize: '1.5rem', fontWeight: 'bold' }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            MyApp
          </Link>
        </li>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <li>
            <Link to="/" style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/payment" style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              Payment
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/order-list" style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                  Order List
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{ ...linkStyle, border: '2px solid', backgroundColor: 'transparent', cursor: 'pointer' }}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" style={{ ...linkStyle, border: '1px solid' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" style={{ ...linkStyle, border: '1px solid' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                  Signup
                </Link>
              </li>
            </>
          )}
          <li>
            <button onClick={toggleTheme} style={buttonStyle}>
              {darkTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
