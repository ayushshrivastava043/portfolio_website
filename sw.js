// Service Worker for caching chatbot assets
const CACHE_NAME = 'chatbot-cache-v2';
const urlsToCache = [
  'assets/20250821-1758-Relaxed-Chatbot--unscreen-ezgif.com-apng-to-gif-converter.gif',
  'assets/js/chatbot-widget.js',
  'assets/css/style.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🚀 [SW] Caching chatbot assets...');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  // Never cache versioned widget scripts — always fetch latest
  if (url.includes('enhanced-chatbot-widget') || url.includes('chatbot-config')) {
    return;
  }
  if (url.includes('chatbot') || url.includes('gif')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('🚀 [SW] Serving from cache:', event.request.url);
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});
