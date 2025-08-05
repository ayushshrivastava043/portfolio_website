#!/bin/bash

# 🛠️ PC Organization Configuration Editor
# This script helps you easily modify the pc_organization_config.json file

CONFIG_FILE="pc_organization_config.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${PURPLE}🎯 $1${NC}"
}

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

# Function to show current configuration
show_current_config() {
    print_header "Current Configuration"
    echo "========================"
    
    if [[ ! -f "$CONFIG_FILE" ]]; then
        print_error "Configuration file not found!"
        return
    fi
    
    echo -e "${CYAN}Desktop Organization:${NC}"
    echo "  Enabled: $(jq -r '.organization_settings.desktop.enabled' "$CONFIG_FILE")"
    echo "  Folders: $(jq -r '.organization_settings.desktop.folders | to_entries[] | "\(.key): \(.value)"' "$CONFIG_FILE" | tr '\n' ', ')"
    
    echo -e "${CYAN}Downloads Organization:${NC}"
    echo "  Enabled: $(jq -r '.organization_settings.downloads.enabled' "$CONFIG_FILE")"
    echo "  Folders: $(jq -r '.organization_settings.downloads.folders | to_entries[] | "\(.key): \(.value)"' "$CONFIG_FILE" | tr '\n' ', ')"
    
    echo -e "${CYAN}Custom Folder Mappings:${NC}"
    jq -r '.custom_rules.folder_mappings | to_entries[] | "  \(.key) → \(.value)"' "$CONFIG_FILE" 2>/dev/null || echo "  None configured"
    
    echo -e "${CYAN}Backup Settings:${NC}"
    echo "  Enabled: $(jq -r '.advanced_settings.backup.enabled' "$CONFIG_FILE")"
    echo "  Location: $(jq -r '.advanced_settings.backup.backup_location' "$CONFIG_FILE")"
}

# Function to edit folder names
edit_folder_names() {
    print_header "Edit Folder Names"
    echo "==================="
    
    echo -e "${YELLOW}Choose what to edit:${NC}"
    echo "1. Desktop folder names"
    echo "2. Downloads folder names"
    echo "3. Documents folder names"
    echo "4. Custom folder mappings"
    echo "5. Back to main menu"
    
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            edit_desktop_folders
            ;;
        2)
            edit_downloads_folders
            ;;
        3)
            edit_documents_folders
            ;;
        4)
            edit_custom_mappings
            ;;
        5)
            return
            ;;
        *)
            print_error "Invalid choice"
            ;;
    esac
}

# Function to edit desktop folders
edit_desktop_folders() {
    print_header "Edit Desktop Folder Names"
    echo "=============================="
    
    current_to_organize=$(jq -r '.organization_settings.desktop.folders.to_organize' "$CONFIG_FILE")
    current_to_delete=$(jq -r '.organization_settings.desktop.folders.to_delete' "$CONFIG_FILE")
    current_to_archive=$(jq -r '.organization_settings.desktop.folders.to_archive' "$CONFIG_FILE")
    current_quick_access=$(jq -r '.organization_settings.desktop.folders.quick_access' "$CONFIG_FILE")
    
    echo "Current folder names:"
    echo "  To Organize: $current_to_organize"
    echo "  To Delete: $current_to_delete"
    echo "  To Archive: $current_to_archive"
    echo "  Quick Access: $current_quick_access"
    echo ""
    
    read -p "New name for 'To Organize' folder (or press Enter to keep current): " new_to_organize
    read -p "New name for 'To Delete' folder (or press Enter to keep current): " new_to_delete
    read -p "New name for 'To Archive' folder (or press Enter to keep current): " new_to_archive
    read -p "New name for 'Quick Access' folder (or press Enter to keep current): " new_quick_access
    
    # Update config file
    if [[ -n "$new_to_organize" ]]; then
        jq ".organization_settings.desktop.folders.to_organize = \"$new_to_organize\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_to_delete" ]]; then
        jq ".organization_settings.desktop.folders.to_delete = \"$new_to_delete\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_to_archive" ]]; then
        jq ".organization_settings.desktop.folders.to_archive = \"$new_to_archive\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_quick_access" ]]; then
        jq ".organization_settings.desktop.folders.quick_access = \"$new_quick_access\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    
    print_status "Desktop folder names updated!"
}

# Function to edit downloads folders
edit_downloads_folders() {
    print_header "Edit Downloads Folder Names"
    echo "==============================="
    
    echo "Current Downloads folder names:"
    jq -r '.organization_settings.downloads.folders | to_entries[] | "  \(.key): \(.value)"' "$CONFIG_FILE"
    echo ""
    
    echo -e "${YELLOW}Enter new names (press Enter to keep current):${NC}"
    
    read -p "Documents folder name: " new_docs
    read -p "Images folder name: " new_images
    read -p "Videos folder name: " new_videos
    read -p "Software folder name: " new_software
    read -p "Archives folder name: " new_archives
    read -p "Data files folder name: " new_data
    read -p "Audio folder name: " new_audio
    
    # Update config file
    if [[ -n "$new_docs" ]]; then
        jq ".organization_settings.downloads.folders.documents = \"$new_docs\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_images" ]]; then
        jq ".organization_settings.downloads.folders.images = \"$new_images\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_videos" ]]; then
        jq ".organization_settings.downloads.folders.videos = \"$new_videos\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_software" ]]; then
        jq ".organization_settings.downloads.folders.software = \"$new_software\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_archives" ]]; then
        jq ".organization_settings.downloads.folders.archives = \"$new_archives\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_data" ]]; then
        jq ".organization_settings.downloads.folders.data = \"$new_data\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_audio" ]]; then
        jq ".organization_settings.downloads.folders.audio = \"$new_audio\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    
    print_status "Downloads folder names updated!"
}

# Function to edit documents folders
edit_documents_folders() {
    print_header "Edit Documents Folder Names"
    echo "==============================="
    
    echo "Current Documents folder names:"
    jq -r '.organization_settings.documents.folders | to_entries[] | "  \(.key): \(.value)"' "$CONFIG_FILE"
    echo ""
    
    echo -e "${YELLOW}Enter new names (press Enter to keep current):${NC}"
    
    read -p "Work folder name: " new_work
    read -p "Personal folder name: " new_personal
    read -p "Archive folder name: " new_archive
    read -p "Projects folder name: " new_projects
    read -p "Finance folder name: " new_finance
    read -p "Health folder name: " new_health
    read -p "Travel folder name: " new_travel
    
    # Update config file
    if [[ -n "$new_work" ]]; then
        jq ".organization_settings.documents.folders.work = \"$new_work\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_personal" ]]; then
        jq ".organization_settings.documents.folders.personal = \"$new_personal\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_archive" ]]; then
        jq ".organization_settings.documents.folders.archive = \"$new_archive\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_projects" ]]; then
        jq ".organization_settings.documents.folders.projects = \"$new_projects\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_finance" ]]; then
        jq ".organization_settings.documents.folders.finance = \"$new_finance\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_health" ]]; then
        jq ".organization_settings.documents.folders.health = \"$new_health\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    if [[ -n "$new_travel" ]]; then
        jq ".organization_settings.documents.folders.travel = \"$new_travel\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
    fi
    
    print_status "Documents folder names updated!"
}

# Function to edit custom mappings
edit_custom_mappings() {
    print_header "Edit Custom Folder Mappings"
    echo "==============================="
    
    echo "Current custom mappings:"
    jq -r '.custom_rules.folder_mappings | to_entries[] | "  \(.key) → \(.value)"' "$CONFIG_FILE" 2>/dev/null || echo "  None configured"
    echo ""
    
    echo -e "${YELLOW}Add new mapping:${NC}"
    read -p "Source folder name (e.g., 'My Projects'): " source_folder
    read -p "Target folder path (e.g., 'Work/Projects'): " target_folder
    
    if [[ -n "$source_folder" && -n "$target_folder" ]]; then
        jq ".custom_rules.folder_mappings[\"$source_folder\"] = \"$target_folder\"" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
        print_status "Custom mapping added: '$source_folder' → '$target_folder'"
    fi
}

# Function to toggle features
toggle_features() {
    print_header "Toggle Features"
    echo "================"
    
    echo -e "${YELLOW}Choose what to toggle:${NC}"
    echo "1. Desktop organization"
    echo "2. Downloads organization"
    echo "3. Documents organization"
    echo "4. Backup before organization"
    echo "5. Duplicate detection"
    echo "6. Back to main menu"
    
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1)
            current=$(jq -r '.organization_settings.desktop.enabled' "$CONFIG_FILE")
            new_value=$([[ "$current" == "true" ]] && echo "false" || echo "true")
            jq ".organization_settings.desktop.enabled = $new_value" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
            print_status "Desktop organization $( [[ "$new_value" == "true" ]] && echo "enabled" || echo "disabled" )"
            ;;
        2)
            current=$(jq -r '.organization_settings.downloads.enabled' "$CONFIG_FILE")
            new_value=$([[ "$current" == "true" ]] && echo "false" || echo "true")
            jq ".organization_settings.downloads.enabled = $new_value" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
            print_status "Downloads organization $( [[ "$new_value" == "true" ]] && echo "enabled" || echo "disabled" )"
            ;;
        3)
            current=$(jq -r '.organization_settings.documents.enabled' "$CONFIG_FILE")
            new_value=$([[ "$current" == "true" ]] && echo "false" || echo "true")
            jq ".organization_settings.documents.enabled = $new_value" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
            print_status "Documents organization $( [[ "$new_value" == "true" ]] && echo "enabled" || echo "disabled" )"
            ;;
        4)
            current=$(jq -r '.advanced_settings.backup.backup_before_organization' "$CONFIG_FILE")
            new_value=$([[ "$current" == "true" ]] && echo "false" || echo "true")
            jq ".advanced_settings.backup.backup_before_organization = $new_value" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
            print_status "Backup before organization $( [[ "$new_value" == "true" ]] && echo "enabled" || echo "disabled" )"
            ;;
        5)
            current=$(jq -r '.advanced_settings.duplicate_detection.enabled' "$CONFIG_FILE")
            new_value=$([[ "$current" == "true" ]] && echo "false" || echo "true")
            jq ".advanced_settings.duplicate_detection.enabled = $new_value" "$CONFIG_FILE" > temp_config.json && mv temp_config.json "$CONFIG_FILE"
            print_status "Duplicate detection $( [[ "$new_value" == "true" ]] && echo "enabled" || echo "disabled" )"
            ;;
        6)
            return
            ;;
        *)
            print_error "Invalid choice"
            ;;
    esac
}

# Function to run organization
run_organization() {
    print_header "Run PC Organization"
    echo "======================"
    
    if [[ ! -f "organize_pc_enhanced.sh" ]]; then
        print_error "Enhanced organization script not found!"
        return
    fi
    
    print_warning "This will organize your PC according to the current configuration."
    read -p "Are you sure you want to continue? (y/N): " confirm
    
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        ./organize_pc_enhanced.sh
    else
        print_info "Organization cancelled."
    fi
}

# Main menu
main_menu() {
    while true; do
        echo ""
        print_header "PC Organization Configuration Editor"
        echo "=========================================="
        echo ""
        show_current_config
        echo ""
        echo -e "${YELLOW}Choose an option:${NC}"
        echo "1. Edit folder names"
        echo "2. Toggle features on/off"
        echo "3. Run PC organization"
        echo "4. View/edit raw config file"
        echo "5. Exit"
        echo ""
        
        read -p "Enter your choice (1-5): " choice
        
        case $choice in
            1)
                edit_folder_names
                ;;
            2)
                toggle_features
                ;;
            3)
                run_organization
                ;;
            4)
                if command -v code &> /dev/null; then
                    code "$CONFIG_FILE"
                else
                    print_info "Opening config file in default editor..."
                    open "$CONFIG_FILE" 2>/dev/null || xdg-open "$CONFIG_FILE" 2>/dev/null || print_error "Could not open config file"
                fi
                ;;
            5)
                print_status "Goodbye!"
                exit 0
                ;;
            *)
                print_error "Invalid choice"
                ;;
        esac
    done
}

# Main execution
main() {
    print_header "PC Organization Configuration Editor"
    echo "=========================================="
    
    # Check dependencies
    check_dependencies
    
    # Check if config file exists
    if [[ ! -f "$CONFIG_FILE" ]]; then
        print_error "Configuration file not found: $CONFIG_FILE"
        print_info "Please make sure pc_organization_config.json exists in the current directory."
        exit 1
    fi
    
    # Start main menu
    main_menu
}

# Run main function
main "$@" 