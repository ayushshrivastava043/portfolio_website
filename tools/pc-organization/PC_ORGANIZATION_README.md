# 🖥️ **Configurable PC Organization System**

A powerful, customizable system to organize your entire PC with ease. This system includes a configuration file, enhanced organization script, and user-friendly configuration editor.

## 📁 **Files Overview**

- **`pc_organization_config.json`** - Main configuration file (customize this!)
- **`organize_pc_enhanced.sh`** - Enhanced organization script that reads from config
- **`edit_pc_config.sh`** - User-friendly configuration editor
- **`find_duplicates.sh`** - Duplicate file finder (from previous setup)
- **`organize_pc.sh`** - Basic organization script (from previous setup)

## 🚀 **Quick Start**

### 1. **Edit Configuration (Recommended)**
```bash
./edit_pc_config.sh
```
This opens a user-friendly menu where you can:
- Change folder names
- Toggle features on/off
- Add custom folder mappings
- Run organization

### 2. **Run Organization**
```bash
./organize_pc_enhanced.sh
```

### 3. **Manual Configuration**
Edit `pc_organization_config.json` directly in your preferred editor.

## ⚙️ **Configuration Options**

### **Desktop Organization**
```json
"desktop": {
  "enabled": true,
  "folders": {
    "to_organize": "TO_ORGANIZE",
    "to_delete": "TO_DELETE", 
    "to_archive": "TO_ARCHIVE",
    "quick_access": "QUICK_ACCESS"
  }
}
```

### **Downloads Organization**
```json
"downloads": {
  "enabled": true,
  "folders": {
    "documents": "Documents",
    "images": "Images", 
    "videos": "Videos",
    "software": "Software",
    "archives": "Archives",
    "data": "Data_Files",
    "audio": "Audio"
  },
  "cleanup_rules": {
    "delete_older_than_days": 180,
    "move_old_to_archive": true,
    "archive_older_than_days": 90
  }
}
```

### **Custom Folder Mappings**
Map specific folders to organized locations:
```json
"folder_mappings": {
  "AI Vids": "Videos/AI_Content",
  "Canada": "Personal/Travel/Canada",
  "Civils": "Work/Government",
  "GMAT Docs": "Education/GMAT"
}
```

### **Advanced Settings**
```json
"advanced_settings": {
  "backup": {
    "enabled": true,
    "backup_before_organization": true,
    "backup_location": "~/Desktop/PC_Organization_Backup"
  },
  "duplicate_detection": {
    "enabled": true,
    "methods": ["content", "filename"]
  },
  "safety": {
    "confirm_deletions": true,
    "preview_changes": true
  }
}
```

## 🎯 **How to Customize**

### **1. Change Folder Names**
Instead of "TO_ORGANIZE", you can use:
- "SORT_LATER"
- "NEEDS_ATTENTION" 
- "PENDING"
- Any name you prefer!

### **2. Add Custom Mappings**
If you have folders like "My Projects", "Work Stuff", etc., map them:
```json
"folder_mappings": {
  "My Projects": "Work/Projects",
  "Work Stuff": "Work/Current",
  "Personal Photos": "Pictures/Personal"
}
```

### **3. Toggle Features**
- Disable desktop organization if you prefer manual control
- Enable/disable backup before organization
- Turn duplicate detection on/off

### **4. Modify File Types**
Add or remove file extensions for different categories:
```json
"file_types": {
  "documents": [".pdf", ".doc", ".docx", ".txt", ".rtf", ".md"],
  "images": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".heic", ".webp"]
}
```

## 📋 **Step-by-Step Usage**

### **Step 1: Review Current Configuration**
```bash
./edit_pc_config.sh
```
Choose option 1 to see current settings.

### **Step 2: Customize Settings**
- **Option 1**: Edit folder names
- **Option 2**: Toggle features
- **Option 4**: Open raw config file for advanced editing

### **Step 3: Run Organization**
- **Option 3**: Run PC organization
- Or run directly: `./organize_pc_enhanced.sh`

### **Step 4: Review Results**
- Check `~/Desktop/TO_ORGANIZE/` for files to manually sort
- Review `~/Desktop/duplicates_report.txt` for duplicates
- Check organized files in `~/Downloads/` subfolders

## 🔧 **Advanced Customization**

### **Add New File Categories**
Edit the config file to add new categories:
```json
"file_types": {
  "documents": [".pdf", ".doc", ".docx"],
  "images": [".jpg", ".png", ".gif"],
  "code": [".js", ".py", ".html", ".css"],
  "data": [".csv", ".json", ".xml"],
  "presentations": [".pptx", ".ppt", ".key"]
}
```

### **Custom Cleanup Rules**
```json
"cleanup_rules": {
  "delete_older_than_days": 365,
  "move_old_to_archive": true,
  "archive_older_than_days": 180,
  "exclude_patterns": ["*.important", "backup_*"]
}
```

### **Backup Settings**
```json
"backup": {
  "enabled": true,
  "backup_before_organization": true,
  "backup_location": "~/Documents/PC_Backups",
  "keep_backups_for_days": 30
}
```

## 🛡️ **Safety Features**

- **Automatic Backup**: Creates backup before organization
- **Preview Mode**: Shows what will be changed before doing it
- **Confirmation Prompts**: Asks before deleting files
- **Logging**: Records all actions for review
- **Rollback**: Backup allows you to restore if needed

## 📊 **What Gets Organized**

### **Desktop**
- Files moved to `TO_ORGANIZE/` by type
- Custom folder mappings applied
- Quick access items remain accessible

### **Downloads**
- Files sorted into type-specific folders
- Old files moved to Archives
- Duplicates identified and reported

### **Documents**
- Work/Personal separation
- Project organization
- Archive for old files

### **Media Files**
- Pictures organized by type
- Music sorted into playlists/albums
- Videos categorized

## 🔍 **Troubleshooting**

### **Script Won't Run**
```bash
chmod +x organize_pc_enhanced.sh
chmod +x edit_pc_config.sh
```

### **jq Not Found**
```bash
brew install jq  # macOS
# or
sudo apt-get install jq  # Ubuntu/Debian
```

### **Configuration Errors**
- Check JSON syntax in `pc_organization_config.json`
- Use `jq` to validate: `jq . pc_organization_config.json`

### **Files Not Moving**
- Check if folders exist
- Verify file permissions
- Review config file paths

## 📈 **Maintenance Schedule**

### **Weekly**
- Run `./organize_pc_enhanced.sh` for new files
- Review `TO_ORGANIZE` folder
- Check for duplicates

### **Monthly**
- Archive old files
- Clean up backup folder
- Update custom mappings

### **Quarterly**
- Deep clean and reorganization
- Review and update configuration
- Remove old backups

## 🎉 **Benefits**

✅ **Customizable**: Change folder names, add mappings, modify rules  
✅ **Safe**: Automatic backups, confirmation prompts, logging  
✅ **Comprehensive**: Organizes Desktop, Downloads, Documents, Media  
✅ **User-Friendly**: Interactive configuration editor  
✅ **Maintainable**: Regular schedule, easy updates  
✅ **Flexible**: Enable/disable features as needed  

## 📞 **Support**

If you encounter issues:
1. Check the configuration file syntax
2. Review the log files
3. Restore from backup if needed
4. Run `./edit_pc_config.sh` to troubleshoot settings

---

**Happy Organizing! 🎯✨** 