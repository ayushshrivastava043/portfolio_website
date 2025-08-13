// Planet and Moon Positioning Configuration
// This file contains all positioning data for planets and their moons
// Modify these values to adjust positions without touching HTML

const PLANET_CONFIG = {
    // Container settings
    container: {
        height: '1440px', // Increased by 20% from 1200px to 1440px
        minHeight: '1440px', // Increased by 20% from 1200px to 1440px
        maxHeight: '1680px', // Increased by 20% from 1400px to 1680px
        gap: '100px',
        layout: 'triangle' // 'vertical', 'horizontal', 'triangle'
    },

    // Planet base settings
    planet: {
        size: 180, // diameter in pixels
        spacing: 300, // distance between planet centers
        zIndex: 1
    },

    // Moon base settings
    moon: {
        size: 50, // diameter in pixels
        zIndex: 2,
        distance: 240, // Distance from planet center (DOUBLED from 120px to 240px)
        hoverBubble: {
            zIndex: 10,
            backgroundColor: 'rgba(0,255,238,0.95)',
            borderColor: 'rgba(0,255,238,0.8)',
            textColor: '#ffffff',
            titleSize: '12px',
            descriptionSize: '10px',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,255,238,0.3)',
            maxWidth: '200px',
            animationDuration: '0.3s'
        }
    },

    // Individual planet configurations
    planets: {
        earth: {
            name: 'AI & Automation',
            image: 'assets/earth.png',
            category: 'ai',
            position: {
                x: '50%',
                y: '20%'
            },
            moons: [
                {
                    id: 'ai-sales',
                    title: '🤖 AI Sales',
                    description: 'E-commerce automation with AI-powered sales optimization',
                    position: {
                        angle: 45, // degrees from top
                        distance: 240 // pixels from planet center (DOUBLED)
                    }
                },
                {
                    id: 'ai-video',
                    title: '🎬 AI Video',
                    description: 'Script-to-screen video generation using AI',
                    position: {
                        angle: 135, // degrees from top
                        distance: 240
                    }
                },
                {
                    id: 'ai-api',
                    title: '⚙️ API Engine',
                    description: 'Workflow automation and API integration',
                    position: {
                        angle: 270, // degrees from top
                        distance: 240
                    }
                }
            ]
        },

        jupiter: {
            name: 'PM Projects',
            image: 'assets/neptune1.jpeg',
            category: 'pm',
            position: {
                x: '25%',
                y: '70%'
            },
            moons: [
                {
                    id: 'pm-telecom',
                    title: '📡 Telecom',
                    description: 'Bell Canada telecommunications infrastructure',
                    position: {
                        angle: 30,
                        distance: 240
                    }
                },
                {
                    id: 'pm-hrsuite',
                    title: '👥 HR-Suite',
                    description: 'KenboxTech HR management platform',
                    position: {
                        angle: 90,
                        distance: 240
                    }
                },
                {
                    id: 'pm-websites',
                    title: '🌐 Multi-Brand',
                    description: 'AI and retail multi-brand websites',
                    position: {
                        angle: 150,
                        distance: 240
                    }
                },
                {
                    id: 'pm-edtech',
                    title: '🎓 EdTech',
                    description: 'Learning management and educational technology',
                    position: {
                        angle: 210,
                        distance: 240
                    }
                }
            ]
        },

        saturn: {
            name: 'Business Projects',
            image: 'assets/saturn1.png',
            category: 'business',
            position: {
                x: '75%',
                y: '70%'
            },
            moons: [
                {
                    id: 'biz-kpi-playbook',
                    title: '📊 KPI-Driven AI Playbook',
                    description: 'Verifast growth metrics',
                    position: {
                        angle: 45,
                        distance: 240
                    }
                },
                {
                    id: 'biz-esim-dth-launch',
                    title: '🚀 eSIM & DTH Launch',
                    description: 'Bell Canada go-to-market',
                    position: {
                        angle: 90,
                        distance: 240
                    }
                },
                {
                    id: 'biz-genai-pilot',
                    title: '🤖 GenAI Telecom Pilot',
                    description: 'CGI FAQ & ticket triage POC',
                    position: {
                        angle: 135,
                        distance: 240
                    }
                },
                {
                    id: 'biz-edtech-expansion',
                    title: '💡 EdTech Revenue Expansion',
                    description: 'DKPR virtual & gamified modules',
                    position: {
                        angle: 180,
                        distance: 240
                    }
                },
                {
                    id: 'biz-green-build',
                    title: '🌳 Green-Build Cost-Saves',
                    description: 'Eco-materials ROI & waste cut',
                    position: {
                        angle: 270,
                        distance: 240
                    }
                }
            ]
        }
    }
};

// Utility functions for positioning
const PlanetPositioning = {
    // Calculate position based on layout type
    calculatePlanetPosition: function(planetKey, layout = 'triangle') {
        const planet = PLANET_CONFIG.planets[planetKey];
        const container = PLANET_CONFIG.container;
        const planetSize = PLANET_CONFIG.planet.size;
        const spacing = PLANET_CONFIG.planet.spacing;

        switch(layout) {
            case 'triangle':
                return this.calculateTrianglePosition(planetKey, spacing);
            case 'vertical':
                return this.calculateVerticalPosition(planetKey, spacing);
            case 'horizontal':
                return this.calculateHorizontalPosition(planetKey, spacing);
            default:
                return this.calculateTrianglePosition(planetKey, spacing);
        }
    },

    // Calculate triangle layout positions
    calculateTrianglePosition: function(planetKey, spacing) {
        const positions = {
            earth: { x: '50%', y: '20%' },
            jupiter: { x: '25%', y: '70%' },
            saturn: { x: '75%', y: '70%' }
        };
        return positions[planetKey] || { x: '50%', y: '50%' };
    },

    // Calculate vertical layout positions
    calculateVerticalPosition: function(planetKey, spacing) {
        const positions = {
            earth: { x: '50%', y: '20%' },
            jupiter: { x: '50%', y: '50%' },
            saturn: { x: '50%', y: '80%' }
        };
        return positions[planetKey] || { x: '50%', y: '50%' };
    },

    // Calculate horizontal layout positions
    calculateHorizontalPosition: function(planetKey, spacing) {
        const positions = {
            earth: { x: '20%', y: '50%' },
            jupiter: { x: '50%', y: '50%' },
            saturn: { x: '80%', y: '50%' }
        };
        return positions[planetKey] || { x: '50%', y: '50%' };
    },

    // Calculate moon position relative to planet center using proper trigonometry
    calculateMoonPosition: function(planetKey, moonIndex) {
        const planet = PLANET_CONFIG.planets[planetKey];
        const moon = planet.moons[moonIndex];
        const moonSize = PLANET_CONFIG.moon.size;
        const planetSize = PLANET_CONFIG.planet.size;
        
        if (!moon) return { x: 0, y: 0 };

        const angle = moon.position.angle * (Math.PI / 180); // Convert to radians
        // Always enforce a minimum distance so moons never collapse into the planet centre
        const minDistance = Math.max(planetSize / 2 + moonSize / 2 + 12, 120);
        const distance = Math.max(moon.position.distance || 0, minDistance);
        
        // Calculate position relative to planet center
        // Note: In CSS, positive Y goes down, so we negate the Y component
        const x = Math.cos(angle) * distance;
        const y = -Math.sin(angle) * distance; // Negative because CSS Y is inverted

        return {
            x: x,
            y: y,
            angle: moon.position.angle,
            distance: distance
        };
    },

    // Generate CSS for planet positioning
    generatePlanetCSS: function(planetKey) {
        const position = this.calculatePlanetPosition(planetKey, PLANET_CONFIG.container.layout);
        const planetSize = PLANET_CONFIG.planet.size;
        
        return `
            position: absolute;
            width: ${planetSize}px;
            height: ${planetSize}px;
            left: ${position.x};
            top: ${position.y};
            transform: translate(-50%, -50%);
            z-index: ${PLANET_CONFIG.planet.zIndex};
        `;
    },

    // Generate CSS for moon positioning - RELATIVE TO PLANET
    generateMoonCSS: function(planetKey, moonIndex) {
        const moonPos = this.calculateMoonPosition(planetKey, moonIndex);
        const moonSize = PLANET_CONFIG.moon.size;
        
        // Position moons relative to their planet center
        return `
            position: absolute;
            width: ${moonSize}px;
            height: ${moonSize}px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) translate(${moonPos.x}px, ${moonPos.y}px);
            z-index: ${PLANET_CONFIG.moon.zIndex};
        `;
    },

    // Create hover bubble for moon
    createHoverBubble: function(moonData) {
        const bubble = document.createElement('div');
        bubble.className = 'moon-hover-bubble';
        bubble.innerHTML = `
            <h4 style="font-size: ${PLANET_CONFIG.moon.hoverBubble.titleSize}; margin: 0 0 4px 0; color: ${PLANET_CONFIG.moon.hoverBubble.textColor}; font-weight: bold;">
                ${moonData.title}
            </h4>
            <p style="font-size: ${PLANET_CONFIG.moon.hoverBubble.descriptionSize}; margin: 0; color: ${PLANET_CONFIG.moon.hoverBubble.textColor}; opacity: 0.9; line-height: 1.3;">
                ${moonData.description}
            </p>
        `;
        
        bubble.style.cssText = `
            position: absolute;
            background: ${PLANET_CONFIG.moon.hoverBubble.backgroundColor};
            border: 2px solid ${PLANET_CONFIG.moon.hoverBubble.borderColor};
            border-radius: ${PLANET_CONFIG.moon.hoverBubble.borderRadius};
            padding: ${PLANET_CONFIG.moon.hoverBubble.padding};
            box-shadow: ${PLANET_CONFIG.moon.hoverBubble.boxShadow};
            max-width: ${PLANET_CONFIG.moon.hoverBubble.maxWidth};
            min-width: 120px;
            z-index: ${PLANET_CONFIG.moon.hoverBubble.zIndex};
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
            transition: all ${PLANET_CONFIG.moon.hoverBubble.animationDuration} ease;
            pointer-events: none;
            white-space: normal;
            word-wrap: break-word;
            text-align: center;
            visibility: hidden;
        `;
        
        return bubble;
    },

    // Create project popup modal
    createProjectPopup: function(moonData) {
        // Remove existing popup if any
        const existingPopup = document.querySelector('.project-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        const popup = document.createElement('div');
        popup.className = 'project-popup';
        popup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <div class="popup-header">
                    <h3>${moonData.title}</h3>
                    <button class="popup-close">&times;</button>
                </div>
                <div class="popup-body">
                    <p>${moonData.description}</p>
                    <div class="project-details">
                        <h4>Project Details:</h4>
                        <ul>
                            <li><strong>Category:</strong> ${this.getPlanetCategory(moonData.id)}</li>
                            <li><strong>Status:</strong> Active</li>
                            <li><strong>Technologies:</strong> AI, Automation, Analytics</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Overlay styles
        const overlay = popup.querySelector('.popup-overlay');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;

        // Content styles
        const content = popup.querySelector('.popup-content');
        content.style.cssText = `
            position: relative;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #00ffee;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            color: white;
            box-shadow: 0 10px 30px rgba(0, 255, 238, 0.3);
        `;

        // Header styles
        const header = popup.querySelector('.popup-header');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(0, 255, 238, 0.3);
        `;

        const title = header.querySelector('h3');
        title.style.cssText = `
            margin: 0;
            color: #00ffee;
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
        `;

        const closeBtn = header.querySelector('.popup-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #00ffee;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;

        // Body styles
        const body = popup.querySelector('.popup-body');
        body.style.cssText = `
            line-height: 1.6;
        `;

        const description = body.querySelector('p');
        description.style.cssText = `
            margin-bottom: 20px;
            color: #ccc;
        `;

        const details = body.querySelector('.project-details');
        details.style.cssText = `
            background: rgba(0, 255, 238, 0.1);
            border: 1px solid rgba(0, 255, 238, 0.3);
            border-radius: 10px;
            padding: 20px;
        `;

        const detailsTitle = details.querySelector('h4');
        detailsTitle.style.cssText = `
            margin: 0 0 15px 0;
            color: #00ffee;
            font-family: 'Orbitron', sans-serif;
        `;

        const detailsList = details.querySelector('ul');
        detailsList.style.cssText = `
            margin: 0;
            padding-left: 20px;
            color: #ccc;
        `;

        const listItems = details.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.cssText = `
                margin-bottom: 8px;
            `;
        });

        // Add event listeners
        closeBtn.addEventListener('click', () => {
            popup.remove();
        });

        overlay.addEventListener('click', () => {
            popup.remove();
        });

        // Add to document
        document.body.appendChild(popup);

        return popup;
    },

    // Get planet category from moon ID
    getPlanetCategory: function(moonId) {
        if (moonId.startsWith('ai-')) return 'AI & Automation';
        if (moonId.startsWith('pm-')) return 'PM Projects';
        if (moonId.startsWith('biz-')) return 'Business Projects';
        return 'Unknown';
    },

    // Apply positioning to DOM elements
    applyPositioning: function() {
        // Apply to planets
        Object.keys(PLANET_CONFIG.planets).forEach(planetKey => {
            const planetElement = document.querySelector(`.planet.${planetKey}`);
            if (planetElement) {
                planetElement.style.cssText += this.generatePlanetCSS(planetKey);
            }
        });

        // Apply to moons and add hover functionality
        Object.keys(PLANET_CONFIG.planets).forEach(planetKey => {
            const planet = PLANET_CONFIG.planets[planetKey];
            planet.moons.forEach((moon, index) => {
                const moonElement = document.querySelector(`.planet.${planetKey} .moon[data-project="${moon.id}"]`);
                if (moonElement) {
                    // Ensure the moon container uses the planet center as origin
                    const moonSystem = moonElement.closest('.moon-system');
                    if (moonSystem) {
                        moonSystem.style.position = 'absolute';
                        moonSystem.style.left = '0';
                        moonSystem.style.top = '0';
                        moonSystem.style.width = '100%';
                        moonSystem.style.height = '100%';
                        moonSystem.style.transform = 'none';
                    }

                    // Apply positioning relative to planet center
                    moonElement.style.cssText += this.generateMoonCSS(planetKey, index);
                    
                    // Remove existing text content but keep moon image
                    const existingContent = moonElement.querySelector('.moon-content');
                    if (existingContent) {
                        existingContent.remove();
                    }
                    
                    // Add moon image if not present
                    if (!moonElement.querySelector('img')) {
                        const moonImg = document.createElement('img');
                        moonImg.src = 'assets/MOON.png';
                        moonImg.alt = 'Moon';
                        moonImg.style.cssText = `
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 50%;
                            pointer-events: none;
                        `;
                        moonElement.appendChild(moonImg);
                    }
                    
                    // Create hover bubble and add it to the planet container (not the moon)
                    const bubble = this.createHoverBubble(moon);
                    const planetContainer = moonElement.closest('.planet');
                    if (planetContainer) {
                        planetContainer.appendChild(bubble);
                    }
                    
                    // Position the bubble relative to the moon but outside its boundaries
                    const updateBubblePosition = () => {
                        const moonRect = moonElement.getBoundingClientRect();
                        const planetRect = planetContainer.getBoundingClientRect();
                        
                        // Position bubble above the moon, outside the moon's sphere
        bubble.style.position = 'absolute';
        bubble.style.left = `${moonRect.left - planetRect.left + moonRect.width/2}px`;
        bubble.style.top = `${moonRect.top - planetRect.top - 80}px`;
        bubble.style.transform = 'translateX(-50%)';
        bubble.style.pointerEvents = 'none';
                        bubble.style.zIndex = '1000';
                    };
                    
                    // Add hover event listeners
                    moonElement.addEventListener('mouseenter', function() {
                        updateBubblePosition();
                        bubble.style.visibility = 'visible';
                        bubble.style.opacity = '1';
                        bubble.style.transform = 'translateX(-50%) translateY(0)';
                    });
                    
                    moonElement.addEventListener('mouseleave', function() {
                        bubble.style.opacity = '0';
                        bubble.style.transform = 'translateX(-50%) translateY(10px)';
                        setTimeout(() => {
                            bubble.style.visibility = 'hidden';
                        }, 300);
                    });

                    // Add click event listener to open project popup
                    moonElement.addEventListener('click', function(e) {
                        e.stopPropagation();
                        PlanetPositioning.createProjectPopup(moon);
                    });

                    // Add cursor pointer to indicate clickable
                    moonElement.style.cursor = 'pointer';
                }
            });
        });
    },

    // Update configuration and reapply
    updateConfig: function(newConfig) {
        Object.assign(PLANET_CONFIG, newConfig);
        this.applyPositioning();
    },

    // Change layout type
    changeLayout: function(layoutType) {
        PLANET_CONFIG.container.layout = layoutType;
        this.applyPositioning();
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PLANET_CONFIG, PlanetPositioning };
} else {
    window.PLANET_CONFIG = PLANET_CONFIG;
    window.PlanetPositioning = PlanetPositioning;
} 