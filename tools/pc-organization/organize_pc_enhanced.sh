#!/bin/bash

# 🖥️ Enhanced PC Organization Script
# This script reads from pc_organization_config.json for customizable organization

CONFIG_FILE="pc_organization_config.json"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "${PURPLE}🎯 $1${NC}"
}

# Function to check if jq is installed
check_dependencies() {
    if ! command -v jq &> /dev/null; then
        print_error "jq is not installed. Installing..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew install jq
        else
            print_error "Please install jq manually: https://stedolan.github.io/jq/download/"
            exit 1
        fi
    fi
}

# Function to read config
read_config() {
    if [[ ! -f "$CONFIG_FILE" ]]; then
        print_error "Configuration file not found: $CONFIG_FILE"
        exit 1
    fi
    
    print_info "Reading configuration from $CONFIG_FILE"
    CONFIG=$(cat "$CONFIG_FILE")
}

# Function to get config value
get_config() {
    local path="$1"
    echo "$CONFIG" | jq -r "$path"
}

# Function to create folders based on config
create_folders() {
    print_header "Creating folder structure..."
    
    # Desktop folders
    if [[ $(get_config '.organization_settings.desktop.enabled') == "true" ]]; then
        print_info "Creating Desktop organization folders..."
        cd ~/Desktop
        for folder in $(get_config '.organization_settings.desktop.folders | to_entries[] | .value'); do
            mkdir -p "$folder"
            print_status "Created: ~/Desktop/$folder"
        done
    fi
    
    # Downloads folders
    if [[ $(get_config '.organization_settings.downloads.enabled') == "true" ]]; then
        print_info "Creating Downloads organization folders..."
        cd ~/Downloads
        for folder in $(get_config '.organization_settings.downloads.folders | to_entries[] | .value'); do
            mkdir -p "$folder"
            print_status "Created: ~/Downloads/$folder"
        done
    fi
    
    # Documents folders
    if [[ $(get_config '.organization_settings.documents.enabled') == "true" ]]; then
        print_info "Creating Documents organization folders..."
        cd ~/Documents
        for folder in $(get_config '.organization_settings.documents.folders | to_entries[] | .value'); do
            mkdir -p "$folder"
            print_status "Created: ~/Documents/$folder"
        done
    fi
    
    # Pictures folders
    if [[ $(get_config '.organization_settings.pictures.enabled') == "true" ]]; then
        print_info "Creating Pictures organization folders..."
        cd ~/Pictures
        for folder in $(get_config '.organization_settings.pictures.folders | to_entries[] | .value'); do
            mkdir -p "$folder"
            print_status "Created: ~/Pictures/$folder"
        done
    fi
    
    # Music folders
    if [[ $(get_config '.organization_settings.music.enabled') == "true" ]]; then
        print_info "Creating Music organization folders..."
        cd ~/Music
        for folder in $(get_config '.organization_settings.music.folders | to_entries[] | .value'); do
            mkdir -p "$folder"
            print_status "Created: ~/Music/$folder"
        done
    fi
    
    # Videos folders
    if [[ $(get_config '.organization_settings.videos.enabled') == "true" ]]; then
        print_info "Creating Videos organization folders..."
        cd ~/Videos
        for folder in $(get_config '.organization_settings.videos.folders | to_entries[] | .value'); do
            mkdir -p "$folder"
            print_status "Created: ~/Videos/$folder"
        done
    fi
}

# Function to organize desktop
organize_desktop() {
    if [[ $(get_config '.organization_settings.desktop.enabled') != "true" ]]; then
        return
    fi
    
    print_header "Organizing Desktop..."
    cd ~/Desktop
    
    # Get folder names from config
    TO_ORGANIZE=$(get_config '.organization_settings.desktop.folders.to_organize')
    
    # Move files by type
    for category in documents images archives videos audio spreadsheets presentations code; do
        extensions=$(get_config ".organization_settings.desktop.file_types.$category[]")
        for ext in $extensions; do
            if ls *$ext 2>/dev/null; then
                mv *$ext "$TO_ORGANIZE/" 2>/dev/null
                print_status "Moved $category files (*$ext) to $TO_ORGANIZE"
            fi
        done
    done
    
    # Apply custom folder mappings
    print_info "Applying custom folder mappings..."
    while IFS= read -r mapping; do
        if [[ -n "$mapping" && "$mapping" != "null" ]]; then
            source_folder=$(echo "$mapping" | cut -d'=' -f1)
            target_folder=$(echo "$mapping" | cut -d'=' -f2)
            if [[ -d "$source_folder" ]]; then
                mkdir -p "$TO_ORGANIZE/$target_folder"
                mv "$source_folder" "$TO_ORGANIZE/$target_folder/"
                print_status "Mapped '$source_folder' to '$target_folder'"
            fi
        fi
    done < <(get_config '.custom_rules.folder_mappings | to_entries[] | "\(.key)=\(.value)"')
}

# Function to organize downloads
organize_downloads() {
    if [[ $(get_config '.organization_settings.downloads.enabled') != "true" ]]; then
        return
    fi
    
    print_header "Organizing Downloads..."
    cd ~/Downloads
    
    # Move files by type
    for category in documents images videos software archives data audio; do
        folder_name=$(get_config ".organization_settings.downloads.folders.$category")
        extensions=$(get_config ".organization_settings.downloads.file_types.$category[]")
        
        for ext in $extensions; do
            if ls *$ext 2>/dev/null; then
                mv *$ext "$folder_name/" 2>/dev/null
                print_status "Moved $category files (*$ext) to $folder_name"
            fi
        done
    done
    
    # Apply cleanup rules
    if [[ $(get_config '.organization_settings.downloads.cleanup_rules.move_old_to_archive') == "true" ]]; then
        archive_days=$(get_config '.organization_settings.downloads.cleanup_rules.archive_older_than_days')
        archive_folder=$(get_config '.organization_settings.downloads.folders.archives')
        
        print_info "Moving files older than $archive_days days to archive..."
        find . -maxdepth 1 -type f -mtime +$archive_days -exec mv {} "$archive_folder/" \; 2>/dev/null
        print_status "Archived old files"
    fi
}

# Function to find and handle duplicates
find_duplicates() {
    if [[ $(get_config '.advanced_settings.duplicate_detection.enabled') != "true" ]]; then
        return
    fi
    
    print_header "Finding duplicates..."
    
    # Find duplicates by content
    if [[ $(get_config '.advanced_settings.duplicate_detection.methods[]' | grep -q "content" && echo "true") == "true" ]]; then
        print_info "Finding duplicate files by content (this may take a while)..."
        find ~/Downloads -type f -exec md5 {} \; | \
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
        }' > ~/Desktop/duplicates_report.txt
        
        print_status "Duplicate report saved to ~/Desktop/duplicates_report.txt"
    fi
}

# Function to create backup
create_backup() {
    if [[ $(get_config '.advanced_settings.backup.enabled') != "true" ]]; then
        return
    fi
    
    print_header "Creating backup..."
    backup_location=$(get_config '.advanced_settings.backup.backup_location')
    backup_location="${backup_location/#\~/$HOME}"
    
    mkdir -p "$backup_location"
    
    # Backup desktop
    if [[ -d ~/Desktop ]]; then
        cp -r ~/Desktop "$backup_location/Desktop_backup_$(date +%Y%m%d_%H%M%S)"
        print_status "Desktop backed up"
    fi
    
    # Backup downloads
    if [[ -d ~/Downloads ]]; then
        cp -r ~/Downloads "$backup_location/Downloads_backup_$(date +%Y%m%d_%H%M%S)"
        print_status "Downloads backed up"
    fi
    
    print_status "Backup completed at: $backup_location"
}

# Function to show statistics
show_statistics() {
    print_header "Organization Statistics"
    
    echo -e "${CYAN}Desktop:${NC}"
    echo "  Items in TO_ORGANIZE: $(ls ~/Desktop/TO_ORGANIZE/ 2>/dev/null | wc -l)"
    echo "  Items in QUICK_ACCESS: $(ls ~/Desktop/QUICK_ACCESS/ 2>/dev/null | wc -l)"
    echo "  Remaining items: $(ls ~/Desktop/ | grep -v "^TO_" | grep -v "^QUICK_" | grep -v "^\.$" | grep -v "^\.\.$" | wc -l)"
    
    echo -e "${CYAN}Downloads:${NC}"
    for folder in Documents Images Videos Software Archives Data_Files Audio; do
        if [[ -d ~/Downloads/$folder ]]; then
            echo "  $folder: $(ls ~/Downloads/$folder/ | wc -l) files"
        fi
    done
    echo "  Remaining: $(find ~/Downloads -maxdepth 1 -type f | wc -l) files"
}

# Function to show next steps
show_next_steps() {
    print_header "Next Steps"
    echo -e "${YELLOW}1.${NC} Review ~/Desktop/TO_ORGANIZE/ folder"
    echo -e "${YELLOW}2.${NC} Check ~/Desktop/duplicates_report.txt for duplicates"
    echo -e "${YELLOW}3.${NC} Review organized files in ~/Downloads/ subfolders"
    echo -e "${YELLOW}4.${NC} Delete old files from Archives folder"
    echo -e "${YELLOW}5.${NC} Set up regular maintenance schedule"
    echo ""
    echo -e "${GREEN}🎉 Your PC is now much more organized!${NC}"
}

# Main execution
main() {
    print_header "Enhanced PC Organization Script"
    echo "======================================"
    
    # Check dependencies
    check_dependencies
    
    # Read configuration
    read_config
    
    # Create backup if enabled
    if [[ $(get_config '.advanced_settings.backup.backup_before_organization') == "true" ]]; then
        create_backup
    fi
    
    # Create folder structure
    create_folders
    
    # Organize files
    organize_desktop
    organize_downloads
    
    # Find duplicates
    find_duplicates
    
    # Show statistics
    show_statistics
    
    # Show next steps
    show_next_steps
}

# Run main function
main "$@" 