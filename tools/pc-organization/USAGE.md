# 🖥️ PC Organization System - Quick Usage Guide

## 🚀 **3 Ways to Use the PC Organization System**

### **Method 1: Web Interface (Recommended)**
```bash
cd tools/pc-organization
python3 pc_config_server.py
```
Then open: **http://localhost:8030**

**What you can do:**
- ✅ Change folder names
- ✅ Toggle settings on/off  
- ✅ Save configuration
- ✅ Run organization with one click

### **Method 2: Interactive Menu**
```bash
cd tools/pc-organization
./edit_pc_config.sh
```

**What you can do:**
- ✅ Edit folder names
- ✅ Change settings
- ✅ Add custom mappings

### **Method 3: Quick Start**
```bash
cd tools/pc-organization
./organize_pc_enhanced.sh
```

**What it does:**
- ✅ Creates organized folders
- ✅ Moves files into categories
- ✅ Finds duplicates
- ✅ Creates backups

## 📋 **What Gets Organized**

### **Desktop**
- `TO_ORGANIZE/` - Files to sort later
- `TO_DELETE/` - Files to delete
- `TO_ARCHIVE/` - Old files to archive
- `QUICK_ACCESS/` - Frequently used files

### **Downloads**
- `Documents/` - PDFs, Word docs, etc.
- `Images/` - Photos, screenshots, etc.
- `Videos/` - Video files
- `Software/` - Installers, apps
- `Archives/` - ZIP files, old downloads
- `Data_Files/` - Spreadsheets, data
- `Audio/` - Music, podcasts

### **Documents**
- `Work/` - Work-related files
- `Personal/` - Personal documents
- `Archive/` - Old documents

## ⚙️ **Customization**

### **Change Folder Names**
1. Open web interface or use `./edit_pc_config.sh`
2. Modify folder names in settings
3. Save configuration

### **Add Custom Mappings**
```json
"folder_mappings": {
  "AI Vids": "Videos/AI_Content",
  "Canada": "Personal/Travel/Canada"
}
```

### **File Types**
The system automatically categorizes files by extension:
- **Documents**: .pdf, .doc, .docx, .txt
- **Images**: .jpg, .png, .gif, .heic
- **Videos**: .mp4, .mov, .avi
- **Software**: .dmg, .pkg, .exe
- **Archives**: .zip, .rar, .tar

## 🔧 **Advanced Features**

### **Duplicate Detection**
- Finds files with same content (using MD5 hash)
- Reports duplicates to `~/Desktop/duplicates_report.txt`
- Safe - doesn't delete automatically

### **Backup System**
- Creates backup before organizing
- Location: `~/Desktop/PC_Organization_Backup`
- Timestamped backups

### **Cleanup Rules**
- Delete files older than 180 days
- Archive files older than 90 days
- Customizable time periods

## 🎯 **Quick Commands**

```bash
# Start web interface
cd tools/pc-organization && python3 pc_config_server.py

# Run organization
cd tools/pc-organization && ./organize_pc_enhanced.sh

# Edit configuration
cd tools/pc-organization && ./edit_pc_config.sh

# Find duplicates only
cd tools/pc-organization && ./find_duplicates.sh
```

## 📊 **After Organization**

### **Check Results**
- Look at your Desktop - files in organized folders
- Check Downloads - files sorted by type
- Review `~/Desktop/duplicates_report.txt`

### **Next Steps**
1. Review `TO_ORGANIZE/` folder
2. Delete old files from Archives
3. Set up regular maintenance schedule

## 🛡️ **Safety Features**

- ✅ **Backup before changes**
- ✅ **Preview mode available**
- ✅ **No automatic deletion**
- ✅ **Confirmation prompts**
- ✅ **Detailed logging**

---

**🎉 Your PC will be much more organized!** 