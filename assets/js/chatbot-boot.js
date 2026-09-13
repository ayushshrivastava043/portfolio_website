/**
 * Chatbot widget bootstrap — shared across portal pages.
 * Requires: chatbot-config.js, chatbot-brain.js, enhanced-chatbot-widget-fixed.js
 */
(function () {
  'use strict';

  function initializeEnhancedChatbot() {
    if (typeof EnhancedAgenticChatbotWidget === 'undefined') {
      setTimeout(initializeEnhancedChatbot, 100);
      return;
    }

    window.enhancedChatbotWidget = new EnhancedAgenticChatbotWidget({
      avatarType: 'assistant',
      avatarName: "Ayush's AI Assistant",
      avatarImage: 'assets/chatbot-avatar-optimized.webp',
      avatarColor: '#00ffee',
      welcomeMessage:
        "Hello! I'm Ayush's AI Assistant. Ask about Verifast, CGI, Durham MBA consulting, or technical projects.",
      placeholderText: 'Type your message...',
      position: 'bottom-right',
      offsetX: 120,
      offsetY: 20,
      theme: 'dark',
      enableLangGraph: true,
      showWorkflowSteps: true,
      showConfidenceScore: true,
      showSuggestedActions: true,
      enableStatePersistence: true,
      enableMultiAgent: true,
      enableFeedbackLoops: true,
      enhancedEndpoint: window.CHATBOT_CONFIG
        ? window.CHATBOT_CONFIG.apiUrl
        : 'http://localhost:4010/chat',
      fallbackEndpoint: window.CHATBOT_CONFIG
        ? window.CHATBOT_CONFIG.apiUrl
        : 'http://localhost:4010/chat',
      widgetSize: { width: 400, height: 600 },
      enableAnimations: true,
      enableTypingIndicator: true,
      enableSound: false,
      maxMessages: 50,
      messageTimeout: 30000,
      workflowTimeout: 30000,
      retryAttempts: 3,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedChatbot);
  } else {
    initializeEnhancedChatbot();
  }
})();
