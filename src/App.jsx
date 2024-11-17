// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/Navbar';
import Header from './components/Header'; // Keep the header for branding
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';
 // General styles for your app

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;  