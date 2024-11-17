// src/components/VideoList.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Video from './Video';

const VideoList = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <Video key={video.id.videoId} video={video} />
      ))}
    </div>
  );
};

// PropTypes validation
VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired, // Title is still required
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string.isRequired, // Thumbnail URL is still required
        }).isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired, // Validate that videos is an array of video objects
};

export default VideoList;   