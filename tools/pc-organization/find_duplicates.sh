#!/bin/bash

# 🔍 Duplicate File Finder Script
# This script helps find and manage duplicate files

echo "🔍 Duplicate File Finder"
echo "======================="

# Function to find duplicates by content (using md5)
find_duplicates_by_content() {
    local directory="$1"
    echo "🔍 Scanning $directory for duplicate files..."
    
    # Find all files and calculate MD5 hashes
    find "$directory" -type f -exec md5 {} \; | \
    awk '{print $1, substr($0, index($0,$2))}' | \
    sort | \
    awk '{
        hash=$1
        file=substr($0, index($0,$2))
        if (hash in seen) {
            print "DUPLICATE:"
            print "  " seen[hash]
            print "  " file
            print ""
        } else {
            seen[hash]=file
        }
    }'
}

# Function to find files with similar names
find_similar_names() {
    local directory="$1"
    echo "🔍 Finding files with similar names in $directory..."
    
    find "$directory" -type f -name "*" | \
    sed 's/.*\///' | \
    sort | \
    uniq -d
}

# Main menu
echo "Choose an option:"
echo "1. Find duplicate files by content (slow but accurate)"
echo "2. Find files with similar names (fast)"
echo "3. Scan Downloads folder for old files"
echo "4. Scan Desktop for organization"
echo "5. Exit"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        read -p "Enter directory to scan (or press Enter for Downloads): " dir
        dir=${dir:-~/Downloads}
        find_duplicates_by_content "$dir"
        ;;
    2)
        read -p "Enter directory to scan (or press Enter for Downloads): " dir
        dir=${dir:-~/Downloads}
        find_similar_names "$dir"
        ;;
    3)
        echo "📁 Files in Downloads older than 30 days:"
        find ~/Downloads -type f -mtime +30 -exec ls -la {} \;
        echo ""
        echo "📁 Files in Downloads older than 90 days:"
        find ~/Downloads -type f -mtime +90 -exec ls -la {} \;
        ;;
    4)
        echo "📁 Desktop contents:"
        ls -la ~/Desktop
        echo ""
        echo "📊 Desktop file count:"
        ls ~/Desktop | wc -l
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "💡 Tips:"
echo "- Use 'rm' to delete files (be careful!)"
echo "- Use 'mv' to move files to organized folders"
echo "- Consider using 'fdupes' for better duplicate detection"
echo "- Always backup before deleting files" 