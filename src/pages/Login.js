import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      Swal.fire({
        icon: 'success',
        title: 'ورود موفقیت‌آمیز',
        text: response.data.message,
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: error.response?.data?.message || 'خطایی رخ داده است.',
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      fontFamily: 'IRANSans, sans-serif',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '20px',
          color: '#333',
        }}>ورود</h2>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            name="email"
            placeholder="ایمیل"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            name="password"
            placeholder="رمز عبور"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={{
          padding: '10px 30px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          width: '100%',
        }}>
          ورود
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 15px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
};

export default Login;