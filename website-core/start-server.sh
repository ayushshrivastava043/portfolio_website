#!/bin/bash

# Website Server Launcher
# This script starts the unified server from the organized directory structure

echo "🚀 Website Server Launcher"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "../server/unified-server.js" ]; then
    echo "❌ Error: ../server/unified-server.js not found!"
    echo "Please run this script from the website-core directory"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed or not in PATH"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Error: Node.js version 14 or higher is required"
    echo "Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if configuration file exists
if [ ! -f "../server/server-config.json" ]; then
    echo "⚠️  Warning: ../server/server-config.json not found, using default configuration"
fi

# Display configuration
echo ""
echo "📋 Server Configuration:"
if [ -f "../server/server-config.json" ]; then
    echo "   Using: ../server/server-config.json"
    # Display enabled servers
    node -e "
    const config = JSON.parse(require('fs').readFileSync('../server/server-config.json'));
    Object.entries(config.servers).forEach(([key, server]) => {
        const status = server.enabled ? '✅' : '❌';
        console.log(\`   \${status} \${server.description}: Port \${server.port}\`);
    });
    "
else
    echo "   Using: Default configuration (website server on port 4000)"
fi

echo ""
echo "🌐 Starting Unified Server..."
echo "📁 Working directory: $(pwd)"
echo "📄 Main file: $(pwd)/index.html"
echo ""

# Run the unified server
node ../server/unified-server.js

# If we get here, the server has stopped
echo ""
echo "🛑 Server has stopped" 