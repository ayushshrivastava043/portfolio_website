import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Ayush's AI Portfolio Assistant. I can help you learn about his projects, skills, and experience. What would you like to know? 🚀",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          config_name: 'ayush_porfolio'
        })
      });

      const result = await response.json();

      if (result.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: result.response,
          sender: 'bot',
          timestamp: new Date(),
          metadata: {
            useCase: result.use_case,
            variables: result.variables
          }
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble processing your request right now. Please try again.",
          sender: 'bot',
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting to my brain right now. Please check if the chatbot service is running.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="chatbot-toggle" onClick={toggleChat}>
        <div className="chatbot-avatar">
          <div className="avatar-icon">🤖</div>
          <div className="avatar-text">
            <div className="avatar-title">AI Assistant</div>
            <div className="avatar-subtitle">Ask me anything!</div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="header-content">
              <div className="header-title">
                <span className="header-icon">🚀</span>
                Ayush's AI Assistant
              </div>
              <div className="header-subtitle">Portfolio & Project Expert</div>
            </div>
            <button className="close-button" onClick={toggleChat}>
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
              >
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
                {message.metadata && (
                  <div className="message-metadata">
                    <div className="metadata-item">
                      <span className="metadata-label">Use Case:</span>
                      <span className="metadata-value">{message.metadata.useCase}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Ayush's projects, skills, or experience..."
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !inputValue.trim()}
              className="send-button"
            >
              {isLoading ? '⏳' : '🚀'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
