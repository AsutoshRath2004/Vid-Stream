/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import VideoList from '../components/VideoList';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import axios from 'axios';
import Spinner from '../components/Spinner';

const API_KEY = 'AIzaSyDP9yKIlb__UvC7pQ10hE8LRjqrPBhtfhc'; // Replace with your API key

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [loading, setLoading] = useState(true); // Show loading when component mounts
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more videos
  const [error, setError] = useState(null);

  // Fetch video statistics (views)
  const fetchVideoStatistics = async (videoIds) => {
    const ids = videoIds.join(',');
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${ids}&part=statistics`
    );
    return res.data.items;
  };

  // Fetch videos from the YouTube Search API
  const fetchVideos = useCallback(async () => {
    setLoadingMore(true); // Set loading state to true when fetching more videos
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=25&pageToken=${pageToken}` // Load 25 videos at a time
      );

      const videoIds = res.data.items.map((video) => video.id.videoId);

      // Fetch the statistics for the video IDs
      const statistics = await fetchVideoStatistics(videoIds);

      // Merge statistics with video data
      const updatedVideos = res.data.items.map((video, index) => ({
        ...video,
        statistics: statistics[index].statistics, // Add view count and other statistics
      }));

      setVideos((prev) => [...prev, ...updatedVideos]);
      setPageToken(res.data.nextPageToken);
      setError(null);
    } catch (err) {
      setError('Failed to fetch videos. Please try again later.');
    } finally {
      setLoadingMore(false); // Reset loading state
    }
  }, [pageToken]);

  useEffect(() => {
    fetchVideos(); // Initial fetch when component mounts
  }, [fetchVideos]);

  useInfiniteScroll(() => {
    if (pageToken && !loadingMore) { // Fetch more videos only if not already loading
      fetchVideos();
    }
  });

  return (
    <div>
      {loading && <Spinner />} {/* Show spinner when loading initially */}
      {error && <p className="error-message">{error}</p>} {/* Styled error message */}
      <VideoList videos={videos} />
      {loadingMore && <p className="loading-more">Loading more videos...</p>} {/* Show loading message for more videos */}
    </div>
  );
};

export default Home;  