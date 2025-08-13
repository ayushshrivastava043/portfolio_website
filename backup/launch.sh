#!/bin/bash

# Universal Server Launcher
# This script can be run from anywhere to start the server

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Universal Server Launcher"
echo "📁 Target directory: $SCRIPT_DIR"
echo ""

# Change to the website directory
cd "$SCRIPT_DIR"

# Check if we're in the right place
if [ ! -f "server-manager.js" ]; then
    echo "❌ Error: server-manager.js not found in $SCRIPT_DIR"
    exit 1
fi

# Run the startup script
./start-server.sh 