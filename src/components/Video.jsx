// src/components/Video.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';

const Video = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.id.videoId}`);
  };

  return (
    <div className="video" onClick={handleClick}>
      <img 
        src={video.snippet.thumbnails.default.url} 
        alt={video.snippet.title} 
        className="video-thumbnail" 
      />
      <h3 className="video-title">{video.snippet.title}</h3>
      {video.statistics && (
        <div className="video-stats">
          <p className="video-stat">
            {parseInt(video.statistics.viewCount).toLocaleString()} views
          </p>
          <p className="video-stat">
            {parseInt(video.statistics.likeCount).toLocaleString()} likes
          </p>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
Video.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired, // Validate videoId as a required string
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired, // Validate title as a required string
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string.isRequired, // Validate thumbnail URL as a required string
        }).isRequired,
      }).isRequired,
    }).isRequired,
    statistics: PropTypes.shape({
      viewCount: PropTypes.string, // Optional, may not always be available
      likeCount: PropTypes.string, // Optional, may not always be available
    }),
  }).isRequired, // Validate video as a required object
};

export default Video;  