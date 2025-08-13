// 🚀 Astronaut AI Assistant - Integration Script
class AstronautChatbot {
    constructor() {
        this.apiUrl = 'http://localhost:9999';
        this.sessionId = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.connectToServer();
    }

    createChatbotUI() {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'astronaut-chatbot-container';
        chatbotContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

        const avatar = document.createElement('div');
        avatar.className = 'astronaut-avatar';
        avatar.style.cssText = 'display: flex; align-items: center; gap: 15px; background: rgba(0, 0, 0, 0.8); padding: 15px 20px; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; border: 2px solid rgba(0, 255, 136, 0.3); backdrop-filter: blur(10px);';

        avatar.innerHTML = `
            <img src="assets/20250805-0220-Cheerful-Cartoon-unscreen.gif" alt="Astronaut AI Assistant" style="width:50px;height:50px;object-fit:cover;border:2px solid rgba(0,255,136,0.5);filter:drop-shadow(0 4px 8px rgba(0,255,255,0.3)) contrast(1.2) brightness(1.15) saturate(1.1); mix-blend-mode: screen; background: transparent; isolation: isolate; border-radius: 50%;">
            <div>
                <h3 style="margin:0;color:#00ff88;font-size:18px;font-weight:bold;">AI Assistant Hub</h3>
                <p style="margin:5px 0 0 0;color:#ccc;font-size:12px;">🚀 Ready to explore with you!</p>
            </div>
        `;

        const chatInterface = document.createElement('div');
        chatInterface.className = 'astronaut-chat-interface';
        chatInterface.id = 'astronaut-chat-interface';
        chatInterface.style.cssText = 'position: fixed; bottom: 100px; right: 20px; width: 400px; height: 500px; background: rgba(0, 0, 0, 0.95); border-radius: 20px; border: 2px solid rgba(0, 255, 136, 0.5); display: none; flex-direction: column; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px); z-index: 10001;';

        chatInterface.innerHTML = `
            <div class="chatbot-header" style="background: linear-gradient(45deg, #00ff88, #00ffff); color: #000; padding: 20px; text-align: center; font-weight: bold; font-size: 1.2rem; position: relative;">
                🤖 AI Assistant Hub
                <button class="chatbot-close" onclick="astronautChatbot.toggleChat()" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #000; font-size: 24px; cursor: pointer; font-weight: bold;">×</button>
            </div>
            <div class="chatbot-messages" id="astronaut-chat-messages" style="flex: 1; padding: 20px; overflow-y: auto; background: rgba(0, 0, 0, 0.8);">
                <div class="message bot" style="margin-bottom: 15px; padding: 12px 16px; border-radius: 15px; max-width: 80%; word-wrap: break-word; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(0, 255, 136, 0.3);">
                    Hello! I'm your AI assistant. How can I help you today? 🚀✨
                </div>
            </div>
            <div class="typing-indicator" id="astronaut-typing-indicator" style="display: none; padding: 12px 16px; background: rgba(255, 255, 255, 0.1); border-radius: 15px; color: #00ff88; font-style: italic;">AI is thinking</div>
            <div class="chatbot-input" style="padding: 20px; background: rgba(0, 0, 0, 0.9); border-top: 1px solid rgba(0, 255, 136, 0.3); display: flex; gap: 10px;">
                <input type="text" id="astronaut-chat-input" placeholder="Ask me anything..." onkeypress="astronautChatbot.handleKeyPress(event)" style="flex: 1; padding: 12px 16px; border: 1px solid rgba(0, 255, 136, 0.5); border-radius: 25px; background: rgba(0, 0, 0, 0.8); color: white; outline: none; font-size: 14px;">
                <button onclick="astronautChatbot.sendMessage()" style="padding: 12px 20px; background: linear-gradient(45deg, #00ff88, #00ffff); color: #000; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s ease;">Send</button>
            </div>
        `;

        avatar.addEventListener('mouseenter', () => {
            avatar.style.transform = 'scale(1.05)';
            avatar.style.borderColor = 'rgba(0, 255, 136, 0.8)';
            avatar.style.boxShadow = '0 5px 20px rgba(0, 255, 136, 0.3)';
        });

        avatar.addEventListener('mouseleave', () => {
            avatar.style.transform = 'scale(1)';
            avatar.style.borderColor = 'rgba(0, 255, 136, 0.3)';
            avatar.style.boxShadow = 'none';
        });

        avatar.addEventListener('click', () => {
            this.toggleChat();
        });

        chatbotContainer.appendChild(avatar);
        document.body.appendChild(chatbotContainer);
        document.body.appendChild(chatInterface);
        this.addWelcomeMessage();
    }

    async connectToServer() {
        try {
            const response = await fetch(`${this.apiUrl}/health`);
            const data = await response.json();
            const avatar = document.querySelector('.astronaut-avatar p');
            if (data.status === 'healthy') {
                avatar.textContent = ' Connected & Ready!';
                avatar.style.color = '#00ff88';
            } else {
                avatar.textContent = '⚠️ Connecting...';
                avatar.style.color = '#ffaa00';
            }
        } catch (error) {
            const avatar = document.querySelector('.astronaut-avatar p');
            avatar.textContent = '❌ Server Offline';
            avatar.style.color = '#ff4444';
        }
    }

    addWelcomeMessage() {
        const messagesContainer = document.getElementById('astronaut-chat-messages');
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message bot';
        welcomeDiv.style.cssText = 'margin-bottom: 15px; padding: 12px 16px; border-radius: 15px; max-width: 80%; word-wrap: break-word; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(0, 255, 136, 0.3);';
        welcomeDiv.innerHTML = '<strong>Welcome! 🚀</strong><br><br>I can help you learn about:<br>• <strong>Projects:</strong> FinBot AI, API Engine, AI Video Series, and more<br>• <strong>Skills:</strong> AI/ML, Financial Tech, Data Analytics, IoT<br>• <strong>Contact:</strong> Email, WhatsApp, Portfolio details<br><br>Just ask me anything!';
        messagesContainer.appendChild(welcomeDiv);
    }

    async sendMessage() {
        const input = document.getElementById('astronaut-chat-input');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';
        this.showTypingIndicator();

        try {
            const response = await fetch(`${this.apiUrl}/api/chat`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: message, session_id: this.sessionId})
            });

            const data = await response.json();
            if (data.session_id) this.sessionId = data.session_id;
            this.hideTypingIndicator();
            this.addMessage(data.response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I'm having trouble connecting. Please try again.', 'bot');
        }
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('astronaut-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        if (type === 'user') {
            messageDiv.style.cssText = 'margin-bottom: 15px; padding: 12px 16px; border-radius: 15px; max-width: 80%; word-wrap: break-word; background: linear-gradient(45deg, #00ff88, #00ffff); color: #000; margin-left: auto; text-align: right;';
        } else {
            messageDiv.style.cssText = 'margin-bottom: 15px; padding: 12px 16px; border-radius: 15px; max-width: 80%; word-wrap: break-word; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(0, 255, 136, 0.3);';
        }
        
        messageDiv.textContent = content;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const indicator = document.getElementById('astronaut-typing-indicator');
        indicator.style.display = 'block';
        const messagesContainer = document.getElementById('astronaut-chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('astronaut-typing-indicator');
        indicator.style.display = 'none';
    }

    toggleChat() {
        const interface = document.getElementById('astronaut-chat-interface');
        const avatar = document.querySelector('.astronaut-avatar');
        
        if (interface.style.display === 'flex') {
            interface.style.display = 'none';
            avatar.style.transform = 'scale(1)';
        } else {
            interface.style.display = 'flex';
            avatar.style.transform = 'scale(1.05)';
            document.getElementById('astronaut-chat-input').focus();
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }
}

let astronautChatbot;
document.addEventListener('DOMContentLoaded', () => {
    astronautChatbot = new AstronautChatbot();
});
window.astronautChatbot = astronautChatbot;
