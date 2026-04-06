import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span>🔍</span>
        <span>SRM AP <span className="accent">Lost & Found</span></span>
      </div>

      <div className="navbar-links">
        <button
          className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          Browse
        </button>

        {isAuthenticated ? (
          <>
            <button
              className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}
              onClick={() => navigate('/dashboard')}
            >
              My Items
            </button>
            <button
              className="nav-btn primary"
              onClick={() => navigate('/report')}
            >
              + Report Item
            </button>
            <button
              className="nav-btn"
              onClick={handleLogout}
              style={{ marginLeft: '0.25rem', opacity: 0.75 }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
            <button className="nav-btn primary" onClick={() => navigate('/register')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}
