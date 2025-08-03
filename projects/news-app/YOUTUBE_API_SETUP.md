# YouTube API Setup Guide

## 🎬 **Enhanced Video Features Added!**

Your NewsFlux application now includes:
- ✅ **YouTube Video Search** with categories
- ✅ **Live Stream Integration** 
- ✅ **Trending Videos** section
- ✅ **Video Player** with full controls
- ✅ **Video Categories** (News, Tech, Sports, etc.)

## 🔑 **Getting Your YouTube API Key**

### **Step 1: Google Cloud Console**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select existing one

### **Step 2: Enable YouTube Data API**
1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. Search for **"YouTube Data API v3"**
3. Click on it and press **"Enable"**

### **Step 3: Create API Key**
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy your new API key

### **Step 4: Add to Your App**
```bash
# Edit your .env file
nano .env
```

Add your YouTube API key:
```env
VITE_NEWS_API_KEY=6726647a1ce74d6ea36797682e240249
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

### **Step 5: Restart Server**
```bash
npm run dev
```

## 🎯 **New Features Available**

### **📰 News Tab**
- Original news functionality
- Featured stories
- Regional news
- Trending articles

### **🎥 Videos Tab**
- **Search Videos**: Search YouTube by category
- **Video Categories**: News, Tech, Sports, Entertainment, Science, Business
- **Trending Videos**: Most popular videos on YouTube
- **Video Player**: Full-screen modal player

### **🔴 Live Streams Tab**
- **CNN Live**: Real-time news stream
- **BBC News Live**: International coverage
- **TechCrunch Live**: Technology updates
- **ESPN Live**: Sports coverage

## 🚀 **How to Use Video Features**

### **Searching Videos**
1. Click **"🎥 Videos"** tab
2. Type your search query (e.g., "AI news")
3. Select a category (News, Tech, etc.)
4. Click **"Search"**
5. Click any video to watch

### **Watching Live Streams**
1. Click **"🔴 Live Streams"** tab
2. Choose a live stream
3. Click to open full-screen player
4. Use player controls

### **Trending Videos**
- Automatically loads most popular videos
- Click any video to watch
- Shows view counts and durations

## 📊 **API Quotas & Limits**

### **YouTube Data API v3**
- **Free Tier**: 10,000 units per day
- **Search**: 100 units per request
- **Video Details**: 1 unit per request
- **Trending**: 1 unit per request

### **Usage Tips**
- Each search uses ~101 units (search + video details)
- You can make ~99 searches per day on free tier
- Perfect for development and small projects

## 🛠️ **Troubleshooting**

### **"API key not configured" for videos**
- Make sure you added `VITE_YOUTUBE_API_KEY` to `.env`
- Restart the development server
- Check that the key is correct

### **"Quota exceeded" error**
- You've reached your daily limit
- Wait until tomorrow or upgrade to paid plan
- Check your usage in Google Cloud Console

### **Videos not loading**
- Check your internet connection
- Verify API key is enabled for YouTube Data API v3
- Check browser console for errors

## 🎨 **Customization**

### **Adding More Categories**
Edit `VIDEO_CATEGORIES` in `src/components/VideoComponents.jsx`:
```javascript
const VIDEO_CATEGORIES = [
  { id: 'news', label: 'News', icon: '📰', color: 'bg-blue-600' },
  { id: 'technology', label: 'Technology', icon: '💻', color: 'bg-purple-600' },
  // Add your own categories here
];
```

### **Adding More Live Streams**
Edit `LIVE_STREAMS` array:
```javascript
const LIVE_STREAMS = [
  {
    id: 'your-stream',
    title: 'Your Stream',
    url: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    thumbnail: 'thumbnail_url',
    viewers: '1.5M'
  }
];
```

## 🎉 **Your Enhanced NewsFlux App**

Now you have a **complete multimedia news platform** with:
- 📰 **Text News** from News API
- 🎥 **Video Content** from YouTube
- 🔴 **Live Streams** for real-time updates
- 🔍 **Smart Search** for both articles and videos
- 📱 **Responsive Design** for all devices

**Enjoy your enhanced NewsFlux experience!** 🚀 