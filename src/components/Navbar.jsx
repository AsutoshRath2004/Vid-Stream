// src/components/NavBar.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <h1>VID STREAM</h1>
        </Link>
        <input type="text" placeholder="Search..." className="search-box" />
      </div>

      <div className="navbar-right">
        <button className="notification-button">🔔</button>
        {user ? (
          <>
            <img src={user.photoURL} alt="User" className="user-logo" />
            <button onClick={logout} className="auth-button">Logout</button>
          </>
        ) : (
          <button onClick={login} className="auth-button">Login with Google</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar; 