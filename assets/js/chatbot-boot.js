/**
 * Chatbot widget bootstrap — shared across portal pages.
 * Requires: chatbot-config.js, chatbot-brain.js, enhanced-chatbot-widget-fixed.js
 */
(function () {
  'use strict';

  /** Resolve asset paths from this script’s location (works on GitHub Pages). */
  function assetUrl(path) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('chatbot-boot.js') !== -1) {
        return src.replace(/assets\/js\/chatbot-boot\.js.*$/, '') + path.replace(/^\//, '');
      }
    }
    return path;
  }

  function initializeEnhancedChatbot() {
    if (typeof EnhancedAgenticChatbotWidget === 'undefined') {
      setTimeout(initializeEnhancedChatbot, 100);
      return;
    }

    // Animated GIF is the known-good avatar (WebP looked broken in the floating widget).
    var avatarPrimary = assetUrl('assets/relaxed-chatbot-final.gif');
    var avatarFallback = assetUrl(
      'assets/20250821-1758-Relaxed-Chatbot--unscreen-ezgif.com-apng-to-gif-converter.gif'
    );

    window.enhancedChatbotWidget = new EnhancedAgenticChatbotWidget({
      avatarType: 'assistant',
      avatarName: "Ayush's AI Assistant",
      avatarImage: avatarPrimary,
      avatarFallback: avatarFallback,
      avatarColor: '#00ffee',
      welcomeMessage:
        "Hello! I'm Ayush's AI Assistant. Ask about Verifast, CGI, Durham MBA consulting, or technical projects.",
      placeholderText: 'Type your message...',
      position: 'bottom-left',
      offsetX: 96,
      offsetY: 20,
      theme: 'dark',
      enableLangGraph: true,
      showWorkflowSteps: true,
      showConfidenceScore: true,
      showSuggestedActions: true,
      enableStatePersistence: true,
      enableMultiAgent: true,
      enableFeedbackLoops: true,
      enhancedEndpoint: null,
      fallbackEndpoint: null,
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
