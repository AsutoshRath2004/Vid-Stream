// src/components/CommentList.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Comment from './Comment';

const CommentList = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment); // Call the function passed from VideoDetail to add the comment
      setNewComment(''); // Clear the input field
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

// PropTypes validation
CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming each comment has an id
    text: PropTypes.string.isRequired, // Assuming each comment has text
    author: PropTypes.string.isRequired, // Assuming each comment has an author
  })).isRequired, // Validate that comments is an array of comment objects
  onAddComment: PropTypes.func.isRequired, // Function to add a new comment
};

export default CommentList;
