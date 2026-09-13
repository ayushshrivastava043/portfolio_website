/**
 * Chatbot API config — local KB agent is primary (correct Verifast/CGI/MBA facts).
 * Public Render API has historically served a STALE knowledge base; only use it
 * as optional grounded polish when explicitly enabled.
 */
(function () {
  'use strict';

  var isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  var productionApiUrl = 'https://portfolio-chatbot-api-slev.onrender.com/chat';

  window.CHATBOT_CONFIG = {
    apiUrl: isLocal ? 'http://localhost:4010/chat' : productionApiUrl,
    knowledgeBaseUrl: 'assets/data/knowledge_base.json',
    useLocalFallback: true,
    // Keep false until Render is redeployed with the current knowledge_base.json
    useApiForChat: false,
    // If true later: low-confidence local answers may call API with grounded context
    allowGroundedApiPolish: false,
  };
})();
