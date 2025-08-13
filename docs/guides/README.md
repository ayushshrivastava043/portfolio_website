# 🚀 Ayush's Portfolio & Projects Hub
A comprehensive collection of web projects, tools, and applications showcasing AI development, automation, and modern web technologies.

## 📁 **Project Structure**

```
website/
├── 📂 tools/                 # Development tools & utilities
│   ├── website-generator/    # Website generation tool
│   └── pc-organization/      # PC organization system
│       ├── pc_config_server.py      # Web UI server
│       ├── pc_config_ui.html        # Web interface
│       ├── edit_pc_config.sh        # Interactive config editor
│       ├── organize_pc_enhanced.sh  # Enhanced organization script
│       ├── pc_organization_config.json # Configuration file
│       ├── find_duplicates.sh       # Duplicate file finder
│       ├── organize_pc.sh           # Basic organization script
│       ├── PC_ORGANIZATION_README.md # Usage guide
│       └── PC_ORGANIZATION_GUIDE.md # Detailed guide
├── 📂 projects/              # Individual project applications
│   ├── news-app/             # React-based news aggregator
│   └── news-app-mobile/      # React Native mobile version
├── 📂 generated-websites/    # Websites created by the generator
│   └── Dhawal webiste/       # Example generated website
├── 📂 main-website/          # Your main portfolio website
│   ├── config.js            # Website configuration
│   ├── projects.js          # Projects data
│   └── inline-edit.js       # Interactive editing features
├── 📂 servers/               # Backend services and APIs
│   ├── server.py            # Main HTTP server
│   ├── websocket_server.py  # WebSocket communication
│   ├── openai_proxy.py      # OpenAI API proxy
│   └── requirements.txt     # Python dependencies
├── 📂 assets/                # Shared media assets (images, videos, icons)
├── 📂 src/                   # Core source code components (e.g., constellation.js)
├── 📂 cleanup-backup/        # Temporary directory for old/redundant files
├── index.html               # Main portfolio page
├── main.js                  # Main JavaScript file
├── style.css                # Main stylesheet
└── README.md                # This file
```

## 🛠️ **Quick Start**

### **Main Portfolio Website**
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

### **PC Organization System**
```bash
cd tools/pc-organization
python3 pc_config_server.py
# Open http://localhost:8030 for web interface
```

### **Website Generator**
```bash
cd tools/website-generator
python3 -m http.server 8001
# Open http://localhost:8001
```

## 🎯 **Key Features**

### **Portfolio Website**
- Interactive constellation-style learning timeline
- Three.js animated background
- Responsive design with modern UI
- Project showcase with live demos

### **PC Organization System**
- **Web Interface**: Easy-to-use browser-based configuration
- **Interactive Menu**: Command-line configuration editor
- **Automated Organization**: Smart file categorization and cleanup
- **Duplicate Detection**: Find and manage duplicate files
- **Backup System**: Safe organization with automatic backups

### **Website Generator**
- Template-based website generation
- JSON configuration system
- Customizable styling and content
- Export ready-to-use websites

## 📚 **Documentation**

- **PC Organization**: See `tools/pc-organization/PC_ORGANIZATION_README.md`
- **Website Generator**: See `tools/website-generator/README.md`
- **Project Guides**: Individual README files in each project directory

## 🔧 **Development**

### **Adding New Projects**
1. Create project directory in `projects/`
2. Add project details to `main-website/projects.js`
3. Update portfolio showcase

### **Customizing PC Organization**
1. Edit `tools/pc-organization/pc_organization_config.json`
2. Use web interface: `python3 tools/pc-organization/pc_config_server.py`
3. Or use command-line: `./tools/pc-organization/edit_pc_config.sh`

## 🚀 **Deployment**

All tools are designed to work locally. For production deployment:
- Portfolio: Deploy `index.html`, `style.css`, `main.js`, and `assets/`
- PC Organization: Use locally only (file system operations)
- Website Generator: Deploy generated websites to any static hosting

---

**🎉 Happy coding and organizing!**
