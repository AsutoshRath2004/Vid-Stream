// src/components/Comment.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <strong>{comment.author}</strong>
      <p>{comment.text}</p>
    </div>
  );
};

// PropTypes validation
Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired, // Validate author as a required string
    text: PropTypes.string.isRequired, // Validate text as a required string
  }).isRequired, // Validate comment as a required object
};

export default Comment;
