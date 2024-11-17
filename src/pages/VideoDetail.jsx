/* eslint-disable no-unused-vars */
// src/pages/VideoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from '../components/CommentList';

const API_KEY = 'AIzaSyDP9yKIlb__UvC7pQ10hE8LRjqrPBhtfhc'; // Replace with your actual API key

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false); // Track if the user has liked the video

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&id=${id}`
        );
        setVideo(res.data.items[0]);
        setLikes(parseInt(res.data.items[0].statistics.likeCount));
        setError(null);
      } catch (err) {
        setError('Failed to fetch video details. Please try again later.');
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&part=snippet&videoId=${id}&maxResults=10`
        );
        const fetchedComments = res.data.items.map((item, index) => ({
          id: index.toString(),
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          text: item.snippet.topLevelComment.snippet.textOriginal,
        }));
        setComments(fetchedComments);
      } catch (err) {
        setError('Failed to fetch comments.');
      }
    };

    fetchVideoDetails();
    fetchComments();
  }, [id]);

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  const handleAddComment = (newCommentText) => {
    const newComment = {
      id: (comments.length + 1).toString(),
      author: 'You',
      text: newCommentText,
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleLike = () => {
    // Toggle the like state
    if (userLiked) {
      setLikes((prevLikes) => prevLikes - 1); // Decrease likes if already liked
    } else {
      setLikes((prevLikes) => prevLikes + 1); // Increase likes if not liked
    }
    setUserLiked((prev) => !prev); // Toggle the userLiked state
  };

  if (!video && !error) return <p>Loading...</p>;

  return (
    <div className="video-detail">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {video && (
        <>
          <h2>{video.snippet.title}</h2>
          <div className="video-player">
            <iframe
              title="Video Player"
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${id}`}
              allowFullScreen
            />
          </div>
          <div className="video-stats">
            <p>
              <strong>{parseInt(video.statistics.viewCount).toLocaleString()}</strong> views
            </p>
            <p>
              <strong>{likes.toLocaleString()}</strong> likes
            </p>
          </div>
          <div className="description-box">
            <p>
              {video.snippet.description.slice(0, 150)}
              {showMore ? video.snippet.description.slice(150) : '...'}
              <span className="more" onClick={toggleDescription}>
                {showMore ? ' Less' : ' More'}
              </span>
            </p>
          </div>
          <div className="video-actions">
            <button className="button" onClick={handleLike}>
              {userLiked ? 'Unlike' : 'Like'}
            </button>
            <button className="button">Comment</button>
          </div>
          <div className="comment-section">
            <h3>Comments</h3>
            <CommentList comments={comments} onAddComment={handleAddComment} />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetail; 