import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
      fontFamily: 'AnjomanMax, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 16px'
    }}>
      {/* Header Section */}
      <header style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '40px auto 0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontWeight: 500,
          fontSize: '2.5rem',
          color: '#24305E'
        }}>به برنامه حسابداری خوش آمدید</h1>
        <p style={{
          fontWeight: 400,
          fontSize: '1.2rem',
          color: '#444',
          margin: '16px 0 0 0'
        }}>مدیریت مالی ساده و حرفه‌ای برای کسب‌وکار شما</p>
      </header>

      {/* Buttons for Login and Register */}
      <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
        <button
          style={{
            padding: '12px 36px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontFamily: 'AnjomanMax, sans-serif',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/login')} // مسیریابی به صفحه ورود
        >
          ورود
        </button>
        <button
          style={{
            padding: '12px 36px',
            background: '#ff4b5c',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontFamily: 'AnjomanMax, sans-serif',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/register')} // مسیریابی به صفحه ثبت‌نام
        >
          ثبت‌نام
        </button>
      </div>
    </div>
  );
}

export default Landing;