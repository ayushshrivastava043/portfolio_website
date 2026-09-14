/**
 * Chatbot config — answers come from embedded/local portfolio KB only.
 * Do NOT use the public Render API until it is redeployed with current KB.
 */
(function () {
  'use strict';

  window.CHATBOT_CONFIG = {
    apiUrl: null,
    knowledgeBaseUrl: 'assets/data/knowledge_base.json?v=103',
    useLocalFallback: true,
    useApiForChat: false,
    allowGroundedApiPolish: false,
  };
})();
