/**
 * Chatbot API config — auto-detects local vs GitHub Pages production.
 * After deploying chatbot-api/ to Render, set productionApiUrl below.
 */
(function () {
    'use strict';

    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    // Update this URL after deploying chatbot-api/ to Render/Railway
    const productionApiUrl = 'https://portfolio-chatbot-api-slev.onrender.com/chat';

    window.CHATBOT_CONFIG = {
        apiUrl: isLocal ? 'http://localhost:4010/chat' : productionApiUrl,
        knowledgeBaseUrl: 'assets/data/knowledge_base.json',
        useLocalFallback: true,
    };
})();
