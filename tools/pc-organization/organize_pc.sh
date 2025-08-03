#!/bin/bash

# 🖥️ PC Organization Script
# This script creates a basic folder structure for organizing your PC

echo "🧹 Starting PC Organization Setup..."
echo "=================================="

# Create main organization directories
echo "📁 Creating main directories..."

# Documents structure
mkdir -p ~/Documents/{Work/{Projects,Reports,Presentations},Personal/{Finance,Health,Travel},Archive}

# Downloads organization
mkdir -p ~/Downloads/{Software,Images,Documents,Videos,Archives,Cleanup}

# Desktop organization
mkdir -p ~/Desktop/{Quick\ Access,Temporary}

# Pictures organization
mkdir -p ~/Pictures/{Photos,Screenshots,Wallpapers,Archive}

# Music organization
mkdir -p ~/Music/{Playlists,Albums,Downloads}

# Videos organization
mkdir -p ~/Videos/{Movies,TV\ Shows,Tutorials,Recordings}

# Development (if you're a developer)
mkdir -p ~/Development/{Projects,Tools,Libraries,Documentation}

echo "✅ Basic folder structure created!"
echo ""
echo "📋 Next steps:"
echo "1. Move files from Desktop to appropriate folders"
echo "2. Organize Downloads folder"
echo "3. Sort Documents by category"
echo "4. Review and delete duplicates"
echo ""
echo "📖 See PC_ORGANIZATION_GUIDE.md for detailed instructions"
echo ""
echo "🎯 Quick commands to get started:"
echo "  cd ~/Desktop && ls -la  # See what's on your desktop"
echo "  cd ~/Downloads && ls -la  # See what's in downloads"
echo "  find ~/Downloads -type f -mtime +180  # Find files older than 6 months"
echo ""
echo "�� Happy organizing!" 