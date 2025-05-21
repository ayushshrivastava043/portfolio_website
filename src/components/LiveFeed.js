class LiveFeed {
    constructor() {
        this.ws = null;
        this.messageQueue = [];
        this.maxRetries = 5;
        this.retryCount = 0;
        this.retryInterval = 3000; // 3 seconds
        this.init();
    }

    init() {
        this.connect();
        this.setupEventListeners();
    }

    connect() {
        try {
            this.ws = new WebSocket('ws://localhost:8001');
            
            this.ws.onopen = () => {
                console.log('WebSocket connected');
                this.retryCount = 0;
                // Send any queued messages
                while (this.messageQueue.length > 0) {
                    const msg = this.messageQueue.shift();
                    this.send(msg);
                }
            };

            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                if (this.retryCount < this.maxRetries) {
                    setTimeout(() => {
                        this.retryCount++;
                        this.connect();
                    }, this.retryInterval);
                }
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.handleMessage(data);
                } catch (e) {
                    console.error('Error parsing message:', e);
                }
            };
        } catch (error) {
            console.error('Error connecting to WebSocket:', error);
        }
    }

    setupEventListeners() {
        // Add event listeners for user interactions
        document.addEventListener('DOMContentLoaded', () => {
            const chatInput = document.getElementById('chat-input');
            const sendButton = document.getElementById('send-button');

            if (chatInput && sendButton) {
                sendButton.addEventListener('click', () => {
                    const message = chatInput.value.trim();
                    if (message) {
                        this.send({ type: 'message', message });
                        chatInput.value = '';
                    }
                });

                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendButton.click();
                    }
                });
            }
        });
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            this.messageQueue.push(data);
        }
    }

    handleMessage(data) {
        const feedContainer = document.getElementById('feed-content');
        if (!feedContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        
        const timestamp = new Date(data.timestamp).toLocaleTimeString();
        messageElement.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            <span class="content">${data.message}</span>
        `;

        feedContainer.appendChild(messageElement);
        feedContainer.scrollTop = feedContainer.scrollHeight;
    }
}

// Initialize the LiveFeed
window.liveFeed = new LiveFeed(); 