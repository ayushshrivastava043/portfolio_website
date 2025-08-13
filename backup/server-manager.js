#!/usr/bin/env node

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const net = require('net');
const { EventEmitter } = require('events');

// Comprehensive Server Management System
class ServerManager extends EventEmitter {
    constructor() {
        super();
        this.servers = new Map();
        this.ports = new Set();
        this.connections = new Map();
        this.config = {
            defaultPort: 4000,
            maxConnections: 100,
            timeout: 30000,
            keepAlive: true,
            compression: true
        };
        this.stats = {
            totalRequests: 0,
            activeConnections: 0,
            errors: 0,
            startTime: Date.now()
        };
    }

    // Initialize the server manager
    async init() {
        console.log('🚀 Initializing Comprehensive Server Manager...');
        
        // Check for existing processes
        await this.killConflictingProcesses();
        
        // Setup graceful shutdown
        this.setupGracefulShutdown();
        
        // Start the main server
        await this.startMainServer();
        
        console.log('✅ Server Manager initialized successfully!');
    }

    // Kill any conflicting processes
    async killConflictingProcesses() {
        const { exec } = require('child_process');
        const util = require('util');
        const execAsync = util.promisify(exec);

        const portsToCheck = [3000, 4000, 5000, 8000, 8080, 9000];
        
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

    // Start the main server
    async startMainServer() {
        const port = this.config.defaultPort;
        
        if (await this.isPortAvailable(port)) {
            const server = http.createServer((req, res) => {
                this.handleRequest(req, res);
            });

            // Configure server
            server.maxConnections = this.config.maxConnections;
            server.keepAliveTimeout = this.config.timeout;
            server.headersTimeout = this.config.timeout;

            // Setup connection tracking
            server.on('connection', (socket) => {
                this.trackConnection(socket);
            });

            server.on('error', (err) => {
                this.handleServerError(err);
            });

            // Start server
            server.listen(port, () => {
                this.servers.set('main', server);
                this.ports.add(port);
                
                console.log(`🌐 Main server running at http://localhost:${port}/`);
                console.log(`📁 Serving files from: ${process.cwd()}`);
                console.log(`📄 Main file: ${path.join(process.cwd(), 'index.html')}`);
                console.log(`🔧 Server Manager active - monitoring connections and ports`);
                
                this.emit('serverStarted', { port, type: 'main' });
            });

        } else {
            console.error(`❌ Port ${port} is not available`);
            process.exit(1);
        }
    }

    // Handle incoming requests
    handleRequest(req, res) {
        this.stats.totalRequests++;
        
        // Add CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Parse URL
        let url = req.url;
        if (url === '/') {
            url = '/index.html';
        }

        // Security: Prevent directory traversal
        if (url.includes('..')) {
            this.sendError(res, 403, 'Forbidden');
            return;
        }

        // Get file path
        const filePath = path.join(process.cwd(), url);
        
        // Check if file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
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
        
        // Handle range requests for video/audio
        if (contentType.startsWith('video/') || contentType.startsWith('audio/')) {
            this.handleRangeRequest(req, res, filePath, stats);
            return;
        }

        // Stream the file
        const stream = fs.createReadStream(filePath);
        
        stream.on('error', (err) => {
            console.error(`Error streaming file: ${err.message}`);
            this.sendError(res, 500, 'Error reading file');
        });

        stream.pipe(res);
    }

    // Handle range requests for media files
    handleRangeRequest(req, res, filePath, stats) {
        const range = req.headers.range;
        
        if (!range) {
            // No range requested, send full file
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
            return;
        }

        const parts = range.replace(/bytes=/, '').split('-');
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
    trackConnection(socket) {
        const connectionId = Date.now() + Math.random();
        this.connections.set(connectionId, {
            socket,
            startTime: Date.now(),
            remoteAddress: socket.remoteAddress,
            remotePort: socket.remotePort
        });

        this.stats.activeConnections++;

        socket.on('close', () => {
            this.connections.delete(connectionId);
            this.stats.activeConnections--;
        });

        socket.on('error', (err) => {
            console.error(`Socket error: ${err.message}`);
            this.stats.errors++;
        });

        // Set timeout
        socket.setTimeout(this.config.timeout);
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
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><title>Error ${statusCode}</title></head>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                    <h1>Error ${statusCode}</h1>
                    <p>${message}</p>
                    <p><a href="/">Go back to homepage</a></p>
                </body>
            </html>
        `);
    }

    // Handle server errors
    handleServerError(err) {
        console.error(`Server error: ${err.message}`);
        this.stats.errors++;
        this.emit('serverError', err);
    }

    // Setup graceful shutdown
    setupGracefulShutdown() {
        const shutdown = (signal) => {
            console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
            
            // Close all servers
            for (const [name, server] of this.servers) {
                server.close(() => {
                    console.log(`✅ ${name} server closed`);
                });
            }
            
            // Close all connections
            for (const [id, connection] of this.connections) {
                connection.socket.destroy();
            }
            
            // Log final stats
            const uptime = Date.now() - this.stats.startTime;
            console.log(`📊 Final Stats:`);
            console.log(`   Total Requests: ${this.stats.totalRequests}`);
            console.log(`   Uptime: ${Math.round(uptime / 1000)}s`);
            console.log(`   Errors: ${this.stats.errors}`);
            
            process.exit(0);
        };

        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));
    }

    // Get server status
    getStatus() {
        return {
            servers: Array.from(this.servers.keys()),
            ports: Array.from(this.ports),
            activeConnections: this.stats.activeConnections,
            totalRequests: this.stats.totalRequests,
            errors: this.stats.errors,
            uptime: Date.now() - this.stats.startTime
        };
    }

    // Health check endpoint
    healthCheck(req, res) {
        const status = this.getStatus();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(status, null, 2));
    }
}

// Start the server manager
const serverManager = new ServerManager();

serverManager.init().catch(err => {
    console.error('Failed to initialize server manager:', err);
    process.exit(1);
});

// Export for potential use in other modules
module.exports = serverManager; 