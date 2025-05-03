import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

function AppContent({ isSidebarOpen, toggleSidebar }) {
  const location = useLocation();

  // مسیرهایی که نباید سایدبار داشته باشند
  const noSidebarRoutes = ['/', '/login', '/register'];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'IRANSans, sans-serif' }}>
      {shouldShowSidebar && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div
        style={{
          marginRight: shouldShowSidebar ? (isSidebarOpen ? '250px' : '60px') : '0',
          transition: 'margin-right 0.3s ease',
        }}
      >
        <Routes>
          {/* مسیرهای تعریف شده */}
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <AppContent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </Router>
  );
}

export default App;