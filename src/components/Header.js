import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      background: '#1976d2',
      color: '#fff',
      fontFamily: 'AnjomanMax, sans-serif',
    }}>
      <h1 style={{ fontSize: '1.5rem' }}>برنامه حسابداری</h1>
      <nav>
        <Link to="/" style={linkStyle}>صفحه اصلی</Link>
        <Link to="/login" style={linkStyle}>ورود</Link>
        <Link to="/register" style={linkStyle}>ثبت‌نام</Link>
      </nav>
    </header>
  );
}

const linkStyle = {
  margin: '0 10px',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
};

export default Header;