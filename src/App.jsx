import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar floating-nav">
      <div className="nav-brand">PROJECT ATLAS</div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/" className="nav-item">Dashboard</Link>
            <Link to="/analytics" className="nav-item">Analytics</Link>
            <Link to="/settings" className="nav-item">Settings</Link>
            <button onClick={logout} className="btn-logout-subtle" title="Logout">
              <span className="icon">⏻</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/register" className="nav-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <NavBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
