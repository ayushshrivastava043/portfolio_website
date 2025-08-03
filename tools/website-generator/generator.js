// Website Generator - Main JavaScript
class WebsiteGenerator {
    constructor() {
        this.config = this.getDefaultConfig();
        this.init();
    }

    getDefaultConfig() {
        return {
            basic: {
                siteName: '',
                siteTitle: '',
                siteDescription: '',
                authorName: '',
                authorTitle: '',
                heroImage: ''
            },
            content: {
                aboutText: '',
                aboutImage: '',
                aboutStyle: 'text',
                social: {
                    linkedin: '',
                    github: '',
                    youtube: '',
                    twitter: '',
                    instagram: '',
                    facebook: '',
                    portfolio: '',
                    email: ''
                },
                socialStyle: 'icons',
                projects: [],
                projectsTitle: 'Projects',
                projectsDescription: '',
                includeSkills: false,
                skillsTitle: 'Skills & Technologies',
                skillsStyle: 'bars',
                skills: [],
                includeExperience: false,
                experienceTitle: 'Experience',
                experience: [],
                includeContact: false,
                contactTitle: 'Get In Touch',
                contactEmail: '',
                contactPhone: '',
                contactLocation: ''
            },
            styling: {
                // Layout
                layoutStyle: 'modern',
                heroStyle: 'fullscreen',
                projectLayout: 'grid',
                
                // Colors
                colorScheme: 'custom',
                primaryColor: '#00ffee',
                secondaryColor: '#6366f1',
                accentColor: '#10b981',
                textColor: '#f8fafc',
                backgroundColor: '#0f172a',
                
                // Background
                backgroundStyle: 'space',
                backgroundImage: '',
                particleDensity: 200,
                blurEffect: 0,
                
                // Typography
                headingFont: 'Orbitron',
                bodyFont: 'Inter',
                fontSize: 'medium',
                lineHeight: 'normal',
                
                // Animations
                animationStyle: 'smooth',
                animationSpeed: 'normal',
                hoverEffects: 'glow',
                scrollEffects: 'none',
                
                // Visual Effects
                glassEffect: false,
                shadowStyle: 'medium',
                borderRadius: 'medium',
                gradientStyle: 'none'
            },
            advanced: {
                // SEO
                metaKeywords: '',
                metaAuthor: '',
                ogImage: '',
                favicon: '',
                
                // Performance
                lazyLoading: true,
                minifyCSS: true,
                minifyJS: true,
                imageOptimization: 'auto',
                
                // Analytics
                googleAnalytics: '',
                googleTagManager: '',
                hotjar: '',
                
                // Features
                includeTimeline: false,
                includeNews: false,
                includeBlog: false,
                includeTestimonials: false,
                includeServices: false,
                darkMode: false,
                languageSelector: false,
                
                // Custom Code
                customCSS: '',
                customJS: '',
                headCode: '',
                bodyCode: '',
                
                // Output
                outputDir: '',
                fileFormat: 'zip',
                includeAssets: true,
                includeSource: false
            }
        };
    }

    init() {
        this.setupEventListeners();
        this.loadSavedConfig();
        this.updateStatus('Ready to generate your website');
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Form inputs
        this.setupFormListeners();

        // Buttons
        document.getElementById('loadConfig').addEventListener('click', () => this.loadConfig());
        document.getElementById('saveConfig').addEventListener('click', () => this.saveConfig());
        document.getElementById('generateWebsite').addEventListener('click', () => this.generateWebsite());
        document.getElementById('refreshPreview').addEventListener('click', () => this.refreshPreview());
        document.getElementById('fullscreenPreview').addEventListener('click', () => this.fullscreenPreview());
        document.getElementById('addProject').addEventListener('click', () => this.addProject());

        // File input
        document.getElementById('configFileInput').addEventListener('change', (e) => this.handleConfigFile(e));
    }

    setupFormListeners() {
        // Basic info
        ['siteName', 'siteTitle', 'siteDescription', 'authorName', 'authorTitle', 'heroImage'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.config.basic[id] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Content - About
        ['aboutText', 'aboutImage', 'aboutStyle'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.config.content[id] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Social links
        ['linkedin', 'github', 'youtube', 'twitter', 'instagram', 'facebook', 'portfolio', 'email'].forEach(platform => {
            const element = document.getElementById(platform);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.config.content.social[platform] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Social style
        document.getElementById('socialStyle')?.addEventListener('change', (e) => {
            this.config.content.socialStyle = e.target.value;
            this.saveToLocalStorage();
            this.updatePreview();
        });

        // Projects
        ['projectsTitle', 'projectsDescription'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.config.content[id] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Skills
        ['includeSkills', 'skillsTitle', 'skillsStyle'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.addEventListener('change', (e) => {
                        this.config.content[id] = e.target.checked;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                } else {
                    element.addEventListener('input', (e) => {
                        this.config.content[id] = e.target.value;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                }
            }
        });

        // Experience
        ['includeExperience', 'experienceTitle'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.addEventListener('change', (e) => {
                        this.config.content[id] = e.target.checked;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                } else {
                    element.addEventListener('input', (e) => {
                        this.config.content[id] = e.target.value;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                }
            }
        });

        // Contact
        ['includeContact', 'contactTitle', 'contactEmail', 'contactPhone', 'contactLocation'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.addEventListener('change', (e) => {
                        this.config.content[id] = e.target.checked;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                } else {
                    element.addEventListener('input', (e) => {
                        this.config.content[id] = e.target.value;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                }
            }
        });

        // Styling - Layout
        ['layoutStyle', 'heroStyle', 'projectLayout'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.styling[id] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Styling - Colors
        ['colorScheme', 'primaryColor', 'secondaryColor', 'accentColor', 'textColor', 'backgroundColor'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.styling[id] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Styling - Background
        ['backgroundStyle', 'backgroundImage', 'particleDensity', 'blurEffect'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'range') {
                    element.addEventListener('input', (e) => {
                        this.config.styling[id] = e.target.value;
                        // Update range value display
                        const valueDisplay = e.target.nextElementSibling;
                        if (valueDisplay && valueDisplay.classList.contains('range-value')) {
                            valueDisplay.textContent = id === 'blurEffect' ? `${e.target.value}px` : e.target.value;
                        }
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                } else {
                    element.addEventListener('input', (e) => {
                        this.config.styling[id] = e.target.value;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                }
            }
        });

        // Styling - Typography
        ['headingFont', 'bodyFont', 'fontSize', 'lineHeight'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.styling[id] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Styling - Animations
        ['animationStyle', 'animationSpeed', 'hoverEffects', 'scrollEffects'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.styling[id] = e.target.value;
                    this.saveToLocalStorage();
                    this.updatePreview();
                });
            }
        });

        // Styling - Visual Effects
        ['glassEffect', 'shadowStyle', 'borderRadius', 'gradientStyle'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.addEventListener('change', (e) => {
                        this.config.styling[id] = e.target.checked;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                } else {
                    element.addEventListener('change', (e) => {
                        this.config.styling[id] = e.target.value;
                        this.saveToLocalStorage();
                        this.updatePreview();
                    });
                }
            }
        });

        // Advanced - SEO
        ['metaKeywords', 'metaAuthor', 'ogImage', 'favicon'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.config.advanced[id] = e.target.value;
                    this.saveToLocalStorage();
                });
            }
        });

        // Advanced - Performance
        ['lazyLoading', 'minifyCSS', 'minifyJS'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.advanced[id] = e.target.checked;
                    this.saveToLocalStorage();
                });
            }
        });

        ['imageOptimization'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.advanced[id] = e.target.value;
                    this.saveToLocalStorage();
                });
            }
        });

        // Advanced - Analytics
        ['googleAnalytics', 'googleTagManager', 'hotjar'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.config.advanced[id] = e.target.value;
                    this.saveToLocalStorage();
                });
            }
        });

        // Advanced - Features
        ['includeTimeline', 'includeNews', 'includeBlog', 'includeTestimonials', 'includeServices', 'darkMode', 'languageSelector'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.advanced[id] = e.target.checked;
                    this.saveToLocalStorage();
                });
            }
        });

        // Advanced - Custom Code
        ['customCSS', 'customJS', 'headCode', 'bodyCode'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.config.advanced[id] = e.target.value;
                    this.saveToLocalStorage();
                });
            }
        });

        // Advanced - Output
        ['outputDir', 'fileFormat'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.advanced[id] = e.target.value;
                    this.saveToLocalStorage();
                });
            }
        });

        ['includeAssets', 'includeSource'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.config.advanced[id] = e.target.checked;
                    this.saveToLocalStorage();
                });
            }
        });

        // Projects
        this.updateProjects();
        
        // Add buttons for new sections
        document.getElementById('addSkill')?.addEventListener('click', () => this.addSkill());
        document.getElementById('addExperience')?.addEventListener('click', () => this.addExperience());
    }

    switchTab(tabName) {
        // Remove active class from all tabs and panes
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        // Add active class to selected tab and pane
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    addProject() {
        const container = document.getElementById('projectsContainer');
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.innerHTML = `
            <input type="text" class="project-title" placeholder="Project Title">
            <textarea class="project-description" placeholder="Project description..."></textarea>
            <input type="text" class="project-tech" placeholder="Tech stack (comma separated)">
            <button class="remove-project btn btn-danger">Remove</button>
        `;

        // Add event listeners to new project
        const titleInput = projectDiv.querySelector('.project-title');
        const descInput = projectDiv.querySelector('.project-description');
        const techInput = projectDiv.querySelector('.project-tech');
        const removeBtn = projectDiv.querySelector('.remove-project');

        titleInput.addEventListener('input', () => this.updateProjects());
        descInput.addEventListener('input', () => this.updateProjects());
        techInput.addEventListener('input', () => this.updateProjects());
        removeBtn.addEventListener('click', () => {
            projectDiv.remove();
            this.updateProjects();
        });

        container.appendChild(projectDiv);
        this.updateProjects();
    }

    addSkill() {
        const container = document.getElementById('skillsContainer');
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.innerHTML = `
            <input type="text" class="skill-name" placeholder="Skill Name">
            <input type="range" class="skill-level" min="1" max="10" value="8">
            <span class="skill-level-value">8</span>
            <button class="remove-skill btn btn-danger">Remove</button>
        `;

        // Add event listeners
        const nameInput = skillDiv.querySelector('.skill-name');
        const levelInput = skillDiv.querySelector('.skill-level');
        const levelValue = skillDiv.querySelector('.skill-level-value');
        const removeBtn = skillDiv.querySelector('.remove-skill');

        nameInput.addEventListener('input', () => this.updateSkills());
        levelInput.addEventListener('input', (e) => {
            levelValue.textContent = e.target.value;
            this.updateSkills();
        });
        removeBtn.addEventListener('click', () => {
            skillDiv.remove();
            this.updateSkills();
        });

        container.appendChild(skillDiv);
        this.updateSkills();
    }

    updateSkills() {
        const skills = [];
        document.querySelectorAll('.skill-item').forEach(item => {
            const name = item.querySelector('.skill-name').value;
            const level = item.querySelector('.skill-level').value;

            if (name) {
                skills.push({
                    name,
                    level: parseInt(level)
                });
            }
        });

        this.config.content.skills = skills;
        this.saveToLocalStorage();
        this.updatePreview();
    }

    addExperience() {
        const container = document.getElementById('experienceContainer');
        const expDiv = document.createElement('div');
        expDiv.className = 'experience-item';
        expDiv.innerHTML = `
            <input type="text" class="experience-title" placeholder="Job Title">
            <input type="text" class="experience-company" placeholder="Company Name">
            <input type="text" class="experience-duration" placeholder="Duration (e.g., 2020-2023)">
            <textarea class="experience-description" placeholder="Job description..."></textarea>
            <button class="remove-experience btn btn-danger">Remove</button>
        `;

        // Add event listeners
        const titleInput = expDiv.querySelector('.experience-title');
        const companyInput = expDiv.querySelector('.experience-company');
        const durationInput = expDiv.querySelector('.experience-duration');
        const descInput = expDiv.querySelector('.experience-description');
        const removeBtn = expDiv.querySelector('.remove-experience');

        titleInput.addEventListener('input', () => this.updateExperience());
        companyInput.addEventListener('input', () => this.updateExperience());
        durationInput.addEventListener('input', () => this.updateExperience());
        descInput.addEventListener('input', () => this.updateExperience());
        removeBtn.addEventListener('click', () => {
            expDiv.remove();
            this.updateExperience();
        });

        container.appendChild(expDiv);
        this.updateExperience();
    }

    updateExperience() {
        const experience = [];
        document.querySelectorAll('.experience-item').forEach(item => {
            const title = item.querySelector('.experience-title').value;
            const company = item.querySelector('.experience-company').value;
            const duration = item.querySelector('.experience-duration').value;
            const description = item.querySelector('.experience-description').value;

            if (title || company || duration || description) {
                experience.push({
                    title,
                    company,
                    duration,
                    description
                });
            }
        });

        this.config.content.experience = experience;
        this.saveToLocalStorage();
        this.updatePreview();
    }

    updateProjects() {
        const projects = [];
        document.querySelectorAll('.project-item').forEach(item => {
            const title = item.querySelector('.project-title').value;
            const description = item.querySelector('.project-description').value;
            const tech = item.querySelector('.project-tech').value;

            if (title || description || tech) {
                projects.push({
                    title,
                    description,
                    tech: tech.split(',').map(t => t.trim()).filter(t => t)
                });
            }
        });

        this.config.content.projects = projects;
        this.saveToLocalStorage();
        this.updatePreview();
    }

    loadConfig() {
        document.getElementById('configFileInput').click();
    }

    handleConfigFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);
                this.config = { ...this.getDefaultConfig(), ...config };
                this.populateForm();
                this.updateStatus('Configuration loaded successfully');
            } catch (error) {
                this.updateStatus('Error loading configuration file', 'error');
            }
        };
        reader.readAsText(file);
    }

    saveConfig() {
        const configStr = JSON.stringify(this.config, null, 2);
        const blob = new Blob([configStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'website-config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.updateStatus('Configuration saved successfully');
    }

    populateForm() {
        // Basic info
        Object.entries(this.config.basic).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) element.value = value;
        });

        // Content
        document.getElementById('aboutText').value = this.config.content.aboutText;

        // Social links
        Object.entries(this.config.content.social).forEach(([platform, url]) => {
            const element = document.getElementById(platform);
            if (element) element.value = url;
        });

        // Projects
        const container = document.getElementById('projectsContainer');
        container.innerHTML = '';
        this.config.content.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item';
            projectDiv.innerHTML = `
                <input type="text" class="project-title" value="${project.title || ''}" placeholder="Project Title">
                <textarea class="project-description" placeholder="Project description...">${project.description || ''}</textarea>
                <input type="text" class="project-tech" value="${project.tech ? project.tech.join(', ') : ''}" placeholder="Tech stack (comma separated)">
                <button class="remove-project btn btn-danger">Remove</button>
            `;

            const removeBtn = projectDiv.querySelector('.remove-project');
            removeBtn.addEventListener('click', () => {
                projectDiv.remove();
                this.updateProjects();
            });

            container.appendChild(projectDiv);
        });

        // Styling
        document.getElementById('primaryColor').value = this.config.styling.primaryColor;
        document.getElementById('backgroundColor').value = this.config.styling.backgroundColor;
        document.getElementById('fontFamily').value = this.config.styling.fontFamily;
        document.getElementById('animationStyle').value = this.config.styling.animationStyle;

        // Advanced
        document.getElementById('outputDir').value = this.config.advanced.outputDir;
        document.getElementById('includeTimeline').checked = this.config.advanced.includeTimeline;
        document.getElementById('includeNews').checked = this.config.advanced.includeNews;
        document.getElementById('customCSS').value = this.config.advanced.customCSS;

        this.updatePreview();
    }

    generateWebsite() {
        this.updateStatus('Generating website...', 'loading');
        
        // Create the website files
        const files = this.createWebsiteFiles();
        
        // Download the files
        this.downloadFiles(files);
        
        this.updateStatus('Website generated successfully!', 'success');
        this.updateLastGenerated();
    }

    createWebsiteFiles() {
        const files = {};
        
        // Generate HTML
        files['index.html'] = this.generateHTML();
        
        // Generate CSS
        files['style.css'] = this.generateCSS();
        
        // Generate JavaScript
        files['main.js'] = this.generateJS();
        
        // Generate configuration
        files['config.json'] = JSON.stringify(this.config, null, 2);
        
        // Generate README
        files['README.md'] = this.generateREADME();
        
        return files;
    }

    generateHTML() {
        // Read the original website template and replace content
        const originalTemplate = this.getOriginalWebsiteTemplate();
        
        // Replace content placeholders with config data
        let html = originalTemplate
            .replace(/{{SITE_TITLE}}/g, this.config.basic.siteTitle)
            .replace(/{{SITE_DESCRIPTION}}/g, this.config.basic.siteDescription)
            .replace(/{{AUTHOR_NAME}}/g, this.config.basic.authorName)
            .replace(/{{AUTHOR_TITLE}}/g, this.config.basic.authorTitle)
            .replace(/{{ABOUT_TEXT}}/g, this.config.content.aboutText)
            .replace(/{{HERO_IMAGE}}/g, this.config.basic.heroImage || 'assets/View recent photos.jpeg')
            .replace(/{{SOCIAL_LINKS}}/g, this.generateSocialLinks())
            .replace(/{{PROJECTS_HTML}}/g, this.generateProjectsHTML())
            .replace(/{{TIMELINE_HTML}}/g, this.config.advanced.includeTimeline ? this.generateTimelineHTML() : '')
            .replace(/{{PRIMARY_COLOR}}/g, this.config.styling.primaryColor);
            
        return html;
    }

    getOriginalWebsiteTemplate() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{SITE_DESCRIPTION}}">
    <meta name="keywords" content="portfolio, {{AUTHOR_NAME}}, {{AUTHOR_TITLE}}">
    <meta name="author" content="{{AUTHOR_NAME}}">
    <title>{{SITE_TITLE}}</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://unpkg.com/scrollreveal"></script>
</head>
<body>
    <canvas id="space" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;"></canvas>
    
    <!-- Hero Section -->
    <div class="hero-section">
        <div class="hero-text">
            <h1>{{AUTHOR_NAME}}</h1>
            <p>{{AUTHOR_TITLE}}</p>
            <p>{{ABOUT_TEXT}}</p>
        </div>
        <div class="video-collage">
            <video src="assets/mahajanpadas.mp4" autoplay loop muted playsinline></video>
            <video src="assets/Mauryan era.mp4" autoplay loop muted playsinline></video>
            <video src="assets/Vedic Age AI video.mp4" autoplay loop muted playsinline></video>
            <video src="assets/AI_sample.mp4" autoplay loop muted playsinline></video>
        </div>
    </div>

    <!-- About Section -->
    <div class="about-section">
        <div class="profile-img-container">
            <img id="profile-img" src="{{HERO_IMAGE}}" alt="{{AUTHOR_NAME}}" />
        </div>
        <h2>{{AUTHOR_NAME}}</h2>
        <p>{{ABOUT_TEXT}}</p>
    </div>

    <!-- Projects Section -->
    <div class="projects-section">
        <h2>Projects</h2>
        <div class="projects-grid">
            {{PROJECTS_HTML}}
        </div>
    </div>

    <!-- Timeline Section -->
    {{TIMELINE_HTML}}

    <!-- Social Links -->
    <div class="social-links">
        {{SOCIAL_LINKS}}
    </div>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="main.js"></script>
    <script type="module">
        import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
        
        // Three.js background animation
        const canvas = document.querySelector('#space');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
        renderer.setSize(innerWidth, innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Starfield
        const starGeo = new THREE.BufferGeometry();
        const starCount = 2000;
        const positions = new Float32Array(starCount*3);
        for (let i=0;i<starCount;i++){
            positions[i*3+0] = (Math.random()-0.5)*600;
            positions[i*3+1] = (Math.random()-0.5)*600;
            positions[i*3+2] = -Math.random()*800;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
        const starMat = new THREE.PointsMaterial({size:1.5, color:0xffffff});
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);
        
        camera.position.z = 5;
        function animate(){
            requestAnimationFrame(animate);
            const pos = starGeo.attributes.position.array;
            for (let i=0; i<starCount; i++){
                pos[i*3+2] += 4;
                if (pos[i*3+2] > 5){
                    pos[i*3+2] = -800;
                }
            }
            starGeo.attributes.position.needsUpdate = true;
            renderer.render(scene,camera);
        }
        animate();
    </script>
</body>
</html>`;
    }

    generateCSS() {
        return `/* Generated Website Styles - Based on Original Portfolio */
:root {
    --primary-color: ${this.config.styling.primaryColor};
    --background: #0f172a;
    --surface: #1e293b;
    --text: #f8fafc;
}

html, body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
}

#space {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

body {
    font-family: 'Poppins', sans-serif;
    color: var(--text);
    background: radial-gradient(ellipse at center, #000 0%, #0f2027 70%, #203a43 100%);
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    transition: background 0.5s ease;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
}

.hero-section {
    width: 100vw;
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: rgba(17,17,17,0.65);
}

.hero-text {
    width: 100%;
    text-align: center;
    z-index: 3;
    color: #fff;
    text-shadow: 2px 2px 8px #000;
    margin-bottom: 32px;
}

.hero-text h1 {
    font-size: 2.8rem;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 2px;
    color: var(--primary-color);
}

.hero-text p {
    font-size: 1.3rem;
    margin: 10px 0;
}

.video-collage {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 900px;
}

.video-collage video {
    width: 220px;
    height: 390px;
    object-fit: cover;
    object-position: center;
    border-radius: 18px;
    box-shadow: 0 4px 24px var(--primary-color);
}

.about-section {
    width: 100%;
    background: linear-gradient(90deg, #0f0c29, #302b63, #24243e);
    padding: 60px 0;
    text-align: center;
    color: #fff;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
}

.profile-img-container {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: #23283a;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid var(--primary-color);
    box-shadow: 0 0 20px rgba(0,255,238,0.5);
    overflow: hidden;
    margin: 0 auto 20px;
}

.profile-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.about-section h2 {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    color: var(--primary-color);
    margin: 0 0 20px 0;
}

.about-section p {
    font-size: 1.15rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    color: #ccc;
}

.projects-section {
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.projects-section h2 {
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 40px;
    text-shadow: 0 0 20px rgba(0, 255, 238, 0.4);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.project-card {
    background: rgba(35, 40, 58, 0.8);
    border-radius: 15px;
    padding: 25px;
    border: 1px solid var(--primary-color);
    box-shadow: 0 4px 20px rgba(0, 255, 238, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 255, 238, 0.2);
    border-color: var(--primary-color);
}

.project-card h3 {
    color: var(--primary-color);
    font-family: 'Orbitron', sans-serif;
    font-size: 1.3rem;
    margin-bottom: 15px;
}

.project-card p {
    color: #ccc;
    margin-bottom: 20px;
    line-height: 1.6;
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tech-tag {
    background: var(--primary-color);
    color: #000;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 40px 0;
}

.social-links a {
    color: var(--primary-color);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.social-links a:hover {
    background: var(--primary-color);
    color: #000;
}

@media (max-width: 768px) {
    .hero-text h1 {
        font-size: 2rem;
    }
    
    .video-collage {
        flex-direction: column;
        gap: 20px;
    }
    
    .video-collage video {
        width: 280px;
        height: 200px;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
}

.hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
}

.hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.8;
}

.description {
    max-width: 600px;
    margin: 0 auto 2rem;
    font-size: 1.1rem;
}

.social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.social-links a {
    color: var(--primary-color);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.social-links a:hover {
    background: var(--primary-color);
    color: var(--background);
}

.projects-section {
    padding: 4rem 2rem;
    background: var(--surface);
}

.projects-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--primary-color);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.project-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 2rem;
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.tech-tag {
    background: var(--primary-color);
    color: var(--background);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
}

${this.config.advanced.customCSS}`;
    }

    generateJS() {
        return `// Generated Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});`;
    }

    generateREADME() {
        return `# ${this.config.basic.siteName}

Generated by Website Generator

## About
${this.config.basic.siteDescription}

## Setup
1. Open \`index.html\` in your browser
2. Customize the content in \`config.json\`
3. Modify styles in \`style.css\`

## Features
- Responsive design
- Modern animations
- Customizable styling
- Project showcase
${this.config.advanced.includeTimeline ? '- Learning timeline\n' : ''}${this.config.advanced.includeNews ? '- News section\n' : ''}
## Author
${this.config.basic.authorName} - ${this.config.basic.authorTitle}`;
    }

    generateSocialLinks() {
        const links = [];
        Object.entries(this.config.content.social).forEach(([platform, url]) => {
            if (url) {
                links.push(`<a href="${url}" target="_blank">${platform.charAt(0).toUpperCase() + platform.slice(1)}</a>`);
            }
        });
        return links.join('');
    }

    generateProjectsHTML() {
        return this.config.content.projects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    generateTimelineHTML() {
        return `
    <div class="timeline-section">
        <h2>Learning Journey</h2>
        <div class="timeline">
            <!-- Timeline content would be generated here -->
        </div>
    </div>`;
    }

    generateNewsHTML() {
        return `
    <div class="news-section">
        <h2>Latest Updates</h2>
        <div class="news-grid">
            <!-- News content would be generated here -->
        </div>
    </div>`;
    }

    getBackgroundStyle() {
        switch (this.config.styling.backgroundColor) {
            case 'space':
                return 'radial-gradient(ellipse at center, #000 0%, #0f2027 70%, #203a43 100%)';
            case 'gradient':
                return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            case 'minimal':
                return '#f8fafc';
            default:
                return 'radial-gradient(ellipse at center, #000 0%, #0f2027 70%, #203a43 100%)';
        }
    }

    downloadFiles(files) {
        // Create a zip file or download individual files
        Object.entries(files).forEach(([filename, content]) => {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    updatePreview() {
        const iframe = document.getElementById('previewFrame');
        const previewHTML = this.generateHTML();
        const previewCSS = this.generateCSS();
        
        const fullPreview = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${previewCSS}</style>
            </head>
            <body>${previewHTML}</body>
            </html>
        `;
        
        iframe.srcdoc = fullPreview;
    }

    refreshPreview() {
        this.updatePreview();
        this.updateStatus('Preview refreshed');
    }

    fullscreenPreview() {
        const iframe = document.getElementById('previewFrame');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        }
    }

    updateStatus(message, type = 'info') {
        const statusElement = document.getElementById('statusMessage');
        statusElement.textContent = message;
        
        // Remove existing status classes
        statusElement.className = '';
        
        // Add status type class
        if (type === 'error') {
            statusElement.style.color = 'var(--error)';
        } else if (type === 'success') {
            statusElement.style.color = 'var(--success)';
        } else if (type === 'loading') {
            statusElement.style.color = 'var(--warning)';
        } else {
            statusElement.style.color = 'var(--text-secondary)';
        }
    }

    updateLastGenerated() {
        const now = new Date();
        document.getElementById('lastGenerated').textContent = now.toLocaleString();
    }

    saveToLocalStorage() {
        localStorage.setItem('websiteGeneratorConfig', JSON.stringify(this.config));
    }

    loadSavedConfig() {
        const saved = localStorage.getItem('websiteGeneratorConfig');
        if (saved) {
            try {
                this.config = { ...this.getDefaultConfig(), ...JSON.parse(saved) };
                this.populateForm();
            } catch (error) {
                console.error('Error loading saved config:', error);
            }
        }
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteGenerator();
}); 