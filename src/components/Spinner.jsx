// src/components/Spinner.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './spinner.css'; // Assuming you have styles for the spinner in Spinner.css

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Spinner;   