// Planet and Moon Positioning System - Isolated from other changes
class PlanetPositioningSystem {
    constructor() {
        this.positions = {
            // Center-top earth like in the screenshot
            'earth': {
                planet: { left: '50%', top: '30%' },
                moons: {
                    'moon-1': { left: '140px', top: '-70px' }, // AI Sales
                    'moon-2': { left: '-140px', top: '70px' },  // AI Video
                    'moon-3': { left: '140px', top: '70px' }    // API Engine
                }
            },
            // Bottom-left planet with four moons around
            'jupiter': {
                planet: { left: '28%', top: '75%' },
                moons: {
                    'moon-1': { left: '-140px', top: '-70px' }, // Telecom (top-left)
                    'moon-2': { left: '140px', top: '-70px' },   // HR-Suite (top-right)
                    'moon-3': { left: '-140px', top: '70px' },   // Multi-Brand (bottom-left)
                    'moon-4': { left: '140px', top: '70px' }     // EdTech (bottom-right)
                }
            },
            // Bottom-right saturn with ring
            'saturn': {
                planet: { left: '80%', top: '78%' },
                moons: {
                    'moon-1': { left: '-140px', top: '-70px' }, // KPI Playbook
                    'moon-2': { left: '140px', top: '-70px' },   // eSIM DTH
                    'moon-3': { left: '-140px', top: '70px' },   // GenAI Pilot
                    'moon-4': { left: '140px', top: '70px' },    // EdTech Expansion
                    'moon-5': { left: '0px', top: '-150px' }     // Green Build (top)
                }
            }
        };
        this.init();
    }

    init() {
        this.applyPositioning();
        this.setupEventListeners();
    }

    applyPositioning() {
        // Apply planet positions
        Object.keys(this.positions).forEach(planetName => {
            const planet = document.querySelector(`.planet.${planetName}`);
            if (planet) {
                const pos = this.positions[planetName].planet;
                planet.style.left = pos.left;
                planet.style.top = pos.top;
            }

            // Apply moon positions
            const moons = this.positions[planetName].moons;
            Object.keys(moons).forEach(moonName => {
                const moon = document.querySelector(`.${planetName} .${moonName}`);
                if (moon) {
                    const moonPos = moons[moonName];
                    moon.style.left = moonPos.left;
                    moon.style.top = moonPos.top;
                }
            });
        });
    }

    setupEventListeners() {
        // Add hover effects for moons
        const moons = document.querySelectorAll('.moon');
        moons.forEach(moon => {
            moon.addEventListener('mouseenter', (e) => {
                this.showMoonInfo(e.target);
            });
            
            moon.addEventListener('mouseleave', (e) => {
                this.hideMoonInfo(e.target);
            });
        });
    }

    showMoonInfo(moon) {
        // Create or update info bubble
        let bubble = moon.querySelector('.moon-info-bubble');
        if (!bubble) {
            bubble = document.createElement('div');
            bubble.className = 'moon-info-bubble';
            bubble.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.9);
                border: 2px solid rgba(0,255,238,0.6);
                border-radius: 10px;
                padding: 10px;
                color: white;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 20px rgba(0,255,238,0.3);
                transform: translateY(-100%);
                margin-top: -10px;
                left: 50%;
                transform: translateX(-50%) translateY(-100%);
                margin-top: -10px;
            `;
            moon.appendChild(bubble);
        }

        // Set content based on project
        const projectId = moon.getAttribute('data-project');
        const projectNames = {
            'ai-sales': 'AI Sales Bot',
            'ai-video': 'AI Video Generator',
            'ai-api': 'API Engine',
            'pm-telecom': 'Telecom Platform',
            'pm-hrsuite': 'HR Suite',
            'pm-websites': 'Multi-Brand Sites',
            'pm-edtech': 'EdTech Platform',
            'biz-kpi-playbook': 'KPI Playbook',
            'biz-esim-dth-launch': 'eSIM DTH Launch',
            'biz-genai-pilot': 'GenAI Pilot',
            'biz-edtech-expansion': 'EdTech Expansion',
            'biz-green-build': 'Green Build'
        };

        bubble.textContent = projectNames[projectId] || 'Project';
        bubble.style.opacity = '1';
    }

    hideMoonInfo(moon) {
        const bubble = moon.querySelector('.moon-info-bubble');
        if (bubble) {
            bubble.style.opacity = '0';
        }
    }

    // Method to reset positions (useful after DOM changes)
    resetPositions() {
        setTimeout(() => {
            this.applyPositioning();
        }, 100);
    }

    // Method to get current positions
    getPositions() {
        return this.positions;
    }

    // Method to update positions programmatically
    updatePosition(planetName, moonName, newPosition) {
        if (this.positions[planetName] && this.positions[planetName].moons[moonName]) {
            this.positions[planetName].moons[moonName] = newPosition;
            this.applyPositioning();
        }
    }
}

// Initialize the positioning system
document.addEventListener('DOMContentLoaded', () => {
    window.planetPositioningSystem = new PlanetPositioningSystem();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlanetPositioningSystem;
} 