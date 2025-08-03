import axios from 'axios';

const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const SOURCES = 'bbc-news,reuters,cnn';

export const fetchTopHeadlines = async () => {
  if (!NEWS_API_KEY) throw new Error('Missing News API key');
  const url = `https://newsapi.org/v2/top-headlines?sources=${SOURCES}&apiKey=${NEWS_API_KEY}`;
  const { data } = await axios.get(url);
  return data.articles || [];
};

export const searchNews = async (query) => {
  if (!NEWS_API_KEY) throw new Error('Missing News API key');
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`;
  const { data } = await axios.get(url);
  return data.articles || [];
}; 