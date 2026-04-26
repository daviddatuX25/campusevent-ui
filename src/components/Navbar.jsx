import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  const linkClass = (path) =>
    `nav-link${location.pathname === path ? ' active' : ''}`;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">CampusEventUI</Link>
      <div className="nav-links">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/events" className={linkClass('/events')}>Events</Link>
        {isLoggedIn && <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>}
        <button onClick={toggleDarkMode} className="btn-icon" title="Toggle dark mode">
          {darkMode ? '☀️' : '🌙'}
        </button>
        {isLoggedIn ? (
          <button onClick={logout} className="btn btn-secondary btn-small">Logout</button>
        ) : (
          <Link to="/login" className={linkClass('/login')}>Login</Link>
        )}
      </div>
    </nav>
  );
}