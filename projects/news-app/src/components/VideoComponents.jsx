import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';

/*********************
  VIDEO CONSTANTS
*********************/
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const YOUTUBE_API_KEY = env.VITE_YOUTUBE_API_KEY || env.REACT_APP_YOUTUBE_API_KEY || '';

const VIDEO_CATEGORIES = [
  { id: 'news', label: 'News', icon: '📰', color: 'from-blue-600 to-blue-700' },
  { id: 'technology', label: 'Technology', icon: '💻', color: 'from-purple-600 to-purple-700' },
  { id: 'sports', label: 'Sports', icon: '⚽', color: 'from-green-600 to-green-700' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: 'from-pink-600 to-pink-700' },
  { id: 'science', label: 'Science', icon: '🔬', color: 'from-indigo-600 to-indigo-700' },
  { id: 'business', label: 'Business', icon: '💼', color: 'from-gray-600 to-gray-700' }
];

const LIVE_STREAMS = [
  {
    id: 'cnn-live',
    title: 'CNN Live',
    url: 'https://www.youtube.com/watch?v=w_Ma8oQLmSM',
    thumbnail: 'https://i.ytimg.com/vi/w_Ma8oQLmSM/maxresdefault.jpg',
    viewers: '2.1M',
    category: 'News'
  },
  {
    id: 'bbc-live',
    title: 'BBC News Live',
    url: 'https://www.youtube.com/watch?v=9Auq9mYxFEE',
    thumbnail: 'https://i.ytimg.com/vi/9Auq9mYxFEE/maxresdefault.jpg',
    viewers: '1.8M',
    category: 'News'
  },
  {
    id: 'tech-live',
    title: 'TechCrunch Live',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg',
    viewers: '890K',
    category: 'Technology'
  },
  {
    id: 'sports-live',
    title: 'ESPN Live',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    viewers: '1.2M',
    category: 'Sports'
  }
];

/*********************
  VIDEO UTILS
*********************/
const extractVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  if (hours) return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

const formatViewCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

/*********************
  YOUTUBE VIDEO SEARCH
*********************/
export const YouTubeVideoSearch = ({ onVideoSelect, dark }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('news');

  const searchVideos = useCallback(async (query, category = 'news') => {
    if (!YOUTUBE_API_KEY || !query.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' ' + category)}&type=video&maxResults=12&key=${YOUTUBE_API_KEY}`
      );
      
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const { data: videoDetails } = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );
      
      setVideos(videoDetails.items || []);
    } catch (err) {
      console.error('YouTube API Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchVideos(searchQuery, selectedCategory);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (searchQuery.trim()) {
      searchVideos(searchQuery, category);
    }
  };

  return (
    <div className="space-y-6">
      {/* Advanced Search Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
      >
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for videos, news, or topics..."
              className={`w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg ${
                dark ? 'bg-gray-700 text-white placeholder-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200'
              }`}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg"
            >
              🔍 Search
            </motion.button>
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mt-4">
          {VIDEO_CATEGORIES.map(category => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
                selectedCategory === category.id 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-glow` 
                  : dark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:shadow-md' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:shadow-md'
              }`}
            >
              {category.icon} {category.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center p-12"
        >
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <span className="ml-4 text-gray-600 dark:text-gray-300 font-medium">Searching videos...</span>
        </motion.div>
      )}

      {/* Video Results Grid */}
      {!loading && videos.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group cursor-pointer"
              onClick={() => onVideoSelect(video)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                  {formatDuration(video.contentDetails.duration)}
                </div>
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg font-bold">
                  LIVE
                </div>
              </div>
              <div className="mt-3 p-3">
                <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {video.snippet.title}
                </h3>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="truncate">{video.snippet.channelTitle}</span>
                  <span>{formatViewCount(parseInt(video.statistics.viewCount))} views</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

/*********************
  ADVANCED VIDEO PLAYER
*********************/
export const VideoPlayer = ({ video, onClose, dark }) => {
  if (!video) return null;

  const videoId = extractVideoId(video.snippet?.thumbnails?.default?.url) || video.id;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-6xl w-full" 
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all duration-300 z-10"
          >
            ✕
          </motion.button>
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-3xl">
            <div className="aspect-video relative">
              <YouTube
                videoId={videoId}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
                className="w-full h-full"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {video.snippet?.title || video.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{video.snippet?.channelTitle || 'Unknown Channel'}</span>
                    <span>•</span>
                    <span>{formatViewCount(parseInt(video.statistics?.viewCount || 0))} views</span>
                    <span>•</span>
                    <span>{new Date(video.snippet?.publishedAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  🔖 Save
                </motion.button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {video.snippet?.description || video.description || 'No description available.'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/*********************
  NETFLIX-STYLE LIVE STREAMS
*********************/
export const LiveStreams = ({ dark }) => {
  const [selectedStream, setSelectedStream] = useState(null);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold mb-2 text-gradient">🔴 Live Streams</h2>
        <p className="text-gray-600 dark:text-gray-400">Watch real-time news and events from around the world</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LIVE_STREAMS.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group cursor-pointer"
            onClick={() => setSelectedStream(stream)}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              {/* Live Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                🔴 LIVE
              </div>
              
              {/* Viewers Count */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                👥 {stream.viewers} watching
              </div>
              
              {/* Category Badge */}
              <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {stream.category}
              </div>
            </div>
            
            <div className="mt-4 p-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {stream.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Live streaming now • {stream.viewers} viewers
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Stream Player Modal */}
      {selectedStream && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedStream(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelectedStream(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all duration-300 z-10"
              >
                ✕
              </motion.button>
              
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-3xl">
                <div className="aspect-video relative">
                  <ReactPlayer
                    url={selectedStream.url}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    config={{
                      youtube: {
                        playerVars: {
                          modestbranding: 1,
                          rel: 0,
                        }
                      }
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {selectedStream.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          🔴 LIVE
                        </span>
                        <span>•</span>
                        <span>👥 {selectedStream.viewers} watching</span>
                        <span>•</span>
                        <span>{selectedStream.category}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
                    >
                      🔴 Live
                    </motion.button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Watch this live stream for real-time updates and breaking news coverage.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

/*********************
  NETFLIX-STYLE TRENDING VIDEOS
*********************/
export const TrendingVideos = ({ dark }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      if (!YOUTUBE_API_KEY) return;

      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=8&key=${YOUTUBE_API_KEY}`
        );
        setVideos(data.items || []);
      } catch (err) {
        console.error('Trending videos error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingVideos();
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center p-12"
      >
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <span className="ml-4 text-gray-600 dark:text-gray-300 font-medium">Loading trending videos...</span>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold mb-2 text-gradient">🔥 Trending Videos</h2>
        <p className="text-gray-600 dark:text-gray-400">Most popular videos on YouTube right now</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                {formatDuration(video.contentDetails.duration)}
              </div>
              <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-lg font-bold">
                🔥 TRENDING
              </div>
            </div>
            <div className="mt-3 p-3">
              <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {video.snippet.title}
              </h3>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="truncate">{video.snippet.channelTitle}</span>
                <span>{formatViewCount(parseInt(video.statistics.viewCount))} views</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          dark={dark}
        />
      )}
    </div>
  );
}; 