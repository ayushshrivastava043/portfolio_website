import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { YouTubeVideoSearch, VideoPlayer, LiveStreams, TrendingVideos } from './components/VideoComponents';

/*********************
  ENV & CONSTANTS
*********************/
/*
  Access environment variables safely in the browser.
  ➜ **Vite**   : add `VITE_NEWS_API_KEY` to a `.env` file (vars must start with `VITE_`).
  ➜ **CRA**    : add `REACT_APP_NEWS_API_KEY` to a `.env` file.
  Using `process.env` directly will fail in the browser (ReferenceError: process is not defined).
*/
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const NEWS_API_KEY = env.VITE_NEWS_API_KEY || env.REACT_APP_NEWS_API_KEY || '';
const SOURCES = 'bbc-news,reuters,cnn';

/*********************
  ADVANCED THEME SYSTEM
*********************/
const themes = {
  cyberpunk: {
    primary: 'from-cyan-500 to-blue-600',
    secondary: 'from-purple-500 to-pink-600',
    accent: 'from-yellow-400 to-orange-500',
    background: 'bg-gray-900',
    surface: 'bg-gray-800/50',
    text: 'text-cyan-100',
    border: 'border-cyan-500/30'
  },
  neon: {
    primary: 'from-pink-500 to-purple-600',
    secondary: 'from-green-400 to-teal-500',
    accent: 'from-yellow-300 to-orange-400',
    background: 'bg-black',
    surface: 'bg-gray-900/50',
    text: 'text-pink-100',
    border: 'border-pink-500/30'
  },
  holographic: {
    primary: 'from-indigo-500 to-purple-600',
    secondary: 'from-emerald-400 to-teal-500',
    accent: 'from-amber-400 to-orange-500',
    background: 'bg-slate-900',
    surface: 'bg-slate-800/50',
    text: 'text-indigo-100',
    border: 'border-indigo-500/30'
  },
  matrix: {
    primary: 'from-green-500 to-emerald-600',
    secondary: 'from-gray-600 to-gray-700',
    accent: 'from-green-400 to-green-500',
    background: 'bg-black',
    surface: 'bg-gray-900/50',
    text: 'text-green-100',
    border: 'border-green-500/30'
  },
  sunset: {
    primary: 'from-orange-500 to-red-600',
    secondary: 'from-pink-500 to-purple-600',
    accent: 'from-yellow-400 to-orange-500',
    background: 'bg-gray-900',
    surface: 'bg-gray-800/50',
    text: 'text-orange-100',
    border: 'border-orange-500/30'
  }
};

/*********************
  PARTICLE SYSTEM
*********************/
const ParticleSystem = ({ theme, count = 50 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      delay: Math.random() * 2
    }));
  }, [count]);

  const getThemeColors = (themeName) => {
    const themeColors = {
      cyberpunk: ['#00ffff', '#0080ff', '#8000ff'],
      neon: ['#ff00ff', '#00ff00', '#ffff00'],
      holographic: ['#6366f1', '#10b981', '#f59e0b'],
      matrix: ['#00ff00', '#008000', '#004000'],
      sunset: ['#ff6b35', '#f7931e', '#ffd23f']
    };
    return themeColors[themeName] || themeColors.cyberpunk;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: getThemeColors(theme)[Math.floor(Math.random() * 3)]
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

/*********************
  ADVANCED LOADING COMPONENT
*********************/
const LoadingSpinner = ({ theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <motion.div 
          className={`w-16 h-16 border-4 border-gray-200 border-t-gradient-to-r ${themeConfig.primary} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={`absolute inset-0 w-16 h-16 border-4 border-transparent border-t-gradient-to-r ${themeConfig.secondary} rounded-full`}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={`absolute inset-2 w-12 h-12 border-4 border-transparent border-t-gradient-to-r ${themeConfig.accent} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.span 
        className="ml-6 text-gray-600 dark:text-gray-300 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading your personalized news...
      </motion.span>
    </div>
  );
};

/*********************
  ADVANCED ERROR COMPONENT
*********************/
const ErrorMessage = ({ message, onRetry, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`max-w-md mx-auto my-8 p-6 bg-gradient-to-r ${themeConfig.surface} rounded-2xl border ${themeConfig.border} backdrop-blur-sm`}
    >
      <div className="flex items-center mb-4">
        <motion.div 
          className={`w-12 h-12 bg-gradient-to-r ${themeConfig.primary} rounded-full flex items-center justify-center mr-3`}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-white text-xl">⚠️</span>
        </motion.div>
        <div>
          <h3 className={`font-bold ${themeConfig.text}`}>Oops! Something went wrong</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>
      </div>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full bg-gradient-to-r ${themeConfig.primary} text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium`}
          onClick={onRetry}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

/*********************
  UTILS
*********************/
const openInNewTab = url => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

// Debounce function for search
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Fallback image for broken images
const handleImageError = (e) => {
  e.target.style.display = 'none';
  if (e.target.nextSibling) {
    e.target.nextSibling.style.display = 'block';
  }
};

/*********************
  NETFLIX-STYLE SIDEBAR
*********************/
const sidebarItems = [
  { label: 'Home', icon: '🏠', active: true },
  { label: 'Trending', icon: '🔥' },
  { label: 'Following', icon: '👥' },
  { label: 'Bookmarks', icon: '🔖' },
  { label: 'Live', icon: '🔴' },
  { label: 'Videos', icon: '🎥' },
  { label: 'Categories', icon: '📂' },
  { label: 'Analytics', icon: '📊' }
];

const Sidebar = ({ dark, activeTab, setActiveTab, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  
  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`w-20 bg-gradient-to-b ${themeConfig.background} flex flex-col items-center py-8 space-y-6 shadow-2xl border-r ${themeConfig.border}`}
    >
      <motion.div 
        className={`w-12 h-12 bg-gradient-to-r ${themeConfig.primary} rounded-2xl flex items-center justify-center text-white font-bold text-xl`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        NF
      </motion.div>
      
      {sidebarItems.map(({ label, icon, active }, i) => (
        <motion.button
          key={i}
          title={label}
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
            active || activeTab === label.toLowerCase()
              ? `bg-gradient-to-r ${themeConfig.primary} text-white shadow-lg`
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab(label.toLowerCase())}
          aria-label={label}
        >
          {icon}
        </motion.button>
      ))}
      
      <div className="flex-1"></div>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${themeConfig.secondary} flex items-center justify-center text-white text-xl`}
        aria-label="User profile"
      >
        👤
      </motion.button>
    </motion.aside>
  );
};

/*********************
  TWITTER-STYLE NAVBAR
*********************/
const Navbar = ({ onSearch, dark, toggleDark, loading, theme = 'cyberpunk', setTheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const themeConfig = themes[theme];
  
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const nextTheme = () => {
    const themeNames = Object.keys(themes);
    const currentIndex = themeNames.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    setTheme(themeNames[nextIndex]);
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b ${themeConfig.border} ${themeConfig.background}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="h-16 px-6 flex items-center justify-between">
        <motion.h1 
          whileHover={{ scale: 1.05 }} 
          className={`text-2xl font-bold cursor-pointer select-none bg-gradient-to-r ${themeConfig.primary} bg-clip-text text-transparent`}
          aria-label="NewsFlux - Home"
        >
          NewsFlux
        </motion.h1>
        
        <div className="flex-1 mx-8 relative">
          <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${
            isSearchFocused ? 'scale-105' : 'scale-100'
          }`}>
            <input
              className={`w-full px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                dark 
                  ? 'bg-gray-800 text-white placeholder-gray-400 border border-gray-700' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200'
              }`}
              placeholder="Search for news, videos, or topics..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              disabled={loading}
              aria-label="Search news articles"
            />
            {loading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-4 items-center">
          <motion.button
            onClick={nextTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${themeConfig.accent} text-white transition-all duration-300 shadow-lg`}
            aria-label="Change theme"
          >
            🎨
          </motion.button>
          
          <motion.button
            onClick={toggleDark}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${themeConfig.primary} text-white transition-all duration-300 shadow-lg`}
            aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
          >
            {dark ? '☀️' : '🌙'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full bg-gradient-to-r ${themeConfig.secondary} flex items-center justify-center text-white font-bold shadow-lg`}
            aria-label="Notifications"
          >
            🔔
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

/*********************
  NETFLIX-STYLE FEATURED HERO
*********************/
const Featured = ({ article, theme = 'cyberpunk' }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const themeConfig = themes[theme];

  if (!article) return null;
  
  // Use a dynamic video background - you can replace these with actual news video URLs
  const videoSources = [
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  ];
  
  const randomVideo = videoSources[Math.floor(Math.random() * videoSources.length)];
  
  return (
    <motion.div 
      className="relative h-96 w-full overflow-hidden rounded-3xl mb-8"
      style={{ y, opacity }}
    >
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10`}></div>
      
      {/* Video Background */}
      <video 
        className="w-full h-full object-cover"
        autoPlay 
        muted 
        loop 
        playsInline
        poster={article.urlToImage || 'https://picsum.photos/1200/600'}
      >
        <source src={randomVideo} type="video/mp4" />
        {/* Fallback to image if video fails */}
        <img 
          src={article.urlToImage || 'https://picsum.photos/1200/600'} 
          alt={article.title || 'Featured news'}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </video>
      
      {/* Animated overlay elements for futuristic feel */}
      <div className="absolute inset-0 z-5">
        {/* Scanning line effect */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${themeConfig.primary.split('-')[1]}-500 to-transparent`}
          animate={{ y: [0, 384, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Corner indicators */}
        <div className={`absolute top-4 left-4 w-8 h-8 border-2 border-${themeConfig.primary.split('-')[1]}-500 rounded-full animate-pulse`}></div>
        <div className={`absolute top-4 right-4 w-8 h-8 border-2 border-${themeConfig.primary.split('-')[1]}-500 rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute bottom-4 left-4 w-8 h-8 border-2 border-${themeConfig.primary.split('-')[1]}-500 rounded-full animate-pulse`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-4 right-4 w-8 h-8 border-2 border-${themeConfig.primary.split('-')[1]}-500 rounded-full animate-pulse`} style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-8 right-8 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.span 
            className={`px-3 py-1 bg-gradient-to-r ${themeConfig.primary} text-white text-sm rounded-full font-bold`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔴 LIVE
          </motion.span>
          <span className="text-gray-300 text-sm">• {new Date().toLocaleDateString()}</span>
          <motion.div 
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        
        <h2 className="text-4xl font-bold mb-4 line-clamp-2 text-white leading-tight drop-shadow-lg">
          {article.title}
        </h2>
        
        <p className="text-gray-200 text-lg mb-6 line-clamp-2 max-w-2xl drop-shadow-lg">
          {article.description}
        </p>
        
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 bg-gradient-to-r ${themeConfig.primary} text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium shadow-lg backdrop-blur-sm`}
            onClick={() => openInNewTab(article.url)}
            aria-label={`Read full article: ${article.title}`}
          >
            📖 Read Full Story
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 font-medium border border-white/30"
          >
            🔖 Save for Later
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 bg-gradient-to-r ${themeConfig.secondary} backdrop-blur-sm text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium border border-white/20`}
          >
            📺 Watch Video
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/*********************
  TWITTER-STYLE TICKER
*********************/
const Ticker = ({ headlines, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  
  if (!headlines?.length) return null;
  
  return (
    <motion.div 
      className={`bg-gradient-to-r ${themeConfig.primary} py-3 text-sm overflow-hidden whitespace-nowrap`}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
    >
      <div className="animate-marquee inline-block px-4">
        {headlines.map((h, i) => (
          <motion.span 
            key={i} 
            className="mx-4 cursor-pointer hover:text-yellow-200 transition-colors font-medium" 
            onClick={() => openInNewTab(h.url)}
            whileHover={{ scale: 1.05 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openInNewTab(h.url)}
          >
            {h.title} •
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

/*********************
  FUTURISTIC DASHBOARD SECTIONS
*********************/

// Live Video Streams Section
const LiveVideoSection = ({ dark, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-br ${themeConfig.surface} backdrop-blur-sm rounded-3xl p-6 border ${themeConfig.border} shadow-2xl`}
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
        <h3 className={`text-xl font-bold ${themeConfig.text}`}>🔴 Live Streams</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="relative h-32 rounded-2xl overflow-hidden bg-gradient-to-r from-gray-800 to-gray-700"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
              LIVE
            </div>
            <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
              News Stream {i}
            </div>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {i === 1 ? '2.1M' : '890K'} watching
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Trending Topics Section
const TrendingTopicsSection = ({ dark, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  const topics = [
    { topic: 'AI Breakthrough', trend: '🔥', count: '2.3M' },
    { topic: 'Space Mission', trend: '🚀', count: '1.8M' },
    { topic: 'Climate Action', trend: '🌍', count: '1.5M' },
    { topic: 'Tech Innovation', trend: '💻', count: '1.2M' },
    { topic: 'Global Economy', trend: '📈', count: '980K' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-br ${themeConfig.surface} backdrop-blur-sm rounded-3xl p-6 border ${themeConfig.border} shadow-2xl`}
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
        <h3 className={`text-xl font-bold ${themeConfig.text}`}>🔥 Trending Topics</h3>
      </div>
      <div className="space-y-3">
        {topics.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.trend}</span>
              <span className="font-medium text-gray-900 dark:text-white">{item.topic}</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// International Sources Section
const InternationalSourcesSection = ({ dark, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  const sources = [
    { country: '🇺🇸 USA', source: 'CNN', status: 'online' },
    { country: '🇬🇧 UK', source: 'BBC', status: 'online' },
    { country: '🇩🇪 Germany', source: 'DW', status: 'online' },
    { country: '🇫🇷 France', source: 'France24', status: 'online' },
    { country: '🇯🇵 Japan', source: 'NHK', status: 'online' },
    { country: '🇮🇳 India', source: 'NDTV', status: 'online' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${themeConfig.surface} backdrop-blur-sm rounded-3xl p-6 border ${themeConfig.border} shadow-2xl`}
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse mr-3"></div>
        <h3 className={`text-xl font-bold ${themeConfig.text}`}>🌍 Global Sources</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {sources.map((source, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{source.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{source.source}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Financial Updates Section
const FinancialUpdatesSection = ({ dark, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  const markets = [
    { name: 'S&P 500', value: '4,567.89', change: '+1.2%', trend: 'up' },
    { name: 'NASDAQ', value: '14,234.56', change: '+0.8%', trend: 'up' },
    { name: 'DOW', value: '35,678.12', change: '-0.3%', trend: 'down' },
    { name: 'BTC/USD', value: '$43,567', change: '+2.1%', trend: 'up' },
    { name: 'EUR/USD', value: '1.0876', change: '+0.5%', trend: 'up' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${themeConfig.surface} backdrop-blur-sm rounded-3xl p-6 border ${themeConfig.border} shadow-2xl`}
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mr-3"></div>
        <h3 className={`text-xl font-bold ${themeConfig.text}`}>📈 Market Watch</h3>
      </div>
      <div className="space-y-3">
        {markets.map((market, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            <span className="font-medium text-gray-900 dark:text-white">{market.name}</span>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">{market.value}</span>
              <span className={`text-sm font-bold ${market.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {market.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Weather & Environment Section
const WeatherSection = ({ dark, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-br ${themeConfig.surface} backdrop-blur-sm rounded-3xl p-6 border ${themeConfig.border} shadow-2xl`}
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse mr-3"></div>
        <h3 className={`text-xl font-bold ${themeConfig.text}`}>🌤️ Weather & Climate</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">72°F</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">New York</div>
        </div>
        <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="text-3xl mb-2">🌍</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">415ppm</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Level</div>
        </div>
      </div>
    </motion.div>
  );
};

// Quick Actions Section
const QuickActionsSection = ({ dark, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  const actions = [
    { icon: '🔖', label: 'Bookmarks', color: themeConfig.primary },
    { icon: '📱', label: 'Mobile App', color: themeConfig.secondary },
    { icon: '⚙️', label: 'Settings', color: themeConfig.accent },
    { icon: '📊', label: 'Analytics', color: themeConfig.primary }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-br ${themeConfig.surface} backdrop-blur-sm rounded-3xl p-6 border ${themeConfig.border} shadow-2xl`}
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse mr-3"></div>
        <h3 className={`text-xl font-bold ${themeConfig.text}`}>⚡ Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 bg-gradient-to-r ${action.color} text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            <div className="text-2xl mb-1">{action.icon}</div>
            <div className="text-sm">{action.label}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

/*********************
  MAIN DASHBOARD LAYOUT
*********************/
const FuturisticDashboard = ({ articles, dark, theme = 'cyberpunk' }) => {
  const themeConfig = themes[theme];
  
  return (
    <div className="space-y-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Live Videos & Weather */}
        <div className="space-y-8">
          <LiveVideoSection dark={dark} theme={theme} />
          <WeatherSection dark={dark} theme={theme} />
        </div>

        {/* Center Column - Trending Topics & Quick Actions */}
        <div className="space-y-8">
          <TrendingTopicsSection dark={dark} theme={theme} />
          <QuickActionsSection dark={dark} theme={theme} />
        </div>

        {/* Right Column - International Sources & Financial */}
        <div className="space-y-8">
          <InternationalSourcesSection dark={dark} theme={theme} />
          <FinancialUpdatesSection dark={dark} theme={theme} />
        </div>
      </div>

      {/* Bottom Section - Recent News Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${themeConfig.surface} backdrop-blur-sm rounded-3xl p-6 border ${themeConfig.border} shadow-2xl`}
      >
        <div className="flex items-center mb-6">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse mr-3"></div>
          <h3 className={`text-2xl font-bold ${themeConfig.text}`}>📰 Latest Headlines</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 6).map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
              onClick={() => openInNewTab(article.url)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title || 'News thumbnail'}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={handleImageError}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm line-clamp-3 font-medium leading-tight">
                    {article.title}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-300 text-xs">{article.source?.name}</span>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                    >
                      →
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/*********************
  MAIN APP COMPONENT
*********************/
export default function App() {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [headlines, setHeadlines] = useState([]);
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('cyberpunk');

  // Fetch top headlines once on mount
  useEffect(() => {
    const fetchNews = async () => {
      if (!NEWS_API_KEY) {
        setError('Please configure your News API key in .env file');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const { data } = await axios.get(
          `https://newsapi.org/v2/top-headlines?sources=${SOURCES}&apiKey=${NEWS_API_KEY}`
        );
        
        const newsArticles = data.articles || [];
        setArticles(newsArticles);
        setFeatured(newsArticles[0] || null);
        setHeadlines(newsArticles.slice(0, 5));
      } catch (err) {
        console.error('News API Error:', err);
        setError('Failed to load news. Please check your API key and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim() || !NEWS_API_KEY) return;

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`
      );
      setSearchResults(data.articles || []);
    } catch (err) {
      console.error('Search Error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleDark = () => setDark(!dark);

  const displayArticles = searchResults || articles;
  const themeConfig = themes[theme];

  return (
    <div className={`min-h-screen ${themeConfig.background} text-white relative overflow-hidden`}>
      {/* Particle System Background */}
      <ParticleSystem theme={theme} count={30} />
      
      <Navbar onSearch={handleSearch} dark={dark} toggleDark={toggleDark} loading={loading} theme={theme} setTheme={setTheme} />
      
      <Ticker headlines={headlines} theme={theme} />
      
      <div className="flex relative z-10">
        <Sidebar dark={dark} activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
        
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ErrorMessage message={error} theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>

          {loading && !articles.length && <LoadingSpinner theme={theme} />}

          {!loading && !error && (
            <div className="space-y-12">
              {/* Home Tab - Futuristic Dashboard */}
              {activeTab === 'home' && (
                <>
                  {/* Featured Article */}
                  <section>
                    <Featured article={featured} theme={theme} />
                  </section>

                  {/* Futuristic Dashboard */}
                  <section>
                    <FuturisticDashboard articles={displayArticles} dark={dark} theme={theme} />
                  </section>
                </>
              )}

              {/* Videos Tab */}
              {activeTab === 'videos' && (
                <div className="space-y-8">
                  <section>
                    <h2 className={`text-2xl font-bold mb-6 ${themeConfig.text}`}>🎥 Search Videos</h2>
                    <YouTubeVideoSearch 
                      onVideoSelect={setSelectedVideo} 
                      dark={dark} 
                    />
                  </section>

                  <section>
                    <TrendingVideos dark={dark} />
                  </section>
                </div>
              )}

              {/* Live Streams Tab */}
              {activeTab === 'live' && (
                <section>
                  <LiveStreams dark={dark} />
                </section>
              )}

              {/* Other tabs can be added here */}
              {!['home', 'videos', 'live'].includes(activeTab) && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🚧</div>
                  <h2 className={`text-2xl font-bold mb-2 ${themeConfig.text}`}>Coming Soon!</h2>
                  <p className="text-gray-400">
                    The {activeTab} feature is under development. Stay tuned!
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </main>
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
} 