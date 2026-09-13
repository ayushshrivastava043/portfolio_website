# 🚀 Unified Server - Single Server Solution

## Overview

The **Unified Server** solves the port confusion problem by combining all server functionality into a single, configurable solution. Instead of having multiple server files with different ports, you now have one server that can handle all your needs.

## 🎯 Benefits

- ✅ **No Port Confusion**: All servers managed in one place
- ✅ **Easy Configuration**: Simple JSON config file
- ✅ **Multiple Server Types**: HTTP, WebSocket, AI Assistant support
- ✅ **Clear Status**: Real-time monitoring and statistics
- ✅ **Graceful Shutdown**: Clean process management
- ✅ **Conflict Resolution**: Automatic port conflict handling

## 📁 Files

- `unified-server.js` - Main unified server implementation
- `server-config.json` - Configuration file for enabling/disabling servers
- `start-unified.sh` - Launcher script
- `package.json` - Node.js dependencies and scripts

## 🚀 Quick Start

### 1. Start the Unified Server
```bash
# Option 1: Using the launcher script
./start-unified.sh

# Option 2: Using npm
npm start

# Option 3: Direct execution
node unified-server.js
```

### 2. Access Your Website
- **Main Website**: http://localhost:4000/
- **AI Assistant**: http://localhost:8000/ (if enabled)
- **WebSocket**: ws://localhost:8001/ (if enabled)
- **Simple Server**: http://localhost:8080/ (if enabled)

## ⚙️ Configuration

Edit `server-config.json` to enable/disable servers:

```json
{
  "servers": {
    "website": {
      "enabled": true,
      "port": 4000,
      "description": "Main website server"
    },
    "aiAssistant": {
      "enabled": false,
      "port": 8000,
      "description": "AI Assistant with WebSocket"
    },
    "websocket": {
      "enabled": false,
      "port": 8001,
      "description": "WebSocket-only server"
    },
    "simple": {
      "enabled": false,
      "port": 8080,
      "description": "Simple HTTP server"
    }
  }
}
```

## 🔧 Server Types

### 1. Website Server (Port 4000)
- **Purpose**: Main website serving
- **Features**: Static file serving, MIME type support, range requests
- **Use Case**: Your primary website

### 2. AI Assistant Server (Port 8000)
- **Purpose**: AI features with real-time capabilities
- **Features**: HTTP + WebSocket support, AI integration
- **Use Case**: AI-powered features, real-time updates

### 3. WebSocket Server (Port 8001)
- **Purpose**: Real-time communication only
- **Features**: WebSocket-only, lightweight
- **Use Case**: Live updates, real-time dashboards

### 4. Simple Server (Port 8080)
- **Purpose**: Alternative simple HTTP server
- **Features**: Basic file serving
- **Use Case**: Testing, development, Python alternative

## 📊 Monitoring

The unified server provides real-time status updates:

```
📊 Server Status:
================
✅ Main website server:
   Port: 4000
   Status: 🟢 Running
   Uptime: 120s
   Requests: 15
   Errors: 0

❌ AI Assistant with WebSocket support:
   Port: 8000
   Status: 🔴 Stopped

🌐 Total Requests: 15
🔌 Active Connections: 0
❌ Total Errors: 0
```

## 🛠️ Management Commands

### Start Different Servers
```bash
# Start unified server (default)
npm start

# Start old server
npm run server

# Start simple Python server
npm run simple
```

### Stop Server
```bash
# Graceful shutdown (Ctrl+C)
# Or kill by port
lsof -ti:4000 | xargs kill
```

### Check Status
```bash
# Check what's running on ports
lsof -i :4000
lsof -i :8000
lsof -i :8001
lsof -i :8080
```

## 🔄 Migration from Old Servers

### Before (Multiple Files)
- `server.js` → Port 4000
- `server-manager.js` → Port 4000
- `simple_server.py` → Port 8080
- `AI_Assistant/servers/server.py` → Port 8000/8001

### After (Unified)
- `unified-server.js` → All ports managed in one place
- `server-config.json` → Easy configuration
- `start-unified.sh` → Simple launcher

## 🎯 Use Cases

### Basic Website Development
```json
{
  "servers": {
    "website": { "enabled": true, "port": 4000 },
    "aiAssistant": { "enabled": false },
    "websocket": { "enabled": false },
    "simple": { "enabled": false }
  }
}
```

### AI Development with Real-time Features
```json
{
  "servers": {
    "website": { "enabled": true, "port": 4000 },
    "aiAssistant": { "enabled": true, "port": 8000 },
    "websocket": { "enabled": false },
    "simple": { "enabled": false }
  }
}
```

### Multiple Development Environments
```json
{
  "servers": {
    "website": { "enabled": true, "port": 4000 },
    "aiAssistant": { "enabled": false },
    "websocket": { "enabled": true, "port": 8001 },
    "simple": { "enabled": true, "port": 8080 }
  }
}
```

## 🚨 Troubleshooting

### Port Already in Use
The unified server automatically handles port conflicts by killing existing processes.

### WebSocket Not Working
Make sure the `ws` package is installed:
```bash
npm install ws
```

### Configuration Not Loading
Check that `server-config.json` exists and is valid JSON.

### Server Won't Start
Check Node.js version (requires 14+):
```bash
node --version
```

## 📈 Performance

- **Connection Tracking**: Monitors active connections
- **Request Statistics**: Tracks total requests and errors
- **Memory Efficient**: Only starts enabled servers
- **Graceful Shutdown**: Clean process termination

## 🔮 Future Enhancements

- [ ] HTTPS support
- [ ] Load balancing
- [ ] API rate limiting
- [ ] Logging to files
- [ ] Health check endpoints
- [ ] Docker support

---

**🎉 No more port confusion! One server to rule them all!** 