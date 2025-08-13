#!/usr/bin/env node

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const net = require('net');
const { EventEmitter } = require('events');

// Check if WebSocket is available
let WebSocket;
try {
    WebSocket = require('ws');
} catch (err) {
    console.log('⚠️  WebSocket module not found. WebSocket features will be disabled.');
    console.log('   To enable WebSocket features, run: npm install ws');
}

// Unified Server Configuration
const CONFIG = {
    // Main website server
    website: {
        port: 4000,
        enabled: true,
        description: "Main website server"
    },
    // AI Assistant server (HTTP + WebSocket)
    aiAssistant: {
        port: 8000,
        enabled: false,
        description: "AI Assistant with WebSocket support"
    },
    // WebSocket only server
    websocket: {
        port: 8001,
        enabled: false,
        description: "WebSocket server for real-time updates"
    },
    // Alternative simple server
    simple: {
        port: 8080,
        enabled: false,
        description: "Simple HTTP server (Python alternative)"
    },
    // Global settings
    global: {
        maxConnections: 100,
        timeout: 30000,
        keepAlive: true,
        compression: true,
        cors: true
    }
};

// Try to load config from file if it exists
try {
    const configPath = path.join(__dirname, 'server-config.json');
    if (fs.existsSync(configPath)) {
        const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (fileConfig.servers) {
            Object.assign(CONFIG, fileConfig);
        }
    }
} catch (err) {
    console.log('⚠️  Could not load server-config.json, using default configuration');
}

// Unified Server Manager
class UnifiedServer extends EventEmitter {
    constructor() {
        super();
        this.servers = new Map();
        this.websocketServers = new Map();
        this.connections = new Map();
        this.stats = {
            totalRequests: 0,
            activeConnections: 0,
            errors: 0,
            startTime: Date.now(),
            servers: {}
        };
        
        // Initialize stats for each server type
        Object.keys(CONFIG).forEach(key => {
            if (key !== 'global') {
                this.stats.servers[key] = {
                    requests: 0,
                    errors: 0,
                    startTime: null
                };
            }
        });
    }

    // Initialize the unified server
    async init() {
        console.log('🚀 Initializing Unified Server...');
        console.log('📋 Configuration:');
        
        // Display configuration
        Object.entries(CONFIG).forEach(([key, config]) => {
            if (key !== 'global') {
                const status = config.enabled ? '✅' : '❌';
                console.log(`   ${status} ${config.description}: Port ${config.port}`);
            }
        });
        
        // Check for existing processes
        await this.killConflictingProcesses();
        
        // Setup graceful shutdown
        this.setupGracefulShutdown();
        
        // Start enabled servers
        await this.startEnabledServers();
        
        console.log('✅ Unified Server initialized successfully!');
        this.displayStatus();
    }

    // Kill any conflicting processes
    async killConflictingProcesses() {
        const { exec } = require('child_process');
        const util = require('util');
        const execAsync = util.promisify(exec);

        const portsToCheck = Object.values(CONFIG)
            .filter(config => config.port && config.enabled)
            .map(config => config.port);
        
        console.log('🔧 Checking for conflicting processes...');
        
        for (const port of portsToCheck) {
            try {
                const { stdout } = await execAsync(`lsof -ti:${port}`);
                if (stdout.trim()) {
                    const pids = stdout.trim().split('\n');
                    for (const pid of pids) {
                        try {
                            await execAsync(`kill -9 ${pid}`);
                            console.log(`🔪 Killed process ${pid} on port ${port}`);
                        } catch (err) {
                            console.log(`⚠️  Could not kill process ${pid}: ${err.message}`);
                        }
                    }
                }
            } catch (err) {
                // Port is free, which is good
            }
        }
    }

    // Start all enabled servers
    async startEnabledServers() {
        const startPromises = [];

        if (CONFIG.website.enabled) {
            startPromises.push(this.startWebsiteServer());
        }

        if (CONFIG.aiAssistant.enabled && WebSocket) {
            startPromises.push(this.startAIAssistantServer());
        }

        if (CONFIG.websocket.enabled && WebSocket) {
            startPromises.push(this.startWebSocketServer());
        }

        if (CONFIG.simple.enabled) {
            startPromises.push(this.startSimpleServer());
        }

        await Promise.all(startPromises);
    }

    // Start main website server
    async startWebsiteServer() {
        const config = CONFIG.website;
        
        if (await this.isPortAvailable(config.port)) {
            const server = http.createServer((req, res) => {
                this.handleWebsiteRequest(req, res);
            });

            // Configure server
            server.maxConnections = CONFIG.global.maxConnections;
            server.keepAliveTimeout = CONFIG.global.timeout;
            server.headersTimeout = CONFIG.global.timeout;

            // Setup connection tracking
            server.on('connection', (socket) => {
                this.trackConnection(socket, 'website');
            });

            server.on('error', (err) => {
                this.handleServerError(err, 'website');
            });

            // Start server
            server.listen(config.port, () => {
                this.servers.set('website', server);
                this.stats.servers.website.startTime = Date.now();
                
                console.log(`🌐 Website server running at http://localhost:${config.port}/`);
                console.log(`📁 Serving files from: ${path.resolve('../website-core')}`);
                console.log(`📄 Main file: ${path.resolve('../website-core/index.html')}`);
                
                this.emit('serverStarted', { port: config.port, type: 'website' });
            });

        } else {
            console.error(`❌ Port ${config.port} is not available for website server`);
        }
    }

    // Handle website requests
    handleWebsiteRequest(req, res) {
        this.stats.totalRequests++;
        this.stats.servers.website.requests++;
        
        // Add CORS headers if enabled
        if (CONFIG.global.cors) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Parse URL and decode it properly
        let url = decodeURIComponent(req.url);
        


        if (url === '/') {
            url = '/index.html';
        }

        // Security: Prevent directory traversal
        if (url.includes('..')) {
            this.sendError(res, 403, 'Forbidden');
            return;
        }

        // Get file path - look in website-core directory
        const websiteCoreDir = path.resolve(__dirname, '../website-core');
        let filePath = path.join(websiteCoreDir, url);
        
        // If file not found in website-core, try other directories
        if (!fs.existsSync(filePath)) {
            // Try assets directory
            if (url.startsWith('/assets/')) {
                filePath = path.resolve(__dirname, '..', url.substring(1));
            }
            // Try projects directory
            else if (url.startsWith('/projects/')) {
                filePath = path.resolve(__dirname, '..', url.substring(1));
            }
            // Try tools directory
            else if (url.startsWith('/tools/')) {
                filePath = path.resolve(__dirname, '..', url.substring(1));
            }
            // Try pages directory
            else if (url.startsWith('/pages/')) {
                filePath = path.resolve(__dirname, '..', url.substring(1));
            }
        }
        
        // Check if file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.log(`File not found: ${filePath}`);
                this.sendError(res, 404, 'File not found');
                return;
            }

            // Get file stats
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    this.sendError(res, 500, 'Internal server error');
                    return;
                }

                // Check if it's a directory
                if (stats.isDirectory()) {
                    this.sendError(res, 403, 'Directory access not allowed');
                    return;
                }

                // Serve the file
                this.serveFile(req, res, filePath, stats);
            });
        });
    }



    // Serve a file with proper headers
    serveFile(req, res, filePath, stats) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/wav',
            '.pdf': 'application/pdf',
            '.txt': 'text/plain'
        };

        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        // Set headers
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', stats.size);
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
        res.setHeader('Cache-Control', 'public, max-age=3600');

        // Handle range requests for large files
        const range = req.headers.range;
        if (range && stats.size > 0) {
            this.handleRangeRequest(req, res, filePath, stats);
            return;
        }

        // Stream the file
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

        stream.on('error', (err) => {
            console.error('Error streaming file:', err);
            if (!res.headersSent) {
                this.sendError(res, 500, 'Error reading file');
            }
        });
    }

    // Handle range requests
    handleRangeRequest(req, res, filePath, stats) {
        const range = req.headers.range;
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
        const chunksize = (end - start) + 1;

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${stats.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize
        });

        const stream = fs.createReadStream(filePath, { start, end });
        stream.pipe(res);
    }

    // Track connections
    trackConnection(socket, serverType) {
        const connectionId = `${serverType}-${Date.now()}-${Math.random()}`;
        this.connections.set(connectionId, { socket, serverType, startTime: Date.now() });
        this.stats.activeConnections++;

        socket.on('close', () => {
            this.connections.delete(connectionId);
            this.stats.activeConnections--;
        });
    }

    // Check if port is available
    async isPortAvailable(port) {
        return new Promise((resolve) => {
            const server = net.createServer();
            server.listen(port, () => {
                server.close();
                resolve(true);
            });
            server.on('error', () => {
                resolve(false);
            });
        });
    }

    // Send error response
    sendError(res, statusCode, message) {
        this.stats.errors++;
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(`<h1>${statusCode} - ${message}</h1>`);
    }

    // Handle server errors
    handleServerError(err, serverType) {
        console.error(`Server error on ${serverType}:`, err);
        this.stats.errors++;
        this.stats.servers[serverType].errors++;
    }

    // Setup graceful shutdown
    setupGracefulShutdown() {
        const shutdown = (signal) => {
            console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
            
            // Close all servers
            this.servers.forEach((server, name) => {
                console.log(`🔒 Closing ${name} server...`);
                server.close();
            });

            // Close all WebSocket servers
            this.websocketServers.forEach((wss, name) => {
                console.log(`🔒 Closing ${name} WebSocket server...`);
                wss.close();
            });

            // Close all connections
            this.connections.forEach((conn, id) => {
                console.log(`🔒 Closing connection ${id}...`);
                conn.socket.destroy();
            });

            console.log('✅ All servers and connections closed.');
            process.exit(0);
        };

        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));
    }

    // Display server status
    displayStatus() {
        console.log('\n📊 Server Status:');
        console.log('================');
        
        Object.entries(CONFIG).forEach(([key, config]) => {
            if (key !== 'global') {
                const status = config.enabled ? '✅' : '❌';
                const server = this.servers.get(key);
                const wss = this.websocketServers.get(key);
                const isRunning = server || wss;
                const runningStatus = isRunning ? '🟢 Running' : '🔴 Stopped';
                
                console.log(`${status} ${config.description}:`);
                console.log(`   Port: ${config.port}`);
                console.log(`   Status: ${runningStatus}`);
                
                if (this.stats.servers[key]) {
                    const stats = this.stats.servers[key];
                    if (stats.startTime) {
                        const uptime = Math.floor((Date.now() - stats.startTime) / 1000);
                        console.log(`   Uptime: ${uptime}s`);
                        console.log(`   Requests: ${stats.requests}`);
                        console.log(`   Errors: ${stats.errors}`);
                    }
                }
                console.log('');
            }
        });
        
        console.log(`🌐 Total Requests: ${this.stats.totalRequests}`);
        console.log(`🔌 Active Connections: ${this.stats.activeConnections}`);
        console.log(`❌ Total Errors: ${this.stats.errors}`);
    }
}

// Main execution
async function main() {
    const server = new UnifiedServer();
    
    try {
        await server.init();
        
        // Display status every 30 seconds
        setInterval(() => {
            server.displayStatus();
        }, 30000);
        
    } catch (error) {
        console.error('❌ Failed to start unified server:', error);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { UnifiedServer, CONFIG }; 