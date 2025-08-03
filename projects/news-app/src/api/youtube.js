import axios from 'axios';

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

export const searchYouTubeVideos = async (query, category = 'news') => {
  if (!YOUTUBE_API_KEY) throw new Error('Missing YouTube API key');
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' ' + category)}&type=video&maxResults=12&key=${YOUTUBE_API_KEY}`;
  const { data } = await axios.get(searchUrl);
  const videoIds = data.items.map(item => item.id.videoId).join(',');
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
  const { data: videoDetails } = await axios.get(detailsUrl);
  return videoDetails.items || [];
}; 