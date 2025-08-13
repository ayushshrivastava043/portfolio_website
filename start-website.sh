#!/bin/bash

# Website Launcher
# This script starts the website from the organized directory structure

echo "🚀 Website Launcher"
echo "==================="

# Check if we're in the right directory
if [ ! -f "website-core/start-server.sh" ]; then
    echo "❌ Error: website-core/start-server.sh not found!"
    echo "Please run this script from the website root directory"
    exit 1
fi

echo "✅ Website core found"
echo ""

# Change to website-core directory and start the server
cd website-core
./start-server.sh

# If we get here, the server has stopped
echo ""
echo "🛑 Website server has stopped" 